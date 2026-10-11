"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { Sparkles, Calendar, Heart, Check, ArrowRight, RotateCcw, Clock } from "lucide-react";
import { SALON_INFO, DESIGNS } from "@/data/salonData";

export default function InteractiveSection() {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [result, setResult] = useState<typeof DESIGNS[0] | null>(null);

  const questions = [
    {
      q: "普段のライフスタイルや職場のネイル規定は？",
      options: [
        { text: "規定が厳しめ / シンプルで清潔感のある上品な手元が好き", cat: "office" },
        { text: "トレンドに敏感 / うるうるした光の奥行きを楽しみたい", cat: "magnet" },
        { text: "季節の移ろいを感じるフラワーやイベントアートが好き", cat: "spring" },
        { text: "シックで大人っぽい深みカラーやニュアンスが好き", cat: "autumn" }
      ]
    },
    {
      q: "手元の印象で一番目指したい雰囲気は？",
      options: [
        { text: "肌馴染みが良く、血色感のある「ちゅるん」とした美爪", cat: "office" },
        { text: "角度によって水面のように揺らめく「水光マグネット」", cat: "magnet" },
        { text: "見るたびに心が華やぐ「桜やタンポポ」の春色", cat: "spring" },
        { text: "大人っぽくてアンニュイな「ボルドーやくすみカラー」", cat: "autumn" }
      ]
    },
    {
      q: "サロンに最も期待するポイントは？",
      options: [
        { text: "自爪を傷めないパラジェル ＆ 丁寧なウォーターケア", cat: "office" },
        { text: "他店と被らない50種類以上の豊富なマグネットパウダー", cat: "magnet" },
        { text: "3〜4週間綺麗な状態をキープする高持続フィルイン", cat: "spring" },
        { text: "ハンド・フット同時施術やドリンクなどの寛ぎ空間", cat: "autumn" }
      ]
    }
  ];

  const handleSelectOption = (index: number) => {
    const nextAnswers = [...answers, index];
    setAnswers(nextAnswers);

    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // 診断結果判定
      const magnetDesign = DESIGNS.find((d) => d.id === "magnet-water-glow") || DESIGNS[0];
      const officeDesign = DESIGNS.find((d) => d.id === "office-simple") || DESIGNS[0];
      const springDesign = DESIGNS.find((d) => d.id === "spring-sakura") || DESIGNS[0];
      const autumnDesign = DESIGNS.find((d) => d.id === "autumn-bordeaux") || DESIGNS[0];

      const scoreOffice = nextAnswers.filter((a) => a === 0).length;
      const scoreMagnet = nextAnswers.filter((a) => a === 1).length;
      const scoreSpring = nextAnswers.filter((a) => a === 2).length;

      let chosen = magnetDesign;
      if (scoreOffice >= 2) chosen = officeDesign;
      else if (scoreMagnet >= 2) chosen = magnetDesign;
      else if (scoreSpring >= 2) chosen = springDesign;
      else chosen = autumnDesign;

      setResult(chosen);
      setCurrentStep(3); // 結果表示

      // 紙吹雪
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#ff758f", "#ffb3c6", "#e8436e", "#ffe5ec"]
        });
      } catch (e) {
        // ignore
      }
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setAnswers([]);
    setResult(null);
  };

  // 空席シミュレーションデータ
  const vacancyData = [
    { day: "今日 (10/11)", status: "△ 残り1席", hot: true, time: "17:00〜" },
    { day: "明日 (10/12)", status: "◎ 空席あり", hot: false, time: "11:00〜, 15:30〜" },
    { day: "10/13 (火)", status: "◎ 空席あり", hot: false, time: "終日ご案内可能" },
    { day: "10/14 (水)", status: "○ 残り2席", hot: false, time: "13:00〜, 18:00〜" },
    { day: "10/15 (木)", status: "◎ 空席あり", hot: false, time: "10:30〜, 14:00〜" },
    { day: "10/16 (金)", status: "△ 残り1席", hot: true, time: "16:00〜" },
    { day: "10/17 (土)", status: "○ 残り2席", hot: false, time: "12:00〜, 17:30〜" },
  ];

  return (
    <section className="py-24 bg-[#fffafb] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* セクションヘッダー */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ffe5ec] text-[#e8436e] text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-[#ff758f]" />
            <span>Interactive Experience</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#3a2b2c]">
            あなたに似合うネイルスタイル診断
          </h2>
          <p className="text-sm text-[#5e4748] leading-relaxed">
            3つの簡単な質問に答えるだけで、あなたの好みやライフスタイルにぴったりのデザインを提案します。
          </p>
        </div>

        {/* 診断UI */}
        <div className="max-w-2xl mx-auto bg-white rounded-3xl p-8 sm:p-10 border border-[#ffd1dc] shadow-lg mb-20 relative">
          {currentStep < 3 ? (
            <div>
              {/* プログレスバー */}
              <div className="flex items-center justify-between mb-8">
                <span className="text-xs font-bold text-[#e8436e]">
                  Question {currentStep + 1} / 3
                </span>
                <div className="flex gap-1.5">
                  {[0, 1, 2].map((s) => (
                    <div
                      key={s}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        s === currentStep
                          ? "w-8 bg-[#e8436e]"
                          : s < currentStep
                          ? "w-4 bg-[#ffb3c6]"
                          : "w-4 bg-[#ffe5ec]"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* 質問文 */}
              <h3 className="text-lg sm:text-xl font-serif font-bold text-[#3a2b2c] mb-6 leading-snug">
                {questions[currentStep].q}
              </h3>

              {/* 選択肢ボタン */}
              <div className="space-y-3">
                {questions[currentStep].options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleSelectOption(i)}
                    className="w-full p-4 rounded-2xl text-left text-xs sm:text-sm font-medium text-[#5e4748] bg-[#fffafb] border border-[#ffe3e9] hover:border-[#ff758f] hover:bg-[#fff0f3] hover:text-[#e8436e] transition-all flex items-center justify-between group shadow-sm"
                  >
                    <span>{opt.text}</span>
                    <ArrowRight className="w-4 h-4 text-[#ffb3c6] group-hover:text-[#e8436e] group-hover:translate-x-1 transition-all shrink-0 ml-3" />
                  </button>
                ))}
              </div>
            </div>
          ) : (
            result && (
              <div className="text-center space-y-6 animate-in zoom-in-95 duration-300">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ffe5ec] text-[#e8436e] text-xs font-bold">
                  <Heart className="w-3.5 h-3.5 fill-[#e8436e]" />
                  <span>診断結果・あなたに一番似合うおすすめスタイル</span>
                </div>

                <div className="bg-[#fff9fa] rounded-2xl p-6 border border-[#ffd1dc] text-left sm:flex items-center gap-6">
                  <div className="w-full sm:w-36 h-36 rounded-xl overflow-hidden relative shrink-0 mb-4 sm:mb-0">
                    <img
                      src={result.image}
                      alt={result.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="space-y-2">
                    <span className="text-[10px] bg-[#e8436e] text-white px-2 py-0.5 rounded-full font-bold">
                      {result.categoryLabel}
                    </span>
                    <h4 className="text-base sm:text-lg font-serif font-bold text-[#3a2b2c]">
                      {result.title}
                    </h4>
                    <p className="text-xs text-[#5e4748] leading-relaxed">
                      {result.description}
                    </p>
                    <div className="flex items-center gap-4 text-xs font-bold text-[#e8436e] pt-1">
                      <span>料金目安: {result.price}</span>
                      <span>•</span>
                      <span>施術時間: {result.duration}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                  <a
                    href={SALON_INFO.links.hotpepper}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="strawberry-button w-full sm:w-auto px-8 py-3.5 rounded-full text-xs font-bold flex items-center justify-center gap-2 shadow-md"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>このスタイルで空席を探す</span>
                  </a>
                  <button
                    onClick={handleReset}
                    className="px-6 py-3.5 rounded-full text-xs font-medium border border-[#ffe3e9] text-[#5e4748] hover:bg-gray-50 flex items-center gap-1.5"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>もう一度診断する</span>
                  </button>
                </div>
              </div>
            )
          )}
        </div>

        {/* 空席カレンダーシミュレーター */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#ffe3e9] shadow-md max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#e8436e]" />
                <h3 className="text-xl font-serif font-bold text-[#3a2b2c]">
                  直近の空席目安カレンダー
                </h3>
              </div>
              <p className="text-xs text-[#8c7374] mt-1">
                ハンド2席・フット2席 / リアルタイムの最新状況はHOT PEPPER Beautyにてご確認いただけます
              </p>
            </div>
            <a
              href={SALON_INFO.links.hotpepper}
              target="_blank"
              rel="noopener noreferrer"
              className="strawberry-button px-5 py-2.5 rounded-full text-xs font-bold flex items-center gap-1.5 self-start sm:self-auto shrink-0"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>最新の空席表を見る</span>
            </a>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3">
            {vacancyData.map((item, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-2xl text-center border transition-all ${
                  item.hot
                    ? "bg-[#fff0f3] border-[#ff758f] shadow-sm"
                    : "bg-[#fffafb] border-[#ffe3e9]"
                }`}
              >
                <p className="text-[11px] font-bold text-[#3a2b2c] mb-1">
                  {item.day}
                </p>
                <p className={`text-xs font-serif font-bold mb-1 ${
                  item.status.includes("◎") ? "text-[#06C755]" : item.status.includes("○") ? "text-[#e8436e]" : "text-[#cc2855]"
                }`}>
                  {item.status}
                </p>
                <p className="text-[10px] text-[#8c7374] leading-tight">
                  {item.time}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-[#ffe3e9] flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#8c7374]">
            <p>※GW・お盆・シルバーウィークなどの連休中も休まず10:00〜20:00で営業しております。</p>
            <p>※空席は随時変動しますので、お早めのご予約をおすすめします。</p>
          </div>
        </div>

      </div>
    </section>
  );
}
