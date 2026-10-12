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
        { text: "規定が厳しめ / 上品でちゅるんとした美爪・血色感が好き", cat: "office" },
        { text: "トレンドに敏感 / 水光マグネットのうるうるな輝きが好き", cat: "magnet" },
        { text: "季節の移ろいを感じるフラワーやイベントアートが好き", cat: "spring" },
        { text: "シックで大人っぽい深みボルドーやニュアンスが好き", cat: "autumn" }
      ]
    },
    {
      q: "指先で一番叶えたい理想の雰囲気は？",
      options: [
        { text: "透け感ラベンダーやピンクベージュの大人可愛い手元", cat: "office" },
        { text: "角度で光が揺らめく「水光マグネット」の透明感", cat: "magnet" },
        { text: "春の桜やタンポポのようなパステルカラーの愛らしさ", cat: "spring" },
        { text: "くすみカラーやゴールドを効かせた洗練されたニュアンス", cat: "autumn" }
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
          colors: ["#9975cb", "#d4af6e", "#e9d5ff", "#ffffff", "#fef08a"]
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
    { day: "今日 (10/12)", status: "△ 残り1席", hot: true, time: "17:00〜" },
    { day: "明日 (10/13)", status: "◎ 空席あり", hot: false, time: "11:00〜, 15:30〜" },
    { day: "10/14 (水)", status: "◎ 空席あり", hot: false, time: "終日OK" },
    { day: "10/15 (木)", status: "○ 残り2席", hot: false, time: "13:00〜, 18:00〜" },
    { day: "10/16 (金)", status: "◎ 空席あり", hot: false, time: "10:30〜, 14:00〜" },
    { day: "10/17 (土)", status: "△ 残り1席", hot: true, time: "16:00〜" },
    { day: "10/18 (日)", status: "○ 残り2席", hot: false, time: "12:00〜, 17:30〜" },
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* 左側: 3秒パーソナル診断 */}
          <div className="lg:col-span-6 pearl-glass rounded-[2.5rem] p-6 sm:p-10 border border-lavender-200 shadow-xl">
            <div className="mb-6 space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-lavender-100 text-lavender-700 text-xs font-normal tracking-widest uppercase border border-lavender-200 font-serif">
                <Sparkles className="w-3.5 h-3.5 text-gold-500" />
                <span>Nail Styling Quiz</span>
              </div>
              <h3 className="text-2xl font-serif font-normal text-plum-900 tracking-wide">
                3問でわかる！似合わせネイル診断
              </h3>
              <p className="text-xs text-plum-700 font-light tracking-wide">
                あなたの好みやライフスタイルにぴったりのデザインをAIが提案します。
              </p>
            </div>

            {currentStep < 3 ? (
              <div className="space-y-6">
                {/* プログレスバー */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[11px] font-light text-plum-500 font-serif tracking-wider">
                    <span>QUESTION {currentStep + 1} / 3</span>
                    <span>{Math.round(((currentStep + 1) / 3) * 100)}%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-lavender-100 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-lavender-500 to-gold-400 transition-all duration-300"
                      style={{ width: `${((currentStep + 1) / 3) * 100}%` }}
                    />
                  </div>
                </div>

                {/* 質問文 */}
                <div className="p-4 rounded-2xl bg-white/90 border border-lavender-100 shadow-xs">
                  <h4 className="text-sm sm:text-base font-serif font-normal text-plum-900 tracking-wide leading-relaxed">
                    {questions[currentStep].q}
                  </h4>
                </div>

                {/* 選択肢ボタン */}
                <div className="space-y-2.5">
                  {questions[currentStep].options.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(idx)}
                      className="w-full p-4 rounded-2xl bg-white hover:bg-lavender-50 border border-lavender-200/80 text-left text-xs font-normal text-plum-900 transition-all hover:scale-101 hover:border-lavender-400 flex items-center justify-between group shadow-xs tracking-wide"
                    >
                      <span>{opt.text}</span>
                      <ArrowRight className="w-4 h-4 text-lavender-400 group-hover:text-lavender-700 group-hover:translate-x-1 transition-all shrink-0" />
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              /* 結果画面 */
              <div className="space-y-5 animate-in zoom-in-95 duration-300">
                <div className="p-5 rounded-3xl bg-gradient-to-br from-lavender-50 to-gold-50 border border-lavender-200 space-y-3">
                  <span className="text-[10px] font-normal px-2.5 py-0.5 rounded-full bg-gold-500 text-plum-950 uppercase tracking-widest inline-block font-serif">
                    Your Best Match
                  </span>
                  <h4 className="text-xl font-serif font-normal text-plum-900 tracking-wide">
                    {result?.title}
                  </h4>
                  <p className="text-xs text-plum-700 leading-relaxed font-light tracking-wide">
                    {result?.description}
                  </p>
                  <div className="flex items-center justify-between pt-2 border-t border-lavender-200/60 text-xs">
                    <span className="font-serif font-light text-lg text-gold-600 tracking-wider">
                      {result?.price}
                    </span>
                    <span className="text-[10px] text-plum-500 flex items-center gap-1 font-light tracking-wide">
                      <Clock className="w-3.5 h-3.5 text-lavender-400" />
                      {result?.duration}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2.5">
                  <a
                    href={SALON_INFO.links.hotpepper}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="luxe-button flex-1 text-center py-3.5 rounded-full text-xs font-medium flex items-center justify-center gap-1.5 shadow-lg tracking-wider"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>この診断結果で予約</span>
                  </a>
                  <button
                    onClick={handleReset}
                    className="p-3.5 rounded-full bg-white border border-lavender-200 text-plum-700 hover:bg-lavender-50 transition-colors shrink-0 shadow-xs"
                    aria-label="もう一度診断する"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* 右側: リアルタイム空席カレンダー */}
          <div className="lg:col-span-6 pearl-glass rounded-[2.5rem] p-6 sm:p-10 border border-lavender-200 shadow-xl">
            <div className="mb-6 space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-gold-100 text-gold-700 text-xs font-normal tracking-widest uppercase border border-gold-200 font-serif">
                <Calendar className="w-3.5 h-3.5" />
                <span>Real-time Vacancy</span>
              </div>
              <h3 className="text-2xl font-serif font-normal text-plum-900 tracking-wide">
                直近の空席速報
              </h3>
              <p className="text-xs text-plum-700 font-light tracking-wide">
                HOT PEPPER Beauty および 公式LINE と連動した最新の空き状況です。
              </p>
            </div>

            {/* 空席スケジュールリスト */}
            <div className="space-y-2 mb-6">
              {vacancyData.map((slot, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-2xl bg-white border border-lavender-100 flex items-center justify-between text-xs shadow-xs hover:border-lavender-300 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-normal text-plum-900 w-24 tracking-wide">{slot.day}</span>
                    <span className="text-[11px] text-plum-500 font-light tracking-wider font-serif">{slot.time}</span>
                  </div>
                  <div>
                    <span
                      className={`px-3 py-1 rounded-full text-[10px] font-normal tracking-wide ${
                        slot.hot
                          ? "bg-lavender-100 text-lavender-700 border border-lavender-200"
                          : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                      }`}
                    >
                      {slot.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* 予約誘導 */}
            <div className="p-4 rounded-2xl bg-lavender-50/80 border border-lavender-200 space-y-3">
              <p className="text-xs font-normal text-plum-900 tracking-wide">
                空席はリアルタイムで変動します。24時間即時確定はこちら：
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                <a
                  href={SALON_INFO.links.hotpepper}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="luxe-button flex-1 text-center py-3 rounded-full text-xs font-medium flex items-center justify-center gap-1.5 shadow-md tracking-wider"
                >
                  <Calendar className="w-4 h-4" />
                  <span>HOT PEPPER で空席確認</span>
                </a>
                <a
                  href={SALON_INFO.links.line}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center py-3 rounded-full bg-[#06C755] hover:bg-[#05a847] text-white text-xs font-medium flex items-center justify-center gap-1.5 shadow-md transition-all hover:scale-102 tracking-wide"
                >
                  <span>LINEで空席チェック</span>
                </a>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
