// src/types/member.ts

export type MemberRank = "Regular" | "Silver" | "Gold" | "Platinum";

export interface UserCoupon {
  id: string;
  title: string;
  discount: string;
  expiryDate: string;
  isUsed: boolean;
  usedAt?: string;
  description: string;
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
  coupons: UserCoupon[];
  transactions: PointTransaction[];
  joinedDate: string;
  lastVisit?: string;
}
