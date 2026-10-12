"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingBag, ArrowRight, Truck, Award, ShieldCheck, CheckCircle2 } from "lucide-react";
import { MENS_SHOP_PRODUCTS } from "@/data/mensShopData";

export default function MensShopFeatureSection() {
  const featured = MENS_SHOP_PRODUCTS.slice(0, 4);

  return (
    <section className="py-24 sm:py-32 mens-bg relative border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-14">
        
        {/* セクションヘッダー */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-zinc-700 text-xs font-mono text-zinc-300 shadow-sm uppercase tracking-widest">
            <ShoppingBag className="w-3.5 h-3.5 text-zinc-400" />
            <span>Mens Official Online Shop</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-light text-white leading-tight">
            メンズ専用公式オンラインショップ
          </h2>

          <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed">
            自宅で使えるメンズ仕様パラジェルネイルチップから、自爪風完全マットジェル、ベタつかない速乾オイルまで。<br />
            サロンに来られない日も、確かな清潔感を手に入れるメンズ専用プロダクトです。
          </p>
        </div>

        {/* 主力商品プレビューグリッド */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((p) => (
            <div
              key={p.id}
              className="mens-glass-card rounded-3xl overflow-hidden flex flex-col justify-between group transition-all"
            >
              <div>
                <div className="relative aspect-4/3 overflow-hidden bg-zinc-950">
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 contrast-125 grayscale-[35%]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                  <span className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-white text-zinc-950 text-[10px] font-mono font-bold">
                    {p.tag}
                  </span>
                </div>

                <div className="p-5 space-y-2">
                  <span className="text-[10px] font-mono text-zinc-400 block">
                    コード: {p.itemCode}
                  </span>
                  <h3 className="font-serif text-sm font-medium text-white line-clamp-1 group-hover:text-zinc-200">
                    {p.name}
                  </h3>
                  <p className="text-xs text-zinc-400 font-light line-clamp-2">
                    {p.subtitle}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0 flex items-center justify-between border-t border-zinc-800/80">
                <span className="font-serif text-base font-semibold text-white">
                  {p.priceFormatted}
                </span>
                <Link
                  href="/mens/shop"
                  className="p-2 rounded-full bg-zinc-800 hover:bg-white hover:text-zinc-950 text-white transition-all shadow-xs"
                >
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* 特大バナー */}
        <div className="rounded-[2.5rem] bg-zinc-950 border border-zinc-800 p-8 sm:p-12 relative overflow-hidden shadow-2xl">
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-3 text-center lg:text-left max-w-2xl">
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
                <span className="px-3 py-1 rounded-full bg-white text-zinc-950 text-xs font-mono font-bold">
                  新規会員登録で1,000pt進呈 (1pt=¥1)
                </span>
                <span className="text-xs text-zinc-300 font-light flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-zinc-400" />
                  ¥20,000以上で送料無料（宅急便のみ）
                </span>
                <span className="text-xs text-zinc-400 font-light flex items-center gap-1">
                  <Award className="w-3.5 h-3.5 text-zinc-400" />
                  サロン＆EC共通ポイント
                </span>
              </div>

              <h3 className="text-xl sm:text-3xl font-serif font-light text-white leading-tight">
                メンズ専用公式ショップで、<br />
                <span className="font-medium mens-silver-text">自爪を削らないメンズパラジェルを今すぐチェック</span>
              </h3>

              <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed">
                全品に商品コード完備。キーワード検索やコード直接入力ですぐにご注文可能。<br />
                ヤマト運輸【宅急便】のみ対応。サロン在籍男性スタッフ5名が責任を持って丁寧に梱包・出荷いたします（日曜祝日出荷休業）。
              </p>
            </div>

            <div className="shrink-0 w-full sm:w-auto">
              <Link
                href="/mens/shop"
                className="mens-button-white block text-center px-8 py-4 rounded-full text-xs font-semibold shadow-xl"
              >
                メンズ公式オンラインショップへ進む
              </Link>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
