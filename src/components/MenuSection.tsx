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
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-lavender-100 text-lavender-700 text-xs font-black tracking-wider uppercase border border-lavender-200">
            <Sparkles className="w-3.5 h-3.5 text-gold-500" />
            <span>Menu & Price</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black text-plum-900">
            明朗会計・パラジェル料金表
          </h2>
          <p className="text-xs sm:text-sm text-plum-700 font-medium">
            全ハンドコースに自爪を削らないパラジェル＆高持続フィルイン込み。<br className="hidden sm:inline" />
            追加料金のない安心の明朗プライスです。
          </p>
        </div>

        {/* 公式LINE限定クーポン＆回数券バナー (チケット風リッチUI) */}
        <div className="mb-16 p-6 sm:p-10 rounded-[2.5rem] bg-gradient-to-r from-emerald-500/10 via-lavender-100/50 to-gold-400/10 border-2 border-[#06C755]/30 shadow-xl relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-[#06C755] text-white flex items-center justify-center shrink-0 shadow-lg shadow-emerald-500/30 text-2xl">
                🎟️
              </div>
              <div className="space-y-1 text-center md:text-left">
                <span className="text-[10px] font-black text-[#06C755] uppercase tracking-wider bg-white px-2.5 py-0.5 rounded-full inline-block border border-[#06C755]/20 shadow-xs">
                  LINE FRIENDS ONLY
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-plum-900">
                  お得な回数券 ＆ 毎月届く限定クーポン
                </h3>
                <p className="text-xs text-plum-700 font-medium">
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
              <div className="flex items-center gap-3 border-b-2 border-lavender-100 pb-3">
                <span className="w-3 h-3 rounded-full bg-lavender-500" />
                <h3 className="text-xl sm:text-2xl font-serif font-black text-plum-900">
                  {cat.category}
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {cat.items.map((item, itemIdx) => (
                  <div
                    key={itemIdx}
                    className={`pearl-glass rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 border ${
                      item.recommended
                        ? "border-lavender-400 shadow-xl bg-white/95 ring-2 ring-lavender-200"
                        : "border-lavender-100 bg-white/80"
                    }`}
                  >
                    <div>
                      {item.recommended && (
                        <span className="inline-block px-3 py-0.5 rounded-full bg-gold-500 text-plum-950 text-[10px] font-black uppercase tracking-wider mb-2.5 shadow-xs">
                          POPULAR ★ おすすめ
                        </span>
                      )}
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <h4 className="text-base font-bold text-plum-900 leading-snug">
                          {item.name}
                        </h4>
                        <span className="text-xl font-serif font-black text-gold-600 shrink-0">
                          {item.price}
                        </span>
                      </div>
                      <p className="text-xs text-plum-700 leading-relaxed mb-4 font-medium">
                        {item.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-lavender-100 flex items-center justify-between text-xs">
                      <span className="text-[10px] text-plum-500 flex items-center gap-1 font-medium">
                        <Clock className="w-3.5 h-3.5 text-lavender-400" />
                        目安: {item.time}
                      </span>
                      <a
                        href={SALON_INFO.links.hotpepper}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-lavender-700 hover:text-lavender-900 font-bold flex items-center gap-1 group text-[11px]"
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

        {/* 決済案内バナー */}
        <div className="mt-16 p-6 sm:p-8 rounded-3xl bg-lavender-50/70 border border-lavender-200 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white text-lavender-600 shadow-xs flex items-center justify-center shrink-0 border border-lavender-200">
              <CreditCard className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-plum-900">各種キャッシュレス決済に対応</h4>
              <p className="text-xs text-plum-600 font-medium mt-0.5">
                クレジットカード（VISA/Master/JCB/Amex/Diners）・デビット・PayPay・交通系IC・現金
              </p>
            </div>
          </div>

          <a
            href={SALON_INFO.links.hotpepper}
            target="_blank"
            rel="noopener noreferrer"
            className="luxe-button w-full md:w-auto px-6 py-3 rounded-full text-xs font-bold text-center shrink-0 shadow-md"
          >
            <span>クーポン一覧・ネット予約</span>
          </a>
        </div>

      </div>
    </section>
  );
}
