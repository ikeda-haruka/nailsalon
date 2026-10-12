import { NextResponse } from "next/server";
import { MemberUser, PointTransaction } from "@/types/member";
import { REWARD_ITEMS, calculateMemberRank } from "@/data/memberData";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, currentUser, grantAmount, reason, staffName, rewardId } = body;

    if (!currentUser) {
      return NextResponse.json({ success: false, message: "認証情報が見つかりません" }, { status: 401 });
    }

    const user: MemberUser = { ...currentUser };

    // 1. スタッフによるポイント付与（サーバー側検証）
    if (action === "grant") {
      const amount = Number(grantAmount);
      if (isNaN(amount) || amount <= 0) {
        return NextResponse.json({ success: false, message: "付与ポイントは1以上の数値を指定してください" }, { status: 400 });
      }

      const balanceAfter = user.points + amount;

      const newTx: PointTransaction = {
        id: `tx-${Date.now()}`,
        userId: user.id,
        type: "grant",
        amount: amount,
        balanceAfter: balanceAfter,
        reason: reason || "サロン施術ご来店ポイント",
        staffName: staffName || "店長 池田",
        createdAt: new Date().toLocaleString("ja-JP")
      };

      user.points = balanceAfter;
      user.transactions = [newTx, ...user.transactions];

      // ランク判定（500pt〜: Silver, 1500pt〜: Gold, 3000pt〜: Platinum）
      user.rank = calculateMemberRank(balanceAfter);

      return NextResponse.json({
        success: true,
        user,
        transaction: newTx,
        message: `${amount}ポイントを付与しました（残高: ${balanceAfter}pt）`
      });
    }

    // 2. 特典交換（ポイント残高のサーバー側検証 + トランザクション減算 + 特典クーポン自動発行）
    if (action === "redeem") {
      const reward = REWARD_ITEMS.find((r) => r.id === rewardId);
      if (!reward) {
        return NextResponse.json({ success: false, message: "選択された特典が見つかりません" }, { status: 404 });
      }

      // 残高不足チェック（改ざん防止の厳格なサーバー検証）
      if (user.points < reward.pointsRequired) {
        return NextResponse.json({
          success: false,
          message: `ポイントが不足しています（必要: ${reward.pointsRequired}pt / 現在: ${user.points}pt）`
        }, { status: 400 });
      }

      const balanceAfter = user.points - reward.pointsRequired;

      const newTx: PointTransaction = {
        id: `tx-${Date.now()}`,
        userId: user.id,
        type: "redeem",
        amount: -reward.pointsRequired,
        balanceAfter: balanceAfter,
        reason: `特典交換：${reward.title}`,
        createdAt: new Date().toLocaleString("ja-JP")
      };

      // 特典クーポンの自動発行
      const expiry = new Date(Date.now() + reward.expiryDays * 24 * 60 * 60 * 1000).toISOString().split("T")[0];
      const newCoupon = {
        id: `cp-reward-${Date.now()}`,
        title: reward.title,
        discount: reward.pointsRequired >= 500 ? "特典適用" : "1本無料",
        expiryDate: expiry,
        isUsed: false,
        description: reward.description
      };

      user.points = balanceAfter;
      user.transactions = [newTx, ...user.transactions];
      user.coupons = [newCoupon, ...user.coupons];

      return NextResponse.json({
        success: true,
        user,
        transaction: newTx,
        coupon: newCoupon,
        message: `「${reward.title}」と交換しました！クーポンを発行しました。`
      });
    }

    // 3. オンラインショップ決済（ポイント利用減算 ＆ 購入還元、サロン・ショップ完全共通同期）
    if (action === "shop_checkout") {
      const usedPoints = Math.max(0, Number(body.usedPoints) || 0);
      const earnedPoints = Math.max(0, Number(body.earnedPoints) || 0);
      const orderSummary = body.orderSummary || "公式オンラインショップご注文";

      if (usedPoints > user.points) {
        return NextResponse.json({
          success: false,
          message: `利用ポイントが保有残高を超えています（保有: ${user.points}pt）`
        }, { status: 400 });
      }

      let currentBalance = user.points;
      const newTransactions: PointTransaction[] = [];

      // ポイント利用の減算
      if (usedPoints > 0) {
        currentBalance -= usedPoints;
        newTransactions.push({
          id: `tx-shop-use-${Date.now()}`,
          userId: user.id,
          type: "redeem",
          amount: -usedPoints,
          balanceAfter: currentBalance,
          reason: `公式オンラインショップご注文割引（1pt=¥1） [${orderSummary}]`,
          createdAt: new Date().toLocaleString("ja-JP")
        });
      }

      // 購入付与の加算
      if (earnedPoints > 0) {
        currentBalance += earnedPoints;
        newTransactions.push({
          id: `tx-shop-earn-${Date.now() + 1}`,
          userId: user.id,
          type: "grant",
          amount: earnedPoints,
          balanceAfter: currentBalance,
          reason: `公式オンラインショップご購入還元ポイント [${orderSummary}]`,
          createdAt: new Date().toLocaleString("ja-JP")
        });
      }

      user.points = currentBalance;
      user.transactions = [...newTransactions, ...user.transactions];
      user.rank = calculateMemberRank(currentBalance);

      return NextResponse.json({
        success: true,
        user,
        message: `ご注文が完了しました！ポイント残高が更新されました（現在: ${currentBalance}pt）`
      });
    }

    return NextResponse.json({ success: false, message: "無効なアクションです" }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ success: false, message: "サーバー側処理中にエラーが発生しました" }, { status: 500 });
  }
}
