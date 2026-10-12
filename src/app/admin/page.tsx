"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
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
  Lock,
  Calendar,
  Layers,
  Edit3,
  DollarSign,
  Palette,
  Eye,
  EyeOff,
  Filter,
  Check,
  X,
  XCircle,
  Scissors,
  Save,
  FileText,
  BadgeCheck,
  ShoppingBag
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { STAFF_ACCOUNTS } from "@/data/memberData";
import { UNIFIED_SALON_MENUS, SalonMenuItem } from "@/data/salonMenuData";
import { DESIGNS, NailDesign } from "@/data/salonData";
import { SalonReservation, calculateEndTime } from "@/types/reservation";

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

  // タブ管理 ("reservations" | "menus" | "designs" | "customers")
  const [activeTab, setActiveTab] = useState<"reservations" | "menus" | "designs" | "customers">("reservations");

  // 通知フィードバック
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const showFeedback = (type: "success" | "error", message: string) => {
    setFeedback({ type, message });
    setTimeout(() => {
      setFeedback(null);
    }, 4500);
  };

  // 担当スタッフ選択
  const [selectedStaffIndex, setSelectedStaffIndex] = useState<number>(0);
  const activeStaff = currentStaff || STAFF_ACCOUNTS[0];

  const handleSwitchStaff = (index: number) => {
    setSelectedStaffIndex(index);
    loginDemoStaff(index);
    showFeedback("success", `担当スタッフを「${STAFF_ACCOUNTS[index].name}（${STAFF_ACCOUNTS[index].title}）」に切り替えました`);
  };

  // ==========================================
  // ① 予約管理State & ロジック
  // ==========================================
  const [reservations, setReservations] = useState<SalonReservation[]>([]);
  const [reservationFilter, setReservationFilter] = useState<"all" | "confirmed" | "completed" | "cancelled">("all");
  const [isLoadingReservations, setIsLoadingReservations] = useState<boolean>(false);
  const [updatingResId, setUpdatingResId] = useState<string | null>(null);

  const fetchReservations = async () => {
    setIsLoadingReservations(true);
    try {
      const res = await fetch("/api/reservations?all=true");
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
    fetchReservations();
  }, []);

  // 予約ステータス変更処理 (completed / cancel)
  const handleUpdateReservationStatus = async (
    reservationId: string,
    action: "completed" | "cancel",
    menuName: string
  ) => {
    const isCancel = action === "cancel";
    const confirmMsg = isCancel
      ? `【予約キャンセル確認】\n「${menuName}」のご予約を取り消しますか？\nサーバー側で予約枠が即座に開放されます。`
      : `【来店・施術完了確認】\n「${menuName}」の施術を完了（来店済）にしますか？`;

    if (!confirm(confirmMsg)) return;

    setUpdatingResId(reservationId);
    try {
      const payload = isCancel
        ? { reservationId, action: "cancel" }
        : { reservationId, status: "completed" };

      const res = await fetch("/api/reservations", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.success) {
        showFeedback("success", data.message || "予約ステータスを更新しました");
        fetchReservations();
      } else {
        showFeedback("error", data.message || "更新に失敗しました");
      }
    } catch (err) {
      showFeedback("error", "通信エラーが発生しました");
    } finally {
      setUpdatingResId(null);
    }
  };

  const filteredReservations = reservations.filter((r) => {
    if (reservationFilter === "all") return true;
    return r.status === reservationFilter;
  });

  // ==========================================
  // ② メニュー・料金一元管理State & ロジック
  // ==========================================
  const [menuList, setMenuList] = useState<SalonMenuItem[]>(UNIFIED_SALON_MENUS);
  const [editingMenuId, setEditingMenuId] = useState<string | null>(null);
  const [editPrice, setEditPrice] = useState<number>(0);
  const [editDuration, setEditDuration] = useState<number>(0);
  const [menuFilter, setMenuFilter] = useState<"all" | "ladies" | "mens">("all");

  const handleStartEditMenu = (menu: SalonMenuItem) => {
    setEditingMenuId(menu.id);
    setEditPrice(menu.price);
    setEditDuration(menu.durationMinutes);
  };

  const handleSaveMenuEdit = (menuId: string) => {
    setMenuList((prev) =>
      prev.map((m) =>
        m.id === menuId
          ? {
              ...m,
              price: editPrice,
              durationMinutes: editDuration
            }
          : m
      )
    );
    setEditingMenuId(null);
    showFeedback("success", "メニュー料金・所要時間の変更を反映しました（料金一元管理デモ）");
  };

  const filteredMenus = menuList.filter((m) => {
    if (menuFilter === "all") return true;
    return m.salonType === menuFilter;
  });

  // ==========================================
  // ③ デザインカタログ管理State & ロジック
  // ==========================================
  const [designList, setDesignList] = useState<(NailDesign & { isPublished: boolean })[]>(
    DESIGNS.map((d) => ({ ...d, isPublished: true }))
  );
  const [isAddingDesign, setIsAddingDesign] = useState<boolean>(false);
  const [newDesignTitle, setNewDesignTitle] = useState<string>("");
  const [newDesignCategory, setNewDesignCategory] = useState<"magnet" | "office" | "simple" | "glam">("magnet");
  const [newDesignPrice, setNewDesignPrice] = useState<number>(8800);
  const [newDesignDuration, setNewDesignDuration] = useState<number>(75);
  const [newDesignTone, setNewDesignTone] = useState<"lavender" | "pink" | "beige" | "gold">("lavender");

  const handleToggleDesignPublish = (id: string) => {
    setDesignList((prev) =>
      prev.map((d) => {
        if (d.id === id) {
          const nextState = !d.isPublished;
          showFeedback("success", `「${d.title}」を${nextState ? "【公開】" : "【非公開】"}に変更しました`);
          return { ...d, isPublished: nextState };
        }
        return d;
      })
    );
  };

  const handleCreateDesign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDesignTitle) return;

    const newDesign: NailDesign & { isPublished: boolean } = {
      id: `custom-${Date.now()}`,
      title: newDesignTitle,
      category: newDesignCategory,
      categoryLabel: newDesignCategory === "magnet" ? "水光マグネット" : newDesignCategory === "office" ? "オフィス向け" : "華やかトレンド",
      image: "/images/magnet_nail.jpg",
      description: "管理画面から新規追加された最新サロンデザインです。",
      price: `¥${newDesignPrice.toLocaleString()}`,
      priceValue: newDesignPrice,
      duration: `${newDesignDuration}分`,
      durationMinutes: newDesignDuration,
      colorTone: newDesignTone,
      colorChangeable: true,
      paragelIncluded: true,
      tags: ["新規登録", "パラジェル", "限定デザイン"],
      features: ["自爪削りなし", "カラー変更可"],
      isPublished: true
    };

    setDesignList((prev) => [newDesign, ...prev]);
    setIsAddingDesign(false);
    setNewDesignTitle("");
    showFeedback("success", `新デザイン「${newDesign.title}」を登録・公開しました`);
  };

  // ==========================================
  // ④ 顧客台帳・ポイント付与State & ロジック
  // ==========================================
  const [grantAmount, setGrantAmount] = useState<number>(300);
  const [grantReason, setGrantReason] = useState<string>("施術ご来店ポイント（水光マグネットコース）");
  const [customReason, setCustomReason] = useState<string>("");
  const [isGranting, setIsGranting] = useState<boolean>(false);
  const [processingCouponId, setProcessingCouponId] = useState<string | null>(null);

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
          <span>管理システムを読み込み中...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-36 sm:pt-40 lg:pt-44 pb-24 px-4 sm:px-6 lg:px-8 aurora-bg">
      <div className="max-w-6xl mx-auto space-y-8">

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
        <div className="pearl-glass p-6 sm:p-7 rounded-[2rem] border border-lavender-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono tracking-widest uppercase px-2.5 py-0.5 rounded-full bg-plum-900 text-gold-300">
                Salon Back-Office ERP
              </span>
              <span className="text-xs text-plum-500 font-mono">Ver 2.5 / Java & Next.js Architecture</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif text-plum-950 mt-1">
              サロン運営者・店舗管理コンソール
            </h1>
            <p className="text-xs text-plum-600 font-light mt-0.5 leading-relaxed">
              予約台帳・メニュー料金一元管理・デザインカタログ公開設定・顧客ポイント管理を一元統括する業務基幹システムです。
            </p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <Link
              href="/mypage"
              className="flex-1 md:flex-none text-center py-2.5 px-4 rounded-xl luxe-button text-xs font-medium shadow-md flex items-center justify-center gap-1.5"
            >
              <span>お客様マイページ</span>
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
                操作中スタッフ: {activeStaff.name} ({activeStaff.title})
              </span>
            </div>
            <span className="text-[10px] text-plum-500 font-light">スタッフ権限切替可能</span>
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

        {/* 4大管理タブナビゲーション */}
        <div className="pearl-glass p-1.5 rounded-2xl border border-lavender-200 flex flex-wrap gap-1">
          <button
            onClick={() => setActiveTab("reservations")}
            className={`flex-1 min-w-[140px] py-3 px-3 rounded-xl text-xs sm:text-sm font-medium transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === "reservations"
                ? "bg-white text-plum-950 shadow-sm border border-lavender-200"
                : "text-plum-600 hover:text-plum-900"
            }`}
          >
            <Calendar className="w-4 h-4 text-lavender-600" />
            <span>予約台帳・枠管理 ({reservations.length}件)</span>
          </button>

          <button
            onClick={() => setActiveTab("menus")}
            className={`flex-1 min-w-[140px] py-3 px-3 rounded-xl text-xs sm:text-sm font-medium transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === "menus"
                ? "bg-white text-plum-950 shadow-sm border border-lavender-200"
                : "text-plum-600 hover:text-plum-900"
            }`}
          >
            <DollarSign className="w-4 h-4 text-gold-600" />
            <span>メニュー・料金一元管理 ({menuList.length}件)</span>
          </button>

          <button
            onClick={() => setActiveTab("designs")}
            className={`flex-1 min-w-[140px] py-3 px-3 rounded-xl text-xs sm:text-sm font-medium transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === "designs"
                ? "bg-white text-plum-950 shadow-sm border border-lavender-200"
                : "text-plum-600 hover:text-plum-900"
            }`}
          >
            <Palette className="w-4 h-4 text-rose-500" />
            <span>デザインカタログ公開設定 ({designList.length}件)</span>
          </button>

          <button
            onClick={() => setActiveTab("customers")}
            className={`flex-1 min-w-[140px] py-3 px-3 rounded-xl text-xs sm:text-sm font-medium transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === "customers"
                ? "bg-white text-plum-950 shadow-sm border border-lavender-200"
                : "text-plum-600 hover:text-plum-900"
            }`}
          >
            <Users className="w-4 h-4 text-plum-600" />
            <span>顧客台帳・ポイント付与</span>
          </button>
        </div>

        {/* ========================================================= */}
        {/* タブ①: 予約台帳・ステータス管理 */}
        {/* ========================================================= */}
        {activeTab === "reservations" && (
          <div className="space-y-6 animate-fade-in">
            {/* 説明バッジ・フィルター */}
            <div className="pearl-glass p-5 rounded-2xl border border-lavender-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-serif font-bold text-plum-950">
                    全予約台帳 ＆ リアルタイム排他制御ステータス
                  </span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-mono">
                    API Connected
                  </span>
                </div>
                <p className="text-xs text-plum-600 font-light mt-0.5">
                  二重予約防止ロジックが稼働中。予約ステータスを「キャンセル」に変更すると即座に空き枠が開放されます。
                </p>
              </div>

              <div className="flex items-center gap-2 w-full md:w-auto">
                <div className="flex bg-lavender-100/70 p-1 rounded-xl text-xs text-plum-700">
                  <button
                    onClick={() => setReservationFilter("all")}
                    className={`px-3 py-1.5 rounded-lg transition-all ${
                      reservationFilter === "all" ? "bg-white font-medium text-plum-950 shadow-2xs" : ""
                    }`}
                  >
                    全件 ({reservations.length})
                  </button>
                  <button
                    onClick={() => setReservationFilter("confirmed")}
                    className={`px-3 py-1.5 rounded-lg transition-all ${
                      reservationFilter === "confirmed" ? "bg-white font-medium text-plum-950 shadow-2xs" : ""
                    }`}
                  >
                    確定中 ({reservations.filter((r) => r.status === "confirmed").length})
                  </button>
                  <button
                    onClick={() => setReservationFilter("completed")}
                    className={`px-3 py-1.5 rounded-lg transition-all ${
                      reservationFilter === "completed" ? "bg-white font-medium text-plum-950 shadow-2xs" : ""
                    }`}
                  >
                    来店済 ({reservations.filter((r) => r.status === "completed").length})
                  </button>
                  <button
                    onClick={() => setReservationFilter("cancelled")}
                    className={`px-3 py-1.5 rounded-lg transition-all ${
                      reservationFilter === "cancelled" ? "bg-white font-medium text-plum-950 shadow-2xs" : ""
                    }`}
                  >
                    キャンセル ({reservations.filter((r) => r.status === "cancelled").length})
                  </button>
                </div>

                <button
                  onClick={fetchReservations}
                  disabled={isLoadingReservations}
                  className="p-2.5 rounded-xl bg-white border border-lavender-200 hover:border-lavender-400 text-plum-700 cursor-pointer"
                  title="最新データを再読み込み"
                >
                  <RefreshCw className={`w-4 h-4 ${isLoadingReservations ? "animate-spin" : ""}`} />
                </button>
              </div>
            </div>

            {/* 予約リストテーブル */}
            <div className="pearl-glass rounded-[2rem] border border-lavender-200 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-lavender-50/70 text-plum-800 border-b border-lavender-200/80 uppercase font-mono text-[10px]">
                    <tr>
                      <th className="p-4">予約番号 / 店舗</th>
                      <th className="p-4">日時 / 所要時間</th>
                      <th className="p-4">お客様情報</th>
                      <th className="p-4">施術メニュー / スタッフ</th>
                      <th className="p-4">料金 / 割引</th>
                      <th className="p-4">ステータス</th>
                      <th className="p-4 text-right">操作</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-lavender-100 bg-white/70">
                    {filteredReservations.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="p-8 text-center text-plum-500">
                          該当する予約データはありません
                        </td>
                      </tr>
                    ) : (
                      filteredReservations.map((r) => {
                        const isConfirmed = r.status === "confirmed";
                        const isCompleted = r.status === "completed";
                        const isCancelled = r.status === "cancelled";

                        return (
                          <tr key={r.id} className="hover:bg-lavender-50/40 transition-colors">
                            <td className="p-4">
                              <span className="font-mono font-medium text-plum-900 block">{r.id}</span>
                              <span className="text-[10px] text-plum-500">
                                {r.salonType === "mens" ? "Salon de Fraise HOMME" : "Salon de Fraise 本店"}
                              </span>
                            </td>

                            <td className="p-4">
                              <div className="font-serif font-bold text-plum-950">
                                {r.date}
                              </div>
                              <div className="text-[11px] text-lavender-700 font-mono">
                                {r.timeSlot} 〜 {calculateEndTime(r.timeSlot, r.durationMinutes)} ({r.durationMinutes}分)
                              </div>
                            </td>

                            <td className="p-4">
                              <div className="font-medium text-plum-950">{r.userName} 様</div>
                              <div className="text-[10px] text-plum-500 font-mono">{r.userPhone}</div>
                              <div className="text-[10px] text-plum-500 truncate max-w-[120px]">{r.userEmail}</div>
                            </td>

                            <td className="p-4">
                              <div className="font-medium text-plum-900 max-w-[200px] leading-snug">
                                {r.menuName}
                              </div>
                              <div className="text-[10px] text-plum-600 mt-0.5">
                                担当: <strong className="font-serif">{r.staffName}</strong>
                              </div>
                              {r.note && (
                                <div className="text-[10px] text-plum-400 italic mt-0.5 max-w-[180px] truncate">
                                  要望: {r.note}
                                </div>
                              )}
                            </td>

                            <td className="p-4">
                              <div className="font-serif font-bold text-plum-950">
                                ¥{r.finalPrice.toLocaleString()}
                              </div>
                              {(r.couponDiscount || 0) > 0 && (
                                <div className="text-[10px] text-rose-600">
                                  -¥{(r.couponDiscount || 0).toLocaleString()} 割引
                                </div>
                              )}
                              <div className="text-[9px] text-plum-400">
                                定価: ¥{r.price.toLocaleString()}
                              </div>
                            </td>

                            <td className="p-4">
                              <span
                                className={`inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-full border ${
                                  isConfirmed
                                    ? "bg-amber-50 text-amber-800 border-amber-300"
                                    : isCompleted
                                    ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                                    : "bg-stone-100 text-stone-600 border-stone-300"
                                }`}
                              >
                                {isConfirmed && <Clock className="w-3 h-3 text-amber-600" />}
                                {isCompleted && <CheckCircle2 className="w-3 h-3 text-emerald-600" />}
                                {isCancelled && <XCircle className="w-3 h-3 text-stone-500" />}
                                <span>
                                  {isConfirmed ? "予約確定" : isCompleted ? "来店完了" : "キャンセル済"}
                                </span>
                              </span>
                            </td>

                            <td className="p-4 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                {isConfirmed ? (
                                  <>
                                    <button
                                      onClick={() => handleUpdateReservationStatus(r.id, "completed", r.menuName)}
                                      disabled={updatingResId === r.id}
                                      className="px-2.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-[11px] shadow-xs cursor-pointer flex items-center gap-1"
                                      title="施術を完了として処理"
                                    >
                                      <Check className="w-3 h-3" />
                                      <span>来店完了</span>
                                    </button>
                                    <button
                                      onClick={() => handleUpdateReservationStatus(r.id, "cancel", r.menuName)}
                                      disabled={updatingResId === r.id}
                                      className="px-2.5 py-1.5 rounded-lg bg-white border border-rose-300 hover:border-rose-500 text-rose-700 font-medium text-[11px] shadow-xs cursor-pointer flex items-center gap-1"
                                      title="キャンセルし、空き枠を開放"
                                    >
                                      <X className="w-3 h-3" />
                                      <span>キャンセル</span>
                                    </button>
                                  </>
                                ) : (
                                  <span className="text-[11px] text-plum-400 font-light">処理完了</span>
                                )}
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* アーキテクチャ解説コールアウト */}
            <div className="pearl-glass p-5 rounded-2xl border border-lavender-200 bg-gradient-to-r from-lavender-50/50 to-white flex items-start gap-3 text-xs text-plum-700">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-plum-950">二重予約防止と空き枠計算のバックエンド仕様（Java / Spring Boot API 想定）</p>
                <p className="text-[11px] font-light mt-0.5 leading-relaxed">
                  施術時間（例：75分、120分）に応じた必要スロットを連続算出し、重複する予約が存在する場合はAPIレベル（GET空き枠判定 ＆ POST登録時）でトランザクション排他制御を行います。
                  スタッフが管理画面またはお客様がマイページからキャンセルを行うと、枠情報が即時に解放されます。
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* タブ②: メニュー・料金一元管理 */}
        {/* ========================================================= */}
        {activeTab === "menus" && (
          <div className="space-y-6 animate-fade-in">
            <div className="pearl-glass p-5 rounded-2xl border border-lavender-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-serif font-bold text-plum-950">
                    サロンメニュー ＆ 料金一元管理マスター
                  </h2>
                  <span className="text-[10px] bg-gold-100 text-gold-900 border border-gold-300 px-2 py-0.5 rounded-full font-mono">
                    Single Source of Truth
                  </span>
                </div>
                <p className="text-xs text-plum-600 font-light mt-0.5">
                  レディース・メンズ全メニューの料金と所要時間を一元管理。予約画面やマイページと完全に整合します。
                </p>
              </div>

              <div className="flex bg-lavender-100/70 p-1 rounded-xl text-xs text-plum-700">
                <button
                  onClick={() => setMenuFilter("all")}
                  className={`px-3 py-1.5 rounded-lg transition-all ${menuFilter === "all" ? "bg-white font-medium text-plum-950 shadow-2xs" : ""}`}
                >
                  全メニュー ({menuList.length})
                </button>
                <button
                  onClick={() => setMenuFilter("ladies")}
                  className={`px-3 py-1.5 rounded-lg transition-all ${menuFilter === "ladies" ? "bg-white font-medium text-plum-950 shadow-2xs" : ""}`}
                >
                  レディース
                </button>
                <button
                  onClick={() => setMenuFilter("mens")}
                  className={`px-3 py-1.5 rounded-lg transition-all ${menuFilter === "mens" ? "bg-white font-medium text-plum-950 shadow-2xs" : ""}`}
                >
                  提携メンズHOMME
                </button>
              </div>
            </div>

            {/* メニューリスト */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredMenus.map((menu) => {
                const isEditing = editingMenuId === menu.id;

                return (
                  <div
                    key={menu.id}
                    className="pearl-glass p-5 rounded-2xl border border-lavender-200 bg-white/95 shadow-xs space-y-3 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span
                          className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-full border ${
                            menu.salonType === "mens"
                              ? "bg-stone-900 text-stone-200 border-stone-800"
                              : "bg-lavender-100 text-lavender-800 border-lavender-200"
                          }`}
                        >
                          {menu.salonType === "mens" ? "MENS HOMME" : "LADIES"} • {menu.category}
                        </span>
                        <span className="text-[10px] text-plum-400 font-mono">ID: {menu.id}</span>
                      </div>

                      <h3 className="text-sm font-serif font-bold text-plum-950 mt-1 leading-snug">
                        {menu.name}
                      </h3>
                      <p className="text-xs text-plum-600 font-light mt-1 leading-relaxed">
                        {menu.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-lavender-100 space-y-2">
                      {isEditing ? (
                        <div className="p-3 rounded-xl bg-gold-50/70 border border-gold-300 space-y-2 text-xs">
                          <p className="font-semibold text-gold-950 flex items-center gap-1">
                            <Edit3 className="w-3.5 h-3.5" />
                            <span>料金・所要時間の編集シミュレーション</span>
                          </p>
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="text-[10px] text-plum-700 block">料金 (税込・円)</label>
                              <input
                                type="number"
                                step="100"
                                value={editPrice}
                                onChange={(e) => setEditPrice(Number(e.target.value))}
                                className="w-full p-1.5 rounded-lg border border-gold-300 bg-white text-plum-950 font-bold"
                              />
                            </div>
                            <div>
                              <label className="text-[10px] text-plum-700 block">施術時間 (分)</label>
                              <input
                                type="number"
                                step="15"
                                value={editDuration}
                                onChange={(e) => setEditDuration(Number(e.target.value))}
                                className="w-full p-1.5 rounded-lg border border-gold-300 bg-white text-plum-950 font-bold"
                              />
                            </div>
                          </div>
                          <div className="flex justify-end gap-2 pt-1">
                            <button
                              onClick={() => handleSaveMenuEdit(menu.id)}
                              className="px-3 py-1 rounded-lg bg-plum-900 text-white font-medium text-xs shadow-xs"
                            >
                              保存する
                            </button>
                            <button
                              onClick={() => setEditingMenuId(null)}
                              className="px-2.5 py-1 rounded-lg bg-white border border-stone-300 text-stone-700 text-xs"
                            >
                              キャンセル
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between">
                          <div className="flex items-baseline gap-2">
                            <span className="text-base font-serif font-bold text-plum-950">
                              ¥{menu.price.toLocaleString()}
                            </span>
                            <span className="text-xs text-lavender-700 font-mono">
                              ({menu.durationMinutes}分)
                            </span>
                            {menu.paragelIncluded && (
                              <span className="text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                                パラジェル込
                              </span>
                            )}
                          </div>

                          <button
                            onClick={() => handleStartEditMenu(menu)}
                            className="text-xs text-plum-700 hover:text-plum-950 underline font-medium flex items-center gap-1 cursor-pointer"
                          >
                            <Edit3 className="w-3.5 h-3.5 text-lavender-600" />
                            <span>料金・時間編集</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* タブ③: デザインカタログ管理 */}
        {/* ========================================================= */}
        {activeTab === "designs" && (
          <div className="space-y-6 animate-fade-in">
            <div className="pearl-glass p-5 rounded-2xl border border-lavender-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-serif font-bold text-plum-950">
                    ネイルデザインカタログ 公開・非公開管理
                  </h2>
                  <span className="text-[10px] bg-rose-100 text-rose-800 border border-rose-300 px-2 py-0.5 rounded-full font-mono">
                    CMS Management
                  </span>
                </div>
                <p className="text-xs text-plum-600 font-light mt-0.5">
                  店頭デザインの公開状態をリアルタイムに切り替え可能。新規トレンドデザインの追加も即座に行えます。
                </p>
              </div>

              <button
                onClick={() => setIsAddingDesign(!isAddingDesign)}
                className="py-2.5 px-4 rounded-xl luxe-button text-xs font-medium flex items-center gap-1.5 shadow-sm cursor-pointer"
              >
                <PlusCircle className="w-4 h-4 text-gold-300" />
                <span>{isAddingDesign ? "閉じる" : "新しいデザインを登録"}</span>
              </button>
            </div>

            {/* 新規デザイン追加フォーム */}
            {isAddingDesign && (
              <form
                onSubmit={handleCreateDesign}
                className="pearl-glass p-6 rounded-2xl border-2 border-gold-300 bg-gradient-to-br from-gold-50/50 via-white to-lavender-50/50 shadow-md space-y-4 animate-fade-in text-xs"
              >
                <div className="flex items-center justify-between border-b border-lavender-200 pb-2">
                  <h3 className="font-serif font-bold text-plum-950 text-sm flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-gold-500" />
                    <span>新規ネイルデザインの登録・即時公開</span>
                  </h3>
                  <button
                    type="button"
                    onClick={() => setIsAddingDesign(false)}
                    className="text-stone-400 hover:text-stone-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  <div className="space-y-1">
                    <label className="text-plum-800 font-medium">デザイン名 *</label>
                    <input
                      type="text"
                      required
                      placeholder="例: シャンパン水光グラデーション"
                      value={newDesignTitle}
                      onChange={(e) => setNewDesignTitle(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-lavender-300 bg-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-plum-800 font-medium">カテゴリー</label>
                    <select
                      value={newDesignCategory}
                      onChange={(e) => setNewDesignCategory(e.target.value as any)}
                      className="w-full p-2.5 rounded-xl border border-lavender-300 bg-white"
                    >
                      <option value="magnet">水光マグネット</option>
                      <option value="office">オフィス向け</option>
                      <option value="simple">シンプル</option>
                      <option value="glam">華やかトレンド</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-plum-800 font-medium">料金 (税込・円)</label>
                    <input
                      type="number"
                      step="100"
                      value={newDesignPrice}
                      onChange={(e) => setNewDesignPrice(Number(e.target.value))}
                      className="w-full p-2.5 rounded-xl border border-lavender-300 bg-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-plum-800 font-medium">所要時間 (分)</label>
                    <input
                      type="number"
                      step="15"
                      value={newDesignDuration}
                      onChange={(e) => setNewDesignDuration(Number(e.target.value))}
                      className="w-full p-2.5 rounded-xl border border-lavender-300 bg-white"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="submit"
                    className="py-2 px-5 rounded-xl gold-button text-xs font-semibold text-plum-950 shadow-sm cursor-pointer"
                  >
                    デザインを登録して公開
                  </button>
                </div>
              </form>
            )}

            {/* デザイングリッド一覧 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {designList.map((d) => (
                <div
                  key={d.id}
                  className={`pearl-glass rounded-2xl border overflow-hidden transition-all flex flex-col justify-between ${
                    d.isPublished
                      ? "border-lavender-200 bg-white/95 shadow-xs"
                      : "border-stone-300 bg-stone-100/70 opacity-60"
                  }`}
                >
                  <div className="relative h-44 w-full bg-stone-100">
                    <Image
                      src={d.image}
                      alt={d.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-3 left-3">
                      <span
                        className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border shadow-2xs ${
                          d.isPublished
                            ? "bg-emerald-500 text-white border-emerald-600"
                            : "bg-stone-500 text-white border-stone-600"
                        }`}
                      >
                        {d.isPublished ? "公開中" : "非公開"}
                      </span>
                    </div>

                    <div className="absolute top-3 right-3">
                      <button
                        onClick={() => handleToggleDesignPublish(d.id)}
                        className={`p-2 rounded-xl backdrop-blur-md shadow-sm transition-all cursor-pointer ${
                          d.isPublished
                            ? "bg-white/90 text-stone-700 hover:text-stone-900"
                            : "bg-stone-800/90 text-white hover:bg-stone-900"
                        }`}
                        title={d.isPublished ? "非公開にする" : "公開する"}
                      >
                        {d.isPublished ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-[11px] text-plum-500">
                        <span>{d.categoryLabel}</span>
                        <span className="font-mono">{d.duration}</span>
                      </div>
                      <h4 className="text-sm font-serif font-medium text-plum-950 mt-1 leading-snug">
                        {d.title}
                      </h4>
                      <p className="text-xs text-plum-600 font-light mt-1 line-clamp-2">
                        {d.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-lavender-100 flex items-center justify-between">
                      <span className="text-base font-serif font-bold text-plum-950">
                        {d.price}
                      </span>
                      <button
                        onClick={() => handleToggleDesignPublish(d.id)}
                        className="text-xs text-plum-700 hover:text-plum-950 font-medium underline"
                      >
                        {d.isPublished ? "非公開へ切替" : "公開へ戻す"}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* タブ④: 顧客台帳・ポイント付与 */}
        {/* ========================================================= */}
        {activeTab === "customers" && (
          <div className="space-y-6 animate-fade-in">
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
                  <div className="p-3.5 rounded-xl bg-white border border-lavender-100 space-y-1">
                    <span className="text-[10px] text-plum-500 uppercase tracking-widest font-mono">お名前</span>
                    <p className="font-serif font-medium text-sm text-plum-950">{user.name} 様</p>
                    <p className="text-[10px] text-plum-500">{user.kana}</p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white border border-lavender-100 space-y-1">
                    <span className="text-[10px] text-plum-500 uppercase tracking-widest font-mono">会員番号</span>
                    <p className="font-mono font-medium text-plum-900">{user.memberNumber}</p>
                    <p className="text-[10px] text-plum-500">ランク: ★ {user.rank}</p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white border border-lavender-100 space-y-1">
                    <span className="text-[10px] text-plum-500 uppercase tracking-widest font-mono">現在のポイント</span>
                    <p className="text-base font-serif font-semibold text-gold-700">
                      {user.points.toLocaleString()} <span className="text-xs text-plum-600 font-normal">pt</span>
                    </p>
                    <p className="text-[10px] text-plum-500">1pt = ¥1</p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white border border-lavender-100 space-y-1">
                    <span className="text-[10px] text-plum-500 uppercase tracking-widest font-mono">保有クーポン</span>
                    <p className="text-sm font-medium text-lavender-700">
                      {user.coupons.filter((c) => !c.isUsed).length} 枚 未利用
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
                        <button
                          type="button"
                          onClick={() => setGrantAmount(300)}
                          className="px-2.5 py-1.5 rounded-lg bg-lavender-100 hover:bg-lavender-200 text-plum-800 text-[11px]"
                        >
                          +300
                        </button>
                        <button
                          type="button"
                          onClick={() => setGrantAmount(500)}
                          className="px-2.5 py-1.5 rounded-lg bg-lavender-100 hover:bg-lavender-200 text-plum-800 text-[11px]"
                        >
                          +500
                        </button>
                        <button
                          type="button"
                          onClick={() => setGrantAmount(1000)}
                          className="px-2.5 py-1.5 rounded-lg bg-lavender-100 hover:bg-lavender-200 text-plum-800 text-[11px]"
                        >
                          +1000
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-plum-800 font-medium">
                      付与理由・施術内容 <span className="text-rose-500">*</span>
                    </label>
                    <select
                      value={grantReason}
                      onChange={(e) => setGrantReason(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-lavender-300 text-plum-900 text-xs focus:outline-hidden focus:ring-2 focus:ring-lavender-400"
                    >
                      <option value="施術ご来店ポイント（水光マグネットコース）">
                        施術ご来店ポイント（水光マグネットコース）
                      </option>
                      <option value="施術ご来店ポイント（自爪育成パラジェルコース）">
                        施術ご来店ポイント（自爪育成パラジェルコース）
                      </option>
                      <option value="施術ご来店ポイント（メンズ身だしなみケア）">
                        施術ご来店ポイント（メンズ身だしなみケア）
                      </option>
                      <option value="お友達ご紹介特典ボーナス">お友達ご紹介特典ボーナス (+500pt)</option>
                      <option value="次回予約完了ボーナス">次回予約完了ボーナス (+200pt)</option>
                      <option value="その他">その他（直接入力）</option>
                    </select>

                    {grantReason === "その他" && (
                      <input
                        type="text"
                        placeholder="付与理由を入力"
                        value={customReason}
                        onChange={(e) => setCustomReason(e.target.value)}
                        className="w-full mt-2 px-3.5 py-2 rounded-xl bg-white border border-lavender-300 text-plum-900 text-xs"
                      />
                    )}
                  </div>

                  <div className="p-3 rounded-xl bg-lavender-50/70 border border-lavender-100 space-y-1">
                    <div className="flex justify-between text-[11px] text-plum-700">
                      <span>付与前ポイント:</span>
                      <span className="font-mono">{user?.points || 0} pt</span>
                    </div>
                    <div className="flex justify-between text-xs font-semibold text-emerald-800">
                      <span>付与後予定ポイント:</span>
                      <span className="font-mono">{((user?.points || 0) + grantAmount).toLocaleString()} pt</span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isGranting}
                    className="w-full py-3 rounded-xl luxe-button text-xs font-medium shadow-md cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    <PlusCircle className="w-4 h-4 text-gold-300" />
                    <span>{isGranting ? "付与処理中..." : "ポイントを付与する"}</span>
                  </button>
                </form>
              </div>

              {/* 右側：クーポン消込（5カラム） */}
              <div className="md:col-span-5 pearl-glass p-6 rounded-[2rem] border border-lavender-200 shadow-md space-y-5 bg-white/95">
                <div className="border-b border-lavender-100 pb-3">
                  <h2 className="text-base font-serif text-plum-950 flex items-center gap-2">
                    <Ticket className="w-5 h-5 text-lavender-600" />
                    <span>店頭クーポン消込処理</span>
                  </h2>
                  <p className="text-xs text-plum-600 font-light mt-0.5">
                    お客様が提示されたクーポンを使用済みに更新します。
                  </p>
                </div>

                <div className="space-y-3">
                  {!user || user.coupons.filter((c) => !c.isUsed).length === 0 ? (
                    <div className="p-6 text-center text-xs text-plum-500 bg-lavender-50/40 rounded-xl">
                      現在未利用のクーポンはありません
                    </div>
                  ) : (
                    user.coupons
                      .filter((c) => !c.isUsed)
                      .map((c) => (
                        <div
                          key={c.id}
                          className="p-3.5 rounded-xl border border-gold-300/80 bg-gold-50/30 text-xs space-y-2"
                        >
                          <div className="flex justify-between items-start gap-2">
                            <div>
                              <p className="font-medium text-plum-950">{c.title}</p>
                              <p className="text-[10px] text-plum-600">{c.description}</p>
                            </div>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-gold-100 text-gold-900 border border-gold-300 shrink-0">
                              {c.discount}
                            </span>
                          </div>

                          <div className="flex justify-between items-center pt-2 border-t border-gold-200/60">
                            <span className="text-[10px] text-plum-500 font-mono">期限: {c.expiryDate}</span>
                            <button
                              onClick={() => handleRedeemCoupon(c.id, c.title)}
                              disabled={processingCouponId === c.id}
                              className="px-3 py-1.5 rounded-lg bg-plum-900 hover:bg-plum-950 text-white font-medium text-[11px] shadow-2xs cursor-pointer disabled:opacity-50"
                            >
                              {processingCouponId === c.id ? "消込中..." : "利用済みに消込"}
                            </button>
                          </div>
                        </div>
                      ))
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
