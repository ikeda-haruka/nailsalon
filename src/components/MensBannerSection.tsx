import React from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Users, Sparkles, ShoppingBag, ExternalLink } from "lucide-react";

export default function MensBannerSection() {
  return (
    <section className="py-20 relative bg-gradient-to-b from-white via-neutral-100/60 to-white overflow-hidden border-t border-b border-neutral-200">
      {/* 背景装飾 */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-0 right-0 w-96 h-96 bg-neutral-300/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-neutral-200/40 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="rounded-3xl bg-[#111111] text-white p-8 sm:p-12 lg:p-16 border border-neutral-800 shadow-2xl relative overflow-hidden">
          {/* 内側ハイライト効果 */}
          <div className="absolute -top-32 -right-32 w-80 h-80 bg-neutral-700/20 rounded-full blur-2xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* 左側テキスト */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-800 border border-neutral-700 text-neutral-300 text-xs font-serif tracking-widest uppercase">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>OFFICIAL PARTNER SALON</span>
              </div>

              <div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-light text-white tracking-wide leading-tight">
                  「男なのになんでネイル？」<br className="hidden sm:inline" />
                  その固定概念を取り払う、<br />
                  <span className="font-normal text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-neutral-400">
                    メンズ専用パラジェルサロン HOMME
                  </span>
                </h2>
                <p className="mt-4 text-sm text-neutral-400 leading-relaxed font-light">
                  Salon de Fraise の提携店として誕生した <strong className="text-white font-medium">「Salon de Fraise HOMME」</strong>。
                  スタッフは全員男性（在籍5名）で、完全個室・半個室を完備。
                  自爪を削らないパラジェルや、光沢のない自然な清潔感を演出する「自爪風マットコーティング」で、ビジネスパーソンから爪のコンプレックス緩和まで気兼ねなくお越しいただけます。
                </p>
              </div>

              {/* 特徴3点 */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3.5 rounded-2xl bg-neutral-900/80 border border-neutral-800">
                  <Users className="w-5 h-5 text-neutral-300 mb-2" />
                  <h4 className="text-xs font-medium text-white font-serif">全員男性ネイリスト</h4>
                  <p className="text-[11px] text-neutral-400 mt-1">在籍5名。男性特有の悩みも気兼ねなく相談可能。</p>
                </div>
                <div className="p-3.5 rounded-2xl bg-neutral-900/80 border border-neutral-800">
                  <ShieldCheck className="w-5 h-5 text-neutral-300 mb-2" />
                  <h4 className="text-xs font-medium text-white font-serif">自爪を削らない</h4>
                  <p className="text-[11px] text-neutral-400 mt-1">パラジェル認定技術。爪を痛めず身だしなみケア。</p>
                </div>
                <div className="p-3.5 rounded-2xl bg-neutral-900/80 border border-neutral-800">
                  <Sparkles className="w-5 h-5 text-neutral-300 mb-2" />
                  <h4 className="text-xs font-medium text-white font-serif">会員ポイント完全共有</h4>
                  <p className="text-[11px] text-neutral-400 mt-1">レディース店で貯めたポイント（1pt=¥1）がそのまま利用可能。</p>
                </div>
              </div>
            </div>

            {/* 右側アクションカード */}
            <div className="lg:col-span-5 bg-neutral-900/90 border border-neutral-800 p-6 sm:p-8 rounded-2xl space-y-5">
              <div className="border-b border-neutral-800 pb-4">
                <p className="text-xs text-neutral-400 uppercase tracking-widest font-serif">PARTNER SERVICE</p>
                <h3 className="text-xl font-serif text-white mt-1">Salon de Fraise HOMME</h3>
                <p className="text-xs text-neutral-400 mt-1">
                  モノトーンの洗練された専用WEBサイトおよびメンズ公式オンラインショップを展開中。
                </p>
              </div>

              <div className="space-y-3">
                <Link
                  href="/mens"
                  className="w-full flex items-center justify-between px-5 py-3.5 rounded-full bg-white text-neutral-950 font-medium text-xs hover:bg-neutral-200 transition-all shadow-md group"
                >
                  <span className="font-serif tracking-wider">メンズサロン WEBサイトを見る</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  href="/mens/shop"
                  className="w-full flex items-center justify-between px-5 py-3.5 rounded-full bg-neutral-800 hover:bg-neutral-700 text-white font-medium text-xs border border-neutral-700 transition-all group"
                >
                  <span className="flex items-center gap-2 font-serif tracking-wider">
                    <ShoppingBag className="w-4 h-4 text-neutral-400" />
                    メンズ公式ショップを見る
                  </span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              <div className="p-3.5 rounded-xl bg-neutral-950/60 border border-neutral-800 text-[11px] text-neutral-400 leading-relaxed">
                ※パートナーやご友人へのプレゼント用メンズネイルチップやキットのご購入にも最適です。共通アカウントでログイン・ポイント利用ができます。
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
