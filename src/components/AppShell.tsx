"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingReservationBar from "@/components/FloatingReservationBar";
import MensFloatingBar from "@/components/mens/MensFloatingBar";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isMens = pathname?.startsWith("/mens");

  return (
    <>
      {/* 女性用サロンヘッダー（メンズページでは完全非表示） */}
      {!isMens && <Header />}

      {/* ページコンテンツ本体 */}
      <main className="min-h-screen">
        {children}
      </main>

      {/* 女性用サロンフッター（メンズページでは完全非表示） */}
      {!isMens && <Footer />}

      {/* 固定予約バー＆トップへ戻るボタン（メンズとレディースで排他的に切り替え） */}
      {!isMens ? <FloatingReservationBar /> : <MensFloatingBar />}
    </>
  );
}
