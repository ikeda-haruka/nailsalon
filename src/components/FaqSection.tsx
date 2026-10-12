"use client";

import React, { useState } from "react";
import { Sparkles, ChevronDown, HelpCircle } from "lucide-react";
import { FAQS } from "@/data/salonData";

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 sm:py-24 bg-white relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* セクションヘッダー */}
        <div className="text-center mb-12 sm:mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-lavender-100 text-lavender-700 text-xs font-normal tracking-widest uppercase border border-lavender-200 font-serif">
            <HelpCircle className="w-3.5 h-3.5 text-gold-500" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif font-normal text-plum-900 leading-[1.3] tracking-wide">
            よくあるご質問
          </h2>
          <p className="text-xs sm:text-sm text-plum-700 font-light tracking-wide leading-relaxed">
            パラジェルや水光マグネット、持ちの期間やサロン設備についてお答えしております。<br className="hidden sm:inline" />
            その他のご不安な点も、公式LINEまたはお電話にてお気軽にお問い合わせください。
          </p>
        </div>

        {/* アコーディオンリスト（全8問完全回答） */}
        <div className="space-y-3.5">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="pearl-glass rounded-2xl sm:rounded-3xl overflow-hidden border border-lavender-200/80 transition-all shadow-2xs"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-3 sm:gap-4 hover:bg-lavender-50/50 transition-colors"
                >
                  <span className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-full bg-lavender-100 text-lavender-700 text-xs font-serif font-medium flex items-center justify-center shrink-0 border border-lavender-200">
                      Q
                    </span>
                    <span className="text-xs sm:text-sm font-serif font-normal text-plum-900 tracking-wide">
                      {faq.q}
                    </span>
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-lavender-500 shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="p-4 sm:p-5 pt-0 border-t border-lavender-100 bg-white/90 animate-in fade-in duration-200">
                    <div className="flex items-start gap-3 mt-3">
                      <span className="w-7 h-7 rounded-full bg-gold-400 text-plum-950 text-xs font-serif font-medium flex items-center justify-center shrink-0 shadow-2xs">
                        A
                      </span>
                      <p className="text-xs text-plum-700 leading-relaxed font-light tracking-wide pt-1">
                        {faq.a}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
