"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Calendar as CalendarIcon,
  Phone,
  Sparkles,
  Clock,
  CheckCircle,
  Award,
  Ticket,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  ExternalLink
} from "lucide-react";
import { SALON_INFO } from "@/data/salonData";
import BookingModal from "@/components/BookingModal";
import { SalonReservation } from "@/types/reservation";

export default function ReservationSection() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleBookingSuccess = (res: SalonReservation) => {
    setToastMessage(`【予約完了】${res.date} ${res.timeSlot}〜「${res.menuName}」のご予約を受け付けました！`);
    setTimeout(() => {
      setToastMessage(null);
    }, 6000);
  };

  return (
    <section id="reservation" className="py-24 bg-gradient-to-b from-white via-lavender-50/40 to-pearl-100 relative">
      
      {/* 予約成功トースト通知 */}
      {toastMessage && (
        <div className="fixed top-24 right-4 z-50 p-4 rounded-2xl shadow-xl border bg-white border-emerald-300 text-emerald-950 flex items-center gap-3 max-w-md animate-fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <p className="text-xs font-medium leading-relaxed">{toastMessage}</p>
        </div>
      )}

      {/* サイト内完結WEB予約モーダル */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        initialSalonType="ladies"
        onBookingSuccess={handleBookingSuccess}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* セクションヘッダー */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-lavender-100 text-lavender-700 text-xs font-normal tracking-widest uppercase border border-lavender-200 font-serif">
            <CalendarIcon className="w-3.5 h-3.5 text-gold-500" />
            <span>Online Booking System</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal text-plum-900 leading-[1.3] tracking-wide">
            ご予約・空席状況
          </h2>
          <p className="text-xs sm:text-sm text-plum-700 font-light tracking-wide leading-relaxed">
            当サイト独自の<strong className="font-medium text-plum-950">「公式WEB即時予約システム」</strong>により、
            外部サイトへ遷移することなくサイト内でリアルタイム空席の確認から予約確定・キャンセルまで完結します。
          </p>
        </div>

        {/* 3つの予約チャネルカード */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-10">
          
          {/* 1. 公式WEB即時予約（サイト内完結システム・主役！） */}
          <div className="pearl-glass rounded-3xl p-6 sm:p-8 flex flex-col justify-between border-2 border-gold-400 shadow-2xl relative bg-gradient-to-b from-white via-gold-50/30 to-white transform hover:scale-[1.01] transition-transform">
            <div className="space-y-4">
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-gold-400 text-plum-950 uppercase tracking-widest inline-flex items-center gap-1 font-serif shadow-xs">
                <Sparkles className="w-3 h-3 text-plum-950" />
                <span>RECOMMENDED / サイト内完結</span>
              </span>
              <div>
                <h3 className="text-xl font-serif font-medium text-plum-900 tracking-wide">
                  公式WEB即時予約
                </h3>
                <p className="text-xs text-plum-600 font-light mt-1 tracking-wide">
                  独自予約エンジン・空き枠リアルタイム連動
                </p>
              </div>
              <ul className="text-xs text-plum-700 space-y-2 pt-2 border-t border-lavender-100 font-light tracking-wide">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>所要時間・スタッフに応じた空席スロット自動計算</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>同一時間帯への二重予約を完全排他制御</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>誕生月50%OFFや会員共通ポイントを即時適用</span>
                </li>
              </ul>
            </div>

            <div className="pt-6">
              <button
                type="button"
                onClick={() => setIsBookingModalOpen(true)}
                className="gold-button w-full text-center py-3.5 rounded-full text-xs font-bold flex items-center justify-center gap-2 shadow-lg tracking-wider cursor-pointer text-plum-950 hover:opacity-95"
              >
                <CalendarIcon className="w-4 h-4" />
                <span>WEB即時予約を体験する</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* 2. HOT PEPPER Beauty（外部連携イメージ・参考表示） */}
          <div className="pearl-glass rounded-3xl p-6 sm:p-8 flex flex-col justify-between border border-lavender-300 shadow-md relative bg-white/95">
            <div className="space-y-4">
              <span className="text-[10px] font-normal px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-700 uppercase tracking-widest inline-block font-mono border border-stone-200">
                EXTERNAL PORTAL / 参考
              </span>
              <div>
                <h3 className="text-xl font-serif font-normal text-plum-900 tracking-wide">
                  HOT PEPPER Beauty
                </h3>
                <p className="text-xs text-plum-500 font-light mt-1 tracking-wide">
                  大手ポータルサイト連携イメージ
                </p>
              </div>
              <ul className="text-xs text-plum-700 space-y-2 pt-2 border-t border-lavender-100 font-light tracking-wide">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-lavender-600 shrink-0" />
                  <span>外部予約サービス連携用の導線仕様</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-lavender-600 shrink-0" />
                  <span>リクルートポイントの利用・付与に対応</span>
                </li>
              </ul>
            </div>

            <div className="pt-6">
              <a
                href={SALON_INFO.links.hotpepper}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center py-3.5 rounded-full text-xs font-medium bg-white text-plum-900 border border-lavender-300 hover:bg-lavender-50 flex items-center justify-center gap-1.5 shadow-2xs tracking-wider"
              >
                <span>HOT PEPPER（参考リンク）</span>
                <ExternalLink className="w-3.5 h-3.5 text-lavender-600" />
              </a>
            </div>
          </div>

          {/* 3. お電話・会員マイページ */}
          <div className="pearl-glass rounded-3xl p-6 sm:p-8 flex flex-col justify-between border border-lavender-200 shadow-md relative bg-white/95">
            <div className="space-y-4">
              <span className="text-[10px] font-normal px-2.5 py-0.5 rounded-full bg-lavender-100 text-lavender-700 uppercase tracking-widest inline-block border border-lavender-200 font-serif">
                MEMBER & INQUIRY
              </span>
              <div>
                <h3 className="text-xl font-serif font-normal text-plum-900 tracking-wide">
                  マイページ予約管理
                </h3>
                <p className="text-xs text-plum-500 font-light mt-1 tracking-wide">
                  予約状況の確認・変更・キャンセル
                </p>
              </div>
              <ul className="text-xs text-plum-700 space-y-2 pt-2 border-t border-lavender-100 font-light tracking-wide">
                <li className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gold-500 shrink-0" />
                  <span>次回予約日時・メニュー・担当者の確認</span>
                </li>
                <li className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-gold-500 shrink-0" />
                  <span>ワンクリックで予約キャンセル・空き枠開放</span>
                </li>
              </ul>
            </div>

            <div className="pt-6">
              <Link
                href="/mypage"
                className="w-full text-center py-3.5 rounded-full text-xs font-medium luxe-button flex items-center justify-center gap-2 shadow-sm transition-all tracking-wider"
              >
                <Award className="w-4 h-4" />
                <span>マイページで予約を確認する</span>
              </Link>
            </div>
          </div>

        </div>

        {/* ポートフォリオ明記バナー */}
        <div className="max-w-3xl mx-auto p-4 rounded-2xl bg-white/90 border border-lavender-300 text-center space-y-1 shadow-2xs">
          <p className="text-[11px] font-semibold text-plum-900 flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-gold-600" />
            <span>【ポートフォリオ実演】サイト内WEB予約システムが実際に完全動作します</span>
          </p>
          <p className="text-[10px] text-plum-600 font-light leading-relaxed">
            ※当サロンは架空のモデルサロンであり、実際の課金や来店は発生いたしません。
            上記「公式WEB即時予約を体験する」より予約を確定させると、実際に空席枠が埋まり、マイページおよび管理者画面へ即座に反映されます。
          </p>
        </div>

      </div>
    </section>
  );
}
