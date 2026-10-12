"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ShopProduct } from "@/data/shopData";
import BrandLogoPlaceholder from "@/components/BrandLogoPlaceholder";
import MensBrandLogoPlaceholder from "@/components/mens/MensBrandLogoPlaceholder";

interface ProductImageProps {
  product: any;
  alt?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  placeholderSize?: "sm" | "md" | "lg";
}

// 商品写真として正式に生成・設定された画像のみを許可（店舗風景や内装、スタッフ写真は除外）
const VALID_PRODUCT_IMAGE_FILES = new Set([
  "/images/mens_matte_black.jpg",
  "/images/mens_natural_matte.jpg",
]);

// サロン共用写真や未生成プレースホルダーパス等の除外パターン
const EXCLUDED_IMAGE_KEYWORDS = [
  "hero.jpg",
  "interior.jpg",
  "gallery-",
  "spring.jpg",
  "brand_logo",
  "staff/"
];

export default function ProductImage({
  product,
  alt,
  className = "object-cover",
  sizes,
  priority = false,
  placeholderSize = "md"
}: ProductImageProps) {
  const [hasError, setHasError] = useState(false);

  // メンズ製品判定
  const isMens = product.itemCode?.startsWith("M-") || product.category?.includes("mens");

  // 画像パスの正規化判定
  const imgPath = typeof product.image === "string" ? product.image.trim() : "";
  const isExcluded = EXCLUDED_IMAGE_KEYWORDS.some((kw) => imgPath.includes(kw));

  // 画像が未設定、除外対象（サロン写真等の仮置き）、未登録、またはロードエラー（404）の場合
  const isImageMissing =
    !imgPath ||
    isExcluded ||
    !VALID_PRODUCT_IMAGE_FILES.has(imgPath) ||
    hasError;

  if (isImageMissing) {
    if (isMens) {
      return (
        <div className="relative w-full h-full">
          <MensBrandLogoPlaceholder
            categoryLabel={product.categoryLabel}
            itemCode={product.itemCode}
            productName={product.name}
            size={placeholderSize}
          />
          <div className="absolute bottom-2 right-2 z-10 pointer-events-none">
            <span className="text-[8px] font-mono tracking-wider uppercase px-2 py-0.5 rounded-full bg-zinc-900/90 text-zinc-300 border border-zinc-700 shadow-2xs font-medium">
              HOMME Emblem
            </span>
          </div>
        </div>
      );
    }

    return (
      <div className="relative w-full h-full">
        <BrandLogoPlaceholder
          categoryLabel={product.categoryLabel}
          itemCode={product.itemCode}
          productName={product.name}
          size={placeholderSize}
        />
        {/* ブランドロゴ代替表示中の案内バッジ */}
        <div className="absolute bottom-2 right-2 z-10 pointer-events-none">
          <span className="text-[8px] font-serif tracking-wider uppercase px-2 py-0.5 rounded-full bg-white/90 text-gold-800 border border-gold-300 shadow-2xs backdrop-blur-xs font-medium">
            Brand Emblem
          </span>
        </div>
      </div>
    );
  }

  return (
    <Image
      src={product.image}
      alt={alt || product.name}
      fill
      sizes={sizes}
      priority={priority}
      className={className}
      onError={() => setHasError(true)}
    />
  );
}
