"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { MemberUser, UserCoupon, PointTransaction, RewardItem } from "@/types/member";
import { INITIAL_DEMO_USER, STAFF_ACCOUNTS } from "@/data/memberData";

interface AuthContextType {
  user: MemberUser | null;
  isStaff: boolean;
  currentStaff: typeof STAFF_ACCOUNTS[0] | null;
  isLoading: boolean;
  login: (email: string) => Promise<boolean>;
  register: (name: string, email: string, kana?: string) => Promise<boolean>;
  loginDemoUser: () => Promise<void>;
  loginDemoStaff: (staffIndex?: number) => void;
  logout: () => void;
  grantPoints: (amount: number, reason: string, targetUserId?: string) => Promise<{ success: boolean; message: string }>;
  redeemReward: (rewardId: string) => Promise<{ success: boolean; message: string }>;
  useCoupon: (couponId: string) => Promise<{ success: boolean; message: string }>;
  checkoutShop: (usedPoints: number, earnedPoints: number, orderSummary: string) => Promise<{ success: boolean; message: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<MemberUser | null>(null);
  const [isStaff, setIsStaff] = useState<boolean>(false);
  const [currentStaff, setCurrentStaff] = useState<typeof STAFF_ACCOUNTS[0] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // 初期化: LocalStorageから状態復元
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("fraise_member_user");
      const savedStaff = localStorage.getItem("fraise_staff_user");

      if (savedUser) {
        setUser(JSON.parse(savedUser));
      } else {
        // 初期状態は未ログイン
        setUser(null);
      }

      if (savedStaff) {
        setCurrentStaff(JSON.parse(savedStaff));
        setIsStaff(true);
      }
    } catch (e) {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // ユーザー状態更新ヘルパー
  const persistUser = (updated: MemberUser | null) => {
    setUser(updated);
    if (updated) {
      localStorage.setItem("fraise_member_user", JSON.stringify(updated));
    } else {
      localStorage.removeItem("fraise_member_user");
    }
  };

  // ログイン
  const login = async (email: string) => {
    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "login", email }),
      });
      const data = await res.json();
      if (data.success && data.user) {
        persistUser(data.user);
        return true;
      }
      return false;
    } catch (e) {
      return false;
    }
  };

  // 新規登録
  const register = async (name: string, email: string, kana?: string) => {
    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "register", name, email, kana }),
      });
      const data = await res.json();
      if (data.success && data.user) {
        persistUser(data.user);
        return true;
      }
      return false;
    } catch (e) {
      return false;
    }
  };

  // デモ会員ログイン
  const loginDemoUser = async () => {
    setIsStaff(false);
    setCurrentStaff(null);
    localStorage.removeItem("fraise_staff_user");
    persistUser(INITIAL_DEMO_USER);
  };

  // デモスタッフログイン
  const loginDemoStaff = (staffIndex = 0) => {
    const staff = STAFF_ACCOUNTS[staffIndex] || STAFF_ACCOUNTS[0];
    setCurrentStaff(staff);
    setIsStaff(true);
    localStorage.setItem("fraise_staff_user", JSON.stringify(staff));
  };

  // ログアウト
  const logout = () => {
    persistUser(null);
    setIsStaff(false);
    setCurrentStaff(null);
    localStorage.removeItem("fraise_staff_user");
  };

  // サーバー側API経由でのポイント付与
  const grantPoints = async (amount: number, reason: string) => {
    if (!user) return { success: false, message: "対象会員が見つかりません" };

    try {
      const res = await fetch("/api/points", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "grant",
          currentUser: user,
          grantAmount: amount,
          reason,
          staffName: currentStaff?.name || "店長 池田"
        }),
      });

      const data = await res.json();
      if (data.success && data.user) {
        persistUser(data.user);
        return { success: true, message: data.message };
      }
      return { success: false, message: data.message || "付与に失敗しました" };
    } catch (e) {
      return { success: false, message: "通信エラーが発生しました" };
    }
  };

  // サーバー側API経由での特典交換
  const redeemReward = async (rewardId: string) => {
    if (!user) return { success: false, message: "ログインが必要です" };

    try {
      const res = await fetch("/api/points", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "redeem",
          currentUser: user,
          rewardId,
        }),
      });

      const data = await res.json();
      if (data.success && data.user) {
        persistUser(data.user);
        return { success: true, message: data.message };
      }
      return { success: false, message: data.message || "交換に失敗しました" };
    } catch (e) {
      return { success: false, message: "通信エラーが発生しました" };
    }
  };

  // サーバー側API経由でのクーポン利用
  const useCoupon = async (couponId: string) => {
    if (!user) return { success: false, message: "ログインが必要です" };

    try {
      const res = await fetch("/api/coupons", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "use",
          currentUser: user,
          couponId,
        }),
      });

      const data = await res.json();
      if (data.success && data.user) {
        persistUser(data.user);
        return { success: true, message: data.message };
      }
      return { success: false, message: data.message || "クーポン利用に失敗しました" };
    } catch (e) {
      return { success: false, message: "通信エラーが発生しました" };
    }
  };

  // オンラインショップでの決済（ポイント利用減算 ＆ 購入還元、サロン・ショップ完全共通同期）
  const checkoutShop = async (usedPoints: number, earnedPoints: number, orderSummary: string) => {
    if (!user) return { success: false, message: "ログインが必要です" };

    try {
      const res = await fetch("/api/points", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "shop_checkout",
          currentUser: user,
          usedPoints,
          earnedPoints,
          orderSummary
        }),
      });

      const data = await res.json();
      if (data.success && data.user) {
        persistUser(data.user);
        return { success: true, message: data.message };
      }
      return { success: false, message: data.message || "決済処理に失敗しました" };
    } catch (e) {
      return { success: false, message: "通信エラーが発生しました" };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isStaff,
        currentStaff,
        isLoading,
        login,
        register,
        loginDemoUser,
        loginDemoStaff,
        logout,
        grantPoints,
        redeemReward,
        useCoupon,
        checkoutShop,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
