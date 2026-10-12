"use client";

import React from "react";
import { Check, Calendar, Clock, Sparkles, ShieldCheck } from "lucide-react";
import { MENS_MENUS, MENS_SALON_INFO } from "@/data/mensSalonData";

export default function MensMenuSection() {
  return (
    <section id="menu" className="py-24 sm:py-32 mens-bg-subtle relative border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* セクションヘッダー */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-zinc-700 text-xs font-mono text-zinc-300 shadow-sm uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-zinc-400" />
            <span>Menu &amp; Price</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-light text-white leading-tight">
            メンズ施術メニュー ＆ 料金表
          </h2>

          <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed">
            すべてのコースに丁寧な温水ウォーターケア・甘皮処理・爪の長さ形整えを含みます。<br />
            追加料金のない明朗会計。初めての方も安心してお任せください。
          </p>
        </div>

        {/* メニューカードグリッド */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {MENS_MENUS.map((menu) => (
            <div
              key={menu.id}
              className={`mens-glass rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all space-y-6 relative overflow-hidden ${
                menu.popular ? "border-zinc-500 shadow-xl ring-1 ring-zinc-500/40" : "border-zinc-800"
              }`}
            >
              {menu.popular && (
                <div className="absolute top-0 right-0 bg-white text-zinc-950 font-serif text-[10px] font-bold px-4 py-1 rounded-bl-2xl uppercase tracking-wider">
                  Popular Course
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
                    <Clock className="w-3.5 h-3.5" />
                    <span>所要時間: {menu.time}</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-serif font-medium text-white mt-1 leading-snug">
                    {menu.name}
                  </h3>
                  <p className="text-xs text-zinc-400 font-light mt-1">
                    {menu.subtitle}
                  </p>
                </div>

                <div className="pt-2 border-t border-zinc-800 flex items-baseline gap-2">
                  <span className="text-2xl sm:text-3xl font-serif font-medium text-white">
                    {menu.priceFormatted}
                  </span>
                  <span className="text-xs text-zinc-500 font-light">（税込・ウォーターケア込）</span>
                </div>

                {/* おすすめ対象 */}
                <div className="p-3 rounded-xl bg-zinc-900/80 border border-zinc-800 text-[11px] text-zinc-300">
                  <strong className="text-white block font-medium mb-0.5">おすすめの方:</strong>
                  {menu.recommendedFor}
                </div>

                {/* コース内容リスト */}
                <ul className="space-y-2 pt-2">
                  {menu.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-zinc-300 font-light">
                      <Check className="w-3.5 h-3.5 text-zinc-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 予約ボタン */}
              <div className="pt-4 border-t border-zinc-800">
                <a
                  href={MENS_SALON_INFO.links.hotpepper}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mens-button-white w-full py-3 rounded-full text-xs font-medium flex items-center justify-center gap-2 shadow-md cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>このコースでメンズWeb即時予約</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* 補足案内 */}
        <div className="text-center text-xs text-zinc-500 font-light space-y-1">
          <p>※ 全員男性ネイリストが担当いたします。スタッフをご指名の場合は指名料金（550円税込）を頂戴いたします。</p>
          <p>※ 他店ジェルのオフ（付け替え）も承っております。お気軽にお申し付けください。</p>
        </div>

      </div>
    </section>
  );
}
