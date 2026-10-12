"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Sparkles, ShoppingBag, ArrowRight, ShieldCheck, CheckCircle2, Star, Truck, Award, Gift } from "lucide-react";
import { SHOP_PRODUCTS } from "@/data/shopData";
import ProductImage from "@/components/ProductImage";

export default function ShopFeatureSection() {
  // ネイルチップの主力3商品と、プロ用LEDライト・ベースジェルをピックアップ
  const featuredProducts = SHOP_PRODUCTS.filter((p) => p.isHeroProduct || p.category === "tips").slice(0, 4);

  return (
    <section className="relative py-20 sm:py-28 overflow-hidden bg-gradient-to-b from-white via-pearl-50 to-lavender-50/50 border-t border-lavender-200/80">
      {/* 背景装飾 */}
      <div className="absolute top-1/4 -right-40 w-96 h-96 rounded-full bg-radial from-lavender-300/20 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -left-40 w-96 h-96 rounded-full bg-radial from-gold-300/15 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* セクションヘッダー */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-lavender-100 via-white to-gold-100 border border-gold-300/80 shadow-2xs mb-4">
            <ShoppingBag className="w-4 h-4 text-gold-600" />
            <span className="font-serif text-xs font-medium tracking-widest text-plum-950 uppercase">
              Official Online Shop
            </span>
            <span className="text-[10px] px-2 py-0.2 rounded-full bg-plum-900 text-gold-300 font-serif">
              NEW OPEN
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-serif font-light text-plum-dark tracking-wide mb-4">
            自宅で楽しむ、自爪を削らない
            <span className="block font-medium bg-gradient-to-r from-plum-dark via-lavender-800 to-gold-600 bg-clip-text text-transparent mt-1">
              パラジェル ネイルチップ ＆ サロン専売品
            </span>
          </h2>

          <p className="text-sm sm:text-base text-plum-body font-light leading-relaxed">
            「お仕事で普段ネイルができない」「特別な日だけサロン級の輝きを纏いたい」方へ。<br className="hidden sm:inline" />
            最高峰パラジェルの特許構造を再現した<strong className="text-plum-900 font-medium">特注ネイルチップ</strong>を主力に、
            サロン専売のクリアジェル、カラージェル、LEDライト、スターターキットまで全品ラインナップ。
          </p>
        </div>

        {/* 特徴3大ハイライト */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-12 max-w-4xl mx-auto">
          <div className="pearl-glass p-5 rounded-2xl border border-lavender-200/90 text-center space-y-2">
            <div className="w-10 h-10 rounded-full bg-gold-50 border border-gold-200 text-gold-600 mx-auto flex items-center justify-center font-serif text-sm">
              01
            </div>
            <h3 className="font-serif font-medium text-sm text-plum-900">
              自爪を削らない安心仕様
            </h3>
            <p className="text-xs text-plum-600 font-light leading-relaxed">
              自爪へのサンディング不要。専用の爪育密着シールで、外す時も爪を傷めず繰り返し使えます。
            </p>
          </div>

          <div className="pearl-glass p-5 rounded-2xl border border-lavender-200/90 text-center space-y-2">
            <div className="w-10 h-10 rounded-full bg-lavender-50 border border-lavender-200 text-lavender-600 mx-auto flex items-center justify-center font-serif text-sm">
              02
            </div>
            <h3 className="font-serif font-medium text-sm text-plum-900">
              無料サイズ測定チップ付き
            </h3>
            <p className="text-xs text-plum-600 font-light leading-relaxed">
              初回ご注文時に10サイズの測定用クリアチップをお届け。ぴったりのフィット感をお約束します。
            </p>
          </div>

          <div className="pearl-glass p-5 rounded-2xl border border-lavender-200/90 text-center space-y-2">
            <div className="w-10 h-10 rounded-full bg-gold-50 border border-gold-200 text-gold-600 mx-auto flex items-center justify-center font-serif text-sm">
              03
            </div>
            <h3 className="font-serif font-medium text-sm text-plum-900">
              サロン専売ジェル＆LEDライト
            </h3>
            <p className="text-xs text-plum-600 font-light leading-relaxed">
              ベース・トップ・水光マグネット・専用LEDライト・パラポリッシュまで正規ラインを完全網羅。
            </p>
          </div>
        </div>

        {/* 主力商品プレビューグリッド */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-3xl border border-lavender-200 overflow-hidden shadow-xs hover:shadow-xl hover:border-gold-400 transition-all duration-300 flex flex-col group"
            >
              <div className="relative aspect-4/3 w-full overflow-hidden bg-pearl-100">
                <ProductImage
                  product={product}
                  alt={product.name}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 flex flex-wrap gap-1">
                  <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-plum-900/90 text-gold-300 font-serif font-medium backdrop-blur-xs">
                    {product.tag || "PICKUP"}
                  </span>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <span className="text-[10px] text-gold-600 font-serif tracking-wider uppercase block mb-1">
                    {product.category === "tips" ? "Paragel Nail Tip" : "Salon Professional"}
                  </span>
                  <h4 className="font-serif text-sm font-medium text-plum-900 group-hover:text-lavender-700 transition-colors line-clamp-1">
                    {product.name}
                  </h4>
                  <p className="text-xs text-plum-500 font-light line-clamp-2 mt-1">
                    {product.subtitle}
                  </p>
                </div>

                <div className="pt-2 border-t border-lavender-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-plum-500 font-mono block">コード: {product.itemCode}</span>
                    <span className="text-[10px] text-plum-400 font-light">税込価格</span>
                    <p className="font-serif text-base font-medium text-plum-900">
                      ¥{product.price.toLocaleString()}
                    </p>
                  </div>
                  <Link
                    href="/shop"
                    className="p-2 rounded-full bg-lavender-50 hover:bg-gold-400 hover:text-plum-950 text-lavender-700 transition-all shadow-2xs group-hover:scale-105"
                    aria-label={`${product.name}をショップで見る`}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 公式オンラインショップへ進む 特大CTAバナー */}
        <div
          style={{
            backgroundColor: "#1a0b2b",
            background: "linear-gradient(135deg, #1a0b2b 0%, #2e124d 50%, #150824 100%)",
          }}
          className="rounded-3xl bg-gradient-to-r from-plum-950 via-purple-950 to-[#180d26] text-white p-8 sm:p-12 relative overflow-hidden shadow-2xl border border-gold-400/50"
        >
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-radial from-gold-400/20 via-transparent to-transparent blur-2xl pointer-events-none" />
          
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-3 text-center lg:text-left max-w-2xl">
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
                <span className="px-3 py-1 rounded-full bg-gold-400 text-plum-950 text-xs font-serif font-bold tracking-wider">
                  新規会員登録で1,000pt進呈 (1pt=¥1)
                </span>
                <span className="text-xs text-gold-200 font-light flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-gold-400" />
                  ¥20,000以上で全国送料無料（宅急便のみ）
                </span>
                <span className="text-xs text-lavender-200 font-light flex items-center gap-1">
                  <Award className="w-3.5 h-3.5 text-gold-400" />
                  サロン＆EC共通ポイント
                </span>
                <span className="text-xs text-rose-200 font-light flex items-center gap-1">
                  <Gift className="w-3.5 h-3.5 text-gold-400" />
                  ギフト包装 ＆ 無料メッセージカード対応
                </span>
              </div>

              <h3 className="text-xl sm:text-3xl font-serif font-light text-white leading-tight">
                公式オンラインショップで
                <span className="block text-gold-300 font-medium mt-1">
                  自爪を削らないネイルチップ・専売ジェルを今すぐチェック
                </span>
              </h3>

              <p className="text-xs sm:text-sm text-white/80 font-light leading-relaxed">
                全12アイテムに商品コード（TIP-001等）を完備。キーワード検索や商品コード入力ですぐにご注文可能です。大切な方へのプレゼントに最適な特製ギフトラッピング・無料メッセージカードも選択いただけます。<br className="hidden sm:inline" />
                配送はヤマト運輸【宅急便】のみ対応。お支払いはクレジットカード・銀行振込・代金引換・コンビニ決済をご利用いただけます（※日曜・祝日は出荷休業）。
              </p>
            </div>

            <div className="shrink-0 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <Link
                href="/shop"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-gold-300 via-gold-400 to-gold-500 text-plum-950 font-serif font-medium text-sm shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all text-center flex items-center justify-center gap-2 tracking-wider"
              >
                <ShoppingBag className="w-4 h-4 text-plum-950" />
                <span>公式オンラインショップを見る</span>
                <ArrowRight className="w-4 h-4 text-plum-950" />
              </Link>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
