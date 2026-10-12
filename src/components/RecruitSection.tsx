"use client";

import React from "react";
import { Sparkles, Heart, ExternalLink, Check, Users, Briefcase } from "lucide-react";
import { SALON_INFO } from "@/data/salonData";

export default function RecruitSection() {
  const recruitPoints = [
    {
      title: "自爪を傷めない最高峰パラジェル技術が身につく",
      desc: "パラジェルの認定技術とフィルイン（一層残し）を基礎から丁寧に指導。手荒れに悩むネイリストにも優しい環境です。"
    },
    {
      title: "アットホームで余裕のある施術時間配分",
      desc: "在籍ネイリスト3名の少人数サロン。ハンド2席・フット2席で、お客様一人ひとりと丁寧に向き合える上質なおもてなし。"
    },
    {
      title: "安心の評価制度 ＆ 指名料高率還元",
      desc: "指名料（550円/件）は高率バック！頑張りがしっかり給与に反映される安心のインセンティブ体制です。"
    }
  ];

  return (
    <section id="recruit" className="py-24 bg-gradient-to-b from-white via-lavender-50/20 to-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* セクションヘッダー */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-lavender-100 text-lavender-700 text-xs font-black tracking-wider uppercase border border-lavender-200">
            <Briefcase className="w-3.5 h-3.5 text-gold-500" />
            <span>Join Our Team</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black text-plum-900">
            ネイリスト採用情報
          </h2>
          <p className="text-xs sm:text-sm text-plum-700 font-medium">
            随時スタッフ募集中。<strong className="text-lavender-700">HOT PEPPER Beauty WORK</strong> および <strong className="text-plum-900">Indeed</strong> にて掲載中！
          </p>
        </div>

        {/* 採用カード */}
        <div className="pearl-glass rounded-[2.5rem] p-8 sm:p-12 border border-lavender-200 shadow-xl max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-5">
              <span className="text-[10px] font-black text-plum-950 bg-gold-400 px-3 py-1 rounded-full uppercase tracking-wider inline-block shadow-xs">
                正社員 / アルバイト・パート / 業務委託 募集中
              </span>
              
              <h3 className="text-2xl sm:text-3xl font-serif font-black text-plum-900 leading-snug">
                削らないパラジェル＆50種水光マグネット。<br />
                自信の持てる技術を、温かい仲間と一緒に。
              </h3>

              <div className="space-y-3">
                {recruitPoints.map((p, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-lavender-100 border border-lavender-200 flex items-center justify-center text-lavender-700 shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-plum-900">{p.title}</h4>
                      <p className="text-[11px] text-plum-600 font-medium mt-0.5">{p.desc}</p>
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
                  className="luxe-button flex-1 text-center py-3.5 px-5 rounded-full text-xs font-bold flex items-center justify-center gap-2 shadow-md"
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

              <p className="text-[10px] text-plum-500">
                ※HOT PEPPER Beauty WORKはHOT PEPPER Beautyと連携している安心の美容系公式求人サービスです。
              </p>
            </div>

            {/* 右側要項 */}
            <div className="lg:col-span-5 bg-white/90 p-6 rounded-3xl border border-lavender-100 shadow-sm space-y-3 text-xs">
              <h4 className="font-bold text-sm text-plum-900 border-b border-lavender-100 pb-2 flex items-center gap-2">
                <Users className="w-4 h-4 text-lavender-600" /> 募集要項
              </h4>
              <ul className="space-y-2 text-plum-700 font-medium">
                <li className="flex justify-between border-b border-lavender-50 pb-1.5">
                  <span className="text-plum-400">職種:</span>
                  <span className="font-bold text-plum-900">ネイリスト（経験者優遇）</span>
                </li>
                <li className="flex justify-between border-b border-lavender-50 pb-1.5">
                  <span className="text-plum-400">給与:</span>
                  <span className="font-bold text-plum-900">月給25万〜45万円 + 指名手当</span>
                </li>
                <li className="flex justify-between border-b border-lavender-50 pb-1.5">
                  <span className="text-plum-400">勤務時間:</span>
                  <span>10:00〜20:00（シフト制）</span>
                </li>
                <li className="flex justify-between border-b border-lavender-50 pb-1.5">
                  <span className="text-plum-400">休日:</span>
                  <span>週休2日制・有給休暇あり</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-plum-400">福利厚生:</span>
                  <span>社保完備 / 施術・物販社割 / 交通費</span>
                </li>
              </ul>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
