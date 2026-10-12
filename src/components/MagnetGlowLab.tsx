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
      id: "water-lavender",
      name: "水光ペールラベンダー",
      en: "Water Lavender",
      desc: "当店人気No.1！透明感ある澄んだラベンダーに水面の光彩が揺らめく洗練カラー",
      bgGradient: "linear-gradient(135deg, #f5f0ff 0%, #d8b4fe 50%, #9975cb 100%)",
      shimmerColor: "rgba(255, 255, 255, 0.98)",
      pillBg: "bg-lavender-100 text-lavender-700 border-lavender-200",
    },
    {
      id: "champagne-gold",
      name: "シャンパンゴールドビーム",
      en: "Champagne Beam",
      desc: "光の筋がシャープに走る強光タイプ。指先が細く長く見える大人ゴールド",
      bgGradient: "linear-gradient(135deg, #fef9c3 0%, #eab308 40%, #c59b4b 100%)",
      shimmerColor: "rgba(255, 255, 240, 0.98)",
      pillBg: "bg-gold-100 text-gold-700 border-gold-200",
    },
    {
      id: "milky-pearl",
      name: "ミルキーパールホワイト",
      en: "Milky Pearl",
      desc: "シルキーな白磁に微細なオーロラパウダーを重ねた大人の清潔感あふれるカラー",
      bgGradient: "linear-gradient(135deg, #ffffff 0%, #f3e8ff 50%, #d8b4fe 100%)",
      shimmerColor: "rgba(255, 255, 255, 1)",
      pillBg: "bg-pearl-100 text-plum-900 border-lavender-200",
    },
    {
      id: "mauve-plum",
      name: "モーブプラム＆ゴールド",
      en: "Mauve Plum",
      desc: "深みのあるモーブパープルに微粒子ゴールドが溶け込んだシックな夜のニュアンス",
      bgGradient: "linear-gradient(135deg, #a855f7 0%, #6b21a8 50%, #241a2f 100%)",
      shimmerColor: "rgba(254, 240, 138, 0.95)",
      pillBg: "bg-plum-100 text-plum-900 border-plum-200",
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
    <section id="magnet-lab" className="py-20 bg-gradient-to-b from-white via-lavender-50/40 to-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* セクション見出し */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-lavender-100 text-lavender-700 text-xs font-black tracking-wider uppercase border border-lavender-200">
            <Sparkles className="w-3.5 h-3.5 text-gold-500" />
            <span>Interactive Magnet Lab</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-black text-plum-900">
            水光マグネット体験シミュレーター
          </h2>
          <p className="text-xs sm:text-sm text-plum-700 font-medium">
            画面の爪にマウスを乗せたり指でなぞると、光の筋がちゅるんと動きます。<br className="hidden sm:inline" />
            50種類以上ある特殊マグネットパウダーの繊細な光沢を体感してください。
          </p>
        </div>

        {/* インタラクティブカード */}
        <div className="max-w-4xl mx-auto pearl-glass rounded-[2.5rem] p-6 sm:p-10 border border-lavender-200 shadow-2xl">
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
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-plum-950/50 backdrop-blur-md text-white text-[11px] font-bold">
                    <Eye className="w-3.5 h-3.5" /> 触ると光が動きます
                  </span>
                </div>
              </div>
            </div>

            {/* 右側: カラー切り替え & 説明 */}
            <div className="md:col-span-6 space-y-6">
              <div>
                <span className={`text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider inline-block mb-2 border ${current.pillBg}`}>
                  {current.en}
                </span>
                <h3 className="text-2xl font-serif font-black text-plum-900">
                  {current.name}
                </h3>
                <p className="text-xs sm:text-sm text-plum-700 mt-2 leading-relaxed font-medium">
                  {current.desc}
                </p>
              </div>

              {/* カラーセレクターボタン */}
              <div className="space-y-2">
                <p className="text-xs font-bold text-plum-900">大人可愛いカラーパレットを選択:</p>
                <div className="grid grid-cols-2 gap-2.5">
                  {magnetTones.map((tone, idx) => (
                    <button
                      key={tone.id}
                      onClick={() => setActiveColor(idx)}
                      className={`p-3 rounded-2xl text-left border transition-all flex items-center gap-3 ${
                        activeColor === idx
                          ? "bg-white border-lavender-500 shadow-md scale-102 ring-2 ring-lavender-200"
                          : "bg-white/70 border-lavender-100 hover:bg-white"
                      }`}
                    >
                      <div
                        className="w-7 h-7 rounded-full shadow-inner shrink-0 border border-white"
                        style={{ background: tone.bgGradient }}
                      />
                      <div className="truncate">
                        <span className="block text-xs font-bold text-plum-900 truncate">{tone.name}</span>
                        <span className="text-[10px] text-plum-400 truncate block">{tone.en}</span>
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
                  className="luxe-button text-center py-3.5 px-6 rounded-full text-xs font-bold flex items-center justify-center gap-2 shadow-lg"
                >
                  <Calendar className="w-4 h-4" />
                  <span>水光マグネットコースを予約する</span>
                </a>
              </div>

              <p className="text-[10px] text-plum-500 leading-relaxed">
                ※サロン店頭ではさらに50色以上の微粒子・水光・強光パウダーを直接お試しいただけます。
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
