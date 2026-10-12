import { NextResponse } from "next/server";
import { MemberUser } from "@/types/member";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, currentUser, couponId } = body;

    if (!currentUser) {
      return NextResponse.json({ success: false, message: "認証情報が見つかりません" }, { status: 401 });
    }

    const user: MemberUser = { ...currentUser };

    // クーポン利用（スタッフ消込または店頭利用）
    if (action === "use") {
      const couponIndex = user.coupons.findIndex((c) => c.id === couponId);
      if (couponIndex === -1) {
        return NextResponse.json({ success: false, message: "該当するクーポンが見つかりません" }, { status: 404 });
      }

      const targetCoupon = user.coupons[couponIndex];
      if (targetCoupon.isUsed) {
        return NextResponse.json({ success: false, message: "このクーポンは既に使用済みです" }, { status: 400 });
      }

      // 有効期限チェック
      const today = new Date().toISOString().split("T")[0];
      if (targetCoupon.expiryDate < today) {
        return NextResponse.json({ success: false, message: "このクーポンは有効期限切れです" }, { status: 400 });
      }

      // クーポン利用済み更新
      user.coupons[couponIndex] = {
        ...targetCoupon,
        isUsed: true,
        usedAt: new Date().toLocaleString("ja-JP")
      };

      return NextResponse.json({
        success: true,
        user,
        message: `クーポン「${targetCoupon.title}」を適用（利用済みに更新）しました`
      });
    }

    return NextResponse.json({ success: false, message: "無効なリクエストです" }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ success: false, message: "クーポン処理中にエラーが発生しました" }, { status: 500 });
  }
}
