// src/app/api/reservations/route.ts
import { NextResponse } from "next/server";
import { SalonReservation, TimeSlotAvailability } from "@/types/reservation";
import {
  UNIFIED_SALON_MENUS,
  BUSINESS_HOURS_SLOTS,
  INITIAL_RESERVATIONS,
  getMenuById
} from "@/data/salonMenuData";

// インメモリ予約ストア（サーバー稼働中保持）
let reservationsStore: SalonReservation[] = [...INITIAL_RESERVATIONS];

// 時間を分に変換するヘルパー (例: "11:30" -> 690)
function timeToMinutes(timeStr: string): number {
  const [h, m] = timeStr.split(":").map(Number);
  return h * 60 + m;
}

// 分を時間文字列に変換 (例: 690 -> "11:30")
function minutesToTime(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
}

// 2つの時間帯が重複するか判定
function isTimeOverlapping(
  start1: number,
  duration1: number,
  start2: number,
  duration2: number
): boolean {
  const end1 = start1 + duration1;
  const end2 = start2 + duration2;
  return Math.max(start1, start2) < Math.min(end1, end2);
}

// ========================================================
// GET: 予約一覧 または 特定日の空き枠判定
// ========================================================
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const date = searchParams.get("date"); // YYYY-MM-DD
    const durationParam = searchParams.get("duration"); // 所要時間（分）
    const staffId = searchParams.get("staffId") || "any";
    const isGetAll = searchParams.get("all") === "true";

    // 1. 管理者向け：全予約データ取得
    if (isGetAll) {
      return NextResponse.json({
        success: true,
        reservations: reservationsStore
      });
    }

    // 2. 会員向け：自分の予約一覧取得
    if (userId) {
      const userReservations = reservationsStore.filter((r) => r.userId === userId);
      return NextResponse.json({
        success: true,
        reservations: userReservations
      });
    }

    // 3. 空き枠判定（特定日と所要時間に基づくリアルタイム計算・二重予約防止）
    if (date) {
      const duration = Number(durationParam) || 90;
      const salonCapacity = 2; // ハンド2席

      // その日の確定予約（Confirmed）のみを抽出
      const activeReservationsOnDate = reservationsStore.filter(
        (r) => r.date === date && r.status === "confirmed"
      );

      const availability: TimeSlotAvailability[] = BUSINESS_HOURS_SLOTS.map((slotTime) => {
        const slotStartMin = timeToMinutes(slotTime);
        const slotEndMin = slotStartMin + duration;

        // 営業終了時間（20:00 = 1200分）を超える場合は受付不可
        if (slotEndMin > 1200) {
          return {
            time: slotTime,
            available: false,
            remainingSeats: 0,
            reason: "営業時間外（20:00閉店）"
          };
        }

        // 時間が重複する既存確定予約を検索
        const overlappingBookings = activeReservationsOnDate.filter((booking) => {
          const bookingStartMin = timeToMinutes(booking.timeSlot);
          return isTimeOverlapping(
            slotStartMin,
            duration,
            bookingStartMin,
            booking.durationMinutes
          );
        });

        // スタッフ指名がある場合：そのスタッフが既に他の予約に入っていればNG
        if (staffId !== "any") {
          const staffBusy = overlappingBookings.some((b) => b.staffId === staffId);
          if (staffBusy) {
            return {
              time: slotTime,
              available: false,
              remainingSeats: 0,
              reason: "指名スタッフ予約済み"
            };
          }
        }

        // サロン席数キャパシティチェック
        const remainingSeats = Math.max(0, salonCapacity - overlappingBookings.length);
        const available = remainingSeats > 0;

        return {
          time: slotTime,
          available,
          remainingSeats,
          reason: available ? undefined : "満席"
        };
      });

      return NextResponse.json({
        success: true,
        date,
        durationMinutes: duration,
        availability
      });
    }

    return NextResponse.json({
      success: true,
      reservations: reservationsStore
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "予約データの取得中にエラーが発生しました" },
      { status: 500 }
    );
  }
}

