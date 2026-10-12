"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import confetti from "canvas-confetti";
import { Sparkles, Calendar, Heart, ArrowRight, RotateCcw, Clock, ShieldCheck, Award, Ticket } from "lucide-react";
import { SALON_INFO, DESIGNS } from "@/data/salonData";
import BookingModal from "@/components/BookingModal";

export default function InteractiveSection() {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [result, setResult] = useState<typeof DESIGNS[0] | null>(null);

  // 予約モーダルState
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingDesign, setBookingDesign] = useState<{ id: string; title: string; image: string } | null>(null);

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

  const reservationSlots = [
    { period: "平日 昼（10:00〜16:00）", status: "空き枠あり", badge: "◎ 比較的スムーズ", desc: "ゆったり施術・カフェドリンクを満喫できるおすすめ時間帯" },
    { period: "平日 夕方・夜（16:30〜20:00）", status: "残りわずか", badge: "△ お早めに", desc: "お仕事帰りのご予約が集中しやすい人気枠" },
    { period: "土日祝（終日）", status: "事前予約推奨", badge: "○ 週末枠", desc: "ハンド＆フット同時施術やブライダル前のお手入れに" },
  ];

  return (
    <section className="py-20 sm:py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* 左側: 3秒パーソナル診断 */}
          <div className="lg:col-span-6 pearl-glass rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-10 border border-lavender-200 shadow-xl">
            <div className="mb-6 space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-lavender-100 text-lavender-700 text-xs font-normal tracking-widest uppercase border border-lavender-200 font-serif">
                <Sparkles className="w-3.5 h-3.5 text-gold-500" />
                <span>Nail Styling Quiz</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-serif font-normal text-plum-900 tracking-wide">
                3問でわかる！似合わせネイル診断
              </h3>
              <p className="text-xs text-plum-700 font-light tracking-wide">
                あなたのライフスタイルやお好みに合わせた最適なデザインをご提案します。
              </p>
            </div>

            {currentStep < 3 ? (
              <div className="space-y-5">
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
                <div className="p-4 rounded-2xl bg-white/90 border border-lavender-100 shadow-2xs">
                  <h4 className="text-xs sm:text-sm font-serif font-normal text-plum-900 tracking-wide leading-relaxed">
                    {questions[currentStep].q}
                  </h4>
                </div>

                {/* 選択肢ボタン */}
                <div className="space-y-2">
                  {questions[currentStep].options.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(idx)}
                      className="w-full p-3.5 sm:p-4 rounded-2xl bg-white hover:bg-lavender-50/70 border border-lavender-200/80 text-left text-xs font-normal text-plum-900 transition-all hover:border-lavender-400 flex items-center justify-between group shadow-2xs tracking-wide"
                    >
                      <span className="leading-snug">{opt.text}</span>
                      <ArrowRight className="w-4 h-4 text-lavender-400 group-hover:text-lavender-700 group-hover:translate-x-1 transition-all shrink-0 ml-2" />
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              /* 結果画面: 画像・料金・安心バッジ・直結予約ボタンを表示 */
              <div className="space-y-4 animate-in zoom-in-95 duration-300">
                <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-br from-lavender-50/80 to-gold-50/80 border border-lavender-200 space-y-3 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-normal px-2.5 py-0.5 rounded-full bg-gold-500 text-plum-950 uppercase tracking-widest inline-block font-serif shadow-2xs">
                      Best Match For You
                    </span>
                    <span className="text-[11px] font-serif text-lavender-700">
                      {result?.categoryLabel}
                    </span>
                  </div>

                  {/* 提案デザイン画像＆タイトル */}
                  <div className="flex gap-3.5 items-center">
                    {result?.image && (
                      <div className="relative w-20 h-20 rounded-2xl overflow-hidden shrink-0 border border-lavender-200 bg-lavender-100 shadow-2xs">
                        <Image
                          src={result.image}
                          alt={result.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="space-y-1">
                      <h4 className="text-base sm:text-lg font-serif font-normal text-plum-900 tracking-wide leading-snug">
                        {result?.title}
                      </h4>
                      <div className="flex items-center gap-3 text-xs">
                        <span className="font-serif font-light text-base text-gold-600 tracking-wider">
                          {result?.price}
                        </span>
                        <span className="text-[11px] text-plum-500 flex items-center gap-1 font-light tracking-wide">
                          <Clock className="w-3 h-3 text-lavender-400" />
                          目安: {result?.duration}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-plum-700 leading-relaxed font-light tracking-wide bg-white/80 p-3 rounded-2xl border border-lavender-100">
                    {result?.description}
                  </p>

                  {/* 安心スペックバッジ */}
                  <div className="flex flex-wrap gap-1.5 pt-0.5">
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-white text-lavender-800 border border-lavender-200">
                      自爪を削らないパラジェル込
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-white text-gold-800 border border-gold-200">
                      カラー変更無料
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-white text-lavender-800 border border-lavender-200">
                      3〜4週持続フィルイン
                    </span>
                  </div>
                </div>

                {/* アクションボタン群 */}
                <div className="flex flex-col sm:flex-row gap-2 pt-1">
                  <button
                    onClick={() => {
                      if (result) {
                        setBookingDesign({
                          id: result.id,
                          title: result.title,
                          image: result.image
                        });
                      }
                      setIsBookingModalOpen(true);
                    }}
                    className="luxe-button flex-1 text-center py-3 rounded-full text-xs font-medium flex items-center justify-center gap-1.5 shadow-md tracking-wider cursor-pointer"
                  >
                    <Calendar className="w-4 h-4 text-gold-300" />
                    <span>この診断デザインでWEB即時予約</span>
                  </button>
                  <Link
                    href="/mypage"
                    className="gold-button flex-1 text-center py-3 rounded-full text-xs font-medium flex items-center justify-center gap-1.5 shadow-md transition-all hover:scale-102 tracking-wide"
                  >
                    <Ticket className="w-4 h-4 text-plum-950" />
                    <span>会員クーポンを利用</span>
                  </Link>
                  <button
                    onClick={handleReset}
                    className="p-3 rounded-full bg-white border border-lavender-200 text-plum-700 hover:bg-lavender-50 transition-colors shrink-0 shadow-2xs self-center sm:self-auto cursor-pointer"
                    aria-label="もう一度診断する"
                    title="最初からやり直す"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* 右側: リアルタイム予約連携・空き枠案内 */}
          <div className="lg:col-span-6 pearl-glass rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-10 border border-lavender-200 shadow-xl">
            <div className="mb-6 space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-gold-100 text-gold-700 text-xs font-normal tracking-widest uppercase border border-gold-200 font-serif">
                <Calendar className="w-3.5 h-3.5" />
                <span>Live Reservation Status</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-serif font-normal text-plum-900 tracking-wide">
                最新の空席・ご予約枠のご案内
              </h3>
              <p className="text-xs text-plum-700 font-light tracking-wide">
                空席は公式WEB予約システムにて24時間リアルタイム自動計算・即時確定いただけます。
              </p>
            </div>

            {/* 時間帯別の空き傾向案内 */}
            <div className="space-y-2.5 mb-6">
              {reservationSlots.map((slot, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-white border border-lavender-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs shadow-2xs"
                >
                  <div>
                    <span className="font-serif font-normal text-plum-900 tracking-wide block sm:inline">
                      {slot.period}
                    </span>
                    <p className="text-[10px] text-plum-500 font-light mt-0.5 tracking-wide">
                      {slot.desc}
                    </p>
                  </div>
                  <div className="shrink-0 self-start sm:self-auto">
                    <span
                      className={`px-3 py-1 rounded-full text-[10px] font-normal tracking-wide inline-block ${
                        idx === 0
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : idx === 1
                          ? "bg-lavender-100 text-lavender-700 border border-lavender-200"
                          : "bg-gold-50 text-gold-800 border border-gold-200"
                      }`}
                    >
                      {slot.badge}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* 予約カレンダー直結CTA */}
            <div className="p-4 sm:p-5 rounded-2xl bg-lavender-50/70 border border-lavender-200/80 space-y-3">
              <div className="flex items-center gap-2">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <p className="text-xs font-normal text-plum-900 tracking-wide">
                  最新の空席スロットは公式WEB予約でリアルタイム判定中：
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
                <button
                  onClick={() => {
                    setBookingDesign(null);
                    setIsBookingModalOpen(true);
                  }}
                  className="luxe-button flex-1 text-center py-3 rounded-full text-xs font-medium flex items-center justify-center gap-1.5 shadow-md tracking-wider cursor-pointer"
                >
                  <Calendar className="w-4 h-4 text-gold-300" />
                  <span>空き枠を確認してWEB即時予約</span>
                </button>
                <Link
                  href="/mypage"
                  className="gold-button flex-1 text-center py-3 rounded-full text-xs font-medium flex items-center justify-center gap-1.5 shadow-md transition-all hover:scale-102 tracking-wide"
                >
                  <Award className="w-4 h-4 text-plum-950" />
                  <span>会員特典・限定クーポン確認</span>
                </Link>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* WEB即時予約モーダル */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        initialSalonType="ladies"
        initialDesign={bookingDesign}
      />
    </section>
  );
}
