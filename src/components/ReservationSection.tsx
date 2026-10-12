"use client";

import React from "react";
import Link from "next/link";
import { Calendar, Phone, Sparkles, Clock, CheckCircle, Award, Ticket, ArrowRight } from "lucide-react";
import { SALON_INFO } from "@/data/salonData";

export default function ReservationSection() {
  return (
    <section id="reservation" className="py-24 bg-gradient-to-b from-white via-lavender-50/40 to-pearl-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* セクションヘッダー */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-lavender-100 text-lavender-700 text-xs font-normal tracking-widest uppercase border border-lavender-200 font-serif">
            <Calendar className="w-3.5 h-3.5 text-gold-500" />
            <span>Easy Online Booking</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal text-plum-900 leading-[1.3] tracking-wide">
            ご予約・空席状況
          </h2>
          <p className="text-xs sm:text-sm text-plum-700 font-light tracking-wide leading-relaxed">
            HOT PEPPER Beauty または 公式WEB会員ポータル より24時間いつでもリアルタイム空席の確認・限定クーポンのご利用が可能です。
          </p>
        </div>

        {/* 3つの予約チャネルカード */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
          
          {/* HOT PEPPER Beauty */}
          <div className="pearl-glass rounded-3xl p-6 sm:p-8 flex flex-col justify-between border-2 border-lavender-400 shadow-xl relative bg-white/95">
            <div className="space-y-4">
              <span className="text-[10px] font-normal px-2.5 py-0.5 rounded-full bg-gold-400 text-plum-950 uppercase tracking-widest inline-block font-serif">
                RECOMMENDED / 24H即時予約
              </span>
              <div>
                <h3 className="text-xl font-serif font-normal text-plum-900 tracking-wide">
                  HOT PEPPER Beauty
                </h3>
                <p className="text-xs text-plum-500 font-light mt-1 tracking-wide">
                  ポイントが貯まる・使える公式Web予約
                </p>
              </div>
              <ul className="text-xs text-plum-700 space-y-2 pt-2 border-t border-lavender-100 font-light tracking-wide">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-lavender-600 shrink-0" />
                  <span>リアルタイムの空席カレンダーを閲覧</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-lavender-600 shrink-0" />
                  <span>スタッフ指名予約（+550円）対応</span>
                </li>
              </ul>
            </div>

            <div className="pt-6">
              <a
                href={SALON_INFO.links.hotpepper}
                target="_blank"
                rel="noopener noreferrer"
                className="luxe-button w-full text-center py-3.5 rounded-full text-xs font-medium flex items-center justify-center gap-2 shadow-lg tracking-wider"
              >
                <Calendar className="w-4 h-4" />
                <span>空席確認・Web即時予約</span>
              </a>
            </div>
          </div>

          {/* 公式WEB会員ポータル */}
          <div className="pearl-glass rounded-3xl p-6 sm:p-8 flex flex-col justify-between border-2 border-gold-300 shadow-xl relative bg-white/95">
            <div className="space-y-4">
              <span className="text-[10px] font-normal px-2.5 py-0.5 rounded-full bg-gold-500 text-plum-950 uppercase tracking-widest inline-block font-serif">
                WEB会員特典 / 100pt進呈
              </span>
              <div>
                <h3 className="text-xl font-serif font-normal text-plum-900 tracking-wide">
                  Salon Members Portal
                </h3>
                <p className="text-xs text-plum-500 font-light mt-1 tracking-wide">
                  新規登録で¥1,000OFF ＆ 施術ポイント還元
                </p>
              </div>
              <ul className="text-xs text-plum-700 space-y-2 pt-2 border-t border-lavender-100 font-light tracking-wide">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-gold-600 shrink-0" />
                  <span>登録ですぐ使える¥1,000OFFクーポン</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-gold-600 shrink-0" />
                  <span>施術ごとにポイントが貯まり特典交換が可能</span>
                </li>
              </ul>
            </div>

            <div className="pt-6 space-y-2">
              <Link
                href="/mypage"
                className="gold-button w-full text-center py-3.5 rounded-full text-xs font-medium flex items-center justify-center gap-2 shadow-md transition-all hover:scale-102 tracking-wider"
              >
                <Award className="w-4 h-4 text-plum-950" />
                <span>会員マイページ / 特典確認</span>
              </Link>
            </div>
          </div>

          {/* お電話 */}
          <div className="pearl-glass rounded-3xl p-6 sm:p-8 flex flex-col justify-between border border-lavender-200 shadow-xl relative bg-white/95">
            <div className="space-y-4">
              <span className="text-[10px] font-normal px-2.5 py-0.5 rounded-full bg-lavender-100 text-lavender-700 uppercase tracking-widest inline-block border border-lavender-200 font-serif">
                お急ぎ・当日予約
              </span>
              <div>
                <h3 className="text-xl font-serif font-normal text-plum-900 tracking-wide">
                  お電話でのお問い合わせ
                </h3>
                <p className="text-xs text-plum-500 font-light mt-1 tracking-wide">
                  当日の空き状況やお時間の相談に
                </p>
              </div>
              <ul className="text-xs text-plum-700 space-y-2 pt-2 border-t border-lavender-100 font-light tracking-wide">
                <li className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gold-500 shrink-0" />
                  <span>営業時間: 10:00〜20:00</span>
                </li>
                <li className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-gold-500 shrink-0" />
                  <span>GW・お盆・SW休まず営業中</span>
                </li>
              </ul>
            </div>

            <div className="pt-6">
              <a
                href={`tel:${SALON_INFO.phone}`}
                className="w-full text-center py-3.5 rounded-full text-xs font-medium bg-white text-plum-900 border border-lavender-300 hover:bg-lavender-50 flex items-center justify-center gap-2 shadow-sm transition-all font-serif tracking-wider"
              >
                <Phone className="w-4 h-4 text-lavender-600" />
                <span>{SALON_INFO.phone}</span>
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
