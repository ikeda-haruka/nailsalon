"use client";

import React from "react";
import { Sparkles, Calendar, MessageCircle, Clock, ShieldCheck, Ticket, CreditCard, ChevronRight } from "lucide-react";
import { MENU_CATEGORIES, SALON_INFO } from "@/data/salonData";

export default function MenuSection() {
  return (
    <section id="menu" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* セクションヘッダー */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100 text-[#ff3366] text-xs font-black tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Menu & Price</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black text-[#2c181b]">
            明朗会計・パラジェル料金表
          </h2>
          <p className="text-xs sm:text-sm text-[#5e4748] font-medium">
            全ハンドコースに自爪を削らないパラジェル＆高持続フィルイン込み。<br className="hidden sm:inline" />
            追加料金のない安心の明朗プライスです。
          </p>
        </div>

        {/* 公式LINE限定クーポン＆回数券バナー (チケット風リッチUI) */}
        <div className="mb-16 p-6 sm:p-10 rounded-[2.5rem] bg-gradient-to-r from-emerald-500/10 via-pink-100/50 to-rose-400/10 border-2 border-[#06C755]/30 shadow-xl relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-[#06C755] text-white flex items-center justify-center shrink-0 shadow-lg shadow-emerald-500/30 text-2xl">
                🎟️
              </div>
              <div className="space-y-1 text-center md:text-left">
                <span className="text-[10px] font-black text-[#06C755] uppercase tracking-wider bg-white px-2.5 py-0.5 rounded-full inline-block border border-[#06C755]/20 shadow-xs">
                  LINE FRIENDS ONLY
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-[#2c181b]">
                  お得な回数券 ＆ 毎月届く限定クーポン
                </h3>
                <p className="text-xs text-[#5e4748] font-medium">
                  3回・5回のお得な回数券は公式LINEよりご購入いただけます。初回来店クーポンも配信中！
                </p>
              </div>
            </div>

            <div className="shrink-0 w-full md:w-auto">
              <a
                href={SALON_INFO.links.line}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full md:w-auto px-7 py-3.5 rounded-full bg-[#06C755] hover:bg-[#05a847] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition-all hover:scale-105"
              >
                <MessageCircle className="w-4 h-4" />
                <span>公式LINEでクーポンを受け取る</span>
              </a>
            </div>
          </div>
        </div>

        {/* メニューカテゴリー別一覧 */}
        <div className="space-y-12">
          {MENU_CATEGORIES.map((cat, idx) => (
            <div key={idx} className="space-y-6">
              <div className="flex items-center gap-3 border-b-2 border-pink-100 pb-3">
                <span className="w-3 h-3 rounded-full bg-[#ff3366]" />
                <h3 className="text-xl sm:text-2xl font-serif font-black text-[#2c181b]">
                  {cat.category}
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {cat.items.map((item, itemIdx) => (
                  <div
                    key={itemIdx}
                    className={`jelly-glass rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 border ${
                      item.recommended
                        ? "border-[#ff3366] shadow-xl bg-white/90"
                        : "border-pink-100/80 bg-white/70"
                    }`}
                  >
                    <div>
                      {item.recommended && (
                        <span className="inline-block px-3 py-0.5 rounded-full bg-[#ff3366] text-white text-[10px] font-black uppercase tracking-wider mb-2.5 shadow-sm">
                          POPULAR ★ おすすめ
                        </span>
                      )}
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <h4 className="text-base font-bold text-[#2c181b] leading-snug">
                          {item.name}
                        </h4>
                        <span className="text-xl font-serif font-black text-[#ff3366] shrink-0">
                          {item.price}
                        </span>
                      </div>
                      <p className="text-xs text-[#5e4748] leading-relaxed mb-4 font-medium">
                        {item.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-pink-100/60 text-xs">
                      {item.time !== "-" ? (
                        <span className="flex items-center gap-1 text-[11px] text-[#8c7374] font-medium">
                          <Clock className="w-3.5 h-3.5 text-[#ff6584]" />
                          目安: {item.time}
                        </span>
                      ) : (
                        <span className="text-[11px] text-[#ff3366] font-bold">
                          指名料: {SALON_INFO.nominationFee}
                        </span>
                      )}
                      <a
                        href={SALON_INFO.links.hotpepper}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-bold text-[#ff3366] hover:underline flex items-center gap-0.5"
                      >
                        予約する <ChevronRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* 決済・指名料カード */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-pink-50/50 border border-pink-200/60 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <p className="text-xs font-bold text-[#2c181b] flex items-center justify-center md:justify-start gap-1.5">
              <CreditCard className="w-4 h-4 text-[#ff3366]" />
              キャッシュレス決済完全対応 ＆ 指名料金のご案内
            </p>
            <p className="text-[11px] text-[#5e4748] font-medium">
              VISA / Master / JCB / Amex / Diners / デビット / PayPay / 交通系IC / 現金 対応<br />
              在籍スタッフ指名料金は一律 <strong className="text-[#ff3366] font-bold">{SALON_INFO.nominationFee}</strong>（税込）です。
            </p>
          </div>
          <a
            href={SALON_INFO.links.hotpepper}
            target="_blank"
            rel="noopener noreferrer"
            className="jelly-button px-6 py-3 rounded-full text-xs font-bold shrink-0 shadow-md"
          >
            クーポン一覧を見る
          </a>
        </div>

      </div>
    </section>
  );
}
