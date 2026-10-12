"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Sparkles,
  Award,
  Gift,
  Ticket,
  Clock,
  ChevronRight,
  LogOut,
  UserCheck,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ShieldCheck,
  RefreshCw,
  QrCode,
  Calendar,
  Layers,
  ArrowRight,
  ShoppingBag
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { REWARD_ITEMS } from "@/data/memberData";

export default function MyPage() {
  const router = useRouter();
  const { user, isLoading, logout, redeemReward, useCoupon, loginDemoUser } = useAuth();

  const [activeTab, setActiveTab] = useState<"coupons" | "rewards" | "history">("coupons");
  const [redeemingId, setRedeemingId] = useState<string | null>(null);
  const [usingCouponId, setUsingCouponId] = useState<string | null>(null);
  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // 通知の自動消去
  const showNotification = (type: "success" | "error", message: string) => {
    setNotification({ type, message });
    setTimeout(() => {
      setNotification(null);
    }, 4500);
  };

  // 特典交換処理
  const handleRedeem = async (rewardId: string, title: string, cost: number) => {
    if (!user) return;
    if (user.points < cost) {
      showNotification("error", `ポイントが不足しています（必要: ${cost}pt / 現在: ${user.points}pt）`);
      return;
    }

    if (!confirm(`「${title}」を ${cost}pt で交換しますか？\n交換後、即座にマイページの保有クーポンに反映されます。`)) {
      return;
    }

    setRedeemingId(rewardId);
    const res = await redeemReward(rewardId);
    setRedeemingId(null);

    if (res.success) {
      showNotification("success", res.message);
      setActiveTab("coupons"); // 交換後はクーポンタブへ切り替え
    } else {
      showNotification("error", res.message);
    }
  };

  // クーポン店頭消込処理
  const handleUseCoupon = async (couponId: string, title: string) => {
    if (!confirm(`クーポン「${title}」を利用済みに更新しますか？\n（サロン店頭でのお会計時にスタッフへご提示ください）`)) {
      return;
    }

    setUsingCouponId(couponId);
    const res = await useCoupon(couponId);
    setUsingCouponId(null);

    if (res.success) {
      showNotification("success", res.message);
    } else {
      showNotification("error", res.message);
    }
  };

  // ローディング
  if (isLoading) {
    return (
      <div className="min-h-screen pt-36 pb-20 flex items-center justify-center aurora-bg">
        <div className="pearl-glass p-8 rounded-3xl flex items-center gap-3 text-sm text-plum-800">
          <RefreshCw className="w-5 h-5 animate-spin text-lavender-600" />
          <span>会員情報を読み込み中...</span>
        </div>
      </div>
    );
  }

  // 未ログイン時
  if (!user) {
    return (
      <div className="min-h-screen pt-36 pb-20 px-4 sm:px-6 lg:px-8 aurora-bg flex items-center justify-center">
        <div className="max-w-md w-full pearl-glass p-8 rounded-[2rem] border border-lavender-200 shadow-xl text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-lavender-100 mx-auto flex items-center justify-center border border-lavender-200">
            <Award className="w-8 h-8 text-lavender-700" />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-serif text-plum-950">会員ログインが必要です</h1>
            <p className="text-xs text-plum-700 leading-relaxed font-light">
              マイページでは、会員証の提示、保有ポイントの確認、限定クーポンのご利用や特典交換が可能です。
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <Link
              href="/login"
              className="luxe-button w-full py-3.5 rounded-full text-xs font-medium flex items-center justify-center gap-2 shadow-lg"
            >
              <span>ログイン・新規会員登録へ</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <button
              onClick={async () => {
                await loginDemoUser();
              }}
              className="w-full py-3 rounded-full text-xs font-medium text-plum-900 bg-white border border-gold-300 hover:border-gold-500 shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-gold-500" />
              <span>デモ会員（山田様）でログインして体験</span>
            </button>
          </div>

          <p className="text-[11px] text-plum-500">
            当サイトはポートフォリオ実績用デモサイトです。
          </p>
        </div>
      </div>
    );
  }

  const unUsedCoupons = user.coupons.filter((c) => !c.isUsed);
  const usedCoupons = user.coupons.filter((c) => c.isUsed);

  // ランク別情報
  const rankColors: Record<string, { badge: string; border: string; bg: string; perks: string }> = {
    Regular: {
      badge: "bg-stone-200 text-stone-800",
      border: "border-stone-300",
      bg: "from-stone-50 via-white to-stone-100",
      perks: "還元率1% / 次回予約特典"
    },
    Silver: {
      badge: "bg-slate-300 text-slate-800",
      border: "border-slate-400",
      bg: "from-slate-100 via-white to-purple-50",
      perks: "還元率1.5% / オフ代いつでも半額"
    },
    Gold: {
      badge: "bg-gold-500 text-plum-950 font-semibold shadow-xs",
      border: "border-gold-300",
      bg: "from-gold-100/60 via-white to-lavender-100/60",
      perks: "還元率2% / パラジェルフィルイン無料 / 誕生月特別チケット"
    },
    Platinum: {
      badge: "bg-gradient-to-r from-lavender-600 to-plum-900 text-white font-semibold shadow-xs",
      border: "border-lavender-400",
      bg: "from-purple-100 via-white to-gold-100/70",
      perks: "還元率3% / 水光アート常時1本無料 / 専任ネイリスト指名料無料"
    }
  };

  const currentRankInfo = rankColors[user.rank] || rankColors.Regular;

  return (
    <div className="min-h-screen pt-36 sm:pt-40 lg:pt-44 pb-24 px-4 sm:px-6 lg:px-8 aurora-bg">
      <div className="max-w-4xl mx-auto space-y-8">

        {/* トースト通知 */}
        {notification && (
          <div
            className={`fixed top-24 right-4 z-50 p-4 rounded-2xl shadow-xl border flex items-center gap-3 max-w-md animate-fade-in ${
              notification.type === "success"
                ? "bg-white text-emerald-950 border-emerald-300 shadow-emerald-500/10"
                : "bg-white text-rose-950 border-rose-300 shadow-rose-500/10"
            }`}
          >
            {notification.type === "success" ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
            )}
            <p className="text-xs font-medium leading-relaxed">{notification.message}</p>
          </div>
        )}

        {/* トップバー：ユーザー概要とログアウト */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pearl-glass p-5 rounded-2xl border border-lavender-200">
          <div>
            <div className="flex items-center gap-2">
              <span className={`text-[11px] px-2.5 py-0.5 rounded-full ${currentRankInfo.badge}`}>
                {user.rank} Member
              </span>
              <span className="text-[11px] text-plum-500 font-mono">No. {user.memberNumber}</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-serif text-plum-950 mt-1">
              {user.name} <span className="text-xs font-normal text-plum-600">様 のマイページ</span>
            </h1>
            <p className="text-[11px] text-plum-500 mt-0.5">
              最終ご来店日: {user.lastVisit || "初回ご利用前"} / 入会日: {user.joinedDate}
            </p>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <Link
              href="/admin"
              className="flex-1 sm:flex-none text-center py-2 px-3.5 rounded-xl bg-plum-900 hover:bg-plum-950 text-white text-xs font-medium transition-all shadow-2xs flex items-center justify-center gap-1.5"
              title="スタッフ専用画面でポイント付与などを試せます"
            >
              <UserCheck className="w-3.5 h-3.5 text-gold-400" />
              <span>スタッフ管理画面</span>
            </Link>
            <button
              onClick={() => {
                if (confirm("ログアウトしますか？")) {
                  logout();
                  router.push("/");
                }
              }}
              className="py-2 px-3 rounded-xl bg-white border border-lavender-200 hover:border-lavender-400 text-plum-700 hover:text-plum-900 text-xs font-light transition-all flex items-center justify-center gap-1 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>ログアウト</span>
            </button>
          </div>
        </div>

        {/* 2カラム構成：デジタル会員証カード ＆ ポイント残高カード */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* デジタル会員証（左側：7カラム） */}
          <div className="md:col-span-7 pearl-glass p-6 sm:p-7 rounded-[2rem] border-2 border-gold-300/80 shadow-lg relative overflow-hidden bg-gradient-to-br from-white via-lavender-50/50 to-gold-50/40">
            {/* 装飾ハイライト */}
            <div className="shimmer-sweep pointer-events-none opacity-40"></div>
            
            <div className="flex items-center justify-between border-b border-lavender-200/60 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-gold-600" />
                <span className="font-serif tracking-widest text-xs uppercase text-plum-900">Salon de Fraise</span>
              </div>
              <span className="text-[10px] tracking-wider uppercase px-2 py-0.5 rounded-full bg-white/80 border border-gold-300 text-gold-700 font-medium">
                Official Digital Pass
              </span>
            </div>

            <div className="my-6 space-y-4">
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-[10px] text-plum-500 uppercase tracking-widest font-mono">Member Name</p>
                  <p className="text-xl sm:text-2xl font-serif text-plum-950 font-normal mt-0.5">
                    {user.name}
                  </p>
                  <p className="text-[11px] text-plum-600 font-light">{user.kana}</p>
                </div>
                <div className="text-right">
                  <span className={`inline-block text-xs px-3 py-1 rounded-full ${currentRankInfo.badge}`}>
                    ★ {user.rank} 会員
                  </span>
                </div>
              </div>

              {/* 会員証バーコード風グラフィック */}
              <div className="bg-white/90 p-3 rounded-xl border border-lavender-200/80 space-y-1.5 shadow-2xs">
                <div className="flex items-center justify-between text-[10px] font-mono text-plum-500">
                  <span>MEMBERSHIP BARCODE</span>
                  <span>{user.memberNumber}</span>
                </div>
                {/* 擬似バーコード */}
                <div className="h-10 flex items-stretch gap-[2px] justify-center px-2 py-1 bg-white rounded border border-stone-200 overflow-hidden">
                  {[3, 1, 4, 2, 1, 5, 2, 1, 3, 2, 4, 1, 2, 3, 1, 4, 2, 5, 1, 3, 2, 1, 4, 2, 3, 1, 2, 4, 3, 1, 2, 5, 2, 1, 3].map((w, i) => (
                    <div
                      key={i}
                      className="bg-plum-950 h-full"
                      style={{ width: `${w * 2}px` }}
                    />
                  ))}
                </div>
                <p className="text-[9px] text-center text-plum-500 font-light">
                  ※ ご来店時にスタッフへご提示ください。即時ポイント付与・クーポン消込が行われます。
                </p>
              </div>
            </div>

            <div className="text-[11px] text-plum-700 pt-2 border-t border-lavender-200/60 flex items-center justify-between">
              <span className="font-light">会員ランク特典: {currentRankInfo.perks}</span>
              <span className="text-gold-700 font-medium font-serif">Salon de Fraise Omotesando</span>
            </div>
          </div>

          {/* ポイント残高＆ランクアップ（右側：5カラム） */}
          <div className="md:col-span-5 pearl-glass p-6 rounded-[2rem] border border-lavender-200 shadow-lg flex flex-col justify-between space-y-5 bg-white/95">
            <div>
              <div className="flex items-center justify-between text-xs text-plum-600 font-serif">
                <span className="flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-gold-500" />
                  <span>保有ポイント残高</span>
                </span>
                <span className="text-[10px] text-lavender-700 font-sans">1pt = ¥1相当</span>
              </div>

              <div className="mt-3 flex items-baseline gap-1.5">
                <span className="text-4xl sm:text-5xl font-serif font-light text-plum-950 tracking-tight">
                  {user.points.toLocaleString()}
                </span>
                <span className="text-sm font-serif text-plum-700 font-medium">pt</span>
              </div>

              {/* サロン施術＆公式オンラインショップ共通ポイントの案内バッジ */}
              <div className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-50/90 border border-gold-300 text-[10px] text-gold-950 font-medium shadow-2xs">
                <Sparkles className="w-3 h-3 text-gold-600 shrink-0" />
                <span>サロン施術 ＆ 公式EC共通ポイント（1pt=¥1）</span>
              </div>

              {/* ランクアップ案内 */}
              <div className="mt-4 p-3 rounded-xl bg-lavender-50/70 border border-lavender-100 space-y-1.5">
                <div className="flex justify-between text-[11px] text-plum-700">
                  <span>次ランク (Platinum: 2000pt)</span>
                  <span className="font-medium">あと {Math.max(0, 2000 - user.points)} pt</span>
                </div>
                <div className="w-full bg-lavender-200/60 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-lavender-500 to-gold-500 h-full transition-all duration-500"
                    style={{ width: `${Math.min(100, (user.points / 2000) * 100)}%` }}
                  />
                </div>
                <p className="text-[10px] text-plum-500 font-light">
                  Platinumになると水光アートが毎回来店時1本無料になります。
                </p>
              </div>
            </div>

            {/* クイックアクションボタン */}
            <div className="space-y-2 pt-2">
              <Link
                href="/shop"
                className="w-full py-2.5 px-4 rounded-xl gold-button text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer shadow-sm text-plum-950 hover:opacity-95 transition-opacity"
              >
                <ShoppingBag className="w-4 h-4 text-plum-950" />
                <span>公式オンラインショップでポイントを使う</span>
              </Link>
              <button
                onClick={() => setActiveTab("rewards")}
                className="w-full py-2.5 px-4 rounded-xl luxe-button text-xs font-medium flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <Gift className="w-4 h-4 text-gold-300" />
                <span>ポイントを特典と交換する</span>
              </button>
              <a
                href="#reservation"
                onClick={() => router.push("/#reservation")}
                className="w-full py-2 px-4 rounded-xl bg-white border border-lavender-300 hover:border-lavender-500 text-plum-900 text-xs font-medium flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5 text-lavender-600" />
                <span>次回のご来店を予約する</span>
              </a>
            </div>
          </div>

        </div>

        {/* タブナビゲーション */}
        <div className="pearl-glass p-1.5 rounded-2xl border border-lavender-200 flex gap-1">
          <button
            onClick={() => setActiveTab("coupons")}
            className={`flex-1 py-3 px-3 rounded-xl text-xs sm:text-sm font-medium transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === "coupons"
                ? "bg-white text-plum-950 shadow-sm border border-lavender-200"
                : "text-plum-600 hover:text-plum-900"
            }`}
          >
            <Ticket className="w-4 h-4 text-lavender-600" />
            <span>保有クーポン ({unUsedCoupons.length}枚)</span>
          </button>

          <button
            onClick={() => setActiveTab("rewards")}
            className={`flex-1 py-3 px-3 rounded-xl text-xs sm:text-sm font-medium transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === "rewards"
                ? "bg-white text-plum-950 shadow-sm border border-lavender-200"
                : "text-plum-600 hover:text-plum-900"
            }`}
          >
            <Gift className="w-4 h-4 text-gold-500" />
            <span>特典交換所 ({REWARD_ITEMS.length}種)</span>
          </button>

          <button
            onClick={() => setActiveTab("history")}
            className={`flex-1 py-3 px-3 rounded-xl text-xs sm:text-sm font-medium transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === "history"
                ? "bg-white text-plum-950 shadow-sm border border-lavender-200"
                : "text-plum-600 hover:text-plum-900"
            }`}
          >
            <Clock className="w-4 h-4 text-plum-500" />
            <span>ポイント履歴 ({user.transactions.length}件)</span>
          </button>
        </div>

        {/* タブ1: 保有クーポン一覧 */}
        {activeTab === "coupons" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-serif text-plum-950 flex items-center gap-2">
                <Ticket className="w-5 h-5 text-lavender-600" />
                <span>すぐにご利用いただけるクーポン</span>
              </h2>
              <p className="text-xs text-plum-600 font-light mt-0.5">
                お会計時または施術前に「店頭で利用する」を押してスタッフにご提示ください。
              </p>
            </div>

            {unUsedCoupons.length === 0 ? (
              <div className="pearl-glass p-8 rounded-2xl text-center space-y-3 border border-lavender-200">
                <Ticket className="w-8 h-8 text-lavender-400 mx-auto" />
                <p className="text-xs text-plum-700">現在利用可能なクーポンはありません。</p>
                <button
                  onClick={() => setActiveTab("rewards")}
                  className="text-xs text-lavender-700 font-medium hover:underline inline-flex items-center gap-1 cursor-pointer"
                >
                  <span>ポイントを特典クーポンに交換する</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {unUsedCoupons.map((coupon) => (
                  <div
                    key={coupon.id}
                    className="pearl-glass p-5 rounded-2xl border-2 border-gold-300/70 shadow-sm relative overflow-hidden flex flex-col justify-between bg-white/95 hover:border-gold-400 transition-all"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-gold-100 text-gold-900 border border-gold-300">
                          {coupon.discount}
                        </span>
                        <span className="text-[11px] text-plum-500 font-mono">
                          有効期限: {coupon.expiryDate}
                        </span>
                      </div>
                      <h3 className="text-sm font-serif font-medium text-plum-950 pt-1">
                        {coupon.title}
                      </h3>
                      <p className="text-xs text-plum-700 font-light leading-relaxed">
                        {coupon.description}
                      </p>
                    </div>

                    <div className="pt-4 mt-3 border-t border-lavender-100 flex items-center justify-between">
                      <span className="text-[10px] text-emerald-700 font-medium flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        利用可能
                      </span>
                      <button
                        onClick={() => handleUseCoupon(coupon.id, coupon.title)}
                        disabled={usingCouponId === coupon.id}
                        className="py-1.5 px-3.5 rounded-full luxe-button text-xs font-medium cursor-pointer shadow-xs disabled:opacity-50"
                      >
                        {usingCouponId === coupon.id ? "消込処理中..." : "店頭で利用する"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* 利用済みクーポン */}
            {usedCoupons.length > 0 && (
              <div className="pt-6 space-y-3">
                <h3 className="text-xs font-medium text-plum-600 uppercase tracking-wider">
                  利用済みクーポン（消込済み）
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 opacity-60">
                  {usedCoupons.map((coupon) => (
                    <div
                      key={coupon.id}
                      className="p-4 rounded-xl bg-stone-100/80 border border-stone-200 text-xs flex justify-between items-center"
                    >
                      <div>
                        <p className="font-medium text-stone-800 line-through">{coupon.title}</p>
                        <p className="text-[10px] text-stone-500">消込日時: {coupon.usedAt || "利用完了"}</p>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[10px] bg-stone-200 text-stone-700">
                        利用済み
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* タブ2: 特典交換所 */}
        {activeTab === "rewards" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <div>
                <h2 className="text-lg font-serif text-plum-950 flex items-center gap-2">
                  <Gift className="w-5 h-5 text-gold-500" />
                  <span>ポイント特典交換所</span>
                </h2>
                <p className="text-xs text-plum-600 font-light mt-0.5">
                  貯まったポイントを施術割引クーポンやオリジナルギフトに交換できます。
                </p>
              </div>
              <div className="px-3.5 py-1.5 rounded-full bg-gold-50 border border-gold-300 text-xs font-serif text-plum-950">
                現在の所持: <span className="font-semibold text-gold-700">{user.points} pt</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {REWARD_ITEMS.map((reward) => {
                const canRedeem = user.points >= reward.pointsRequired;
                const isProcessing = redeemingId === reward.id;

                return (
                  <div
                    key={reward.id}
                    className={`pearl-glass p-5 rounded-2xl border shadow-sm flex flex-col justify-between transition-all ${
                      canRedeem
                        ? "border-lavender-300 hover:border-gold-400 bg-white"
                        : "border-stone-200 bg-white/70 opacity-90"
                    }`}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-serif font-bold text-gold-700 px-2.5 py-0.5 rounded-full bg-gold-50 border border-gold-200">
                          {reward.pointsRequired} pt
                        </span>
                        <span className="text-[10px] text-plum-500">
                          有効期間: {reward.expiryDays}日間
                        </span>
                      </div>
                      <h3 className="text-sm font-serif font-medium text-plum-950 pt-1">
                        {reward.title}
                      </h3>
                      <p className="text-xs text-plum-700 font-light leading-relaxed">
                        {reward.description}
                      </p>
                    </div>

                    <div className="pt-4 mt-3 border-t border-lavender-100 flex items-center justify-between">
                      {canRedeem ? (
                        <span className="text-[10px] text-gold-700 font-medium">交換可能</span>
                      ) : (
                        <span className="text-[10px] text-rose-500 font-light">
                          あと {reward.pointsRequired - user.points} pt 必要
                        </span>
                      )}

                      <button
                        onClick={() => handleRedeem(reward.id, reward.title, reward.pointsRequired)}
                        disabled={!canRedeem || isProcessing}
                        className={`py-2 px-4 rounded-full text-xs font-medium cursor-pointer transition-all ${
                          canRedeem
                            ? "gold-button shadow-sm"
                            : "bg-stone-200 text-stone-500 cursor-not-allowed"
                        }`}
                      >
                        {isProcessing ? "交換処理中..." : "ポイントで交換する"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* タブ3: ポイント履歴 */}
        {activeTab === "history" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-serif text-plum-950 flex items-center gap-2">
                <Clock className="w-5 h-5 text-plum-600" />
                <span>ポイント獲得・ご利用履歴</span>
              </h2>
              <p className="text-xs text-plum-600 font-light mt-0.5">
                来店施術時の付与や特典交換のすべてのトランザクション履歴です。
              </p>
            </div>

            <div className="pearl-glass rounded-2xl border border-lavender-200 overflow-hidden shadow-sm">
              <div className="divide-y divide-lavender-100">
                {user.transactions.length === 0 ? (
                  <div className="p-6 text-center text-xs text-plum-600">履歴はありません</div>
                ) : (
                  user.transactions.map((tx) => (
                    <div key={tx.id} className="p-4 sm:p-5 flex items-center justify-between hover:bg-lavender-50/40 transition-colors">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                              tx.type === "grant"
                                ? "bg-emerald-100 text-emerald-800"
                                : "bg-plum-100 text-plum-800"
                            }`}
                          >
                            {tx.type === "grant" ? "獲得" : "交換"}
                          </span>
                          <span className="text-xs font-serif font-medium text-plum-950">
                            {tx.reason}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-[11px] text-plum-500 font-light">
                          <span>{tx.createdAt}</span>
                          {tx.staffName && <span>担当: {tx.staffName}</span>}
                          <span>取引後残高: {tx.balanceAfter} pt</span>
                        </div>
                      </div>

                      <div className="text-right">
                        <span
                          className={`text-base font-serif font-medium ${
                            tx.type === "grant" ? "text-emerald-700" : "text-plum-800"
                          }`}
                        >
                          {tx.amount > 0 ? `+${tx.amount}` : tx.amount} pt
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* 審査・デモ体験用フッターバナー */}
        <div className="pearl-glass p-5 rounded-2xl border border-gold-300/80 bg-gradient-to-r from-gold-50/70 via-white to-lavender-50/70 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-gold-400 text-plum-950 font-serif font-semibold">
              Demo Feature
            </span>
            <p className="text-xs text-plum-900 font-medium">
              ネイリスト・店長側の「ポイント付与」「クーポン消込」操作を体験できます
            </p>
            <p className="text-[11px] text-plum-600 font-light">
              スタッフ管理画面から施術金額を入力してポイント付与を行うと、サーバー側で検証・ランク更新が行われます。
            </p>
          </div>

          <Link
            href="/admin"
            className="py-2.5 px-4 rounded-xl bg-plum-900 hover:bg-plum-950 text-white text-xs font-medium shrink-0 flex items-center gap-1.5 shadow-sm transition-all"
          >
            <UserCheck className="w-4 h-4 text-gold-400" />
            <span>スタッフ管理画面を試す</span>
          </Link>
        </div>

      </div>
    </div>
  );
}
