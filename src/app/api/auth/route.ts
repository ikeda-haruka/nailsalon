import { NextResponse } from "next/server";
import { INITIAL_DEMO_USER, STAFF_ACCOUNTS } from "@/data/memberData";
import { MemberUser } from "@/types/member";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, email, password, name, kana, demoType } = body;

    // デモログイン（ワンクリック体験）
    if (action === "demo") {
      if (demoType === "staff") {
        return NextResponse.json({
          success: true,
          isStaff: true,
          staff: STAFF_ACCOUNTS[0],
          message: "スタッフ（店長 池田）としてログインしました"
        });
      }

      // デモ一般会員
      return NextResponse.json({
        success: true,
        isStaff: false,
        user: INITIAL_DEMO_USER,
        message: "デモ会員（山田 菜々美様）としてログインしました"
      });
    }

    // 新規登録
    if (action === "register") {
      if (!email || !name) {
        return NextResponse.json({ success: false, message: "お名前とメールアドレスは必須です" }, { status: 400 });
      }

      const newUser: MemberUser = {
        id: `user-${Date.now()}`,
        name: name,
        kana: kana || name,
        email: email,
        role: "member",
        memberNumber: `FR-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        rank: "Regular",
        points: 1000, // 新規会員登録特典：公式オンラインショップ＆サロン共通1,000pt進呈（1pt=1円換算）
        joinedDate: new Date().toISOString().split("T")[0],
        coupons: [
          {
            id: `cp-${Date.now()}`,
            title: "新規WEB会員登録限定 ¥1,000 OFFクーポン",
            discount: "¥1,000 OFF",
            expiryDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
            isUsed: false,
            description: "サロン施術¥6,000以上でご利用いただけます"
          }
        ],
        transactions: [
          {
            id: `tx-${Date.now()}`,
            userId: `user-${Date.now()}`,
            type: "grant",
            amount: 1000,
            balanceAfter: 1000,
            reason: "新規会員登録特典：公式オンラインショップ1,000ポイント進呈（1pt=1円換算・サロン共通）",
            createdAt: new Date().toLocaleString("ja-JP")
          }
        ]
      };

      return NextResponse.json({
        success: true,
        user: newUser,
        message: "会員登録が完了しました！公式オンラインショップで今すぐ使える1,000ポイント（1pt=1円換算）を進呈しました。"
      });
    }

    // 通常ログイン
    if (action === "login") {
      if (!email) {
        return NextResponse.json({ success: false, message: "メールアドレスを入力してください" }, { status: 400 });
      }

      // 既存デモユーザーまたは新規生成
      const user = {
        ...INITIAL_DEMO_USER,
        email: email,
        name: email.split("@")[0] + " 様"
      };

      return NextResponse.json({
        success: true,
        user,
        message: "ログインしました"
      });
    }

    // お誕生日設定・変更 ＆ 誕生月限定50%OFFクーポンの即時自動発行
    if (action === "update_birthday") {
      const { currentUser, birthday } = body;
      if (!currentUser) {
        return NextResponse.json({ success: false, message: "認証情報が見つかりません" }, { status: 401 });
      }
      if (!birthday) {
        return NextResponse.json({ success: false, message: "お誕生日を入力してください" }, { status: 400 });
      }

      const updatedUser: MemberUser = { ...currentUser, birthday };

      // 誕生月限定50%OFFクーポンをすでに持っているか確認
      const hasBirthdayCoupon = updatedUser.coupons.some((c) => c.isBirthdayCoupon);
      let couponAdded = false;

      if (!hasBirthdayCoupon) {
        const bdayCoupon = {
          id: `cp-birthday-50-${Date.now()}`,
          title: "【誕生月限定】サロン施術＆公式EC全品 50% OFFバースデークーポン",
          discount: "50% OFF",
          discountPercent: 50,
          expiryDate: "2026-11-30",
          isUsed: false,
          isBirthdayCoupon: true,
          usableAt: "both" as const,
          description: "【お誕生月特典】サロン施術全コース、または公式オンラインショップ全品が50%OFFとなります（1回限り有効）"
        };
        updatedUser.coupons = [bdayCoupon, ...updatedUser.coupons];
        couponAdded = true;
      }

      return NextResponse.json({
        success: true,
        user: updatedUser,
        couponAdded,
        message: couponAdded
          ? "お誕生日を登録しました！【誕生月限定 50% OFFクーポン】をプレゼントいたしました！"
          : "お誕生日を更新しました。"
      });
    }

    return NextResponse.json({ success: false, message: "無効なリクエストです" }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ success: false, message: "サーバーエラーが発生しました" }, { status: 500 });
  }
}

