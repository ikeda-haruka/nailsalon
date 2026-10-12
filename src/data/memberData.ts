// src/data/memberData.ts
import { MemberUser, RewardItem } from "@/types/member";

export const INITIAL_DEMO_USER: MemberUser = {
  id: "user-demo-01",
  name: "山田 菜々美",
  kana: "ヤマダ ナナミ",
  email: "nanami.yamada@example.com",
  role: "member",
  memberNumber: "FR-2026-8823",
  rank: "Gold",
  points: 1650,
  joinedDate: "2026-04-15",
  lastVisit: "2026-09-28",
  coupons: [
    {
      id: "cp-welcome",
      title: "新規WEB会員登録限定 ¥1,000 OFFクーポン",
      discount: "¥1,000 OFF",
      expiryDate: "2026-12-31",
      isUsed: false,
      description: "施術合計¥6,000以上でご利用いただけます（初回限定）"
    },
    {
      id: "cp-birthday",
      title: "バースデー記念 パラジェルフィルイン無料チケット",
      discount: "フィルイン無料",
      expiryDate: "2026-11-30",
      isUsed: false,
      description: "お誕生月限定の特別ケアチケットです"
    },
    {
      id: "cp-magnet",
      title: "水光マグネットお試し1本無料クーポン",
      discount: "1本アート無料",
      expiryDate: "2026-10-31",
      isUsed: true,
      usedAt: "2026-09-28 14:30",
      description: "前回ご来店時にご利用済みです"
    }
  ],
  transactions: [
    {
      id: "tx-001",
      userId: "user-demo-01",
      type: "grant",
      amount: 1000,
      balanceAfter: 1000,
      reason: "新規会員登録特典（公式オンラインショップ1,000pt進呈・サロン共通）",
      createdAt: "2026-04-15 11:00"
    },
    {
      id: "tx-002",
      userId: "user-demo-01",
      type: "grant",
      amount: 350,
      balanceAfter: 450,
      reason: "施術ご来店ポイント（水光マグネットコース）",
      staffName: "池田（店長）",
      createdAt: "2026-08-12 16:30"
    },
    {
      id: "tx-003",
      userId: "user-demo-01",
      type: "grant",
      amount: 400,
      balanceAfter: 850,
      reason: "施術ご来店ポイント（秋ニュアンスコース）",
      staffName: "高橋",
      createdAt: "2026-09-28 15:45"
    },
    {
      id: "tx-004",
      userId: "user-demo-01",
      type: "redeem",
      amount: -100,
      balanceAfter: 750,
      reason: "特典交換：水光マグネット1本無料クーポン",
      createdAt: "2026-09-28 15:50"
    }
  ]
};

export const STAFF_ACCOUNTS = [
  { id: "staff-01", name: "池田", role: "admin", pin: "1234", title: "店長 / パラジェルエデュケーター" },
  { id: "staff-02", name: "高橋", role: "staff", pin: "5678", title: "トップネイリスト" },
  { id: "staff-03", name: "水野", role: "staff", pin: "9999", title: "ネイリスト" },
];

export const REWARD_ITEMS: RewardItem[] = [
  {
    id: "rw-magnet-1finger",
    title: "水光マグネット 1本無料アートチケット",
    pointsRequired: 300,
    category: "service",
    description: "通常のワンカラーコースに、お好きな指1本水光マグネットを追加できます。",
    expiryDays: 60
  },
  {
    id: "rw-discount-500",
    title: "サロン施術 ¥500 OFFクーポン",
    pointsRequired: 500,
    category: "discount",
    description: "次回のお会計時に¥500割引としてご利用いただけます。",
    expiryDays: 90
  },
  {
    id: "rw-discount-1000",
    title: "サロン施術 ¥1,000 OFFクーポン",
    pointsRequired: 900,
    category: "discount",
    description: "次回のお会計時に¥1,000割引としてご利用いただけます（お得なレート！）。",
    expiryDays: 90
  },
  {
    id: "rw-oil-gift",
    title: "オーガニック・ロールオンネイルオイル（店頭お渡し）",
    pointsRequired: 1200,
    category: "gift",
    description: "サロン厳選のオリジナルキューティクルケアオイル（ラベンダーの香り）。店頭にてお渡しいたします。",
    expiryDays: 120
  },
  {
    id: "rw-shop-chip-1500",
    title: "公式EC限定 ネイルチップ ¥1,500 OFFクーポン",
    pointsRequired: 1000,
    category: "discount",
    description: "公式オンラインショップにてパラジェルネイルチップご購入時に使える限定特別優待クーポンです（サロン共通ポイント）。",
    expiryDays: 90
  }
];
