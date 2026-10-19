"use client";

import React from "react";
import { ShieldCheck, Users, EyeOff, Sparkles, HeartHandshake, CheckCircle2 } from "lucide-react";
import { MENS_SALON_INFO } from "@/data/mensSalonData";

export default function MensConceptSection() {
  const pillars = [
    {
      icon: Users,
      tag: "FEATURE 01",
      title: "店員は全員男性ネイリスト（在籍5名）",
      subtitle: "男性特有の悩みやライフスタイルを気兼ねなく共有できる安心感",
      desc: "「女性スタッフに爪を見られるのは気恥ずかしい」「サロン内が女性ばかりでアウェー感がある」──そんな男性の声を解消。当サロンのネイリストは全員がプロの男性ネイリストです。筋トレや仕事での爪割れ、皮脂や甘皮の悩み、世間の目に対する本音まで、男性同士だからこそ遠慮なく話せる居心地の良さを提供します。"
    },
    {
      icon: EyeOff,
      tag: "FEATURE 02",
      title: "全席完全個室・半個室のプライベート空間",
      subtitle: "他人の視線を一切気にせず、ひと息つける大人の隠れ家",
      desc: "表参道駅から徒歩3分の好立地にありながら、青山通りの裏手に佇む静かな隠れ家サロン。施術ブースはすべて完全個室または半個室仕様のため、他のお客様と顔を合わせることは一切ありません。靴を脱いでくつろぎ、こだわりのドリップコーヒーや炭酸水を片手に、心からリラックスしていただけます。"
    },
    {
      icon: ShieldCheck,
      tag: "FEATURE 03",
      title: "自爪を一切削らないパラジェル ＆ バレない自爪風マット",
      subtitle: "爪を痛めず健康に強く。ビジネスシーンでも完全に自然な仕上がり",
      desc: "「ネイルをすると爪が薄くなるのでは？」という心配は不要です。当サロンは自爪の表面を一切削らないパラジェル認定店。薄くなった爪や二枚爪を分厚く保護し、割れや欠けを防ぎます。さらに、特殊な完全ツヤ消しトップコートを採用することで、周囲にネイルをしていると気づかれず、ただ清潔感だけを手に入れることが可能です。"
    }
  ];

  return (
    <section id="concept" className="py-24 sm:py-32 mens-bg-subtle relative border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* セクションヘッダー */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-zinc-700 text-xs font-mono text-zinc-300 shadow-sm uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-zinc-400" />
            <span>Why We Exist ── 設立の想い</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-light text-white leading-tight">
            <span className="inline-block">「ネイル＝女性のもの」という</span>
            <br className="hidden sm:inline" />
            <span className="inline-block">固定概念を、私たちは壊す。</span>
          </h2>

          <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed">
            爪が綺麗に整っているだけで、朝起きたときの気分が前向きになる。<br className="hidden sm:inline" />
            名刺を渡すとき、キーボードを叩くとき、堂々と手元を差し出せる。<br className="hidden sm:inline" />
            爪の手入れは贅沢ではなく、すべての男性に開かれた「新しい身だしなみのスタンダード」です。
          </p>
        </div>

        {/* ストーリーステートメントカード */}
        <div className="mens-glass p-8 sm:p-12 rounded-[2.5rem] border border-zinc-800 max-w-4xl mx-auto relative overflow-hidden shadow-2xl">
          <div className="mens-shimmer" />

          <div className="relative z-10 space-y-5 text-zinc-300 text-xs sm:text-sm font-light leading-relaxed">
            <p className="font-serif text-base sm:text-lg text-white font-normal leading-snug">
              「男なのに、なんでネイルしているの？」<br />
              そんな何気ない一言に、肩身の狭さや息苦しさを感じてきた男性がいます。
            </p>
            <p>
              清潔感を保ちたいだけなのに。割れやすい爪を強くしたいだけなのに。自分の好きな色を纏って自信を持ちたいだけなのに。<br />
              『男だから』という理由だけで、サロンの扉を開けることすら躊躇してしまう──そんな理不尽な状況を終わらせたい。
            </p>
            <p>
              その強い想いから、<strong className="text-white font-medium">Salon de Fraise HOMME</strong> は立ち上がりました。<br />
              迎えるネイリストは全員男性。施術する空間はすべてプライベートな個室。施術する素材は爪を削らない最高峰パラジェル。<br />
              あなたが一歩を踏み出したその瞬間から、指先はコンプレックスではなく、あなたの最大の武器へと変わります。
            </p>
          </div>
        </div>

        {/* 3大特徴グリッド */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="mens-glass-card p-7 rounded-3xl flex flex-col justify-between transition-all space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-11 h-11 rounded-2xl bg-zinc-900 border border-zinc-700 flex items-center justify-center text-white shadow-md">
                      <Icon className="w-5 h-5 text-zinc-300" />
                    </div>
                    <span className="font-mono text-[10px] text-zinc-500 tracking-widest font-semibold">
                      {item.tag}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-serif text-base sm:text-lg font-medium text-white leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-[11px] text-zinc-400 font-light mt-1">
                      {item.subtitle}
                    </p>
                  </div>

                  <p className="text-xs text-zinc-400 font-light leading-relaxed pt-2 border-t border-zinc-800">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
