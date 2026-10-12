"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar as CalendarIcon,
  Clock,
  User,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  X,
  ChevronRight,
  ShieldCheck,
  Ticket,
  Award,
  Crown,
  Cake,
  ArrowRight,
  RotateCcw
} from "lucide-react";
import { UNIFIED_SALON_MENUS } from "@/data/salonMenuData";
import { STAFFS } from "@/data/salonData";
import { MENS_STAFFS } from "@/data/mensSalonData";
import { useAuth } from "@/context/AuthContext";
import { SalonMenuItem, SalonReservation, TimeSlotAvailability } from "@/types/reservation";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialSalonType?: "ladies" | "mens";
  initialMenuId?: string;
  initialDesign?: {
    id: string;
    title: string;
    image: string;
  } | null;
  onBookingSuccess?: (reservation: SalonReservation) => void;
}

export default function BookingModal({
  isOpen,
  onClose,
  initialSalonType = "ladies",
  initialMenuId,
  initialDesign = null,
  onBookingSuccess
}: BookingModalProps) {
  const { user } = useAuth();

  // ステップ管理 (1: メニュー・デザイン, 2: 日時・スタッフ, 3: お客様情報・確認, 4: 完了)
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // 予約入力State
  const [salonType, setSalonType] = useState<"ladies" | "mens">(initialSalonType);
  const [selectedMenuId, setSelectedMenuId] = useState<string>(
    initialMenuId || (initialSalonType === "mens" ? "menu-mens-grooming" : "menu-magnet-glow")
  );
  const [selectedDesign, setSelectedDesign] = useState<{ id: string; title: string; image: string } | null>(
    initialDesign
  );
  const [selectedStaffId, setSelectedStaffId] = useState<string>("any");

  // 日付（デフォルトは明日）
  const getTomorrowString = () => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split("T")[0];
  };
  const [selectedDate, setSelectedDate] = useState<string>(getTomorrowString());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("");

  // 空席スロット一覧
  const [slotsLoading, setSlotsLoading] = useState<boolean>(false);
  const [availableSlots, setAvailableSlots] = useState<TimeSlotAvailability[]>([]);

  // 顧客情報
  const [customerName, setCustomerName] = useState<string>("");
  const [customerKana, setCustomerKana] = useState<string>("");
  const [customerEmail, setCustomerEmail] = useState<string>("");
  const [customerPhone, setCustomerPhone] = useState<string>("090-1234-5678");
  const [customerNote, setCustomerNote] = useState<string>("");

  // クーポン・ポイント割引
  const [selectedCouponId, setSelectedCouponId] = useState<string>("");
  const [usePointsAmount, setUsePointsAmount] = useState<number>(0);

  // 処理中・完了
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [completedReservation, setCompletedReservation] = useState<SalonReservation | null>(null);

  // 初期値反映（ユーザー情報）
  useEffect(() => {
    if (user) {
      setCustomerName(user.name);
      setCustomerKana(user.kana || "");
      setCustomerEmail(user.email);
    }
  }, [user]);

  // props変更時
  useEffect(() => {
    if (initialSalonType) setSalonType(initialSalonType);
    if (initialMenuId) setSelectedMenuId(initialMenuId);
    if (initialDesign) setSelectedDesign(initialDesign);
  }, [initialSalonType, initialMenuId, initialDesign]);

  // 現在選択中のメニュー
  const currentMenu = useMemo(() => {
    return (
      UNIFIED_SALON_MENUS.find((m) => m.id === selectedMenuId) ||
      UNIFIED_SALON_MENUS.find((m) => m.salonType === salonType || m.salonType === "both") ||
      UNIFIED_SALON_MENUS[0]
    );
  }, [selectedMenuId, salonType]);

  // サロン種別ごとのメニュー候補
  const menuOptions = useMemo(() => {
    return UNIFIED_SALON_MENUS.filter((m) => m.salonType === salonType || m.salonType === "both");
  }, [salonType]);

  // スタッフ候補
  const staffOptions = useMemo(() => {
    if (salonType === "mens") {
      return [
        { id: "any", name: "指名なし（おまかせ）", fee: 0, title: "担当ネイリストにおまかせ" },
        ...MENS_STAFFS.map((s) => ({ id: s.id, name: s.name, fee: 550, title: s.role }))
      ];
    }
    return [
      { id: "any", name: "指名なし（おまかせ）", fee: 0, title: "担当ネイリストにおまかせ" },
      ...STAFFS.map((s) => ({ id: s.id, name: `${s.name}（${s.role}）`, fee: 550, title: s.experience }))
    ];
  }, [salonType]);

  const selectedStaffObj = useMemo(() => {
    return staffOptions.find((s) => s.id === selectedStaffId) || staffOptions[0];
  }, [selectedStaffId, staffOptions]);

  // 利用可能なサロン施術クーポン（ユーザー保有）
  const salonCoupons = useMemo(() => {
    if (!user) return [];
    return user.coupons.filter((c) => !c.isUsed && c.usableAt !== "shop");
  }, [user]);

  const selectedCoupon = useMemo(() => {
    if (!selectedCouponId) return null;
    return salonCoupons.find((c) => c.id === selectedCouponId) || null;
  }, [selectedCouponId, salonCoupons]);

  // クーポン割引額計算
  const couponDiscountAmount = useMemo(() => {
    if (!selectedCoupon) return 0;
    const base = currentMenu.price;
    if (selectedCoupon.discountPercent) {
      return Math.floor(base * (selectedCoupon.discountPercent / 100));
    }
    if (selectedCoupon.discountAmount) {
      return Math.min(base, selectedCoupon.discountAmount);
    }
    return 0;
  }, [selectedCoupon, currentMenu.price]);

  // 最終料金計算（メニュー料金 ＋ 指名料 − クーポン割引 − ポイント割引）
  const nominationFee = selectedStaffObj.fee;
  const discountedBeforePoints = Math.max(0, currentMenu.price + nominationFee - couponDiscountAmount);
  const finalPrice = Math.max(0, discountedBeforePoints - usePointsAmount);

  // 空き枠スロットのAPIフェッチ
  useEffect(() => {
    if (!selectedDate || !currentMenu) return;

    let isMounted = true;
    setSlotsLoading(true);
    setSelectedTimeSlot("");

    fetch(
      `/api/reservations?date=${selectedDate}&duration=${currentMenu.durationMinutes}&staffId=${selectedStaffId}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (!isMounted) return;
        if (data.success && data.availability) {
          setAvailableSlots(data.availability);
        } else {
          setAvailableSlots([]);
        }
      })
      .catch(() => {
        if (isMounted) setAvailableSlots([]);
      })
      .finally(() => {
        if (isMounted) setSlotsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [selectedDate, currentMenu.durationMinutes, selectedStaffId]);

  // 予約送信ハンドラー
  const handleSubmitBooking = async () => {
    if (!customerName || !customerEmail || !customerPhone || !selectedDate || !selectedTimeSlot) {
      setErrorMsg("お名前、連絡先、日時を正しくご入力ください");
      return;
    }

    setIsSubmitting(true);
    setErrorMsg(null);

    try {
      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user?.id,
          userName: customerName,
          userKana: customerKana,
          userEmail: customerEmail,
          userPhone: customerPhone,
          salonType,
          date: selectedDate,
          timeSlot: selectedTimeSlot,
          menuId: currentMenu.id,
          staffId: selectedStaffId,
          staffName: selectedStaffObj.name,
          designId: selectedDesign?.id,
          designTitle: selectedDesign?.title,
          designImage: selectedDesign?.image,
          couponId: selectedCoupon?.id,
          couponTitle: selectedCoupon?.title,
          couponDiscount: couponDiscountAmount,
          usedPoints: usePointsAmount,
          note: customerNote
        })
      });

      const data = await res.json();
      if (data.success && data.reservation) {
        setCompletedReservation(data.reservation);
        setStep(4);
        if (onBookingSuccess) {
          onBookingSuccess(data.reservation);
        }
      } else {
        setErrorMsg(data.message || "予約の確定に失敗しました");
      }
    } catch (e) {
      setErrorMsg("通信エラーが発生しました。時間をおいて再度お試しください。");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  const isMens = salonType === "mens";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-plum-950/70 backdrop-blur-sm animate-fade-in">
      <div
        className={`w-full max-w-2xl rounded-[2rem] border shadow-2xl overflow-hidden flex flex-col max-h-[92vh] ${
          isMens
            ? "bg-zinc-950 border-zinc-700 text-zinc-100"
            : "bg-white border-gold-300/80 text-plum-950"
        }`}
      >
        {/* モーダルヘッダー */}
        <div
          className={`px-6 py-4.5 border-b flex items-center justify-between shrink-0 ${
            isMens ? "bg-zinc-900 border-zinc-800" : "bg-lavender-50/70 border-lavender-200"
          }`}
        >
          <div className="flex items-center gap-2.5">
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center shadow-xs ${
                isMens ? "bg-zinc-800 text-white" : "bg-plum-900 text-gold-300"
              }`}
            >
              <CalendarIcon className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-serif uppercase tracking-widest px-2 py-0.2 rounded-full border bg-white/80 dark:bg-zinc-800">
                  {isMens ? "Salon de Fraise HOMME" : "Salon de Fraise 表参道"}
                </span>
                <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-medium">
                  ● サイト内即時予約
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-serif font-medium mt-0.5">
                WEB予約システム（リアルタイム空席連携）
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/80 dark:bg-zinc-800 border border-stone-200 dark:border-zinc-700 flex items-center justify-center text-stone-600 dark:text-zinc-300 hover:text-black dark:hover:text-white cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* ステップインジケーター */}
        {step < 4 && (
          <div
            className={`px-6 py-2.5 border-b text-xs flex items-center justify-between shrink-0 ${
              isMens ? "bg-zinc-900/50 border-zinc-800 text-zinc-400" : "bg-white/80 border-lavender-100 text-plum-600"
            }`}
          >
            <div className="flex items-center gap-3">
              <span className={`font-medium ${step === 1 ? (isMens ? "text-white font-bold" : "text-plum-950 font-bold") : ""}`}>
                ① メニュー選択
              </span>
              <ChevronRight className="w-3.5 h-3.5 opacity-50" />
              <span className={`font-medium ${step === 2 ? (isMens ? "text-white font-bold" : "text-plum-950 font-bold") : ""}`}>
                ② 日時・スタッフ
              </span>
              <ChevronRight className="w-3.5 h-3.5 opacity-50" />
              <span className={`font-medium ${step === 3 ? (isMens ? "text-white font-bold" : "text-plum-950 font-bold") : ""}`}>
                ③ 確認・予約確定
              </span>
            </div>

            <span className="text-[10px] text-stone-400 font-mono">Step {step}/3</span>
          </div>
        )}

        {/* モーダル本文（スクロールエリア） */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs">
          
          {/* エラー表示 */}
          {errorMsg && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2 animate-fade-in">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* ======================================================== */}
          {/* STEP 1: メニュー・デザイン選択 */}
          {/* ======================================================== */}
          {step === 1 && (
            <div className="space-y-5">
              
              {/* サロン種別切り替えタブ */}
              <div className="flex rounded-xl p-1 bg-stone-100 dark:bg-zinc-900 border border-stone-200 dark:border-zinc-800">
                <button
                  type="button"
                  onClick={() => {
                    setSalonType("ladies");
                    setSelectedMenuId("menu-magnet-glow");
                  }}
                  className={`flex-1 py-2 rounded-lg text-xs font-serif transition-all cursor-pointer ${
                    salonType === "ladies"
                      ? "bg-white text-plum-950 shadow-xs font-medium"
                      : "text-stone-600 dark:text-zinc-400"
                  }`}
                >
                  レディース店（Salon de Fraise）
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSalonType("mens");
                    setSelectedMenuId("menu-mens-grooming");
                  }}
                  className={`flex-1 py-2 rounded-lg text-xs font-serif transition-all cursor-pointer ${
                    salonType === "mens"
                      ? "bg-zinc-800 text-white shadow-xs font-medium"
                      : "text-stone-600 dark:text-zinc-400"
                  }`}
                >
                  メンズ提携店（Salon de Fraise HOMME）
                </button>
              </div>

              {/* カタログから選択されたデザインがあれば表示 */}
              {selectedDesign && (
                <div
                  className={`p-3.5 rounded-2xl border flex items-center justify-between gap-3 ${
                    isMens
                      ? "bg-zinc-900 border-zinc-700"
                      : "bg-lavender-50/70 border-lavender-200"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="relative w-14 h-14 rounded-xl overflow-hidden border border-stone-300 dark:border-zinc-700 shrink-0">
                      <Image
                        src={selectedDesign.image}
                        alt={selectedDesign.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] font-semibold text-gold-700 dark:text-gold-400 flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        カタログ指定デザイン
                      </span>
                      <h4 className="font-serif font-medium text-xs mt-0.5 line-clamp-1">
                        {selectedDesign.title}
                      </h4>
                      <p className="text-[10px] text-stone-500 dark:text-zinc-400 font-light">
                        ※ご来店時にこちらのデザインをネイリストへ自動伝達いたします
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedDesign(null)}
                    className="text-[10px] text-stone-500 hover:text-stone-800 underline shrink-0"
                  >
                    解除
                  </button>
                </div>
              )}

              {/* メニュー選択一覧 */}
              <div className="space-y-2.5">
                <label className="block text-xs font-serif font-medium">
                  施術メニューをお選びください（料金・所要時間一元管理）
                </label>
                <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                  {menuOptions.map((menu) => {
                    const isSelected = selectedMenuId === menu.id;
                    return (
                      <div
                        key={menu.id}
                        onClick={() => setSelectedMenuId(menu.id)}
                        className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between gap-1.5 ${
                          isSelected
                            ? isMens
                              ? "bg-zinc-900 border-white shadow-md ring-1 ring-white/50"
                              : "bg-gold-50/80 border-gold-400 shadow-md ring-1 ring-gold-400/40"
                            : isMens
                            ? "bg-zinc-950/80 border-zinc-800 hover:bg-zinc-900/60"
                            : "bg-white border-lavender-200/80 hover:bg-lavender-50/50"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="text-[9px] px-2 py-0.2 rounded-full bg-stone-200 dark:bg-zinc-800 font-mono">
                                {menu.categoryLabel}
                              </span>
                              {menu.popular && (
                                <span className="text-[9px] px-2 py-0.2 rounded-full bg-rose-500 text-white font-medium">
                                  人気
                                </span>
                              )}
                              {menu.paragelIncluded && (
                                <span className="text-[9px] px-2 py-0.2 rounded-full bg-gold-400 text-plum-950 font-bold">
                                  パラジェル込
                                </span>
                              )}
                            </div>
                            <h4 className="font-serif font-medium text-xs mt-1 text-plum-950 dark:text-zinc-100">
                              {menu.name}
                            </h4>
                          </div>

                          <div className="text-right shrink-0">
                            <span className="font-serif font-bold text-sm text-plum-950 dark:text-white">
                              {menu.priceFormatted}
                            </span>
                            <span className="text-[10px] text-stone-500 dark:text-zinc-400 block font-light">
                              {menu.timeFormatted}
                            </span>
                          </div>
                        </div>

                        <p className="text-[11px] text-stone-600 dark:text-zinc-400 font-light leading-relaxed">
                          {menu.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          )}

          {/* ======================================================== */}
          {/* STEP 2: 日時・担当スタッフ選択 */}
          {/* ======================================================== */}
          {step === 2 && (
            <div className="space-y-5">
              
              {/* スタッフ選択 */}
              <div className="space-y-2">
                <label className="block text-xs font-serif font-medium">
                  担当ネイリストをご指定ください
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {staffOptions.map((st) => {
                    const isSelected = selectedStaffId === st.id;
                    return (
                      <div
                        key={st.id}
                        onClick={() => setSelectedStaffId(st.id)}
                        className={`p-3 rounded-xl border transition-all cursor-pointer flex justify-between items-center ${
                          isSelected
                            ? isMens
                              ? "bg-zinc-900 border-white shadow-xs"
                              : "bg-gold-50/90 border-gold-400 shadow-xs"
                            : isMens
                            ? "bg-zinc-950 border-zinc-800 hover:bg-zinc-900/50"
                            : "bg-white border-lavender-200 hover:bg-lavender-50/40"
                        }`}
                      >
                        <div>
                          <p className="font-serif font-medium text-xs">{st.name}</p>
                          <p className="text-[10px] text-stone-500 dark:text-zinc-400 font-light">{st.title}</p>
                        </div>
                        <span className="text-[11px] font-mono text-stone-700 dark:text-zinc-300">
                          {st.fee > 0 ? `+¥${st.fee}` : "¥0"}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 日付選択 */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-serif font-medium">
                    ご希望日をお選びください
                  </label>
                  <span className="text-[10px] text-stone-500">
                    所要時間目安: <strong>{currentMenu.durationMinutes}分</strong>
                  </span>
                </div>
                <input
                  type="date"
                  value={selectedDate}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className={`w-full p-2.5 rounded-xl border text-xs focus:outline-hidden focus:ring-1 ${
                    isMens
                      ? "bg-zinc-900 border-zinc-700 text-white focus:ring-white"
                      : "bg-white border-lavender-200 text-plum-950 focus:ring-gold-400"
                  }`}
                />
              </div>

              {/* リアルタイム空き時間スロット */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-serif font-medium flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-gold-600" />
                    <span>リアルタイム空き時間枠（{selectedDate}）</span>
                  </span>
                  {slotsLoading && <span className="text-[10px] text-stone-400">空き枠照会中...</span>}
                </div>

                {slotsLoading ? (
                  <div className="py-8 text-center text-xs text-stone-400">
                    最新の予約データを照会して空席を計算しています...
                  </div>
                ) : availableSlots.length === 0 ? (
                  <div className="py-6 text-center text-xs text-stone-500">
                    該当日の空きスロットが見つかりませんでした。別の日付をお選びください。
                  </div>
                ) : (
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2 max-h-48 overflow-y-auto pr-1">
                    {availableSlots.map((slot) => {
                      const isSelected = selectedTimeSlot === slot.time;
                      return (
                        <button
                          key={slot.time}
                          type="button"
                          disabled={!slot.available}
                          onClick={() => setSelectedTimeSlot(slot.time)}
                          className={`p-2 rounded-xl text-center border transition-all text-xs font-mono flex flex-col justify-center items-center gap-0.5 cursor-pointer disabled:cursor-not-allowed ${
                            isSelected
                              ? isMens
                                ? "bg-white text-zinc-950 font-bold border-white shadow-sm"
                                : "gold-button font-bold text-plum-950 shadow-sm"
                              : slot.available
                              ? isMens
                                ? "bg-zinc-900 border-zinc-700 text-zinc-200 hover:border-zinc-500"
                                : "bg-white border-lavender-200 text-plum-900 hover:border-gold-300"
                              : "bg-stone-100 dark:bg-zinc-900/40 border-stone-200 dark:border-zinc-800 text-stone-400 dark:text-zinc-600 opacity-60 line-through"
                          }`}
                        >
                          <span className="text-xs">{slot.time}</span>
                          <span className="text-[9px] font-sans font-normal">
                            {slot.available ? (slot.remainingSeats === 1 ? "△ 残1" : "◎ 空き") : "× 満席"}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}
                <p className="text-[10px] text-stone-500 font-light">
                  ※同一時間帯への二重予約はシステムにより自動排他制御されています。
                </p>
              </div>

            </div>
          )}

          {/* ======================================================== */}
          {/* STEP 3: お客様情報・クーポン/ポイント・最終確認 */}
          {/* ======================================================== */}
          {step === 3 && (
            <div className="space-y-5">
              
              {/* ご予約内容サマリー */}
              <div
                className={`p-4 rounded-2xl border space-y-2 ${
                  isMens ? "bg-zinc-900 border-zinc-700" : "bg-lavender-50/70 border-lavender-200"
                }`}
              >
                <div className="flex justify-between items-start border-b border-stone-200 dark:border-zinc-800 pb-2">
                  <div>
                    <span className="text-[10px] uppercase font-mono text-gold-700 dark:text-gold-400">
                      Booking Summary
                    </span>
                    <h4 className="font-serif font-medium text-sm mt-0.5">
                      {currentMenu.name}
                    </h4>
                  </div>
                  <span className="font-serif font-bold text-sm">
                    {currentMenu.priceFormatted}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px] font-light text-stone-700 dark:text-zinc-300">
                  <div>日時: <strong className="font-medium text-plum-950 dark:text-white">{selectedDate} {selectedTimeSlot}〜</strong></div>
                  <div>所要時間: <strong>{currentMenu.durationMinutes}分</strong></div>
                  <div>担当: <strong>{selectedStaffObj.name}</strong></div>
                  <div>指名料: <strong>{nominationFee > 0 ? `+¥${nominationFee}` : "¥0"}</strong></div>
                </div>

                {selectedDesign && (
                  <div className="pt-1.5 border-t border-stone-200 dark:border-zinc-800 text-[11px] flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-gold-600" />
                    <span>指定デザイン: <strong>{selectedDesign.title}</strong></span>
                  </div>
                )}
              </div>

              {/* 保有クーポンの適用 */}
              {user && salonCoupons.length > 0 && (
                <div className="p-3.5 rounded-2xl border border-rose-300 dark:border-rose-900 bg-rose-50/50 dark:bg-zinc-900 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-serif font-medium text-xs flex items-center gap-1.5 text-rose-950 dark:text-rose-300">
                      <Ticket className="w-4 h-4 text-rose-500" />
                      <span>保有割引クーポンを適用する</span>
                    </span>
                    <span className="text-[10px] text-rose-700 dark:text-rose-400 bg-white dark:bg-zinc-800 px-2 py-0.5 rounded-full border border-rose-200">
                      {salonCoupons.length}枚利用可能
                    </span>
                  </div>
                  <select
                    value={selectedCouponId}
                    onChange={(e) => setSelectedCouponId(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-rose-200 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-xs text-plum-950 dark:text-white"
                  >
                    <option value="">クーポンを利用しない</option>
                    {salonCoupons.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.isBirthdayCoupon ? "🎂 " : c.rankRequired ? "★ " : ""}
                        {c.title} ({c.discount})
                      </option>
                    ))}
                  </select>
                  {selectedCoupon && (
                    <div className="flex justify-between items-center text-[11px] text-rose-900 dark:text-rose-300 pt-1 font-medium">
                      <span>{selectedCoupon.title}</span>
                      <span className="font-bold font-mono">-¥{couponDiscountAmount.toLocaleString()} OFF</span>
                    </div>
                  )}
                </div>
              )}

              {/* 保有ポイントの利用 */}
              {user && user.points > 0 && (
                <div className="p-3.5 rounded-2xl border border-gold-300 dark:border-zinc-700 bg-gold-50/40 dark:bg-zinc-900 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-serif font-medium text-xs flex items-center gap-1.5 text-gold-950 dark:text-zinc-200">
                      <Award className="w-4 h-4 text-gold-600" />
                      <span>サロン共通ポイントを利用する（1pt=¥1）</span>
                    </span>
                    <span className="text-[10px] text-gold-800 font-mono">
                      保有: {user.points.toLocaleString()} pt
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min={0}
                      max={Math.min(user.points, discountedBeforePoints)}
                      step={100}
                      value={usePointsAmount}
                      onChange={(e) => setUsePointsAmount(Math.min(user.points, Math.max(0, Number(e.target.value))))}
                      className="w-32 p-2 rounded-xl border border-gold-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-xs font-mono"
                    />
                    <span className="text-[11px] text-stone-600 dark:text-zinc-400">pt 利用</span>
                    <button
                      type="button"
                      onClick={() => setUsePointsAmount(Math.min(user.points, discountedBeforePoints))}
                      className="text-[10px] px-2 py-1 rounded bg-white dark:bg-zinc-800 border text-stone-700 dark:text-zinc-300 cursor-pointer"
                    >
                      全額利用
                    </button>
                  </div>
                </div>
              )}

              {/* お客様情報入力フォーム */}
              <div className="space-y-3 pt-1">
                <label className="block text-xs font-serif font-medium">
                  ご予約者様情報
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div>
                    <span className="text-[10px] text-stone-500 dark:text-zinc-400 block mb-1">お名前 (必須)</span>
                    <input
                      type="text"
                      placeholder="例: 山田 菜々美"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-stone-200 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-xs"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] text-stone-500 dark:text-zinc-400 block mb-1">フリガナ</span>
                    <input
                      type="text"
                      placeholder="例: ヤマダ ナナミ"
                      value={customerKana}
                      onChange={(e) => setCustomerKana(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-stone-200 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div>
                    <span className="text-[10px] text-stone-500 dark:text-zinc-400 block mb-1">メールアドレス (必須)</span>
                    <input
                      type="email"
                      placeholder="例: example@fraise.com"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-stone-200 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-xs"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] text-stone-500 dark:text-zinc-400 block mb-1">お電話番号 (必須)</span>
                    <input
                      type="tel"
                      placeholder="例: 090-1234-5678"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-stone-200 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-xs"
                    />
                  </div>
                </div>

                <div>
                  <span className="text-[10px] text-stone-500 dark:text-zinc-400 block mb-1">ご要望・気になる点 (任意)</span>
                  <input
                    type="text"
                    placeholder="例: 爪が薄いので優しくケアしてほしい、静かに過ごしたい等"
                    value={customerNote}
                    onChange={(e) => setCustomerNote(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-stone-200 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-xs"
                  />
                </div>
              </div>

              {/* お会計予定額明細 */}
              <div className="p-3.5 rounded-2xl bg-stone-100 dark:bg-zinc-900 border border-stone-200 dark:border-zinc-800 space-y-1.5 text-xs">
                <div className="flex justify-between text-stone-600 dark:text-zinc-400">
                  <span>メニュー基本料金:</span>
                  <span className="font-mono">{currentMenu.priceFormatted}</span>
                </div>
                {nominationFee > 0 && (
                  <div className="flex justify-between text-stone-600 dark:text-zinc-400">
                    <span>ネイリスト指名料:</span>
                    <span className="font-mono">+¥{nominationFee.toLocaleString()}</span>
                  </div>
                )}
                {couponDiscountAmount > 0 && (
                  <div className="flex justify-between text-rose-600 font-medium">
                    <span>クーポン割引:</span>
                    <span className="font-mono">-¥{couponDiscountAmount.toLocaleString()}</span>
                  </div>
                )}
                {usePointsAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-medium">
                    <span>ポイント利用割引:</span>
                    <span className="font-mono">-¥{usePointsAmount.toLocaleString()}</span>
                  </div>
                )}
                <div className="pt-2 border-t border-stone-300 dark:border-zinc-800 flex justify-between items-baseline font-serif">
                  <span className="font-medium text-sm">店頭お支払い予定額（税込）:</span>
                  <span className="text-xl font-bold font-mono text-plum-950 dark:text-white">
                    ¥{finalPrice.toLocaleString()}
                  </span>
                </div>
              </div>

            </div>
          )}

          {/* ======================================================== */}
          {/* STEP 4: 予約完了画面 */}
          {/* ======================================================== */}
          {step === 4 && completedReservation && (
            <div className="py-6 text-center space-y-4 animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center border border-emerald-300 shadow-sm">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-mono tracking-widest uppercase px-2.5 py-0.5 rounded-full bg-gold-100 text-gold-900 border border-gold-300">
                  Confirmed: {completedReservation.id}
                </span>
                <h3 className="text-xl sm:text-2xl font-serif font-medium text-plum-950 dark:text-white mt-2">
                  ご予約が確定いたしました
                </h3>
                <p className="text-xs text-stone-600 dark:text-zinc-400 max-w-md mx-auto leading-relaxed font-light">
                  ご予約内容をデータベースへ正常に登録いたしました。<br />
                  マイページにていつでも予約状況の確認・キャンセルが可能です。
                </p>
              </div>

              {/* 予約内容カード */}
              <div className="p-4 rounded-2xl bg-stone-50 dark:bg-zinc-900 border border-stone-200 dark:border-zinc-800 text-xs text-left space-y-2 max-w-md mx-auto">
                <div className="flex justify-between border-b border-stone-200 dark:border-zinc-800 pb-2">
                  <span className="text-stone-500">ご予約日時:</span>
                  <strong className="font-medium">{completedReservation.date} {completedReservation.timeSlot}〜</strong>
                </div>
                <div className="flex justify-between border-b border-stone-200 dark:border-zinc-800 pb-2">
                  <span className="text-stone-500">メニュー:</span>
                  <strong className="font-medium text-right line-clamp-1">{completedReservation.menuName}</strong>
                </div>
                <div className="flex justify-between border-b border-stone-200 dark:border-zinc-800 pb-2">
                  <span className="text-stone-500">担当スタッフ:</span>
                  <strong className="font-medium">{completedReservation.staffName}</strong>
                </div>
                <div className="flex justify-between items-baseline pt-1">
                  <span className="text-stone-500">お支払い予定額:</span>
                  <span className="text-base font-bold font-mono text-plum-950 dark:text-white">
                    ¥{completedReservation.finalPrice.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:flex-1 py-3 rounded-full bg-stone-200 dark:bg-zinc-800 text-stone-800 dark:text-zinc-200 text-xs font-medium cursor-pointer"
                >
                  閉じる
                </button>
                <Link
                  href="/mypage"
                  onClick={onClose}
                  className={`w-full sm:flex-1 py-3 rounded-full text-xs font-semibold flex items-center justify-center gap-1.5 shadow-md ${
                    isMens ? "mens-button-white" : "gold-button text-plum-950"
                  }`}
                >
                  <span>マイページで予約を確認</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          )}

        </div>

        {/* モーダルフッター（戻る / 次へ / 予約確定） */}
        {step < 4 && (
          <div
            className={`px-6 py-4 border-t flex items-center justify-between shrink-0 ${
              isMens ? "bg-zinc-900 border-zinc-800" : "bg-lavender-50/50 border-lavender-200"
            }`}
          >
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep((step - 1) as any)}
                className="py-2 px-4 rounded-xl border border-stone-300 dark:border-zinc-700 text-xs font-medium cursor-pointer"
              >
                ← 前へ戻る
              </button>
            ) : (
              <button
                type="button"
                onClick={onClose}
                className="py-2 px-4 rounded-xl border border-stone-300 dark:border-zinc-700 text-xs font-medium cursor-pointer"
              >
                キャンセル
              </button>
            )}

            {step === 1 && (
              <button
                type="button"
                onClick={() => setStep(2)}
                className={`py-2.5 px-6 rounded-full text-xs font-semibold flex items-center gap-1.5 shadow-md cursor-pointer ${
                  isMens ? "mens-button-white" : "gold-button text-plum-950"
                }`}
              >
                <span>日時・スタッフ選択へ</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}

            {step === 2 && (
              <button
                type="button"
                disabled={!selectedTimeSlot}
                onClick={() => setStep(3)}
                className={`py-2.5 px-6 rounded-full text-xs font-semibold flex items-center gap-1.5 shadow-md cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${
                  isMens ? "mens-button-white" : "gold-button text-plum-950"
                }`}
              >
                <span>予約者情報・確認へ</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}

            {step === 3 && (
              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleSubmitBooking}
                className={`py-3 px-8 rounded-full text-xs font-bold flex items-center gap-2 shadow-lg cursor-pointer disabled:opacity-50 ${
                  isMens ? "mens-button-white" : "gold-button text-plum-950"
                }`}
              >
                {isSubmitting ? (
                  <span>予約排他処理中...</span>
                ) : (
                  <>
                    <span>WEB予約を確定する（排他二重予約防止）</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
