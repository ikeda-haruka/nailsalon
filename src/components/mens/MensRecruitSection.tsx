"use client";

import React from "react";
import { Briefcase, Check, ExternalLink, Users, Sparkles } from "lucide-react";
import { MENS_RECRUIT_INFO, MENS_SALON_INFO } from "@/data/mensSalonData";

export default function MensRecruitSection() {
  return (
    <section id="recruit" className="py-24 sm:py-32 mens-bg-subtle relative border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* セクションヘッダー */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-zinc-700 text-xs font-mono text-zinc-300 shadow-sm uppercase tracking-widest">
            <Briefcase className="w-3.5 h-3.5 text-zinc-400" />
            <span>Join Our Male Team</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-light text-white leading-tight">
            男性ネイリスト新規採用情報
          </h2>

          <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed">
            現在在籍5名体制から、拡大に伴い新たな男性ネイリストを募集中。<br />
            「メンズネイル」という新しい文化のフロンティアを、共に切り拓く情熱ある仲間を歓迎します。
          </p>
        </div>

        {/* 採用カード */}
        <div className="mens-glass rounded-[2.5rem] p-8 sm:p-12 border border-zinc-800 max-w-5xl mx-auto shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* 左側：特徴と想い（7カラム） */}
            <div className="lg:col-span-7 space-y-5">
              <span className="text-[10px] font-mono uppercase tracking-widest px-3 py-1 rounded-full bg-white text-zinc-950 font-bold inline-block shadow-sm">
                正社員 / 業務委託 / パート 募集中
              </span>

              <h3 className="text-xl sm:text-2xl font-serif font-light text-white leading-relaxed">
                自爪を削らないパラジェル ＆ 完全個室。<br />
                男性同士だからこそ高め合える環境で。
              </h3>

              <div className="space-y-3 pt-2">
                {MENS_RECRUIT_INFO.points.map((p, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-300 shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-serif font-medium text-white">{p.title}</h4>
                      <p className="text-[11px] text-zinc-400 font-light mt-0.5 leading-relaxed">{p.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* 応募リンクボタン */}
              <div className="pt-4 flex flex-col sm:flex-row gap-3">
                <a
                  href={MENS_SALON_INFO.links.hotpepperWork}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mens-button-white flex-1 text-center py-3.5 px-5 rounded-full text-xs font-semibold flex items-center justify-center gap-2 shadow-lg tracking-wider"
                >
                  <span>HOT PEPPER Beauty WORK で見る</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <a
                  href={MENS_SALON_INFO.links.indeed}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mens-button-silver flex-1 text-center py-3.5 px-5 rounded-full text-xs font-medium flex items-center justify-center gap-2 transition-all tracking-wider"
                >
                  <span>Indeed で応募要項を見る</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* 右側：募集要項スペック（5カラム） */}
            <div className="lg:col-span-5 bg-zinc-950/80 p-6 rounded-3xl border border-zinc-800 space-y-3 text-xs">
              <h4 className="font-serif font-medium text-sm text-white border-b border-zinc-800 pb-2 flex items-center gap-2">
                <Users className="w-4 h-4 text-zinc-400" /> 募集要項
              </h4>

              <ul className="space-y-2 text-zinc-300 font-light">
                <li className="flex justify-between border-b border-zinc-900 pb-1.5">
                  <span className="text-zinc-500">職種:</span>
                  <span className="text-white font-medium">メンズネイリスト（施術 ＆ EC出荷担当）</span>
                </li>
                <li className="flex justify-between border-b border-zinc-900 pb-1.5">
                  <span className="text-zinc-500">給与:</span>
                  <span className="text-white font-serif font-medium">月給26万〜48万円 + 指名全額還元</span>
                </li>
                <li className="flex justify-between border-b border-zinc-900 pb-1.5">
                  <span className="text-zinc-500">勤務形態:</span>
                  <span>在籍5名体制 / シフト制 (10:30〜21:30)</span>
                </li>
                <li className="flex justify-between border-b border-zinc-900 pb-1.5">
                  <span className="text-zinc-500">休日:</span>
                  <span>完全週休2日制（有給あり）</span>
                </li>
                <li className="flex justify-between border-b border-zinc-900 pb-1.5">
                  <span className="text-zinc-500">資格:</span>
                  <span>JNEC/JNA検定保持者優遇（メンズ未経験可）</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-zinc-500">福利厚生:</span>
                  <span>社保完備 / 交通費全額 / 独立支援制度</span>
                </li>
              </ul>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
