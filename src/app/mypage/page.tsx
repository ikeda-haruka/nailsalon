"use client";

import React, { useState, useEffect } from "react";
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
  ShoppingBag,
  Cake,
  Edit3,
  Percent,
  BadgePercent,
  Crown,
  MapPin,
  XCircle,
  HelpCircle
} from "lucide-react";

import { useAuth } from "@/context/AuthContext";
import { REWARD_ITEMS, MEMBER_RANKS_CONFIG, getRankPointRate } from "@/data/memberData";
import { SalonReservation, calculateEndTime } from "@/types/reservation";
import BookingModal from "@/components/BookingModal";

export default function MyPage() {
  const router = useRouter();
  const { user, isLoading, logout, redeemReward, useCoupon, loginDemoUser, updateBirthday } = useAuth();

  const [activeTab, setActiveTab] = useState<"reservations" | "coupons" | "rewards" | "history">("reservations");
  const [redeemingId, setRedeemingId] = useState<string | null>(null);
  const [usingCouponId, setUsingCouponId] = useState<string | null>(null);
  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // 予約管理State
  const [reservations, setReservations] = useState<SalonReservation[]>([]);
  const [isLoadingReservations, setIsLoadingReservations] = useState<boolean>(false);
  const [cancellingId, setCancellingId] = useState<string | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState<boolean>(false);

  // 誕生日設定・変更State
  const [isEditingBirthday, setIsEditingBirthday] = useState<boolean>(false);
  const [birthdayInput, setBirthdayInput] = useState<string>("");
  const [isSavingBirthday, setIsSavingBirthday] = useState<boolean>(false);

  // ユーザーの誕生月判定（現在月と同じか）
  const currentMonth = new Date().getMonth() + 1; // 1-12
  const userBirthdayMonth = user?.birthday ? parseInt(user.birthday.split("-")[1], 10) : null;
  const isBirthdayMonth = userBirthdayMonth === currentMonth;

  // 通知の自動消去
  const showNotification = (type: "success" | "error", message: string) => {
    setNotification({ type, message });
    setTimeout(() => {
      setNotification(null);
    }, 4500);
  };

  // 予約データの取得
  const fetchReservations = async () => {
    if (!user) return;
    setIsLoadingReservations(true);
    try {
      const res = await fetch(`/api/reservations?memberId=${user.id}`);
      const data = await res.json();
      if (data.success && Array.isArray(data.reservations)) {
        setReservations(data.reservations);
      }
    } catch (err) {
      console.error("予約取得エラー", err);
    } finally {
      setIsLoadingReservations(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchReservations();
    }
  }, [user]);

  // 予約キャンセル処理
  const handleCancelReservation = async (reservation: SalonReservation) => {
    if (
      !confirm(
        `【予約キャンセル確認】\n「${reservation.menuName}」(${reservation.date} ${reservation.timeSlot}〜)\nのご予約を取り消しますか？\n\n※ キャンセルすると予約枠が自動的に即時開放され、他の会員様が予約可能になります。`
      )
    ) {
      return;
    }

    setCancellingId(reservation.id);
    try {
      const res = await fetch("/api/reservations", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reservationId: reservation.id, action: "cancel" })
      });
      const data = await res.json();
      if (data.success) {
        showNotification("success", data.message || "ご予約をキャンセルしました（空き枠が開放されました）");
        fetchReservations();
      } else {
        showNotification("error", data.message || "キャンセル処理に失敗しました");
      }
    } catch (err) {
      showNotification("error", "通信エラーが発生しました");
    } finally {
      setCancellingId(null);
    }
  };

  // 誕生日保存処理
  const handleSaveBirthday = async () => {
    if (!birthdayInput) {
      showNotification("error", "お誕生日を入力してください");
      return;
    }
    setIsSavingBirthday(true);
    const res = await updateBirthday(birthdayInput);
    setIsSavingBirthday(false);

    if (res.success) {
      showNotification("success", res.message);
      setIsEditingBirthday(false);
    } else {
      showNotification("error", res.message);
    }
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
  const rankColors: Record<string, { badge: string; border: string; bg: string; perks: string; rate: string }> = {
    Regular: {
      badge: "bg-stone-200 text-stone-800 border-stone-300",
      border: "border-stone-300",
      bg: "from-stone-50 via-white to-stone-100",
      rate: "1.0%",
      perks: "還元率1.0% / 新規1,000pt / 誕生月50%OFF"
    },
    Silver: {
      badge: "bg-slate-200 text-slate-800 border-slate-300",
      border: "border-slate-400",
      bg: "from-slate-100 via-white to-purple-50",
      rate: "2.0%（2倍）",
      perks: "還元率2.0% / フィルイン毎回半額 / EC全品5%OFFクーポン"
    },
    Gold: {
      badge: "bg-amber-100 text-amber-900 border-amber-300 font-semibold shadow-xs",
      border: "border-amber-300",
      bg: "from-amber-50 via-white to-lavender-50",
      rate: "3.5%（3.5倍）",
      perks: "還元率3.5% / フィルイン永年無料 / 施術¥2,000OFF / EC全品10%OFF"
    },
    Platinum: {
      badge: "bg-gradient-to-r from-purple-900 to-plum-950 text-amber-200 border-amber-400/80 font-bold shadow-xs",
      border: "border-lavender-400",
      bg: "from-purple-100 via-white to-gold-100/70",
      rate: "5.0%（5倍）",
      perks: "還元率5.0% / 水光アート毎回1本無料 / 指名料永年無料 / 施術¥3,500OFF"
    }
  };

  const currentRankInfo = rankColors[user.rank] || rankColors.Regular;

  return (
    <div className="min-h-screen pt-48 sm:pt-44 lg:pt-48 pb-24 px-4 sm:px-6 lg:px-8 aurora-bg">
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

        {/* 誕生月お祝い特設バナー（誕生月会員のみ華やかに表示） */}
        {isBirthdayMonth && (
          <div className="pearl-glass p-6 sm:p-7 rounded-[2rem] border-2 border-rose-300 bg-gradient-to-r from-rose-50/90 via-white to-amber-50/90 shadow-xl space-y-3 relative overflow-hidden animate-fade-in">
            <div className="absolute top-0 right-0 -mr-10 -mt-10 w-44 h-44 bg-rose-300/20 rounded-full blur-2xl pointer-events-none" />
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
              <div className="flex items-start gap-3.5 min-w-0 flex-1">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-rose-500 to-amber-500 text-white flex items-center justify-center shadow-md shrink-0">
                  <Cake className="w-6 h-6" />
                </div>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800 border border-rose-300 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-rose-600" />
                      <span>HAPPY BIRTHDAY MONTH 🎉</span>
                    </span>
                    <span className="text-[11px] text-rose-700 font-medium">
                      {userBirthdayMonth}月のお誕生日特別ご優待
                    </span>
                  </div>
                  <h2 className="text-lg sm:text-xl font-serif text-plum-950 mt-1">
                    {user.name} 様、お誕生日おめでとうございます！
                  </h2>
                  <p className="text-xs text-plum-700 font-light mt-0.5 leading-relaxed">
                    サロン全施術メニュー ＆ 公式オンラインショップ全品が<strong>50% OFF</strong>になる特別バースデークーポンを進呈中！
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 w-full lg:w-auto shrink-0 justify-start lg:justify-end">
                <Link
                  href="/shop"
                  className="flex-1 sm:flex-none py-2.5 px-4 rounded-xl gold-button text-xs font-semibold flex items-center justify-center gap-1.5 shadow-md shrink-0 whitespace-nowrap"
                >
                  <ShoppingBag className="w-4 h-4 text-plum-950" />
                  <span>公式ECで50%OFFで買い物</span>
                </Link>
                <button
                  onClick={() => setActiveTab("coupons")}
                  className="flex-1 sm:flex-none py-2.5 px-3.5 rounded-xl bg-white border border-rose-200 hover:border-rose-400 text-rose-900 text-xs font-medium transition-all shadow-2xs text-center shrink-0 whitespace-nowrap cursor-pointer"
                >
                  クーポンを見る
                </button>
              </div>
            </div>
          </div>
        )}

        {/* トップバー：ユーザー概要とログアウト */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pearl-glass p-5 rounded-2xl border border-lavender-200">
          <div className="min-w-0 flex-1">
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

          <div className="flex items-center gap-2.5 w-full sm:w-auto shrink-0">
            <Link
              href="/admin"
              className="flex-1 sm:flex-none text-center py-2 px-3.5 rounded-xl bg-plum-900 hover:bg-plum-950 text-white text-xs font-medium transition-all shadow-2xs flex items-center justify-center gap-1.5 shrink-0 whitespace-nowrap"
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
              className="py-2 px-3 rounded-xl bg-white border border-lavender-200 hover:border-lavender-400 text-plum-700 hover:text-plum-900 text-xs font-light transition-all flex items-center justify-center gap-1 cursor-pointer shrink-0 whitespace-nowrap"
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
                    ★ {user.rank} 会員（{currentRankInfo.rate}還元）
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

              {/* お誕生日設定・変更エリア */}
              <div className="pt-1">
                {isEditingBirthday ? (
                  <div className="p-3.5 rounded-xl bg-rose-50/80 border border-rose-200 space-y-2 text-xs animate-in fade-in">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-rose-950 flex items-center gap-1.5">
                        <Cake className="w-4 h-4 text-rose-500" />
                        <span>お誕生日を設定・変更する</span>
                      </span>
                      <span className="text-[10px] text-rose-700 bg-rose-100 px-2 py-0.5 rounded-full font-medium">
                        誕生月50%OFF自動付与
                      </span>
                    </div>
                    <p className="text-[11px] text-rose-800 font-light">
                      お誕生日をご登録いただくと、誕生月限定のサロン施術＆公式EC全品50%OFFクーポンが即座に進呈されます。
                    </p>
                    <div className="flex items-center gap-2 pt-1">
                      <input
                        type="date"
                        value={birthdayInput}
                        onChange={(e) => setBirthdayInput(e.target.value)}
                        className="flex-1 p-2 rounded-lg border border-rose-300 bg-white text-plum-950 text-xs focus:ring-1 focus:ring-rose-400"
                      />
                      <button
                        onClick={handleSaveBirthday}
                        disabled={isSavingBirthday}
                        className="px-3.5 py-2 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-medium text-xs shadow-xs cursor-pointer disabled:opacity-50"
                      >
                        {isSavingBirthday ? "保存中..." : "保存"}
                      </button>
                      <button
                        onClick={() => setIsEditingBirthday(false)}
                        className="px-3 py-2 rounded-lg bg-white border border-stone-300 text-stone-700 text-xs cursor-pointer"
                      >
                        キャンセル
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/80 border border-lavender-200 text-xs">
                    <div className="flex items-center gap-2">
                      <Cake className="w-4 h-4 text-rose-500 shrink-0" />
                      <span className="text-plum-900 font-medium">
                        お誕生日:{" "}
                        {user.birthday ? (
                          <strong className="font-semibold text-plum-950">
                            {user.birthday}（{userBirthdayMonth}月生まれ）
                          </strong>
                        ) : (
                          <span className="text-rose-600 font-medium">未登録（設定で50%OFFクーポン進呈）</span>
                        )}
                      </span>
                      {isBirthdayMonth && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 border border-rose-300">
                          誕生月特典適用中 🎉
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => {
                        setBirthdayInput(user.birthday || "1996-10-24");
                        setIsEditingBirthday(true);
                      }}
                      className="text-[11px] text-plum-700 hover:text-plum-950 underline font-medium flex items-center gap-1 cursor-pointer ml-2 shrink-0"
                    >
                      <Edit3 className="w-3 h-3 text-lavender-600" />
                      <span>{user.birthday ? "変更" : "誕生日を登録"}</span>
                    </button>
                  </div>
                )}
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
                <span>サロン施術 ＆ 公式EC共通（還元率: {currentRankInfo.rate}）</span>
              </div>

              {/* ランクアップ案内 */}
              {(() => {
                const nextTier =
                  user.rank === "Regular"
                    ? { name: "Silver", target: 500, benefit: "還元率2.0% ＆ フィルイン半額" }
                    : user.rank === "Silver"
                    ? { name: "Gold", target: 1500, benefit: "還元率3.5% ＆ フィルイン永年無料" }
                    : user.rank === "Gold"
                    ? { name: "Platinum", target: 3000, benefit: "還元率5.0% ＆ 水光アート毎回1本無料" }
                    : null;

                if (!nextTier) {
                  return (
                    <div className="mt-4 p-3 rounded-xl bg-purple-50/80 border border-purple-200 space-y-1">
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-purple-950">
                        <Crown className="w-4 h-4 text-amber-500" />
                        <span>最高峰 Platinum 会員ステータス適用中</span>
                      </div>
                      <p className="text-[10px] text-purple-800 font-light">
                        全サロン施術・公式EC全品で最高還元率5.0% ＆ 水光アート常時無料特典をお楽しみいただけます。
                      </p>
                    </div>
                  );
                }

                const needed = Math.max(0, nextTier.target - user.points);
                const progressPct = Math.min(100, (user.points / nextTier.target) * 100);

                return (
                  <div className="mt-4 p-3 rounded-xl bg-lavender-50/70 border border-lavender-100 space-y-1.5">
                    <div className="flex justify-between text-[11px] text-plum-700">
                      <span>次ランク ({nextTier.name}: {nextTier.target.toLocaleString()}pt)</span>
                      <span className="font-medium">あと {needed.toLocaleString()} pt</span>
                    </div>
                    <div className="w-full bg-lavender-200/60 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-lavender-500 to-gold-500 h-full transition-all duration-500"
                        style={{ width: `${progressPct}%` }}
                      />
                    </div>
                    <p className="text-[10px] text-plum-500 font-light">
                      {nextTier.name}になると{nextTier.benefit}になります。
                    </p>
                  </div>
                );
              })()}
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
              <button
                onClick={() => setIsBookingModalOpen(true)}
                className="w-full py-2 px-4 rounded-xl bg-white border border-lavender-300 hover:border-lavender-500 text-plum-900 text-xs font-medium flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5 text-lavender-600" />
                <span>次回のご来店を即時予約する</span>
              </button>
            </div>
          </div>

        </div>

        {/* 次回のご予約状況カード（直近確定予約） */}
        {(() => {
          const upcoming = reservations.find((r) => r.status === "confirmed");
          return (
            <div className="pearl-glass p-6 sm:p-7 rounded-[2rem] border-2 border-lavender-300/80 shadow-lg bg-gradient-to-br from-white via-lavender-50/40 to-gold-50/30 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-lavender-200/70 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-lavender-100 flex items-center justify-center text-lavender-700">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono tracking-wider uppercase px-2 py-0.5 rounded-full bg-lavender-100 text-lavender-800 border border-lavender-200">
                        Upcoming Appointment
                      </span>
                      {upcoming && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>予約確定（席確保済）</span>
                        </span>
                      )}
                    </div>
                    <h2 className="text-base sm:text-lg font-serif text-plum-950 font-normal mt-0.5">
                      次回のご予約状況
                    </h2>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => fetchReservations()}
                    disabled={isLoadingReservations}
                    className="p-2 rounded-xl bg-white border border-lavender-200 hover:border-lavender-400 text-plum-600 hover:text-plum-900 transition-all cursor-pointer text-xs flex items-center gap-1"
                    title="予約状況を最新に更新"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isLoadingReservations ? "animate-spin" : ""}`} />
                    <span className="hidden sm:inline">更新</span>
                  </button>
                  <button
                    onClick={() => setIsBookingModalOpen(true)}
                    className="py-2 px-3.5 rounded-xl luxe-button text-xs font-medium flex items-center gap-1.5 shadow-xs cursor-pointer"
                  >
                    <Calendar className="w-3.5 h-3.5 text-gold-300" />
                    <span>新規WEB予約を行う</span>
                  </button>
                </div>
              </div>

              {upcoming ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                    <div className="p-3.5 rounded-xl bg-white border border-lavender-200/80 space-y-1">
                      <span className="text-[10px] text-plum-500 uppercase tracking-widest font-mono">ご来店日時</span>
                      <p className="font-serif font-bold text-sm text-plum-950">
                        {upcoming.date}
                      </p>
                      <p className="text-xs text-lavender-700 font-medium">
                        {upcoming.timeSlot} 〜 {calculateEndTime(upcoming.timeSlot, upcoming.durationMinutes)} ({upcoming.durationMinutes}分)
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-white border border-lavender-200/80 space-y-1">
                      <span className="text-[10px] text-plum-500 uppercase tracking-widest font-mono">サロン店舗</span>
                      <p className="font-serif font-medium text-sm text-plum-950">
                        {upcoming.salonType === "mens" ? "Salon de Fraise HOMME" : "Salon de Fraise"}
                      </p>
                      <p className="text-[11px] text-plum-600">表参道店（個室・専任席）</p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-white border border-lavender-200/80 space-y-1">
                      <span className="text-[10px] text-plum-500 uppercase tracking-widest font-mono">施術メニュー</span>
                      <p className="font-medium text-xs text-plum-950 leading-snug">
                        {upcoming.menuName}
                      </p>
                      <p className="text-[10px] text-emerald-700 font-medium">
                        自爪育成パラジェルベース使用
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-white border border-lavender-200/80 space-y-1">
                      <span className="text-[10px] text-plum-500 uppercase tracking-widest font-mono">担当スタッフ</span>
                      <p className="font-serif font-medium text-sm text-plum-950">
                        {upcoming.staffName}
                      </p>
                      <p className="text-[10px] text-plum-500 font-mono">予約番号: {upcoming.id}</p>
                    </div>
                  </div>

                  {/* 料金明細＆割引 */}
                  <div className="p-3.5 rounded-xl bg-lavender-50/60 border border-lavender-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="text-plum-700 font-light">お会計予定額（税込）:</span>
                        <span className="text-base font-serif font-bold text-plum-950">
                          ¥{upcoming.finalPrice.toLocaleString()}
                        </span>
                        {(upcoming.couponDiscount || 0) > 0 && (
                          <span className="text-[11px] text-rose-700 font-medium bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200">
                            ¥{(upcoming.couponDiscount || 0).toLocaleString()} 割引適用済
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] text-plum-500">
                        {upcoming.couponTitle && `適用クーポン: ${upcoming.couponTitle} `}
                        {upcoming.usedPoints && upcoming.usedPoints > 0 ? `(利用ポイント: ${upcoming.usedPoints}pt)` : ""}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      <button
                        onClick={() => handleCancelReservation(upcoming)}
                        disabled={cancellingId === upcoming.id}
                        className="py-2 px-3 rounded-xl bg-white border border-rose-300 hover:border-rose-500 text-rose-700 hover:text-rose-900 text-xs font-medium transition-all flex items-center justify-center gap-1 cursor-pointer disabled:opacity-50"
                      >
                        <XCircle className="w-3.5 h-3.5 text-rose-600" />
                        <span>{cancellingId === upcoming.id ? "キャンセル中..." : "予約をキャンセルする"}</span>
                      </button>
                    </div>
                  </div>

                  <p className="text-[10px] text-plum-500 font-light flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>
                      キャンセル実行時はサーバー側で即座に予約枠が開放され、空き枠が他の会員様へリアルタイムに復元されます。
                    </span>
                  </p>
                </div>
              ) : (
                <div className="py-6 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-lavender-100 mx-auto flex items-center justify-center text-lavender-600">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-plum-950">現在、確定している次回のご予約はありません</p>
                    <p className="text-xs text-plum-600 font-light mt-0.5">
                      空き枠を自動計算し、その場で予約枠を確保できる公式WEB即時予約をご利用いただけます。
                    </p>
                  </div>
                  <button
                    onClick={() => setIsBookingModalOpen(true)}
                    className="py-2.5 px-5 rounded-full luxe-button text-xs font-medium inline-flex items-center gap-2 shadow-sm cursor-pointer"
                  >
                    <Calendar className="w-4 h-4 text-gold-300" />
                    <span>24時間即時WEB予約を申し込む</span>
                  </button>
                </div>
              )}
            </div>
          );
        })()}

        {/* タブナビゲーション */}
        <div className="pearl-glass p-1.5 rounded-2xl border border-lavender-200 flex gap-1">
          <button
            onClick={() => setActiveTab("reservations")}
            className={`flex-1 py-3 px-3 rounded-xl text-xs sm:text-sm font-medium transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === "reservations"
                ? "bg-white text-plum-950 shadow-sm border border-lavender-200"
                : "text-plum-600 hover:text-plum-900"
            }`}
          >
            <Calendar className="w-4 h-4 text-lavender-600" />
            <span>ご予約・来店履歴 ({reservations.length}件)</span>
          </button>

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

        {/* タブ0: ご予約・施術履歴一覧 */}
        {activeTab === "reservations" && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <div>
                <h2 className="text-lg font-serif text-plum-950 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-lavender-600" />
                  <span>ご予約およびご来店施術履歴</span>
                </h2>
                <p className="text-xs text-plum-600 font-light mt-0.5">
                  確定中のご予約の確認・キャンセル、過去の施術履歴（ポイント付与実績）をご覧いただけます。
                </p>
              </div>

              <button
                onClick={() => setIsBookingModalOpen(true)}
                className="py-2 px-3.5 rounded-xl luxe-button text-xs font-medium flex items-center gap-1.5 shadow-xs cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5 text-gold-300" />
                <span>新しいWEB予約を取る</span>
              </button>
            </div>

            {reservations.length === 0 ? (
              <div className="pearl-glass p-8 rounded-2xl text-center space-y-3 border border-lavender-200">
                <Calendar className="w-8 h-8 text-lavender-400 mx-auto" />
                <p className="text-xs text-plum-700">ご予約および施術履歴はまだありません。</p>
                <button
                  onClick={() => setIsBookingModalOpen(true)}
                  className="text-xs text-lavender-700 font-medium hover:underline inline-flex items-center gap-1 cursor-pointer"
                >
                  <span>WEB即時予約を申し込む</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {reservations.map((r) => {
                  const isConfirmed = r.status === "confirmed";
                  const isCompleted = r.status === "completed";
                  const isCancelled = r.status === "cancelled";

                  return (
                    <div
                      key={r.id}
                      className={`pearl-glass p-5 rounded-2xl border transition-all space-y-3 ${
                        isConfirmed
                          ? "border-2 border-lavender-300 bg-white/95 shadow-sm"
                          : isCompleted
                          ? "border-emerald-200 bg-white/80"
                          : "border-stone-200 bg-stone-50/70 opacity-75"
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-lavender-100 pb-2.5">
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                              isConfirmed
                                ? "bg-lavender-100 text-lavender-800 border-lavender-300"
                                : isCompleted
                                ? "bg-emerald-100 text-emerald-800 border-emerald-300"
                                : "bg-stone-200 text-stone-600 border-stone-300"
                            }`}
                          >
                            {isConfirmed ? "予約確定（受付済）" : isCompleted ? "来店完了・施術済" : "キャンセル済"}
                          </span>
                          <span className="text-[11px] font-mono text-plum-500">ID: {r.id}</span>
                          <span className="text-[11px] text-plum-600 font-serif">
                            {r.salonType === "mens" ? "Salon de Fraise HOMME" : "Salon de Fraise"}
                          </span>
                        </div>

                        <div className="text-[11px] text-plum-500 font-mono">
                          予約日: {r.createdAt}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                        <div className="sm:col-span-8 space-y-1">
                          <div className="flex items-baseline gap-2">
                            <span className="font-serif text-sm sm:text-base font-bold text-plum-950">
                              {r.date} {r.timeSlot} 〜 {calculateEndTime(r.timeSlot, r.durationMinutes)}
                            </span>
                            <span className="text-xs text-lavender-700 font-medium font-mono">
                              ({r.durationMinutes}分)
                            </span>
                          </div>
                          <p className="text-xs font-medium text-plum-900 leading-snug">
                            {r.menuName}
                          </p>
                          <div className="flex items-center gap-3 text-[11px] text-plum-600 font-light">
                            <span>担当スタッフ: {r.staffName}</span>
                            <span>お会計: ¥{r.finalPrice.toLocaleString()} (税込)</span>
                            {(r.couponDiscount || 0) > 0 && (
                              <span className="text-rose-600">割引: -¥{(r.couponDiscount || 0).toLocaleString()}</span>
                            )}
                          </div>
                          {r.note && (
                            <p className="text-[11px] text-plum-500 italic">要望・備考: {r.note}</p>
                          )}
                        </div>

                        <div className="sm:col-span-4 flex sm:justify-end items-center gap-2">
                          {isConfirmed ? (
                            <button
                              onClick={() => handleCancelReservation(r)}
                              disabled={cancellingId === r.id}
                              className="py-1.5 px-3 rounded-xl bg-white border border-rose-300 hover:border-rose-500 text-rose-700 hover:text-rose-900 text-xs font-medium transition-all flex items-center gap-1 cursor-pointer disabled:opacity-50"
                            >
                              <XCircle className="w-3.5 h-3.5 text-rose-600" />
                              <span>{cancellingId === r.id ? "処理中..." : "キャンセルする"}</span>
                            </button>
                          ) : isCompleted ? (
                            <span className="text-xs text-emerald-700 font-medium flex items-center gap-1 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>施術完了（ポイント還元済）</span>
                            </span>
                          ) : (
                            <span className="text-xs text-stone-500 font-light">
                              空き枠開放済み
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

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
                {unUsedCoupons.map((coupon) => {
                  const isBirthday = coupon.isBirthdayCoupon;
                  const isRankExclusive = !!coupon.rankRequired;

                  return (
                    <div
                      key={coupon.id}
                      className={`pearl-glass p-5 rounded-2xl border-2 shadow-sm relative overflow-hidden flex flex-col justify-between transition-all ${
                        isBirthday
                          ? "border-rose-400 bg-gradient-to-br from-rose-50/90 via-white to-amber-50/70 shadow-rose-500/10"
                          : isRankExclusive
                          ? "border-amber-300 bg-gradient-to-br from-amber-50/80 via-white to-lavender-50/70 shadow-amber-500/10"
                          : "border-gold-300/70 bg-white/95 hover:border-gold-400"
                      }`}
                    >
                      {/* 背景装飾 */}
                      {isBirthday && (
                        <div className="absolute top-0 right-0 -mr-6 -mt-6 w-20 h-20 bg-rose-400/15 rounded-full blur-xl pointer-events-none" />
                      )}

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span
                              className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                                isBirthday
                                  ? "bg-rose-500 text-white border-rose-600 shadow-2xs"
                                  : "bg-gold-100 text-gold-900 border-gold-300"
                              }`}
                            >
                              {coupon.discount}
                            </span>
                            {isBirthday && (
                              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 border border-rose-300 flex items-center gap-1">
                                <Cake className="w-3 h-3 text-rose-500" />
                                <span>誕生月限定</span>
                              </span>
                            )}
                            {coupon.rankRequired && (
                              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 flex items-center gap-1">
                                <Crown className="w-3 h-3 text-amber-600" />
                                <span>★ {coupon.rankRequired}限定</span>
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] text-plum-500 font-mono">
                            有効期限: {coupon.expiryDate}
                          </span>
                        </div>

                        <h3 className="text-sm font-serif font-medium text-plum-950 pt-1 leading-snug">
                          {coupon.title}
                        </h3>
                        <p className="text-xs text-plum-700 font-light leading-relaxed">
                          {coupon.description}
                        </p>
                      </div>

                      <div className="pt-4 mt-3 border-t border-lavender-100 flex flex-wrap items-center justify-between gap-2">
                        <span className="text-[10px] text-emerald-700 font-medium flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          利用可能（{coupon.usableAt === "both" ? "サロン＆EC" : coupon.usableAt === "shop" ? "公式EC限定" : "サロン限定"}）
                        </span>

                        <div className="flex items-center gap-1.5">
                          {coupon.usableAt !== "salon" && (
                            <Link
                              href="/shop"
                              className="py-1.5 px-3 rounded-full gold-button text-[11px] font-semibold cursor-pointer shadow-2xs flex items-center gap-1"
                            >
                              <ShoppingBag className="w-3 h-3 text-plum-950" />
                              <span>ECで使う</span>
                            </Link>
                          )}
                          <button
                            onClick={() => handleUseCoupon(coupon.id, coupon.title)}
                            disabled={usingCouponId === coupon.id}
                            className="py-1.5 px-3 rounded-full luxe-button text-[11px] font-medium cursor-pointer shadow-xs disabled:opacity-50"
                          >
                            {usingCouponId === coupon.id ? "消込中..." : "店頭で利用する"}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
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

        {/* 会員ランクプログラム＆特別優待早見表 */}
        <div className="pearl-glass p-6 sm:p-7 rounded-[2rem] border border-lavender-200/90 shadow-md space-y-5 bg-white/95">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-lavender-200/70 pb-3">
            <div>
              <div className="flex items-center gap-2">
                <Crown className="w-4 h-4 text-gold-600" />
                <h3 className="text-base sm:text-lg font-serif font-medium text-plum-950">
                  会員ランク制度 ＆ 特典早見表
                </h3>
              </div>
              <p className="text-xs text-plum-600 font-light mt-0.5">
                サロン施術・公式EC共通でポイントが貯まり、ランクに応じて還元率（1.0%〜5.0%）と限定特典がアップします。
              </p>
            </div>
            <span className="text-xs font-serif font-semibold text-plum-900 bg-lavender-50 px-3 py-1 rounded-full border border-lavender-200 shrink-0">
              現在のランク: ★ {user.rank}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-1">
            {MEMBER_RANKS_CONFIG.map((tier) => {
              const isCurrent = user.rank === tier.rank;
              return (
                <div
                  key={tier.rank}
                  className={`p-4 rounded-2xl border transition-all text-xs flex flex-col justify-between ${
                    isCurrent
                      ? "border-2 border-gold-400 bg-gradient-to-b from-gold-50/60 to-white shadow-md ring-1 ring-gold-400/40"
                      : "border-lavender-200/80 bg-lavender-50/30"
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${tier.badgeBg}`}>
                        ★ {tier.rank}
                      </span>
                      {isCurrent && (
                        <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-500 text-white font-medium">
                          現在
                        </span>
                      )}
                    </div>
                    <div>
                      <h4 className="font-serif font-semibold text-plum-950 text-sm">{tier.name}</h4>
                      <p className="text-[10px] text-plum-500 font-mono">
                        {tier.minPoints === 0 ? "無料会員登録" : `累計 ${tier.minPoints.toLocaleString()}pt 〜`}
                      </p>
                    </div>

                    <div className="p-2 rounded-xl bg-white border border-lavender-200 text-center">
                      <span className="text-[9px] text-plum-500 block font-mono">POINT RATE</span>
                      <span className="text-lg font-serif font-bold text-plum-950">{tier.rateLabel}</span>
                    </div>

                    <ul className="space-y-1.5 text-[11px] font-light text-plum-700 pt-1 leading-snug">
                      {tier.perks.slice(0, 3).map((p, idx) => (
                        <li key={idx} className="flex items-start gap-1">
                          <CheckCircle2 className="w-3 h-3 text-gold-600 mt-0.5 shrink-0" />
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-3 pt-2 border-t border-dashed border-lavender-200/80 text-[10px] text-rose-600 font-medium">
                    {tier.exclusiveCoupons[0]?.title}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

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

      {/* WEB即時予約モーダル */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        initialSalonType="ladies"
        onBookingSuccess={() => {
          fetchReservations();
          showNotification("success", "WEB即時予約が完了しました！ご予約状況を更新しました。");
          setActiveTab("reservations");
        }}
      />
    </div>
  );
}
