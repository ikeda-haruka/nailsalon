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
    <section id="faq" className="py-24 bg-white relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* セクションヘッダー */}
        <div className="text-center mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ffe5ec] text-[#e8436e] text-xs font-semibold">
            <HelpCircle className="w-3.5 h-3.5 text-[#ff758f]" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#3a2b2c]">
            よくあるご質問
          </h2>
          <p className="text-sm text-[#5e4748] leading-relaxed">
            ご来店前にお客様から多くいただくご質問にお答えしております。<br className="hidden sm:inline" />
            その他気になる点がございましたら、お電話やLINEにてお気軽にお問い合わせください。
          </p>
        </div>

        {/* アコーディオンリスト */}
        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="border border-[#ffe3e9] rounded-2xl overflow-hidden bg-[#fffafb] transition-all"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-[#fff0f3] transition-colors"
                >
                  <span className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-full bg-[#ffe5ec] text-[#e8436e] text-xs font-bold flex items-center justify-center shrink-0">
                      Q
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-[#3a2b2c]">
                      {faq.q}
                    </span>
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#ff758f] shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="p-5 pt-0 border-t border-[#ffe3e9]/60 bg-white">
                    <div className="flex items-start gap-3 mt-4">
                      <span className="w-7 h-7 rounded-full bg-[#e8436e] text-white text-xs font-bold flex items-center justify-center shrink-0">
                        A
                      </span>
                      <p className="text-xs text-[#5e4748] leading-relaxed pt-1">
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
