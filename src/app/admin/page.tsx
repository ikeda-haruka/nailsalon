"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShieldCheck,
  UserCheck,
  Award,
  Ticket,
  Clock,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  RefreshCw,
  PlusCircle,
  FileCheck,
  Users,
  ChevronRight,
  Lock
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { STAFF_ACCOUNTS } from "@/data/memberData";

export default function AdminPage() {
  const router = useRouter();
  const {
    user,
    isStaff,
    currentStaff,
    loginDemoStaff,
    grantPoints,
    useCoupon,
    isLoading
  } = useAuth();

  // ポイント付与フォームState
  const [grantAmount, setGrantAmount] = useState<number>(300);
  const [grantReason, setGrantReason] = useState<string>("施術ご来店ポイント（水光マグネットコース）");
  const [customReason, setCustomReason] = useState<string>("");
  const [selectedStaffIndex, setSelectedStaffIndex] = useState<number>(0);
  const [isGranting, setIsGranting] = useState<boolean>(false);

  // クーポン消込State
  const [processingCouponId, setProcessingCouponId] = useState<string | null>(null);

  // 通知
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const showFeedback = (type: "success" | "error", message: string) => {
    setFeedback({ type, message });
    setTimeout(() => {
      setFeedback(null);
    }, 4500);
  };

  // スタッフ切り替え
  const handleSwitchStaff = (index: number) => {
    setSelectedStaffIndex(index);
    loginDemoStaff(index);
    showFeedback("success", `担当スタッフを「${STAFF_ACCOUNTS[index].name}（${STAFF_ACCOUNTS[index].title}）」に切り替えました`);
  };

  // ポイント付与実行
  const handleGrant = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      showFeedback("error", "対象会員が選択されていません");
      return;
    }

    if (grantAmount <= 0) {
      showFeedback("error", "付与ポイントは1以上を入力してください");
      return;
    }

    const finalReason = grantReason === "その他" ? customReason : grantReason;
    if (!finalReason) {
      showFeedback("error", "付与理由を入力してください");
      return;
    }

    setIsGranting(true);
    const res = await grantPoints(grantAmount, finalReason);
    setIsGranting(false);

    if (res.success) {
      showFeedback("success", res.message);
    } else {
      showFeedback("error", res.message);
    }
  };

  // クーポン消込実行
  const handleRedeemCoupon = async (couponId: string, title: string) => {
    if (!confirm(`スタッフ権限でクーポン「${title}」の消込（利用済み）を実行しますか？`)) {
      return;
    }

    setProcessingCouponId(couponId);
    const res = await useCoupon(couponId);
    setProcessingCouponId(null);

    if (res.success) {
      showFeedback("success", res.message);
    } else {
      showFeedback("error", res.message);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen pt-36 pb-20 flex items-center justify-center aurora-bg">
        <div className="pearl-glass p-8 rounded-3xl flex items-center gap-3 text-sm text-plum-800">
          <RefreshCw className="w-5 h-5 animate-spin text-lavender-600" />
          <span>管理画面を読み込み中...</span>
        </div>
      </div>
    );
  }

  // スタッフとして未認証の場合のクイック認証バー
  const activeStaff = currentStaff || STAFF_ACCOUNTS[0];

  return (
    <div className="min-h-screen pt-36 sm:pt-40 lg:pt-44 pb-24 px-4 sm:px-6 lg:px-8 aurora-bg">
      <div className="max-w-4xl mx-auto space-y-8">

        {/* トースト通知 */}
        {feedback && (
          <div
            className={`fixed top-24 right-4 z-50 p-4 rounded-2xl shadow-xl border flex items-center gap-3 max-w-md animate-fade-in ${
              feedback.type === "success"
                ? "bg-white text-emerald-950 border-emerald-300 shadow-emerald-500/10"
                : "bg-white text-rose-950 border-rose-300 shadow-rose-500/10"
            }`}
          >
            {feedback.type === "success" ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
            )}
            <p className="text-xs font-medium leading-relaxed">{feedback.message}</p>
          </div>
        )}

        {/* ヘッダー */}
        <div className="pearl-glass p-6 rounded-[2rem] border border-lavender-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono tracking-widest uppercase px-2.5 py-0.5 rounded-full bg-plum-900 text-gold-300">
                Staff Admin Portal
              </span>
              <span className="text-xs text-plum-500">店舗専用バックオフィス</span>
            </div>
            <h1 className="text-2xl font-serif text-plum-950 mt-1">
              サロン店頭・スタッフ管理コンソール
            </h1>
            <p className="text-xs text-plum-600 font-light mt-0.5">
              お客様への施術ポイント付与・クーポン消込・会員ステータス確認を行えます。
            </p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <Link
              href="/mypage"
              className="flex-1 md:flex-none text-center py-2.5 px-4 rounded-xl luxe-button text-xs font-medium shadow-md flex items-center justify-center gap-1.5"
            >
              <span>顧客マイページを見る</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/"
              className="py-2.5 px-3.5 rounded-xl bg-white border border-lavender-300 hover:border-lavender-500 text-plum-800 text-xs font-light transition-all"
            >
              サロンTOP
            </Link>
          </div>
        </div>

        {/* スタッフ切り替えセレクター */}
        <div className="pearl-glass p-5 rounded-2xl border border-gold-300/80 bg-gradient-to-r from-gold-50/70 via-white to-lavender-50/70 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-gold-600" />
              <span className="text-xs font-serif font-semibold text-plum-950">
                操作中の担当スタッフ: {activeStaff.name} ({activeStaff.title})
              </span>
            </div>
            <span className="text-[10px] text-plum-500 font-light">スタッフ切り替え可能</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {STAFF_ACCOUNTS.map((staff, index) => (
              <button
                key={staff.id}
                onClick={() => handleSwitchStaff(index)}
                className={`py-2 px-3 rounded-xl text-xs text-left transition-all cursor-pointer flex items-center justify-between ${
                  activeStaff.id === staff.id
                    ? "bg-plum-900 text-white shadow-xs"
                    : "bg-white border border-lavender-200 text-plum-800 hover:border-lavender-400"
                }`}
              >
                <div>
                  <p className="font-medium">{staff.name}</p>
                  <p className={`text-[10px] ${activeStaff.id === staff.id ? "text-gold-300" : "text-plum-500"}`}>
                    {staff.title}
                  </p>
                </div>
                {activeStaff.id === staff.id && (
                  <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* 顧客情報サマリー（対象顧客カード） */}
        <div className="pearl-glass p-6 rounded-[2rem] border border-lavender-200 shadow-md space-y-4">
          <div className="flex items-center justify-between border-b border-lavender-100 pb-3">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-lavender-600" />
              <span className="text-xs font-serif font-medium text-plum-950">
                現在読み込み中のご来店顧客
              </span>
            </div>
            <span className="text-[11px] text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 font-mono">
              Status: Active In-Store
            </span>
          </div>

          {user ? (
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
              <div className="p-3 rounded-xl bg-white border border-lavender-100 space-y-1">
                <span className="text-[10px] text-plum-500 uppercase tracking-widest font-mono">お名前</span>
                <p className="font-serif font-medium text-sm text-plum-950">{user.name} 様</p>
                <p className="text-[10px] text-plum-500">{user.kana}</p>
              </div>

              <div className="p-3 rounded-xl bg-white border border-lavender-100 space-y-1">
                <span className="text-[10px] text-plum-500 uppercase tracking-widest font-mono">会員番号</span>
                <p className="font-mono font-medium text-plum-900">{user.memberNumber}</p>
                <p className="text-[10px] text-plum-500">ランク: {user.rank}</p>
              </div>

              <div className="p-3 rounded-xl bg-white border border-lavender-100 space-y-1">
                <span className="text-[10px] text-plum-500 uppercase tracking-widest font-mono">現在のポイント</span>
                <p className="text-base font-serif font-semibold text-gold-700">
                  {user.points.toLocaleString()} <span className="text-xs text-plum-600 font-normal">pt</span>
                </p>
                <p className="text-[10px] text-plum-500">1pt = ¥1</p>
              </div>

              <div className="p-3 rounded-xl bg-white border border-lavender-100 space-y-1">
                <span className="text-[10px] text-plum-500 uppercase tracking-widest font-mono">保有クーポン</span>
                <p className="text-sm font-medium text-lavender-700">
                  {user.coupons.filter(c => !c.isUsed).length} 枚 未利用
                </p>
                <p className="text-[10px] text-plum-500">（全{user.coupons.length}枚）</p>
              </div>
            </div>
          ) : (
            <div className="p-6 text-center text-xs text-plum-600">
              会員データが読み込まれていません。
            </div>
          )}
        </div>

        {/* 2大操作エリア：ポイント付与 ＆ クーポン消込 */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

          {/* 左側：ポイント付与フォーム（7カラム） */}
          <div className="md:col-span-7 pearl-glass p-6 rounded-[2rem] border border-lavender-200 shadow-md space-y-5 bg-white/95">
            <div className="border-b border-lavender-100 pb-3">
              <h2 className="text-base font-serif text-plum-950 flex items-center gap-2">
                <PlusCircle className="w-5 h-5 text-gold-600" />
                <span>来店施術ポイントの付与（サーバー側検証）</span>
              </h2>
              <p className="text-xs text-plum-600 font-light mt-0.5">
                お会計金額や施術メニューに応じてポイントを付与します。
              </p>
            </div>

            <form onSubmit={handleGrant} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="block text-plum-800 font-medium">
                  付与するポイント数 <span className="text-rose-500">*</span>
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    min="1"
                    max="10000"
                    required
                    value={grantAmount}
                    onChange={(e) => setGrantAmount(Number(e.target.value))}
                    className="flex-1 px-3.5 py-2.5 rounded-xl bg-white border border-lavender-300 text-plum-950 text-sm font-semibold focus:outline-hidden focus:ring-2 focus:ring-lavender-400"
                  />
                  <div className="flex gap-1.5">
                    {[100, 300, 500].map((pt) => (
                      <button
                        type="button"
                        key={pt}
                        onClick={() => setGrantAmount(pt)}
                        className="px-2.5 py-1 rounded-lg border border-lavender-200 hover:border-lavender-400 bg-lavender-50/70 text-plum-800 text-xs cursor-pointer"
                      >
                        +{pt}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-plum-800 font-medium">付与理由・施術内容</label>
                <select
                  value={grantReason}
                  onChange={(e) => setGrantReason(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-lavender-300 text-plum-900 focus:outline-hidden focus:ring-2 focus:ring-lavender-400"
                >
                  <option value="施術ご来店ポイント（水光マグネットコース）">施術ご来店ポイント（水光マグネットコース）</option>
                  <option value="施術ご来店ポイント（秋ニュアンスコース）">施術ご来店ポイント（秋ニュアンスコース）</option>
                  <option value="施術ご来店ポイント（ワンカラー・パラジェルフィルイン）">施術ご来店ポイント（ワンカラー・パラジェルフィルイン）</option>
                  <option value="お友達ご紹介特典ポイント">お友達ご紹介特典ポイント (+500pt)</option>
                  <option value="Googleマップ口コミ投稿御礼ポイント">Googleマップ口コミ投稿御礼ポイント (+200pt)</option>
                  <option value="その他">その他（自由入力）</option>
                </select>

                {grantReason === "その他" && (
                  <input
                    type="text"
                    required
                    placeholder="理由を入力してください"
                    value={customReason}
                    onChange={(e) => setCustomReason(e.target.value)}
                    className="w-full mt-2 px-3.5 py-2 rounded-xl bg-white border border-lavender-300 text-plum-900 focus:outline-hidden"
                  />
                )}
              </div>

              <div className="p-3 rounded-xl bg-lavender-50/80 border border-lavender-200 space-y-1 text-[11px] text-plum-700">
                <p className="font-medium text-lavender-800 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-lavender-600" />
                  サーバー側APIトランザクション保証:
                </p>
                <p>• 改ざん防止のため、ポイント増減はNext.jsサーバーAPIで検証</p>
                <p>• 付与後に累計ポイントに応じた会員ランク（Gold/Platinum）が自動昇格</p>
              </div>

              <button
                type="submit"
                disabled={isGranting || !user}
                className="w-full py-3 rounded-xl gold-button text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-50"
              >
                <span>{isGranting ? "付与処理中..." : `${grantAmount} ポイントを付与する`}</span>
                <CheckCircle2 className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* 右側：クーポン消込管理（5カラム） */}
          <div className="md:col-span-5 pearl-glass p-6 rounded-[2rem] border border-lavender-200 shadow-md space-y-5 bg-white/95 flex flex-col justify-between">
            <div>
              <div className="border-b border-lavender-100 pb-3">
                <h2 className="text-base font-serif text-plum-950 flex items-center gap-2">
                  <FileCheck className="w-5 h-5 text-lavender-600" />
                  <span>提示クーポンの消込</span>
                </h2>
                <p className="text-xs text-plum-600 font-light mt-0.5">
                  お客様が提示されたクーポンを店頭で消込処理します。
                </p>
              </div>

              <div className="mt-4 space-y-3">
                {user?.coupons.filter(c => !c.isUsed).length === 0 ? (
                  <div className="p-6 text-center text-xs text-plum-500 rounded-xl bg-stone-50 border border-stone-200">
                    現在、利用可能な未消化クーポンはありません。
                  </div>
                ) : (
                  user?.coupons
                    .filter(c => !c.isUsed)
                    .map((coupon) => (
                      <div
                        key={coupon.id}
                        className="p-3.5 rounded-xl border border-gold-300/80 bg-gold-50/30 flex flex-col justify-between space-y-2"
                      >
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-semibold text-gold-800 bg-gold-100 px-2 py-0.5 rounded-sm">
                              {coupon.discount}
                            </span>
                            <span className="text-[10px] text-plum-500 font-mono">
                              期限: {coupon.expiryDate}
                            </span>
                          </div>
                          <p className="text-xs font-medium text-plum-950 mt-1">{coupon.title}</p>
                        </div>

                        <button
                          onClick={() => handleRedeemCoupon(coupon.id, coupon.title)}
                          disabled={processingCouponId === coupon.id}
                          className="w-full py-1.5 px-3 rounded-lg luxe-button text-xs font-medium cursor-pointer shadow-2xs disabled:opacity-50 flex items-center justify-center gap-1"
                        >
                          {processingCouponId === coupon.id ? "消込中..." : "店頭で消し込む（利用済みにする）"}
                        </button>
                      </div>
                    ))
                )}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 text-[10px] text-plum-600 space-y-1">
              <p className="font-medium text-plum-800">※ 消込後の状態反映:</p>
              <p>消し込まれたクーポンは即時で利用済みステータスに更新され、二重利用が防止されます。</p>
            </div>
          </div>

        </div>

        {/* 最近のトランザクション履歴 */}
        {user && user.transactions.length > 0 && (
          <div className="pearl-glass p-6 rounded-[2rem] border border-lavender-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-lavender-100 pb-3">
              <h2 className="text-sm font-serif text-plum-950 flex items-center gap-2">
                <Clock className="w-4 h-4 text-plum-600" />
                <span>監査用：直近のポイント取引ログ</span>
              </h2>
              <span className="text-[10px] text-plum-500 font-mono">Total {user.transactions.length} records</span>
            </div>

            <div className="space-y-2">
              {user.transactions.slice(0, 5).map((tx) => (
                <div
                  key={tx.id}
                  className="p-3 rounded-xl bg-white border border-lavender-100 text-xs flex items-center justify-between"
                >
                  <div className="space-y-0.5">
                    <p className="font-medium text-plum-900">{tx.reason}</p>
                    <p className="text-[10px] text-plum-500">
                      {tx.createdAt} / 担当: {tx.staffName || "システム"}
                    </p>
                  </div>
                  <div className="text-right">
                    <span
                      className={`font-semibold font-mono ${
                        tx.amount > 0 ? "text-emerald-700" : "text-plum-800"
                      }`}
                    >
                      {tx.amount > 0 ? `+${tx.amount}` : tx.amount} pt
                    </span>
                    <p className="text-[10px] text-plum-500">残高: {tx.balanceAfter} pt</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
