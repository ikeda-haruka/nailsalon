import HeroSection from "@/components/HeroSection";
import ConceptSection from "@/components/ConceptSection";
import GallerySection from "@/components/GallerySection";
import MenuSection from "@/components/MenuSection";
import StaffSection from "@/components/StaffSection";
import SalonInfoSection from "@/components/SalonInfoSection";
import InteractiveSection from "@/components/InteractiveSection";
import RecruitSection from "@/components/RecruitSection";
import FaqSection from "@/components/FaqSection";
import ReservationSection from "@/components/ReservationSection";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* ヒーローセクション */}
      <HeroSection />

      {/* コンセプト・パラジェル＆フィルイン・3〜4週持続ケアのこだわり */}
      <ConceptSection />

      {/* デザインカタログ（春夏秋冬・50種水光マグネット・オフィス） */}
      <GallerySection />

      {/* インタラクティブ診断 ＆ 空席シミュレーター */}
      <InteractiveSection />

      {/* 施術メニュー・料金・回数券・LINEクーポン */}
      <MenuSection />

      {/* スタッフ紹介（池田・高橋・水野 / 指名料+550円） */}
      <StaffSection />

      {/* サロン設備・営業時間・連休営業・駐車場3台・ドリンク・同伴OK */}
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
