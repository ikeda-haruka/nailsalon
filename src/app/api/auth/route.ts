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
        points: 100, // 新規登録特典 100ptプレゼント
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
            amount: 100,
            balanceAfter: 100,
            reason: "新規WEB会員登録プレゼントポイント",
            createdAt: new Date().toLocaleString("ja-JP")
          }
        ]
      };

      return NextResponse.json({
        success: true,
        user: newUser,
        message: "会員登録が完了しました！初回¥1,000OFFクーポンと100ptをプレゼントしました。"
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

    return NextResponse.json({ success: false, message: "無効なリクエストです" }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ success: false, message: "サーバーエラーが発生しました" }, { status: 500 });
  }
}
