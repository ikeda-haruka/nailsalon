"use client";

import React, { useState } from "react";
import { Sparkles, ChevronDown, HelpCircle } from "lucide-react";
import { FAQS } from "@/data/salonData";

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [activeFaqCategory, setActiveFaqCategory] = useState<string>("all");

  const faqCategories = [
    { id: "all", label: "すべて（12問）" },
    { id: "paragel", label: "自爪・パラジェル" },
    { id: "magnet", label: "水光マグネット" },
    { id: "service", label: "持ち込み・オフ・予約" },
    { id: "access", label: "設備・駐車場" },
  ];

  const filteredFaqs =
    activeFaqCategory === "all"
      ? FAQS
      : FAQS.filter((f) => f.category === activeFaqCategory);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 sm:py-24 bg-white relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* セクションヘッダー */}
        <div className="text-center mb-10 sm:mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-lavender-100 text-lavender-700 text-xs font-normal tracking-widest uppercase border border-lavender-200 font-serif">
            <HelpCircle className="w-3.5 h-3.5 text-gold-500" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-normal text-plum-900 leading-[1.35] tracking-wide">
            よくあるご質問
          </h2>
          <p className="text-xs sm:text-sm text-plum-700 font-light tracking-wide leading-relaxed">
            パラジェルや水光マグネット、持ち込みデザインやオフ代、施術時間についてお答えしております。<br className="hidden sm:inline" />
            気になる点がございましたら、公式LINEより画像付きでお気軽にご相談いただけます。
          </p>
        </div>

        {/* カテゴリタブ */}
        <div className="flex items-center justify-center gap-1.5 sm:gap-2 flex-wrap mb-8">
          {faqCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveFaqCategory(cat.id);
                setOpenIndex(0);
              }}
              className={`px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-normal transition-all duration-200 cursor-pointer ${
                activeFaqCategory === cat.id
                  ? "bg-lavender-600 text-white shadow-xs font-medium"
                  : "bg-lavender-50/80 text-plum-700 hover:bg-lavender-100"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* アコーディオンリスト（全12問完全回答） */}
        <div className="space-y-3">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="pearl-glass rounded-2xl overflow-hidden border border-lavender-200/80 transition-all shadow-2xs"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-3 sm:gap-4 hover:bg-lavender-50/50 transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-lavender-100 text-lavender-700 text-xs font-serif font-medium flex items-center justify-center shrink-0 border border-lavender-200">
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
                      <span className="w-6 h-6 rounded-full bg-gold-400 text-plum-950 text-xs font-serif font-medium flex items-center justify-center shrink-0 shadow-2xs">
                        A
                      </span>
                      <p className="text-xs text-plum-700 leading-relaxed font-light tracking-wide pt-0.5">
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
