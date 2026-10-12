// src/types/member.ts

export type MemberRank = "Regular" | "Silver" | "Gold" | "Platinum";

export interface RankTierConfig {
  rank: MemberRank;
  name: string;
  minPoints: number;
  pointRate: number; // 例: 0.01 (1%), 0.02 (2%), 0.035 (3.5%), 0.05 (5%)
  rateLabel: string; // "1.0%", "2.0%", "3.5%", "5.0%"
  color: string;
  badgeBg: string;
  perks: string[];
  exclusiveCoupons: {
    title: string;
    discount: string;
    desc: string;
  }[];
}

export interface UserCoupon {
  id: string;
  title: string;
  discount: string;
  expiryDate: string;
  isUsed: boolean;
  usedAt?: string;
  description: string;
  discountPercent?: number; // 例: 50 (%OFF)
  discountAmount?: number;  // 例: 2000 (¥OFF)
  rankRequired?: MemberRank; // 会員ランク限定
  isBirthdayCoupon?: boolean; // 誕生月限定50%OFF
  usableAt?: "both" | "salon" | "shop"; // 利用可能場所
}

export interface PointTransaction {
  id: string;
  userId: string;
  type: "grant" | "redeem"; // grant: 付与, redeem: 交換
  amount: number;
  balanceAfter: number;
  reason: string;
  staffName?: string;
  createdAt: string;
}

export interface RewardItem {
  id: string;
  title: string;
  pointsRequired: number;
  category: "service" | "discount" | "gift";
  description: string;
  expiryDays: number;
  rankRequired?: MemberRank;
}

export interface MemberUser {
  id: string;
  name: string;
  kana: string;
  email: string;
  role: "member" | "staff" | "admin";
  memberNumber: string; // 例: FR-2026-8812
  rank: MemberRank;
  points: number;
  birthday?: string; // 例: "1996-10-24"
  coupons: UserCoupon[];
  transactions: PointTransaction[];
  joinedDate: string;
  lastVisit?: string;
}

