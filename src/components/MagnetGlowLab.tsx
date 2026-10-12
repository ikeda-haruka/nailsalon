"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { Sparkles, Eye, Calendar, Play, Pause, Smartphone, Sliders, RefreshCw } from "lucide-react";
import { SALON_INFO } from "@/data/salonData";

export default function MagnetGlowLab() {
  const [activeColor, setActiveColor] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const nailRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number | null>(null);
  const autoPlayAngleRef = useRef(0);
  const idleTimerRef = useRef<NodeJS.Timeout | null>(null);

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

  // 自動揺らめきアニメーション（スマホ・PC共通で、触っていない時に光が自然に優しく動く）
  useEffect(() => {
    if (!isAutoPlay || isUserInteracting) return;

    const animate = () => {
      autoPlayAngleRef.current += 0.025;
      const angle = autoPlayAngleRef.current;
      // 8の字のような滑らかなリサージュ曲線で光彩が揺らめく
      const x = 50 + Math.sin(angle) * 32;
      const y = 48 + Math.sin(angle * 2) * 28;
      setMousePos({ x, y });
      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isAutoPlay, isUserInteracting]);

  // 操作があったら自動アニメーションを停止し、離れて2秒後に再開
  const startUserInteraction = useCallback(() => {
    setIsUserInteracting(true);
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    idleTimerRef.current = setTimeout(() => {
      setIsUserInteracting(false);
    }, 2500);
  }, []);

  // マウス移動
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!nailRef.current) return;
    startUserInteraction();
    const rect = nailRef.current.getBoundingClientRect();
    const x = Math.max(10, Math.min(90, ((e.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(10, Math.min(90, ((e.clientY - rect.top) / rect.height) * 100));
    setMousePos({ x, y });
  };

  // スマホ タッチ開始＆タッチ移動（touch-none でスクロール干渉を完全防止）
  const handleTouch = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!nailRef.current || e.touches.length === 0) return;
    startUserInteraction();
    const rect = nailRef.current.getBoundingClientRect();
    const touch = e.touches[0];
    const x = Math.max(10, Math.min(90, ((touch.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(10, Math.min(90, ((touch.clientY - rect.top) / rect.height) * 100));
    setMousePos({ x, y });
  };

  // スライダーによる光の角度調整（スマホで指で爪を隠さず見たい人向け）
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    startUserInteraction();
    const val = Number(e.target.value);
    setMousePos({
      x: val,
      y: 35 + Math.sin((val / 100) * Math.PI) * 25
    });
  };

  const current = magnetTones[activeColor];

  return (
    <section id="magnet-lab" className="py-20 bg-gradient-to-b from-white via-lavender-50/40 to-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* セクション見出し */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-lavender-100 text-lavender-700 text-xs font-normal tracking-widest uppercase border border-lavender-200 font-serif">
            <Sparkles className="w-3.5 h-3.5 text-gold-500" />
            <span>Interactive Magnet Lab</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-serif font-normal text-plum-900 leading-[1.3] tracking-wide">
            水光マグネット体験シミュレーター
          </h2>
          <p className="text-xs sm:text-sm text-plum-700 font-light tracking-wide leading-relaxed">
            スマホでは爪を<strong className="font-medium text-plum-950">指で直接なぞる</strong>か、下の<strong className="font-medium text-plum-950">光彩スライダー</strong>を動かすと、水光ビームがちゅるんと輝きます。<br className="hidden sm:inline" />
            指先を傾けた時の50色以上の立体的な奥行き光沢をご体感ください。
          </p>
        </div>

        {/* インタラクティブカード */}
        <div className="max-w-4xl mx-auto pearl-glass rounded-[2.5rem] p-5 sm:p-10 border border-lavender-200 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* 左側: リアルタイム追従する水光ネイルのビジュアル */}
            <div className="md:col-span-6 flex flex-col items-center space-y-4">
              
              {/* ネイルチップ表示エリア（touch-none でスマホのスクロール暴発を防止） */}
              <div
                ref={nailRef}
                onMouseMove={handleMouseMove}
                onTouchStart={handleTouch}
                onTouchMove={handleTouch}
                className="relative w-56 h-80 sm:w-72 sm:h-96 rounded-[4.5rem] sm:rounded-[5rem] overflow-hidden cursor-crosshair shadow-2xl border-4 border-white select-none transition-colors duration-500 touch-none"
                style={{
                  background: current.bgGradient,
                }}
              >
                {/* ぷっくり爪のトップハイライト（ジェル特有の濡れツヤ） */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/45 via-transparent to-black/25 pointer-events-none" />

                {/* 追従する水光マグネットの光彩ビーム */}
                <div
                  className="absolute pointer-events-none transition-all duration-100 ease-out rounded-full blur-xl"
                  style={{
                    width: "170px",
                    height: "170px",
                    left: `${mousePos.x}%`,
                    top: `${mousePos.y}%`,
                    transform: "translate(-50%, -50%) rotate(25deg)",
                    background: `radial-gradient(ellipse at center, ${current.shimmerColor} 0%, rgba(255,255,255,0.45) 40%, transparent 70%)`,
                    boxShadow: `0 0 45px ${current.shimmerColor}`,
                  }}
                />

                {/* 爪の輪郭・サイドのハイライト */}
                <div className="absolute top-5 left-5 right-5 h-12 rounded-t-[3.5rem] sm:rounded-t-[4rem] border-t-2 border-white/70 pointer-events-none" />

                {/* 操作ガイドバナー */}
                <div className="absolute bottom-5 left-3 right-3 text-center pointer-events-none">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-plum-950/60 backdrop-blur-md text-white text-[10px] sm:text-[11px] font-light tracking-wide shadow-sm">
                    <Eye className="w-3 h-3 text-gold-300" />
                    <span>{isUserInteracting ? "光を操作中 ✦" : "指でなぞるかスライダーで操作"}</span>
                  </span>
                </div>
              </div>

              {/* スマホ操作を快適にする補助コントローラー */}
              <div className="w-full max-w-xs space-y-2.5 pt-1">
                {/* 光の角度スライダー */}
                <div className="p-3 rounded-2xl bg-white/80 border border-lavender-200/90 shadow-2xs space-y-1.5">
                  <div className="flex items-center justify-between text-[11px] text-plum-900 font-medium">
                    <span className="flex items-center gap-1">
                      <Sliders className="w-3.5 h-3.5 text-lavender-600" />
                      <span>光彩アングル調整</span>
                    </span>
                    <span className="text-[10px] text-lavender-600 font-mono">
                      {Math.round(mousePos.x)}°
                    </span>
                  </div>
                  <input
                    type="range"
                    min="15"
                    max="85"
                    value={Math.round(mousePos.x)}
                    onChange={handleSliderChange}
                    className="w-full accent-lavender-600 cursor-pointer h-2 bg-lavender-100 rounded-lg"
                    aria-label="光彩の角度を調整"
                  />
                  <div className="flex justify-between text-[9px] text-plum-400">
                    <span>左から差す光</span>
                    <span>中央</span>
                    <span>右から差す光</span>
                  </div>
                </div>

                {/* 自動揺らめきモードトグル */}
                <div className="flex items-center justify-between px-3 py-1.5 rounded-xl bg-lavender-50/70 border border-lavender-200 text-[11px]">
                  <span className="text-plum-700 flex items-center gap-1.5">
                    <Smartphone className="w-3 h-3 text-lavender-600" />
                    <span>自動揺らめき演出</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setIsAutoPlay((prev) => !prev);
                      setIsUserInteracting(false);
                    }}
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-medium flex items-center gap-1 transition-colors cursor-pointer ${
                      isAutoPlay
                        ? "bg-lavender-600 text-white shadow-2xs"
                        : "bg-white text-plum-700 border border-lavender-200"
                    }`}
                  >
                    {isAutoPlay ? <Pause className="w-2.5 h-2.5" /> : <Play className="w-2.5 h-2.5" />}
                    <span>{isAutoPlay ? "ON (揺らめき中)" : "OFF"}</span>
                  </button>
                </div>
              </div>

            </div>

            {/* 右側: カラー切り替え & 説明 */}
            <div className="md:col-span-6 space-y-6">
              <div>
                <span className={`text-[10px] font-normal px-2.5 py-1 rounded-full uppercase tracking-widest inline-block mb-2 border font-serif ${current.pillBg}`}>
                  {current.en}
                </span>
                <h3 className="text-2xl font-serif font-normal text-plum-900 tracking-wide">
                  {current.name}
                </h3>
                <p className="text-xs sm:text-sm text-plum-700 mt-2 leading-relaxed font-light tracking-wide">
                  {current.desc}
                </p>
              </div>

              {/* カラーセレクターボタン */}
              <div className="space-y-2">
                <p className="text-xs font-normal text-plum-900 tracking-wide">カラーパレットをタップして変更:</p>
                <div className="grid grid-cols-2 gap-2.5">
                  {magnetTones.map((tone, idx) => (
                    <button
                      key={tone.id}
                      onClick={() => {
                        setActiveColor(idx);
                        startUserInteraction();
                      }}
                      className={`p-3 rounded-2xl text-left border transition-all flex items-center gap-3 cursor-pointer ${
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
                        <span className="block text-xs font-normal text-plum-900 truncate tracking-wide">{tone.name}</span>
                        <span className="text-[10px] text-plum-400 truncate block font-serif font-light">{tone.en}</span>
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
                  className="luxe-button text-center py-3.5 px-6 rounded-full text-xs font-medium flex items-center justify-center gap-2 shadow-lg tracking-wider"
                >
                  <Calendar className="w-4 h-4" />
                  <span>水光マグネットコースを予約する</span>
                </a>
              </div>

              <p className="text-[10px] text-plum-500 leading-relaxed font-light tracking-wide">
                ※サロン店頭ではさらに50色以上の微粒子・水光・強光パウダーを直接お試しいただけます。
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
