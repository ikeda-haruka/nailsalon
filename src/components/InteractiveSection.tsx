"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { Sparkles, Calendar, Heart, ArrowRight, RotateCcw, Clock } from "lucide-react";
import { SALON_INFO, DESIGNS } from "@/data/salonData";

export default function InteractiveSection() {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [result, setResult] = useState<typeof DESIGNS[0] | null>(null);

  const questions = [
    {
      q: "あなたの普段のライフスタイルや職場の規定は？",
      options: [
        { text: "規定が厳しめ / 上品でちゅるんとした美爪が好き", cat: "office" },
        { text: "トレンドに敏感 / 水光マグネットのうるうるな輝きが好き", cat: "magnet" },
        { text: "季節の移ろいを感じるフラワーやイベントアートが好き", cat: "spring" },
        { text: "シックで大人っぽい深みボルドーやニュアンスが好き", cat: "autumn" }
      ]
    },
    {
      q: "指先で一番叶えたい理想の雰囲気は？",
      options: [
        { text: "血色感あふれる「ちゅるん」とした大人可愛い手元", cat: "office" },
        { text: "角度で光が揺らめく「水光マグネット」の透明感", cat: "magnet" },
        { text: "春の桜やタンポポのようなパステルカラーの愛らしさ", cat: "spring" },
        { text: "くすみカラーやボルドーの洗練されたニュアンス", cat: "autumn" }
      ]
    },
    {
      q: "ネイルサロン選びで最も重視するポイントは？",
      options: [
        { text: "自爪を傷めないパラジェル ＆ 丁寧なウォーターケア", cat: "office" },
        { text: "他店と被らない50種類以上の豊富なマグネットパウダー", cat: "magnet" },
        { text: "3〜4週間綺麗が続く高持続フィルイン技術", cat: "spring" },
        { text: "全席リクライニングや無料カフェドリンクの癒やし空間", cat: "autumn" }
      ]
    }
  ];

  const handleSelectOption = (index: number) => {
    const nextAnswers = [...answers, index];
    setAnswers(nextAnswers);

    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
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
      setCurrentStep(3);

      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#ff3366", "#ff85a1", "#ffd1dc", "#ffffff"]
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

  const vacancyData = [
    { day: "今日 (10/11)", status: "△ 残り1席", hot: true, time: "17:00〜" },
    { day: "明日 (10/12)", status: "◎ 空席あり", hot: false, time: "11:00〜, 15:30〜" },
    { day: "10/13 (火)", status: "◎ 空席あり", hot: false, time: "終日OK" },
    { day: "10/14 (水)", status: "○ 残り2席", hot: false, time: "13:00〜, 18:00〜" },
    { day: "10/15 (木)", status: "◎ 空席あり", hot: false, time: "10:30〜, 14:00〜" },
    { day: "10/16 (金)", status: "△ 残り1席", hot: true, time: "16:00〜" },
    { day: "10/17 (土)", status: "○ 残り2席", hot: false, time: "12:00〜, 17:30〜" },
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* セクションヘッダー */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100 text-[#ff3366] text-xs font-black tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Nail Style Diagnostic</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black text-[#2c181b]">
            3問でわかる！<br className="sm:hidden" />
            大人可愛いネイル診断
          </h2>
          <p className="text-xs sm:text-sm text-[#5e4748] font-medium">
            あなたの好みやライフスタイルに寄り添う、一番輝くデザインをお届けします。
          </p>
        </div>

        {/* 診断カード */}
        <div className="max-w-xl mx-auto jelly-glass rounded-[2.5rem] p-6 sm:p-10 border border-white shadow-2xl mb-20 relative">
          {currentStep < 3 ? (
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-black text-[#ff3366] tracking-wider uppercase">
                  QUESTION 0{currentStep + 1}
                </span>
                <div className="flex gap-1.5">
                  {[0, 1, 2].map((s) => (
                    <div
                      key={s}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        s === currentStep
                          ? "w-8 bg-[#ff3366]"
                          : s < currentStep
                          ? "w-4 bg-pink-300"
                          : "w-4 bg-pink-100"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <h3 className="text-base sm:text-lg font-bold text-[#2c181b] mb-6 leading-snug">
                {questions[currentStep].q}
              </h3>

              <div className="space-y-2.5">
                {questions[currentStep].options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleSelectOption(i)}
                    className="w-full p-4 rounded-2xl text-left text-xs sm:text-sm font-semibold text-[#5e4748] bg-white/80 hover:bg-white border border-pink-100 hover:border-[#ff3366] hover:text-[#ff3366] transition-all flex items-center justify-between group shadow-xs hover:shadow-md"
                  >
                    <span>{opt.text}</span>
                    <ArrowRight className="w-4 h-4 text-pink-300 group-hover:text-[#ff3366] group-hover:translate-x-1 transition-all shrink-0 ml-2" />
                  </button>
                ))}
              </div>
            </div>
          ) : (
            result && (
              <div className="text-center space-y-5 animate-in zoom-in-95 duration-300">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100 text-[#ff3366] text-xs font-black">
                  <Heart className="w-3.5 h-3.5 fill-[#ff3366]" />
                  <span>診断結果・あなたに一番似合うおすすめスタイル</span>
                </div>

                <div className="bg-white rounded-3xl p-5 border border-pink-100 shadow-md sm:flex items-center gap-5 text-left">
                  <div className="w-full sm:w-32 h-32 rounded-2xl overflow-hidden relative shrink-0 mb-3 sm:mb-0 bg-pink-100">
                    <img
                      src={result.image}
                      alt={result.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-black bg-[#ff3366] text-white px-2 py-0.5 rounded-full inline-block">
                      {result.categoryLabel}
                    </span>
                    <h4 className="text-base font-bold text-[#2c181b]">
                      {result.title}
                    </h4>
                    <p className="text-xs text-[#5e4748] font-medium line-clamp-2">
                      {result.description}
                    </p>
                    <p className="text-xs font-serif font-black text-[#ff3366] pt-1">
                      目安料金: {result.price} ({result.duration})
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                  <a
                    href={SALON_INFO.links.hotpepper}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="jelly-button w-full sm:w-auto px-7 py-3.5 rounded-full text-xs font-bold flex items-center justify-center gap-2 shadow-lg"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>このスタイルで空席を探す</span>
                  </a>
                  <button
                    onClick={handleReset}
                    className="px-5 py-3 rounded-full text-xs font-bold text-[#5e4748] bg-white border border-pink-100 hover:bg-pink-50 flex items-center gap-1.5"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>再診断</span>
                  </button>
                </div>
              </div>
            )
          )}
        </div>

        {/* 直近の空席目安カレンダー */}
        <div className="jelly-glass rounded-[2.5rem] p-6 sm:p-10 border border-white shadow-xl max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#ff3366]" />
                <h3 className="text-xl font-serif font-black text-[#2c181b]">
                  直近の空席目安カレンダー
                </h3>
              </div>
              <p className="text-xs text-[#8c7374] font-medium mt-1">
                ハンド2席・フット2席 / リアルタイム空席はHOT PEPPER Beautyにてご確認いただけます
              </p>
            </div>
            <a
              href={SALON_INFO.links.hotpepper}
              target="_blank"
              rel="noopener noreferrer"
              className="jelly-button px-5 py-2.5 rounded-full text-xs font-bold flex items-center gap-1.5 self-start sm:self-auto shrink-0 shadow-md"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>最新の空席表を見る</span>
            </a>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2.5">
            {vacancyData.map((item, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-2xl text-center border transition-all ${
                  item.hot
                    ? "bg-pink-100/70 border-pink-300 shadow-sm"
                    : "bg-white/80 border-pink-100"
                }`}
              >
                <p className="text-[11px] font-bold text-[#2c181b] mb-1">
                  {item.day}
                </p>
                <p className={`text-xs font-black mb-1 ${
                  item.status.includes("◎") ? "text-[#06C755]" : item.status.includes("○") ? "text-[#ff3366]" : "text-[#b00030]"
                }`}>
                  {item.status}
                </p>
                <p className="text-[10px] text-[#8c7374] font-medium">
                  {item.time}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-4 text-center text-[11px] text-[#ff3366] font-bold">
            ※GW・お盆・シルバーウィークなどの連休中も休まず10:00〜20:00営業しております
          </p>
        </div>

      </div>
    </section>
  );
}
