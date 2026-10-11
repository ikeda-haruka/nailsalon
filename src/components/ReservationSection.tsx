"use client";

import React from "react";
import { Calendar, MessageCircle, Phone, Sparkles, Clock, CheckCircle } from "lucide-react";
import { SALON_INFO } from "@/data/salonData";

export default function ReservationSection() {
  return (
    <section id="reservation" className="py-24 bg-gradient-to-b from-white via-pink-50/40 to-[#fff0f3] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* セクションヘッダー */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100 text-[#ff3366] text-xs font-black tracking-wider uppercase">
            <Calendar className="w-3.5 h-3.5" />
            <span>Easy Online Booking</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black text-[#2c181b]">
            ご予約・空席状況
          </h2>
          <p className="text-xs sm:text-sm text-[#5e4748] font-medium">
            HOT PEPPER Beauty または 公式LINE より24時間いつでもリアルタイム空席をご確認いただけます。
          </p>
        </div>

        {/* 3つの予約チャネルカード */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
          
          {/* HOT PEPPER Beauty */}
          <div className="jelly-glass rounded-3xl p-6 sm:p-8 flex flex-col justify-between border-2 border-[#ff3366] shadow-xl relative bg-white/90">
            <div className="space-y-4">
              <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-[#ff3366] text-white uppercase tracking-wider inline-block">
                RECOMMENDED / 24H即時予約
              </span>
              <div>
                <h3 className="text-xl font-serif font-black text-[#2c181b]">
                  HOT PEPPER Beauty
                </h3>
                <p className="text-xs text-[#8c7374] font-medium mt-1">
                  ポイントが貯まる・使える公式Web予約
                </p>
              </div>
              <ul className="text-xs text-[#5e4748] space-y-2 pt-2 border-t border-pink-100 font-medium">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#ff3366] shrink-0" />
                  <span>リアルタイムの空席カレンダーを閲覧</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#ff3366] shrink-0" />
                  <span>スタッフ指名予約（+550円）対応</span>
                </li>
              </ul>
            </div>

            <div className="pt-6">
              <a
                href={SALON_INFO.links.hotpepper}
                target="_blank"
                rel="noopener noreferrer"
                className="jelly-button w-full text-center py-3.5 rounded-full text-xs font-bold flex items-center justify-center gap-2 shadow-lg"
              >
                <Calendar className="w-4 h-4" />
                <span>空席確認・Web即時予約</span>
              </a>
            </div>
          </div>

          {/* 公式LINE */}
          <div className="jelly-glass rounded-3xl p-6 sm:p-8 flex flex-col justify-between border border-[#06C755]/30 shadow-xl relative bg-white/90">
            <div className="space-y-4">
              <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-[#06C755] text-white uppercase tracking-wider inline-block">
                限定クーポン ＆ 回数券
              </span>
              <div>
                <h3 className="text-xl font-serif font-black text-[#2c181b]">
                  公式LINEアカウント
                </h3>
                <p className="text-xs text-[#8c7374] font-medium mt-1">
                  友だち追加で限定クーポン・回数券をGET
                </p>
              </div>
              <ul className="text-xs text-[#5e4748] space-y-2 pt-2 border-t border-pink-100 font-medium">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#06C755] shrink-0" />
                  <span>メニューからワンタップで空席閲覧</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#06C755] shrink-0" />
                  <span>チャットでデザインの事前相談OK</span>
                </li>
              </ul>
            </div>

            <div className="pt-6">
              <a
                href={SALON_INFO.links.line}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center py-3.5 rounded-full text-xs font-bold bg-[#06C755] hover:bg-[#05a847] text-white flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all hover:scale-102"
              >
                <MessageCircle className="w-4 h-4" />
                <span>LINEでクーポンを受け取る</span>
              </a>
            </div>
          </div>

          {/* お電話予約 */}
          <div className="jelly-glass rounded-3xl p-6 sm:p-8 flex flex-col justify-between border border-pink-100 shadow-xl relative bg-white/90">
            <div className="space-y-4">
              <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-[#5e4748] text-white uppercase tracking-wider inline-block">
                当日予約・お問い合わせ
              </span>
              <div>
                <h3 className="text-xl font-serif font-black text-[#2c181b]">
                  お電話でのご予約
                </h3>
                <p className="text-xs text-[#8c7374] font-medium mt-1">
                  当日の急な空き枠や道案内のお電話に
                </p>
              </div>
              <ul className="text-xs text-[#5e4748] space-y-2 pt-2 border-t border-pink-100 font-medium">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#5e4748] shrink-0" />
                  <span>営業時間: 10:00〜20:00（不定休）</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#5e4748] shrink-0" />
                  <span>GW・お盆・シルバーウィークも営業中</span>
                </li>
              </ul>
            </div>

            <div className="pt-6">
              <a
                href={`tel:${SALON_INFO.phone}`}
                className="w-full text-center py-3.5 rounded-full text-xs font-bold bg-pink-50 hover:bg-pink-100 text-[#ff3366] border border-pink-200 flex items-center justify-center gap-2 transition-all"
              >
                <Phone className="w-4 h-4" />
                <span>{SALON_INFO.phone}</span>
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
