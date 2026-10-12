"use client";

import React from "react";
import { Sparkles, Calendar, MessageCircle, Clock, ShieldCheck, Ticket, CreditCard, ChevronRight } from "lucide-react";
import { MENU_CATEGORIES, SALON_INFO, FEE_TABLE } from "@/data/salonData";

export default function MenuSection() {
  return (
    <section id="menu" className="py-20 sm:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* セクションヘッダー */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-lavender-100 text-lavender-700 text-xs font-normal tracking-widest uppercase border border-lavender-200 font-serif">
            <Sparkles className="w-3.5 h-3.5 text-gold-500" />
            <span>Menu & Price</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-normal text-plum-900 leading-[1.35] tracking-wide">
            明朗会計・パラジェル料金表
          </h2>
          <p className="text-xs sm:text-sm text-plum-700 font-light tracking-wide leading-relaxed">
            全ハンドコースに自爪を削らないパラジェル＆高持続フィルイン込み。<br className="hidden sm:inline" />
            オフ代や追加料金の不安を解消する、安心の明朗プライス設計です。
          </p>
        </div>

        {/* 公式LINE限定クーポン＆回数券バナー (チケット風リッチUI) */}
        <div className="mb-14 p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-emerald-500/10 via-lavender-100/50 to-gold-400/10 border-2 border-[#06C755]/30 shadow-md relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4 sm:gap-5">
              <div className="w-12 sm:w-14 h-12 sm:h-14 rounded-2xl bg-[#06C755] text-white flex items-center justify-center shrink-0 shadow-md shadow-emerald-500/20">
                <Ticket className="w-6 h-6" />
              </div>
              <div className="space-y-1 text-center md:text-left">
                <span className="text-[10px] font-normal text-[#06C755] uppercase tracking-widest bg-white px-2.5 py-0.5 rounded-full inline-block border border-[#06C755]/20 shadow-2xs font-serif">
                  LINE FRIENDS ONLY
                </span>
                <h3 className="text-base sm:text-lg font-serif font-normal text-plum-900 tracking-wide">
                  お得な回数券 ＆ 毎月届く限定クーポン
                </h3>
                <p className="text-xs text-plum-700 font-light tracking-wide">
                  3回・5回のお得な回数券や、初回来店¥1,000OFFクーポンは公式LINEより受け取れます。
                </p>
              </div>
            </div>

            <div className="shrink-0 w-full md:w-auto">
              <a
                href={SALON_INFO.links.line}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full md:w-auto px-6 py-3 rounded-full bg-[#06C755] hover:bg-[#05a847] text-white font-medium text-xs flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20 transition-all hover:scale-102 tracking-wider"
              >
                <MessageCircle className="w-4 h-4" />
                <span>公式LINEで¥1,000OFFクーポン取得</span>
              </a>
            </div>
          </div>
        </div>

        {/* メニューカテゴリー別一覧 */}
        <div className="space-y-12 mb-16">
          {MENU_CATEGORIES.map((cat, idx) => (
            <div key={idx} className="space-y-5">
              <div className="flex items-center gap-2.5 border-b border-lavender-100 pb-2.5">
                <span className="w-2 h-2 rounded-full bg-lavender-500" />
                <h3 className="text-lg sm:text-xl font-serif font-normal text-plum-900 tracking-wide">
                  {cat.category}
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                {cat.items.map((item, itemIdx) => (
                  <div
                    key={itemIdx}
                    className={`pearl-glass rounded-2xl sm:rounded-3xl p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 border ${
                      item.recommended
                        ? "border-lavender-400 shadow-lg bg-white/95 ring-1 ring-lavender-200"
                        : "border-lavender-100/80 bg-white/80"
                    }`}
                  >
                    <div>
                      {item.recommended && (
                        <span className="inline-block px-2.5 py-0.5 rounded-full bg-gold-500 text-plum-950 text-[10px] font-normal uppercase tracking-widest mb-2 shadow-2xs font-serif">
                          POPULAR ★ おすすめ
                        </span>
                      )}
                      <div className="flex items-start justify-between gap-3 mb-1.5">
                        <h4 className="text-sm sm:text-base font-serif font-normal text-plum-900 leading-snug tracking-wide">
                          {item.name}
                        </h4>
                        <span className="text-lg sm:text-xl font-serif font-light text-gold-600 shrink-0 tracking-wider">
                          {item.price}
                        </span>
                      </div>
                      <p className="text-xs text-plum-700 leading-relaxed mb-4 font-light tracking-wide">
                        {item.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-lavender-100/70 flex items-center justify-between text-xs">
                      <span className="text-[10px] text-plum-500 flex items-center gap-1 font-light tracking-wide">
                        <Clock className="w-3.5 h-3.5 text-lavender-400" />
                        目安: {item.time}
                      </span>
                      <a
                        href={SALON_INFO.links.hotpepper}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-lavender-700 hover:text-lavender-900 font-medium flex items-center gap-0.5 group text-xs tracking-wide"
                      >
                        <span>予約へ</span>
                        <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* 初回料金・オフ代・追加料金の一覧表（料金の不安を完全解消） */}
        <div className="pearl-glass rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-lavender-200 shadow-md mb-14">
          <div className="mb-5 space-y-1">
            <span className="text-[10px] font-normal text-lavender-700 uppercase tracking-widest bg-lavender-50 px-2.5 py-0.5 rounded-full border border-lavender-200 inline-block font-serif">
              ALL CLEAR PRICING
            </span>
            <h3 className="text-lg sm:text-xl font-serif font-normal text-plum-900 tracking-wide">
              オフ代・追加料金・補修オプション一覧
            </h3>
            <p className="text-xs text-plum-600 font-light">
              当サロンは施術前にお見積りを確認する完全明朗会計です。不明な追加料金は一切発生いたしません。
            </p>
          </div>

          <div className="divide-y divide-lavender-100 text-xs">
            {FEE_TABLE.map((row, idx) => (
              <div key={idx} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4">
                <div className="flex-1">
                  <span className="font-serif font-normal text-plum-900 tracking-wide">{row.item}</span>
                  <span className="text-[11px] text-plum-500 font-light ml-0 sm:ml-2 block sm:inline">（{row.note}）</span>
                </div>
                <div className="text-right sm:text-right shrink-0">
                  <span className="font-serif font-medium text-sm text-gold-700 tracking-wider">{row.price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 決済案内バナー */}
        <div className="p-6 sm:p-7 rounded-2xl sm:rounded-3xl bg-lavender-50/70 border border-lavender-200 flex flex-col md:flex-row items-center justify-between gap-5">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-white text-lavender-600 shadow-2xs flex items-center justify-center shrink-0 border border-lavender-200">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-serif font-normal text-plum-900 tracking-wide">各種キャッシュレス決済に対応</h4>
              <p className="text-[11px] text-plum-600 font-light mt-0.5 tracking-wide">
                クレジットカード（VISA/Master/JCB/Amex/Diners）・デビット・PayPay・交通系IC・現金
              </p>
            </div>
          </div>

          <a
            href={SALON_INFO.links.hotpepper}
            target="_blank"
            rel="noopener noreferrer"
            className="luxe-button w-full md:w-auto px-6 py-2.5 rounded-full text-xs font-medium text-center shrink-0 shadow-md tracking-wider"
          >
            <span>クーポン一覧・ネット即時予約</span>
          </a>
        </div>

      </div>
    </section>
  );
}
