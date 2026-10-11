"use client";

import React from "react";
import { Calendar, MessageCircle, Phone, Sparkles, Clock, Ticket, ExternalLink, CheckCircle } from "lucide-react";
import { SALON_INFO } from "@/data/salonData";

export default function ReservationSection() {
  return (
    <section id="reservation" className="py-24 bg-gradient-to-b from-[#fffafb] via-[#fff0f3] to-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* セクションヘッダー */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ffe5ec] text-[#e8436e] text-xs font-semibold">
            <Calendar className="w-3.5 h-3.5 text-[#ff758f]" />
            <span>Reservation & Vacancy</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#3a2b2c]">
            ご予約・空席状況のご案内
          </h2>
          <p className="text-sm text-[#5e4748] leading-relaxed">
            ご予約は<strong className="text-[#e8436e]">HOT PEPPER Beauty</strong>・<strong className="text-[#06C755]">公式LINE</strong>・<strong className="text-[#3a2b2c]">お電話</strong>より承っております。<br className="hidden sm:inline" />
            リアルタイムの空席情報はHOT PEPPER Beautyおよび公式LINEアカウントより24時間いつでもご確認いただけます。
          </p>
        </div>

        {/* 3つの予約チャネルカード */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          
          {/* 1. HOT PEPPER Beauty */}
          <div className="strawberry-card p-8 flex flex-col justify-between border-[#ff758f] shadow-lg relative bg-white">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs px-2.5 py-1 rounded-full bg-[#e8436e] text-white font-bold">
                  おすすめ / 24h即時予約
                </span>
                <Calendar className="w-6 h-6 text-[#e8436e]" />
              </div>

              <div>
                <h3 className="text-xl font-serif font-bold text-[#3a2b2c] mb-1">
                  HOT PEPPER Beauty
                </h3>
                <p className="text-xs text-[#8c7374]">
                  ポイントが貯まる・使える公式Web予約
                </p>
              </div>

              <ul className="text-xs text-[#5e4748] space-y-2 pt-2 border-t border-[#ffe3e9]">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#e8436e] shrink-0" />
                  <span>リアルタイムの空席カレンダーを閲覧可能</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#e8436e] shrink-0" />
                  <span>スタッフ指名予約（+550円）もスムーズ</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#e8436e] shrink-0" />
                  <span>お得なご新規様限定クーポン多数掲載</span>
                </li>
              </ul>
            </div>

            <div className="pt-6">
              <a
                href={SALON_INFO.links.hotpepper}
                target="_blank"
                rel="noopener noreferrer"
                className="strawberry-button w-full text-center py-3.5 rounded-full text-xs font-bold flex items-center justify-center gap-2 shadow-md"
              >
                <span>空席確認・Web即時予約</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* 2. 公式LINEアカウント */}
          <div className="strawberry-card p-8 flex flex-col justify-between border-[#06C755]/30 shadow-lg relative bg-white">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs px-2.5 py-1 rounded-full bg-[#06C755] text-white font-bold">
                  限定クーポン・回数券
                </span>
                <MessageCircle className="w-6 h-6 text-[#06C755]" />
              </div>

              <div>
                <h3 className="text-xl font-serif font-bold text-[#3a2b2c] mb-1">
                  公式LINEアカウント
                </h3>
                <p className="text-xs text-[#8c7374]">
                  友だち追加で限定クーポン＆回数券を配信
                </p>
              </div>

              <ul className="text-xs text-[#5e4748] space-y-2 pt-2 border-t border-[#ffe3e9]">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#06C755] shrink-0" />
                  <span>リッチメニューから空席情報をワンタップ閲覧</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#06C755] shrink-0" />
                  <span>お得な回数券の購入・管理が可能</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#06C755] shrink-0" />
                  <span>チャットでデザインや日程の事前相談OK</span>
                </li>
              </ul>
            </div>

            <div className="pt-6">
              <a
                href={SALON_INFO.links.line}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center py-3.5 rounded-full text-xs font-bold bg-[#06C755] hover:bg-[#05a847] text-white flex items-center justify-center gap-2 shadow-md transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>LINEで友だち追加して空席を見る</span>
              </a>
            </div>
          </div>

          {/* 3. お電話予約 */}
          <div className="strawberry-card p-8 flex flex-col justify-between border-[#ffe3e9] shadow-lg relative bg-white">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs px-2.5 py-1 rounded-full bg-[#5e4748] text-white font-bold">
                  当日予約・お問い合わせ
                </span>
                <Phone className="w-6 h-6 text-[#5e4748]" />
              </div>

              <div>
                <h3 className="text-xl font-serif font-bold text-[#3a2b2c] mb-1">
                  お電話でのご予約
                </h3>
                <p className="text-xs text-[#8c7374]">
                  当日の空き枠や急ぎのお問い合わせに
                </p>
              </div>

              <ul className="text-xs text-[#5e4748] space-y-2 pt-2 border-t border-[#ffe3e9]">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#5e4748] shrink-0" />
                  <span>受付時間: 10:00〜20:00（不定休）</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#5e4748] shrink-0" />
                  <span>GW・お盆・シルバーウィークも営業中</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#5e4748] shrink-0" />
                  <span>お子様・ペット同伴の事前ご相談も承ります</span>
                </li>
              </ul>
            </div>

            <div className="pt-6">
              <a
                href={`tel:${SALON_INFO.phone}`}
                className="w-full text-center py-3.5 rounded-full text-xs font-bold bg-[#fff0f3] hover:bg-[#ffe5ec] text-[#e8436e] border border-[#ffb3c6] flex items-center justify-center gap-2 transition-all"
              >
                <Phone className="w-4 h-4" />
                <span>{SALON_INFO.phone}</span>
              </a>
            </div>
          </div>

        </div>

        {/* 空席カレンダー案内インフォメーション */}
        <div className="p-6 rounded-3xl bg-white border border-[#ffd1dc] shadow-sm max-w-3xl mx-auto flex flex-col sm:flex-row items-center gap-6">
          <div className="w-14 h-14 rounded-2xl bg-[#ffe5ec] flex items-center justify-center text-[#e8436e] shrink-0">
            <Clock className="w-7 h-7" />
          </div>
          <div className="space-y-1 text-center sm:text-left flex-1">
            <h4 className="text-sm font-bold text-[#3a2b2c]">
              空席情報の確認について
            </h4>
            <p className="text-xs text-[#5e4748] leading-relaxed">
              当店ではハンド2席・フット2席のプライベート空間のため、週末や夕方のお時間は早期に埋まる場合がございます。
              最新の空席状況は「HOT PEPPER Beauty」の予約画面、または「公式LINEアカウント」にて常にリアルタイム更新されておりますので、事前のご確認をおすすめいたします。
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
