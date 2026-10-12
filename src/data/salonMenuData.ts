// src/data/salonMenuData.ts
import { SalonMenuItem, SalonReservation, TimeSlotAvailability } from "@/types/reservation";
export type { SalonMenuItem, SalonReservation, TimeSlotAvailability };

// ========================================================
// 1. サロンメニュー一元管理マスター（Single Source of Truth）
// メニュー一覧・予約画面・管理画面・料金詳細で完全に共通利用されます。
// ========================================================
export const UNIFIED_SALON_MENUS: SalonMenuItem[] = [
  // --- レディース店メニュー ---
  {
    id: "menu-magnet-glow",
    name: "【当店人気No.1】水光マグネット 50色調合コース（自爪フィルイン込）",
    category: "magnet",
    categoryLabel: "水光マグネット",
    salonType: "ladies",
    price: 8800,
    priceFormatted: "¥8,800",
    durationMinutes: 90,
    timeFormatted: "90分",
    description: "自爪を削らないパラジェルベース＋50種類の微粒子マグネットパウダー。白・ラベンダー・シャンパンゴールド等の光彩が揺らめく不動の人気コース。",
    paragelIncluded: true,
    popular: true
  },
  {
    id: "menu-paragel-simple",
    name: "パラジェル オフィス美爪ワンカラー / グラデーション（ウォーターケア付）",
    category: "paragel_basic",
    categoryLabel: "シンプル・オフィス",
    salonType: "ladies",
    price: 7700,
    priceFormatted: "¥7,700",
    durationMinutes: 75,
    timeFormatted: "75分",
    description: "働く女性や規定の厳しい職場にも馴染む血色ピンクベージュや透け感ラベンダー。甘皮ウォーターケア込みで手元全体をトーンアップ。",
    paragelIncluded: true
  },
  {
    id: "menu-glam-art",
    name: "最旬トレンド ニュアンスアート＆ゴールドミラーコース（季節の4本アート）",
    category: "art",
    categoryLabel: "トレンドアート",
    salonType: "ladies",
    price: 9900,
    priceFormatted: "¥9,900",
    durationMinutes: 105,
    timeFormatted: "105分",
    description: "ホワイトパール、ミラーライン、シェル、季節のフラワーを描く贅沢デザイン。お持ち込み画像のアレンジにも対応いたします。",
    paragelIncluded: true,
    popular: true
  },
  {
    id: "menu-foot-spa",
    name: "極上フットスパ ＆ パラジェルフットワンカラー（角質集中ケア付）",
    category: "care",
    categoryLabel: "フット＆スパ",
    salonType: "ladies",
    price: 11000,
    priceFormatted: "¥11,000",
    durationMinutes: 100,
    timeFormatted: "100分",
    description: "足裏の古い角質をつるすべに整えるアロマスチームスパと、高発色フットパラジェルの贅沢フルコース。",
    paragelIncluded: true
  },
  {
    id: "menu-care-only",
    name: "素爪育成ウォーターネイルケア（自爪補強コート＆保湿オイル付）",
    category: "care",
    categoryLabel: "自爪ケア",
    salonType: "both",
    price: 4950,
    priceFormatted: "¥4,950",
    durationMinutes: 45,
    timeFormatted: "45分",
    description: "ネイルができない方・自爪を強く育てたい方のための集中ケア。爪の形整え・甘皮ウォーターケア・表面磨き。",
    paragelIncluded: false
  },

  // --- メンズ店（Salon de Fraise HOMME）メニュー ---
  {
    id: "menu-mens-grooming",
    name: "【メンズ一番人気】身だしなみメンズネイルケア（甘皮除去・爪形整え・自然な艶）",
    category: "mens_care",
    categoryLabel: "身だしなみケア",
    salonType: "mens",
    price: 5500,
    priceFormatted: "¥5,500",
    durationMinutes: 45,
    timeFormatted: "45分",
    description: "ビジネスで好印象を与える清潔感。爪の長さ整え・甘皮ウォーターケア・表面の縦ジワ磨き。自然な仕上がりでバレません。",
    paragelIncluded: false,
    popular: true
  },
  {
    id: "menu-mens-matte",
    name: "自爪を削らないパラジェル【完全ツヤ消し自爪風マット仕上げ】",
    category: "mens_paragel",
    categoryLabel: "自爪補強マット",
    salonType: "mens",
    price: 7700,
    priceFormatted: "¥7,700",
    durationMinutes: 60,
    timeFormatted: "60分",
    description: "割れやすい爪や二枚爪をパラジェルで強化保護。完全無光沢マットコートで塗っていることが周囲に一切分かりません。",
    paragelIncluded: true,
    popular: true
  },
  {
    id: "menu-mens-titanium",
    name: "チタン＆ブラック水光マグネット（個室男性ネイリスト施術）",
    category: "mens_paragel",
    categoryLabel: "メンズ水光アート",
    salonType: "mens",
    price: 9350,
    priceFormatted: "¥9,350",
    durationMinutes: 75,
    timeFormatted: "75分",
    description: "シックな漆黒ブラックやチタンシルバーの重厚なマグネットグラデーション。男性の手元に洗練された大人の色気を演出。",
    paragelIncluded: true
  }
];

