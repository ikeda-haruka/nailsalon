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

// 実際に public/images/ に存在する画像ファイル群（これ以外は未生成画像と判定）
const EXISTING_IMAGE_FILES = new Set([
  "/images/hero.jpg",
  "/images/interior.jpg",
  "/images/magnet_nail.jpg",
  "/images/spring_nail.jpg",
  "/images/office_nude_nail.jpg",
  "/images/mens_matte_black.jpg",
  "/images/mens_natural_matte.jpg",
  "/images/mens_interior.jpg"
]);

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

  // 画像が未生成、または存在しないファイル、またはロードエラーの場合
  const isImageMissing =
    !product.image ||
    product.image === "" ||
    product.image.includes("gallery-") ||
    !EXISTING_IMAGE_FILES.has(product.image) ||
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