// ========================================================
// POST: 新規予約登録（二重予約排他制御 ＆ クーポン/ポイント適用）
// ========================================================
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      userId,
      userName,
      userKana,
      userEmail,
      userPhone,
      salonType = "ladies",
      date,
      timeSlot,
      menuId,
      staffId = "any",
      staffName = "指名なし（おまかせ）",
      designId,
      designTitle,
      designImage,
      couponId,
      couponTitle,
      couponDiscount = 0,
      usedPoints = 0,
      note
    } = body;

    // 必須入力バリデーション
    if (!userName || !userEmail || !userPhone || !date || !timeSlot || !menuId) {
      return NextResponse.json(
        { success: false, message: "必須項目（お名前・メール・電話番号・日時・メニュー）が不足しています" },
        { status: 400 }
      );
    }

    const menu = getMenuById(menuId);
    if (!menu) {
      return NextResponse.json(
        { success: false, message: "指定されたメニューが見つかりません" },
        { status: 404 }
      );
    }

    const duration = menu.durationMinutes;
    const slotStartMin = timeToMinutes(timeSlot);

    // 1. 二重予約の厳格なサーバー側排他チェック（Race Condition防止）
    const conflicting = reservationsStore.filter((r) => {
      if (r.date !== date || r.status !== "confirmed") return false;
      const existingStart = timeToMinutes(r.timeSlot);
      const isOverlap = isTimeOverlapping(slotStartMin, duration, existingStart, r.durationMinutes);
      if (!isOverlap) return false;

      // スタッフ指名競合チェック
      if (staffId !== "any" && r.staffId === staffId) return true;

      return true; // 席数判定用
    });

    const salonCapacity = 2;
    if (conflicting.length >= salonCapacity) {
      return NextResponse.json(
        {
          success: false,
          message: `申し訳ありません。ご指定の日時（${date} ${timeSlot}）はタッチの差で満席となりました。別の空き時間枠をお選びください。`
        },
        { status: 409 }
      );
    }

    // 2. 最終料金計算（クーポン割引 ＆ ポイント割引）
    const basePrice = menu.price;
    const finalPrice = Math.max(0, basePrice - Number(couponDiscount) - Number(usedPoints));

    // 3. 新規予約エンティティ生成
    const newReservation: SalonReservation = {
      id: `res-${Date.now()}`,
      userId: userId || `guest-${Date.now()}`,
      userName,
      userKana,
      userEmail,
      userPhone,
      salonType,
      date,
      timeSlot,
      menuId,
      menuName: menu.name,
      price: basePrice,
      durationMinutes: duration,
      staffId,
      staffName,
      designId,
      designTitle,
      designImage,
      couponId,
      couponTitle,
      couponDiscount: Number(couponDiscount) || 0,
      usedPoints: Number(usedPoints) || 0,
      finalPrice,
      status: "confirmed",
      note,
      createdAt: new Date().toLocaleString("ja-JP")
    };

    reservationsStore = [newReservation, ...reservationsStore];

    return NextResponse.json({
      success: true,
      reservation: newReservation,
      message: `【WEB即時予約完了】${date} ${timeSlot}〜「${menu.name}」のご予約を受け付けました！（予約番号: ${newReservation.id}）`
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "予約処理中にエラーが発生しました" },
      { status: 500 }
    );
  }
}

// ========================================================
// PATCH: 予約ステータス変更（キャンセル、来店完了、日時変更）
// ========================================================
export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, action, newStatus, newDate, newTimeSlot } = body;

    if (!id) {
      return NextResponse.json({ success: false, message: "予約IDが必要です" }, { status: 400 });
    }

    const index = reservationsStore.findIndex((r) => r.id === id);
    if (index === -1) {
      return NextResponse.json({ success: false, message: "該当の予約が見つかりません" }, { status: 404 });
    }

    const target = reservationsStore[index];

    // キャンセル処理
    if (action === "cancel") {
      reservationsStore[index] = {
        ...target,
        status: "cancelled",
        updatedAt: new Date().toLocaleString("ja-JP")
      };
      return NextResponse.json({
        success: true,
        reservation: reservationsStore[index],
        message: `ご予約（${target.date} ${target.timeSlot}）をキャンセルしました。空き枠を開放いたしました。`
      });
    }

    // ステータス更新（confirmed, completed, cancelled）
    if (newStatus) {
      reservationsStore[index] = {
        ...target,
        status: newStatus,
        updatedAt: new Date().toLocaleString("ja-JP")
      };
      return NextResponse.json({
        success: true,
        reservation: reservationsStore[index],
        message: `予約ステータスを「${newStatus}」に更新しました。`
      });
    }

    return NextResponse.json({ success: false, message: "無効な更新アクションです" }, { status: 400 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "ステータス更新中にエラーが発生しました" },
      { status: 500 }
    );
  }
}
