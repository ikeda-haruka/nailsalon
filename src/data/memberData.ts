// src/data/memberData.ts
import { MemberUser, RewardItem, MemberRank, RankTierConfig, UserCoupon } from "@/types/member";

export const MEMBER_RANKS_CONFIG: RankTierConfig[] = [
  {
    rank: "Regular",
    name: "レギュラー会員",
    minPoints: 0,
    pointRate: 0.01,
    rateLabel: "1.0%",
    color: "from-stone-400 to-stone-600",
    badgeBg: "bg-stone-200 text-stone-800 border-stone-300",
    perks: [
      "サロン施術・公式EC共通 1.0% ポイント還元（1pt=¥1）",
      "新規会員登録でサロン・公式ECで即使える 1,000pt 進呈",
      "【誕生月限定】サロン施術＆公式EC全品 50% OFFバースデークーポン",
      "24時間WEB予約・空席優先リマインド"
    ],
    exclusiveCoupons: [
      {
        title: "新規WEB会員登録限定 ¥1,000 OFFクーポン",
        discount: "¥1,000 OFF",
        desc: "新規入会時にお届けする初回ウェルカム優待チケット"
      }
    ]
  },
  {
    rank: "Silver",
    name: "シルバー会員",
    minPoints: 500,
    pointRate: 0.02,
    rateLabel: "2.0%（2倍）",
    color: "from-slate-400 to-zinc-600",
    badgeBg: "bg-slate-200 text-slate-800 border-slate-300",
    perks: [
      "ポイント還元率 2.0%（レギュラーの2倍！）",
      "自爪を削らないパラジェル付替オフ・フィルイン【いつでも半額】",
      "シルバー会員限定【公式EC全品 5% OFF優待クーポン】を定期付与",
      "サロン季節限定デザイン先行プレビュー案内"
    ],
    exclusiveCoupons: [
      {
        title: "【Silver限定】公式オンラインショップ全品 5% OFFクーポン",
        discount: "5% OFF",
        desc: "パラジェルネイルチップ＆ケアアイテム全品対象"
      }
    ]
  },
  {
    rank: "Gold",
    name: "ゴールド会員",
    minPoints: 1500,
    pointRate: 0.035,
    rateLabel: "3.5%（3.5倍）",
    color: "from-amber-400 via-amber-500 to-yellow-600",
    badgeBg: "bg-amber-100 text-amber-900 border-amber-300 font-semibold shadow-xs",
    perks: [
      "ポイント還元率 3.5%（3.5倍高還元！）",
      "パラジェル付替フィルイン毎回【永年完全無料】",
      "ゴールド会員限定【サロン施術 ¥2,000 OFFクーポン】進呈",
      "ゴールド会員限定【公式EC全品 10% OFF優待クーポン】進呈",
      "サロンご来店時 オーガニックハーブティー特選フレーバーサービス"
    ],
    exclusiveCoupons: [
      {
        title: "【Gold限定】サロンプレミアム施術 ¥2,000 OFFクーポン",
        discount: "¥2,000 OFF",
        desc: "水光マグネット・アートコース含む全施術で利用可能"
      },
      {
        title: "【Gold限定】公式オンラインショップ全品 10% OFF優待クーポン",
        discount: "10% OFF",
        desc: "ネイルチップ新作コレクションも10%割引適用"
      }
    ]
  },
  {
    rank: "Platinum",
    name: "プラチナ会員",
    minPoints: 3000,
    pointRate: 0.05,
    rateLabel: "5.0%（最大5倍！）",
    color: "from-purple-600 via-plum-700 to-amber-500",
    badgeBg: "bg-gradient-to-r from-purple-900 to-plum-950 text-amber-200 border-amber-400/80 font-bold shadow-md",
    perks: [
      "ポイント還元率 5.0%（最高峰 5倍還元！）",
      "大人気「水光マグネットアート」が毎回のご来店で【1本無料】",
      "トップネイリスト専任指名料（通常+¥550）が【永年無料】",
      "プラチナ会員限定【サロン極上コース ¥3,500 OFFクーポン】進呈",
      "プラチナ会員限定【公式EC全品 15% OFF VIP優待クーポン】進呈",
      "新作コレクション・限定限定カラーの優先先行キープ枠"
    ],
    exclusiveCoupons: [
      {
        title: "【Platinum限定】極上プレミアムサロン施術 ¥3,500 OFFクーポン",
        discount: "¥3,500 OFF",
        desc: "最高峰ハンド＆フットフルコースでご利用可能"
      },
      {
        title: "【Platinum限定】公式オンラインショップ全品 15% OFF VIPクーポン",
        discount: "15% OFF",
        desc: "何度でも使えるVIP会員専用特別割引"
      }
    ]
  }
];

