"use client";

import React from "react";
import { Sparkles, Heart, ExternalLink, Check, Users, Briefcase } from "lucide-react";
import { SALON_INFO } from "@/data/salonData";

export default function RecruitSection() {
  const recruitPoints = [
    {
      title: "自爪を傷めない最高峰技術が身につく",
      desc: "パラジェルの認定技術とフィルイン（一層残し）を基礎から丁寧に指導。手荒れに悩むネイリストにも優しい環境です。"
    },
    {
      title: "アットホームで余裕のある施術時間",
      desc: "在籍ネイリスト3名の少人数サロン。ハンド2席・フット2席で、お客様一人ひとりと丁寧に向き合える時間配分です。"
    },
    {
      title: "安心の評価制度 ＆ 指名料高率還元",
      desc: "指名料（550円/件）は高率バック！頑張りがしっかり給与に反映される安心のインセンティブ体制です。"
    }
  ];

  return (
    <section id="recruit" className="py-24 bg-gradient-to-b from-[#fff8f9] to-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* セクションヘッダー */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100 text-[#ff3366] text-xs font-black tracking-wider uppercase">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Join Our Team</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black text-[#2c181b]">
            ネイリスト採用情報
          </h2>
          <p className="text-xs sm:text-sm text-[#5e4748] font-medium">
            随時スタッフ募集中。<strong className="text-[#ff3366]">HOT PEPPER Beauty WORK</strong> および <strong className="text-[#2c181b]">Indeed</strong> にて掲載中！
          </p>
        </div>

        {/* 採用カード */}
        <div className="jelly-glass rounded-[2.5rem] p-8 sm:p-12 border border-white shadow-xl max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-5">
              <span className="text-[10px] font-black text-white bg-[#ff3366] px-3 py-1 rounded-full uppercase tracking-wider inline-block shadow-xs">
                正社員 / アルバイト・パート / 業務委託 募集中
              </span>
              
              <h3 className="text-2xl sm:text-3xl font-serif font-black text-[#2c181b] leading-snug">
                削らないパラジェル＆50種マグネット。<br />
                自信の持てる技術を、温かい仲間と一緒に。
              </h3>

              <div className="space-y-3">
                {recruitPoints.map((p, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-pink-100 flex items-center justify-center text-[#ff3366] shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-[#2c181b]">{p.title}</h4>
                      <p className="text-[11px] text-[#5e4748] font-medium mt-0.5">{p.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* 求人リンクボタン */}
              <div className="pt-3 flex flex-col sm:flex-row gap-3">
                <a
                  href={SALON_INFO.links.hotpepperWork}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="jelly-button flex-1 text-center py-3.5 px-5 rounded-full text-xs font-bold flex items-center justify-center gap-2 shadow-md"
                >
                  <span>HOT PEPPER Beauty WORK で見る</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <a
                  href={SALON_INFO.links.indeed}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center py-3.5 px-5 rounded-full text-xs font-bold bg-[#003A9B] hover:bg-[#002b75] text-white flex items-center justify-center gap-2 shadow-md transition-all hover:scale-102"
                >
                  <span>Indeed で見る</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              <p className="text-[10px] text-[#8c7374]">
                ※HOT PEPPER Beauty WORKはHOT PEPPER Beautyと連携している安心の美容系公式求人サービスです。
              </p>
            </div>

            {/* 右側要項 */}
            <div className="lg:col-span-5 bg-white/90 p-6 rounded-3xl border border-pink-100 shadow-sm space-y-3 text-xs">
              <h4 className="font-bold text-sm text-[#2c181b] border-b border-pink-100 pb-2 flex items-center gap-2">
                <Users className="w-4 h-4 text-[#ff3366]" /> 募集要項
              </h4>
              <div className="space-y-2 text-[11px] text-[#5e4748] font-medium">
                <div>
                  <span className="font-bold text-[#2c181b]">職種:</span> ネイリスト（店長候補/スタイリスト/アシスタント）
                </div>
                <div>
                  <span className="font-bold text-[#2c181b]">勤務地:</span> {SALON_INFO.address}（無料駐車場3台完備・車通勤可）
                </div>
                <div>
                  <span className="font-bold text-[#2c181b]">時間:</span> 10:00〜20:00（実働8h / 時短勤務応相談）
                </div>
                <div>
                  <span className="font-bold text-[#2c181b]">休日:</span> 完全週休2日制、年末年始
                </div>
                <div>
                  <span className="font-bold text-[#2c181b]">待遇:</span> 社保完備、交通費支給、指名手当、物販手当、自爪施術無料
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
