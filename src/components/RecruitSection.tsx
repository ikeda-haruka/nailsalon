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
      title: "在籍12名体制・毎日2〜3名シフトで無理のないゆったり施術",
      desc: "サロンには総勢12名のネイリストが在籍し、毎日2〜3名のスタッフが交代でシフト勤務。ハンド2席・フット2席で余裕を持った時間配分のため、一人ひとりのお客様へ上質なおもてなしができます。"
    },
    {
      title: "公式オンラインショップの出荷業務も担当（EC専任スタッフ不要の効率体制）",
      desc: "サロンスタッフが公式オンラインショップ（パラジェルネイルチップ・専売ジェル等）の検品・梱包出荷も担当します。12名が在籍し毎日2〜3名が常時勤務しているため、EC運営のみを行う別スタッフを雇う必要がなく、サロンワークとEC運営を無理なく両立できる安定したビジネスモデルです。"
    },
    {
      title: "安心の評価制度 ＆ 指名料高率還元",
      desc: "指名料（550円/件）は高率バック！物販・EC売上実績も評価に反映される安心のインセンティブ体制です。"
    }
  ];

  return (
    <section id="recruit" className="py-20 sm:py-24 bg-gradient-to-b from-white via-lavender-50/20 to-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* セクションヘッダー */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-lavender-100 text-lavender-700 text-xs font-normal tracking-widest uppercase border border-lavender-200 font-serif">
            <Briefcase className="w-3.5 h-3.5 text-gold-500" />
            <span>Join Our Team</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-normal text-plum-900 leading-[1.35] tracking-wide">
            ネイリスト採用情報
          </h2>
          <p className="text-xs sm:text-sm text-plum-700 font-light tracking-wide leading-relaxed">
            随時スタッフ募集中。<strong className="text-lavender-700 font-normal">HOT PEPPER Beauty WORK</strong> および <strong className="text-plum-900 font-normal">Indeed</strong> にて掲載中！
          </p>
        </div>

        {/* 採用カード */}
        <div className="pearl-glass rounded-[2.5rem] p-8 sm:p-12 border border-lavender-200 shadow-xl max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-5">
              <span className="text-[10px] font-normal text-plum-950 bg-gold-400 px-3 py-1 rounded-full uppercase tracking-widest inline-block shadow-xs font-serif">
                正社員 / アルバイト・パート / 業務委託 募集中
              </span>
              
              <h3 className="text-2xl sm:text-3xl font-serif font-normal text-plum-900 leading-relaxed tracking-wide">
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
                      <h4 className="text-xs font-serif font-normal text-plum-900 tracking-wide">{p.title}</h4>
                      <p className="text-[11px] text-plum-600 font-light mt-0.5 tracking-wide">{p.desc}</p>
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
                  className="luxe-button flex-1 text-center py-3.5 px-5 rounded-full text-xs font-medium flex items-center justify-center gap-2 shadow-md tracking-wider"
                >
                  <span>HOT PEPPER Beauty WORK で見る</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <a
                  href={SALON_INFO.links.indeed}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center py-3.5 px-5 rounded-full text-xs font-medium bg-[#003A9B] hover:bg-[#002b75] text-white flex items-center justify-center gap-2 shadow-md transition-all hover:scale-102 tracking-wider"
                >
                  <span>Indeed で見る</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              <p className="text-[10px] text-plum-500 font-light tracking-wide">
                ※HOT PEPPER Beauty WORKはHOT PEPPER Beautyと連携している安心の美容系公式求人サービスです。
              </p>
            </div>

            {/* 右側要項 */}
            <div className="lg:col-span-5 bg-white/90 p-6 rounded-3xl border border-lavender-100 shadow-sm space-y-3 text-xs">
              <h4 className="font-serif font-normal text-sm text-plum-900 border-b border-lavender-100 pb-2 flex items-center gap-2 tracking-wide">
                <Users className="w-4 h-4 text-lavender-600" /> 募集要項
              </h4>
              <ul className="space-y-2 text-plum-700 font-light">
                <li className="flex justify-between border-b border-lavender-50 pb-1.5">
                  <span className="text-plum-400 font-serif">職種:</span>
                  <span className="text-plum-900 font-normal">ネイリスト（サロン施術 ＆ EC出荷担当）</span>
                </li>
                <li className="flex justify-between border-b border-lavender-50 pb-1.5">
                  <span className="text-plum-400 font-serif">仕事内容:</span>
                  <span className="text-plum-800 text-[11px] text-right">サロン施術・接客、公式EC商品の検品・梱包出荷</span>
                </li>
                <li className="flex justify-between border-b border-lavender-50 pb-1.5">
                  <span className="text-plum-400 font-serif">給与:</span>
                  <span className="text-plum-900 font-normal font-serif">月給25万〜45万円 + 指名手当</span>
                </li>
                <li className="flex justify-between border-b border-lavender-50 pb-1.5">
                  <span className="text-plum-400 font-serif">勤務体制:</span>
                  <span className="font-serif">在籍12名 / 毎日2〜3名シフト勤務 (10:00〜20:00)</span>
                </li>
                <li className="flex justify-between border-b border-lavender-50 pb-1.5">
                  <span className="text-plum-400 font-serif">休日:</span>
                  <span>週休2日制・有給休暇あり</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-plum-400 font-serif">福利厚生:</span>
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
