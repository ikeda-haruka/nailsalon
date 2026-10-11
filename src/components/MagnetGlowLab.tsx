"use client";

import React, { useState, useRef } from "react";
import { Sparkles, Compass, Eye, Heart, Calendar } from "lucide-react";
import { SALON_INFO } from "@/data/salonData";

export default function MagnetGlowLab() {
  const [activeColor, setActiveColor] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const nailRef = useRef<HTMLDivElement>(null);

  const magnetTones = [
    {
      id: "strawberry-milk",
      name: "水光いちごみるく",
      en: "Water Strawberry",
      desc: "当店人気No.1！透明感あるイチゴミルクベースに水面の光彩が揺らめく",
      bgGradient: "linear-gradient(135deg, #ffd1dc 0%, #ff85a1 50%, #fca5b9 100%)",
      shimmerColor: "rgba(255, 255, 255, 0.95)",
      pillBg: "bg-pink-100 text-[#ff3366]",
    },
    {
      id: "pink-beige",
      name: "大人ピンクベージュ",
      en: "Nude Shimmer",
      desc: "オフィスネイル人気No.1。肌馴染み抜群で血色感をアップさせる上品カラー",
      bgGradient: "linear-gradient(135deg, #f7d6cb 0%, #e0b0a2 50%, #cca295 100%)",
      shimmerColor: "rgba(255, 245, 230, 0.95)",
      pillBg: "bg-amber-100 text-[#a06048]",
    },
    {
      id: "champagne",
      name: "強光シャンパンゴールド",
      en: "Strong Beam",
      desc: "光の筋がシャープに走る強光タイプ。爪先が細く長く見える指長効果",
      bgGradient: "linear-gradient(135deg, #fdecd2 0%, #e8ca94 50%, #d4af37 100%)",
      shimmerColor: "rgba(255, 255, 255, 0.98)",
      pillBg: "bg-yellow-100 text-[#967425]",
    },
    {
      id: "rosy-bordeaux",
      name: "秋色ロージーボルドー",
      en: "Deep Rosy",
      desc: "深みのあるボルドーに微粒子マグネットが溶け込んだシックな大人カラー",
      bgGradient: "linear-gradient(135deg, #c76d81 0%, #8b263e 50%, #591024 100%)",
      shimmerColor: "rgba(255, 200, 220, 0.9)",
      pillBg: "bg-rose-100 text-[#8b263e]",
    },
  ];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!nailRef.current) return;
    const rect = nailRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!nailRef.current || e.touches.length === 0) return;
    const rect = nailRef.current.getBoundingClientRect();
    const touch = e.touches[0];
    const x = ((touch.clientX - rect.left) / rect.width) * 100;
    const y = ((touch.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  const current = magnetTones[activeColor];

  return (
    <section id="magnet-lab" className="py-20 bg-gradient-to-b from-white via-pink-50/40 to-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* セクション見出し */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100 text-[#ff3366] text-xs font-black tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Magnet Lab</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-black text-[#2c181b]">
            水光マグネット体験シミュレーター
          </h2>
          <p className="text-xs sm:text-sm text-[#5e4748] font-medium">
            画面の爪にマウスを乗せたり指でなぞると、光の筋がちゅるんと動きます。<br className="hidden sm:inline" />
            50種類以上ある特殊マグネットの繊細な輝きを体感してください。
          </p>
        </div>

        {/* インタラクティブカード */}
        <div className="max-w-4xl mx-auto jelly-glass rounded-[2.5rem] p-6 sm:p-10 border border-white shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* 左側: リアルタイム追従する水光ネイルのビジュアル */}
            <div className="md:col-span-6 flex flex-col items-center">
              <div
                ref={nailRef}
                onMouseMove={handleMouseMove}
                onTouchMove={handleTouchMove}
                className="relative w-64 h-84 sm:w-72 sm:h-96 rounded-[5rem] overflow-hidden cursor-crosshair shadow-2xl border-4 border-white select-none transition-all duration-300"
                style={{
                  background: current.bgGradient,
                }}
              >
                {/* ぷっくり爪のトップハイライト（ジェル特有のツヤ） */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-black/20 pointer-events-none" />

                {/* マウス追従するマグネットの光筋（水光ビーム） */}
                <div
                  className="absolute pointer-events-none transition-all duration-75 ease-out rounded-full blur-xl"
                  style={{
                    width: "160px",
                    height: "160px",
                    left: `${mousePos.x}%`,
                    top: `${mousePos.y}%`,
                    transform: "translate(-50%, -50%) rotate(25deg)",
                    background: `radial-gradient(ellipse at center, ${current.shimmerColor} 0%, rgba(255,255,255,0.4) 40%, transparent 70%)`,
                    boxShadow: `0 0 40px ${current.shimmerColor}`,
                  }}
                />

                {/* 爪の輪郭・サイドのハイライト */}
                <div className="absolute top-6 left-6 right-6 h-12 rounded-t-[4rem] border-t-2 border-white/60 pointer-events-none" />

                {/* アクション指示テキスト */}
                <div className="absolute bottom-6 left-4 right-4 text-center pointer-events-none">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md text-white text-[11px] font-bold">
                    <Eye className="w-3.5 h-3.5" /> 触ると光が動きます
                  </span>
                </div>
              </div>
            </div>

            {/* 右側: カラー切り替え & 説明 */}
            <div className="md:col-span-6 space-y-6">
              <div>
                <span className={`text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider inline-block mb-2 ${current.pillBg}`}>
                  {current.en}
                </span>
                <h3 className="text-2xl font-serif font-black text-[#2c181b]">
                  {current.name}
                </h3>
                <p className="text-xs sm:text-sm text-[#5e4748] mt-2 leading-relaxed font-medium">
                  {current.desc}
                </p>
              </div>

              {/* カラーセレクターボタン */}
              <div className="space-y-2">
                <p className="text-xs font-bold text-[#2c181b]">カラーパレットを選択:</p>
                <div className="grid grid-cols-2 gap-2.5">
                  {magnetTones.map((tone, idx) => (
                    <button
                      key={tone.id}
                      onClick={() => setActiveColor(idx)}
                      className={`p-3 rounded-2xl text-left border transition-all flex items-center gap-3 ${
                        activeColor === idx
                          ? "bg-white border-[#ff3366] shadow-md scale-102"
                          : "bg-white/60 border-pink-100 hover:bg-white"
                      }`}
                    >
                      <div
                        className="w-7 h-7 rounded-full shadow-inner shrink-0 border border-white"
                        style={{ background: tone.bgGradient }}
                      />
                      <div className="truncate">
                        <span className="block text-xs font-bold text-[#2c181b] truncate">{tone.name}</span>
                        <span className="text-[10px] text-[#a08587] truncate block">{tone.en}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <a
                  href={SALON_INFO.links.hotpepper}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="jelly-button text-center py-3.5 px-6 rounded-full text-xs font-bold flex items-center justify-center gap-2 shadow-lg"
                >
                  <Calendar className="w-4 h-4" />
                  <span>水光マグネットコースを予約する</span>
                </a>
              </div>

              <p className="text-[10px] text-[#8c7374] leading-relaxed">
                ※サロン店頭ではさらに50色以上の微粒子・水光・強光パウダーを直接お試しいただけます。
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
