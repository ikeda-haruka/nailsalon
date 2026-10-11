"use client";

import React from "react";
import { Sparkles, Heart, ExternalLink, Check, Users, Award, Briefcase } from "lucide-react";
import { SALON_INFO } from "@/data/salonData";

export default function RecruitSection() {
  const recruitPoints = [
    {
      title: "自爪を傷めない最高峰技術が身につく",
      desc: "パラジェルの認定技術と、アセトンを使わないフィルイン（一層残し）を基礎からしっかり指導。手荒れに悩むネイリストにも優しい環境です。"
    },
    {
      title: "アットホームで働きやすい環境",
      desc: "在籍ネイリスト3名の少人数アットホームサロン。ハンド2席・フット2席で、一人ひとりのお客様と丁寧に向き合える時間配分（余裕を持った施術時間設定）です。"
    },
    {
      title: "安心の評価制度＆指名還元",
      desc: "指名料（550円/件）は高率バック！技術向上やお客様満足度がしっかりと給与に反映される安心のインセンティブ体制です。"
    }
  ];

  return (
    <section id="recruit" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* セクションヘッダー */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ffe5ec] text-[#e8436e] text-xs font-semibold">
            <Briefcase className="w-3.5 h-3.5 text-[#ff758f]" />
            <span>Recruit & Careers</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#3a2b2c]">
            ネイリスト採用情報（随時募集中）
          </h2>
          <p className="text-sm text-[#5e4748] leading-relaxed">
            Salon de Fraise では、お客様の指先と笑顔を大切にしてくださるネイリストを随時募集しております。<br className="hidden sm:inline" />
            <strong className="text-[#e8436e]">HOT PEPPER Beauty WORK</strong> および <strong className="text-[#3a2b2c]">Indeed</strong> にて求人情報を掲載中です。
          </p>
        </div>

        {/* 採用メインカード */}
        <div className="bg-gradient-to-br from-[#fff5f7] via-[#fff9fa] to-[#ffe8ee] rounded-3xl p-8 sm:p-12 border border-[#ffd1dc] shadow-sm mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-bold text-[#e8436e] uppercase tracking-wider bg-white px-3 py-1 rounded-full border border-[#ffb3c6] inline-block">
                正社員 / アルバイト・パート / 業務委託 募集中
              </span>
              
              <h3 className="text-2xl font-serif font-bold text-[#3a2b2c] leading-snug">
                削らないパラジェル＆50種マグネット。<br />
                自信の持てる技術を、温かい仲間と一緒に。
              </h3>

              <div className="space-y-4">
                {recruitPoints.map((point, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#ffe5ec] flex items-center justify-center text-[#e8436e] shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#3a2b2c]">
                        {point.title}
                      </h4>
                      <p className="text-xs text-[#5e4748] mt-0.5 leading-relaxed">
                        {point.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* 求人媒体掲載の案内バナー */}
              <div className="pt-4 border-t border-[#ffd1dc] flex flex-col sm:flex-row gap-4">
                <a
                  href={SALON_INFO.links.hotpepperWork}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="strawberry-button flex-1 text-center py-3.5 px-6 rounded-full text-xs font-bold flex items-center justify-center gap-2 shadow-md"
                >
                  <span>HOT PEPPER Beauty WORK で求人を見る</span>
                  <ExternalLink className="w-4 h-4" />
                </a>

                <a
                  href={SALON_INFO.links.indeed}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center py-3.5 px-6 rounded-full text-xs font-bold bg-[#003A9B] hover:bg-[#002b75] text-white flex items-center justify-center gap-2 shadow-md transition-colors"
                >
                  <span>Indeed で求人を見る</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>

              <p className="text-[11px] text-[#8c7374]">
                ※HOT PEPPER Beauty WORKはHOT PEPPER Beautyと連携している安心の美容系公式求人サービスです。
              </p>
            </div>

            {/* 右側: 募集要項概要テーブル */}
            <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-2xl border border-[#ffe3e9] shadow-sm space-y-4 text-xs">
              <h4 className="font-serif font-bold text-base text-[#3a2b2c] border-b border-[#ffe3e9] pb-3 flex items-center gap-2">
                <Users className="w-4 h-4 text-[#e8436e]" /> 募集要項サマリー
              </h4>

              <dl className="space-y-3">
                <div>
                  <dt className="font-bold text-[#3a2b2c]">募集職種</dt>
                  <dd className="text-[#5e4748] mt-0.5">ネイリスト（店長候補 / スタイリスト / アシスタント）</dd>
                </div>
                <div>
                  <dt className="font-bold text-[#3a2b2c]">応募資格</dt>
                  <dd className="text-[#5e4748] mt-0.5">JNECネイリスト技能検定2級以上、または同等の実務経験（未経験・ブランクある方も研修制度あり）</dd>
                </div>
                <div>
                  <dt className="font-bold text-[#3a2b2c]">勤務地</dt>
                  <dd className="text-[#5e4748] mt-0.5">{SALON_INFO.address}（駐車場3台完備・車通勤可）</dd>
                </div>
                <div>
                  <dt className="font-bold text-[#3a2b2c]">勤務時間</dt>
                  <dd className="text-[#5e4748] mt-0.5">10:00〜20:00（シフト制・実働8時間 / パートは時短相談可）</dd>
                </div>
                <div>
                  <dt className="font-bold text-[#3a2b2c]">休日・休暇</dt>
                  <dd className="text-[#5e4748] mt-0.5">完全週休2日制（シフト制）、年末年始休暇、有給休暇</dd>
                </div>
                <div>
                  <dt className="font-bold text-[#3a2b2c]">待遇・福利厚生</dt>
                  <dd className="text-[#5e4748] mt-0.5">社会保険完備、交通費支給、指名手当、物販手当、ネイル無料、制服貸与</dd>
                </div>
              </dl>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