export function getRankPointRate(rank: MemberRank): number {
  const found = MEMBER_RANKS_CONFIG.find((r) => r.rank === rank);
  return found ? found.pointRate : 0.01;
}

export function getRankConfig(rank: MemberRank): RankTierConfig {
  return MEMBER_RANKS_CONFIG.find((r) => r.rank === rank) || MEMBER_RANKS_CONFIG[0];
}

export function calculateMemberRank(points: number): MemberRank {
  if (points >= 3000) return "Platinum";
  if (points >= 1500) return "Gold";
  if (points >= 500) return "Silver";
  return "Regular";
}

export function createBirthdayCoupon(expiryYear = "2026"): UserCoupon {
  return {
    id: `cp-birthday-50-${Date.now()}`,
    title: "【誕生月限定】サロン施術＆公式EC全品 50% OFFバースデークーポン",
    discount: "50% OFF",
    discountPercent: 50,
    expiryDate: `${expiryYear}-11-30`,
    isUsed: false,
    isBirthdayCoupon: true,
    usableAt: "both",
    description: "お誕生月のお客様への特別プレゼント。サロン施術（全メニュー）または公式オンラインショップ全商品で使える特別優待50%OFFチケットです（1回限り有効）。"
  };
}

export const INITIAL_DEMO_USER: MemberUser = {
  id: "user-demo-01",
  name: "山田 菜々美",
  kana: "ヤマダ ナナミ",
  email: "nanami.yamada@example.com",
  role: "member",
  memberNumber: "FR-2026-8823",
  rank: "Gold",
  points: 1650,
  birthday: "1996-10-24", // 10月生まれ（今月がお誕生日月！）
  joinedDate: "2026-04-15",
  lastVisit: "2026-09-28",
  coupons: [
    {
      id: "cp-birthday-50",
      title: "【誕生月限定】サロン施術＆公式EC全品 50% OFFバースデークーポン",
      discount: "50% OFF",
      discountPercent: 50,
      expiryDate: "2026-11-30",
      isUsed: false,
      isBirthdayCoupon: true,
      usableAt: "both",
      description: "【お誕生月特典】サロン施術全コース、または公式オンラインショップ全品が50%OFFとなります（1回限り有効・他割引併用可）"
    },
    {
      id: "cp-gold-2000",
      title: "【Gold会員限定】サロンプレミアム施術 ¥2,000 OFFクーポン",
      discount: "¥2,000 OFF",
      discountAmount: 2000,
      rankRequired: "Gold",
      expiryDate: "2026-12-31",
      isUsed: false,
      usableAt: "salon",
      description: "ゴールド会員様専用の特別施術優待クーポンです。水光マグネット・アートコースでご利用いただけます。"
    },
    {
      id: "cp-gold-ec10",
      title: "【Gold会員限定】公式オンラインショップ全品 10% OFF優待クーポン",
      discount: "10% OFF",
      discountPercent: 10,
      rankRequired: "Gold",
      expiryDate: "2026-12-31",
      isUsed: false,
      usableAt: "shop",
      description: "公式オンラインショップでのご注文時に全品10%OFFが適用されるゴールド会員限定クーポンです。"
    },
    {
      id: "cp-welcome",
      title: "新規WEB会員登録限定 ¥1,000 OFFクーポン",
      discount: "¥1,000 OFF",
      discountAmount: 1000,
      expiryDate: "2026-12-31",
      isUsed: false,
      usableAt: "both",
      description: "施術合計¥6,000以上またはECご購入でご利用いただけます（初回限定）"
    },
    {
      id: "cp-magnet",
      title: "水光マグネットお試し1本無料クーポン",
      discount: "1本アート無料",
      expiryDate: "2026-10-31",
      isUsed: true,
      usedAt: "2026-09-28 14:30",
      usableAt: "salon",
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
      balanceAfter: 1350,
      reason: "施術ご来店ポイント（水光マグネットコース / Gold還元率3.5%）",
      staffName: "池田（店長）",
      createdAt: "2026-08-12 16:30"
    },
    {
      id: "tx-003",
      userId: "user-demo-01",
      type: "grant",
      amount: 400,
      balanceAfter: 1750,
      reason: "施術ご来店ポイント（秋ニュアンスコース / Gold還元率3.5%）",
      staffName: "高橋",
      createdAt: "2026-09-28 15:45"
    },
    {
      id: "tx-004",
      userId: "user-demo-01",
      type: "redeem",
      amount: -100,
      balanceAfter: 1650,
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
    id: "rw-gold-ticket",
    title: "【Gold・Platinum限定】パラジェル最高級スパトリートメント無料",
    pointsRequired: 1000,
    category: "service",
    description: "手肌と甘皮を集中保湿するサロン専用パラフィンスパコース。ゴールド以上の会員様限定特典です。",
    expiryDays: 90,
    rankRequired: "Gold"
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

