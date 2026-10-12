import React from "react";
import type { Metadata } from "next";
import MensHeader from "@/components/mens/MensHeader";
import MensHeroSection from "@/components/mens/MensHeroSection";
import MensConceptSection from "@/components/mens/MensConceptSection";
import MensGallerySection from "@/components/mens/MensGallerySection";
import MensMenuSection from "@/components/mens/MensMenuSection";
import MensStaffSection from "@/components/mens/MensStaffSection";
import MensRecruitSection from "@/components/mens/MensRecruitSection";
import MensShopFeatureSection from "@/components/mens/MensShopFeatureSection";
import MensReservationSection from "@/components/mens/MensReservationSection";
import MensFooter from "@/components/mens/MensFooter";
import MemberRankSection from "@/components/MemberRankSection";

export const metadata: Metadata = {
  title: "表参道メンズパラジェルネイルサロン | Salon de Fraise HOMME【全員男性ネイリスト / 完全個室】",
  description:
    "「男なのになんでネイル？」という固定概念を壊す、全員男性ネイリスト（在籍5名）によるメンズ専用パラジェルネイルサロン。自爪を削らず守るパラジェル処方、バレない自爪風マット仕上げ、完全個室で気兼ねなく通えるプライベート空間。",
};

export default function MensHomePage() {
  return (
    <div className="flex flex-col min-h-screen mens-bg selection:bg-zinc-800 selection:text-white">
      {/* メンズ専用ヘッダー */}
      <MensHeader />

      {/* ヒーローセクション */}
      <MensHeroSection />

      {/* コンセプト（固定概念の打破・全員男性ネイリスト・完全個室） */}
      <MensConceptSection />

      {/* スタイルカタログ（自爪風マット・漆黒ブラック・チタンマグネット・自爪補強） */}
      <MensGallerySection />

      {/* メニュー・料金表（身だしなみケア・パラジェルマット・水光マグネット） */}
      <MensMenuSection />

      {/* メンズ会員ランク＆特別優待プログラム（共通ポイント・誕生月50%OFF） */}
      <MemberRankSection isMens={true} />

      {/* 在籍男性ネイリスト（5名） */}
      <MensStaffSection />

      {/* 男性スタッフ採用情報（新規募集中・在籍5名体制から拡大） */}
      <MensRecruitSection />

      {/* メンズ専用公式オンラインショップ特集 */}
      <MensShopFeatureSection />

      {/* ご予約・アクセス・サロン設備 */}
      <MensReservationSection />

      {/* メンズ専用フッター */}
      <MensFooter />
    </div>
  );
}