// ========================================================
// 2. 営業時間スロット（10:00〜19:30、30分刻み）
// ========================================================
export const BUSINESS_HOURS_SLOTS = [
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00"
];

// ========================================================
// 3. 初期予約データ（デモ会員・他のお客様の予約データ）
// 実際の空席スロット計算・二重予約防止・マイページ予約確認で使われます。
// ========================================================
export const INITIAL_RESERVATIONS: SalonReservation[] = [
  // デモ会員（山田 菜々美様）の直近の確定予約（マイページで確認・キャンセル可能）
  {
    id: "res-demo-20261016",
    userId: "user-demo-01",
    userName: "山田 菜々美",
    userKana: "ヤマダ ナナミ",
    userEmail: "nanami.yamada@example.com",
    userPhone: "090-1234-5678",
    salonType: "ladies",
    date: "2026-10-16",
    timeSlot: "11:00",
    menuId: "menu-magnet-glow",
    menuName: "【当店人気No.1】水光マグネット 50色調合コース（自爪フィルイン込）",
    price: 8800,
    durationMinutes: 90,
    staffId: "takahashi",
    staffName: "高橋（トップネイリスト）",
    designId: "magnet-water-glow",
    designTitle: "水光ペールラベンダー × シャンパンマグネット",
    designImage: "/images/magnet_nail.jpg",
    couponId: "cp-birthday-50",
    couponTitle: "【誕生月限定】全施術＆公式EC全品 50% OFFバースデークーポン",
    couponDiscount: 4400,
    usedPoints: 0,
    finalPrice: 4400,
    status: "confirmed",
    note: "お誕生月50%OFF特典適用。左手薬指に微粒子ラベンダーを強めに配置希望。",
    createdAt: "2026-10-10 14:20"
  },
  // デモ会員の過去の来店履歴1（完了済み）
  {
    id: "res-demo-20260928",
    userId: "user-demo-01",
    userName: "山田 菜々美",
    userKana: "ヤマダ ナナミ",
    userEmail: "nanami.yamada@example.com",
    userPhone: "090-1234-5678",
    salonType: "ladies",
    date: "2026-09-28",
    timeSlot: "14:30",
    menuId: "menu-glam-art",
    menuName: "最旬トレンド ニュアンスアート＆ゴールドミラーコース",
    price: 9900,
    durationMinutes: 105,
    staffId: "takahashi",
    staffName: "高橋（トップネイリスト）",
    designId: "autumn-bordeaux",
    designTitle: "秋ボルドー＆金箔ニュアンス",
    designImage: "/images/autumn_nail.jpg",
    finalPrice: 9900,
    status: "completed",
    note: "ご来店完了（施術ポイント400pt付与済み）",
    createdAt: "2026-09-20 18:00"
  },
  // デモ会員の過去の来店履歴2（完了済み）
  {
    id: "res-demo-20260812",
    userId: "user-demo-01",
    userName: "山田 菜々美",
    userKana: "ヤマダ ナナミ",
    userEmail: "nanami.yamada@example.com",
    userPhone: "090-1234-5678",
    salonType: "ladies",
    date: "2026-08-12",
    timeSlot: "15:00",
    menuId: "menu-magnet-glow",
    menuName: "水光マグネット 50色調合コース",
    price: 8800,
    durationMinutes: 90,
    staffId: "ikeda",
    staffName: "池田（店長）",
    designId: "magnet-water-glow",
    designTitle: "水光ペールラベンダー × シャンパンマグネット",
    designImage: "/images/magnet_nail.jpg",
    finalPrice: 8800,
    status: "completed",
    note: "ご来店完了（施術ポイント350pt付与済み）",
    createdAt: "2026-08-01 10:15"
  },

  // 他のお客様の予約（空き枠・二重予約防止のリアルタイム判定用）
  {
    id: "res-other-001",
    userId: "user-other-01",
    userName: "佐藤 美咲 様",
    userEmail: "sato@example.com",
    userPhone: "090-9999-0001",
    salonType: "ladies",
    date: "2026-10-14",
    timeSlot: "13:00",
    menuId: "menu-paragel-simple",
    menuName: "パラジェル オフィス美爪ワンカラー",
    price: 7700,
    durationMinutes: 75,
    staffId: "ikeda",
    staffName: "池田（店長）",
    finalPrice: 7700,
    status: "confirmed",
    createdAt: "2026-10-11 12:00"
  },
  {
    id: "res-other-002",
    userId: "user-other-02",
    userName: "高木 健太郎 様",
    userEmail: "takagi@example.com",
    userPhone: "090-9999-0002",
    salonType: "mens",
    date: "2026-10-14",
    timeSlot: "18:00",
    menuId: "menu-mens-grooming",
    menuName: "身だしなみメンズネイルケア",
    price: 5500,
    durationMinutes: 45,
    staffId: "ren-kamiya",
    staffName: "神谷 蓮（チーフ）",
    finalPrice: 5500,
    status: "confirmed",
    createdAt: "2026-10-12 09:30"
  }
];

// ヘルパー：メニューIDからメニュー情報取得
export function getMenuById(id: string): SalonMenuItem | undefined {
  return UNIFIED_SALON_MENUS.find((m) => m.id === id);
}
