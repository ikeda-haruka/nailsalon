import HeroSection from "@/components/HeroSection";
import StoryHighlights from "@/components/StoryHighlights";
import ConceptSection from "@/components/ConceptSection";
import BrandLogoStorySection from "@/components/BrandLogoStorySection";
import GallerySection from "@/components/GallerySection";
import MagnetGlowLab from "@/components/MagnetGlowLab";
import InteractiveSection from "@/components/InteractiveSection";
import MenuSection from "@/components/MenuSection";
import StaffSection from "@/components/StaffSection";
import SalonInfoSection from "@/components/SalonInfoSection";
import FaqSection from "@/components/FaqSection";
import RecruitSection from "@/components/RecruitSection";
import ReservationSection from "@/components/ReservationSection";
import ShopFeatureSection from "@/components/ShopFeatureSection";
import MensBannerSection from "@/components/MensBannerSection";
import MemberRankSection from "@/components/MemberRankSection";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* ヒーローセクション（オーロラ＆イチゴミルク背景、ぷっくりジェルボタン） */}
      <HeroSection />

      {/* Instagramストーリーズ風ハイライト（春ネイル・水光50色・削らない・ドリンク・駐車場・同伴） */}
      <StoryHighlights />

      {/* コンセプト（パラジェル専門・アセトン不使用フィルイン・3〜4週持続ケア） */}
      <ConceptSection />

      {/* ブランドロゴに込められたメッセージセクション（5枚の苺の花弁・ゴールド二重環・水光の光彩） */}
      <BrandLogoStorySection />

      {/* 最旬デザインカタログ（Instagram風タイル・いいね・モーダル詳細） */}
      <GallerySection />

      {/* 水光マグネット体験シミュレーター（光筋が動くリアルタイム体験） */}
      <MagnetGlowLab />

      {/* インタラクティブ診断（3問で似合うネイル提案） ＆ 空席目安カレンダー */}
      <InteractiveSection />

      {/* メニュー・料金（明朗会計・回数券・LINE限定クーポンチケット） */}
      <MenuSection />

      {/* サロン＆公式EC共通 会員ランク・ポイント還元プログラム ＆ 誕生月50%OFF特典 */}
      <MemberRankSection />

      {/* 公式オンラインショップ特集（自爪を削らないパラジェル ネイルチップ＆サロン専売品） */}
      <ShopFeatureSection />

      {/* 提携メンズパラジェルサロン案内（Salon de Fraise HOMME） */}
      <MensBannerSection />

      {/* スタッフ紹介（在籍ネイリスト全12名 / 指名料+550円） */}
      <StaffSection />

      {/* サロン設備・無料カフェドリンク全6種・駐車場3台・ペット＆子連れOK */}
      <SalonInfoSection />

      {/* よくあるご質問 (FAQ) */}
      <FaqSection />

      {/* ネイリスト採用情報（随時募集・HotPepper WORK・Indeed） */}
      <RecruitSection />

      {/* ご予約・空席状況のご案内 */}
      <ReservationSection />
    </div>
  );
}
