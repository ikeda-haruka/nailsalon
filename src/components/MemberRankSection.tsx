"use client";

import React from "react";
import Link from "next/link";
import {
  Sparkles,
  Award,
  Gift,
  Crown,
  CheckCircle2,
  ChevronRight,
  TrendingUp,
  Cake,
  ArrowRight,
  BadgePercent
} from "lucide-react";
import { MEMBER_RANKS_CONFIG } from "@/data/memberData";
import { useAuth } from "@/context/AuthContext";

interface MemberRankSectionProps {
  isMens?: boolean;
}

export default function MemberRankSection({ isMens = false }: MemberRankSectionProps) {
  const { user } = useAuth();

  return (
    <section
      id="member-rank"
      className={`relative py-24 sm:py-32 overflow-hidden ${
        isMens
          ? "bg-zinc-950 text-zinc-100 border-t border-b border-zinc-800"
          : "aurora-bg text-plum-950 border-t border-b border-lavender-200/70"
      }`}
    >
      {/* 背景装飾ブラー */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {isMens ? (
          <>
            <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-zinc-800/30 blur-3xl" />
            <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-zinc-700/20 blur-3xl" />
          </>
        ) : (
          <>
            <div className="absolute -top-32 right-1/4 w-96 h-96 rounded-full bg-lavender-200/40 blur-3xl" />
            <div className="absolute bottom-10 -left-20 w-96 h-96 rounded-full bg-gold-200/30 blur-3xl" />
            <div className="absolute top-1/2 right-10 w-72 h-72 rounded-full bg-strawberry-100/35 blur-3xl" />
          </>
        )}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* セクション見出し */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16 sm:mb-20">
          <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-serif tracking-widest uppercase shadow-xs border ${
            isMens
              ? "bg-zinc-900 border-zinc-700 text-zinc-200"
              : "bg-white border-gold-400 text-[#241a2f] font-bold"
          }`}>
            <Crown className={`w-3.5 h-3.5 ${isMens ? "text-zinc-300" : "text-gold-600"}`} />
            <span>Salon &amp; Official EC Loyalty Program</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif tracking-tight font-medium">
            {isMens ? (
              <>
                通うほど、磨くほどに極まる。<br className="hidden sm:inline" />
                <span className="text-white font-semibold">
                  メンズ会員ランク＆特別優待プログラム
                </span>
              </>
            ) : (
              <>
                通うほど、お買い物するほどお得に。<br className="hidden sm:inline" />
                <span className="text-[#180d26] font-bold">
                  サロン＆公式EC共通 会員ランクプログラム
                </span>
              </>
            )}
          </h2>

          <p className={`text-xs sm:text-sm leading-relaxed max-w-2xl mx-auto font-normal ${
            isMens ? "text-zinc-300" : "text-[#2e203c]"
          }`}>
            Salon de Fraiseでは、サロン施術と公式オンラインショップのご利用で
            <strong className={`font-bold mx-1 ${isMens ? "text-white" : "text-[#180d26]"}`}>
              「共通ポイント（1pt=¥1）」
            </strong>
            が貯まります。ランクが上がるほど
            <strong className={`font-bold mx-1 ${isMens ? "text-white" : "text-[#180d26]"}`}>
              還元率は最大5.0%までアップ！
            </strong>
            さらに高ランク会員様限定の割引クーポンや、全会員様へ
            <strong className={`font-bold mx-1 ${isMens ? "text-white" : "text-[#180d26]"}`}>
              【誕生月限定50%OFFバースデークーポン】
            </strong>
            をお届けします。
          </p>

          {/* 会員証提示 / ログイン状態バナー */}
          {user ? (
            <div className={`mt-6 inline-flex items-center gap-3 px-5 py-2.5 rounded-2xl border shadow-sm backdrop-blur-sm ${
              isMens
                ? "bg-zinc-900 border-zinc-700 text-zinc-100"
                : "bg-white border-gold-400 text-[#180d26]"
            }`}>
              <Sparkles className={`w-4 h-4 ${isMens ? "text-zinc-300" : "text-gold-600"}`} />
              <span className="text-xs">
                現在ログイン中: <strong className="font-bold">{user.name} 様</strong> は{" "}
                <span className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                  user.rank === "Platinum"
                    ? "bg-purple-900 text-amber-200"
                    : user.rank === "Gold"
                    ? "bg-amber-100 text-amber-900 border border-amber-400"
                    : user.rank === "Silver"
                    ? "bg-slate-200 text-slate-900 border border-slate-300"
                    : "bg-stone-200 text-stone-900 border border-stone-300"
                }`}>
                  ★ {user.rank} 会員
                </span>
                （保有: <strong className="font-bold">{user.points.toLocaleString()} pt</strong>）
              </span>
              <Link
                href="/mypage"
                className={`text-[11px] font-bold underline flex items-center gap-1 ${
                  isMens ? "text-zinc-200 hover:text-white" : "text-[#180d26] hover:text-plum-900"
                }`}
              >
                マイページで確認
                <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
          ) : (
            <div className={`mt-6 inline-flex flex-wrap items-center justify-center gap-3 px-5 py-2.5 rounded-2xl border text-xs shadow-xs ${
              isMens
                ? "bg-zinc-900 border-zinc-700 text-zinc-200"
                : "bg-white border-lavender-300 text-[#241a2f]"
            }`}>
              <Gift className={`w-4 h-4 ${isMens ? "text-zinc-300" : "text-gold-600"}`} />
              <span>
                新規会員登録で、公式EC＆サロンで即使える<strong className="font-bold text-[#180d26] dark:text-white">1,000pt（¥1,000相当）</strong>＋<strong className="font-bold text-[#180d26] dark:text-white">¥1,000 OFFクーポン</strong>をもれなく進呈！
              </span>
              <Link
                href="/login"
                className={`font-bold underline ml-1 ${
                  isMens ? "text-white" : "text-[#180d26]"
                }`}
              >
                無料登録はこちら →
              </Link>
            </div>
          )}
        </div>

        {/* 特大フィーチャーバナー：誕生月限定 50% OFF バースデークーポン */}
        <div className={`relative mb-20 rounded-[2.5rem] p-8 sm:p-12 overflow-hidden border shadow-xl ${
          isMens
            ? "bg-gradient-to-br from-zinc-900 via-zinc-900/90 to-zinc-950 border-zinc-700 text-white"
            : "bg-gradient-to-br from-white via-lavender-50/90 to-gold-50/80 border-gold-300 text-[#180d26]"
        }`}>
          {/* 背景装飾 */}
          <div className="absolute top-0 right-0 -mt-12 -mr-12 w-80 h-80 rounded-full bg-gold-400/15 blur-2xl pointer-events-none" />
          
          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* 左側：バナー情報 */}
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-rose-500/10 border border-rose-400 text-rose-700">
                <Cake className="w-3.5 h-3.5 text-rose-600" />
                <span>Birthday Exclusive Benefit</span>
              </div>

              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold leading-snug text-[#180d26]">
                お誕生日は、指先から最高のご褒美を。<br />
                <span className="font-extrabold bg-gradient-to-r from-rose-700 via-amber-700 to-gold-700 bg-clip-text text-transparent">
                  【誕生月限定】サロン施術 ＆ 公式EC全品 50% OFF
                </span>
              </h3>

              <p className={`text-xs sm:text-sm leading-relaxed font-normal ${
                isMens ? "text-zinc-300" : "text-[#2e203c]"
              }`}>
                Salon de Fraiseより、年に一度のお誕生日を祝う特別プレゼント。<br className="hidden sm:inline" />
                マイページでお誕生日をご登録いただくと、誕生月いつでも使える
                <strong className={`font-bold mx-1 ${isMens ? "text-white" : "text-[#180d26]"}`}>
                  「全施術メニュー半額 ＆ 公式オンラインショップ全品半額」
                </strong>
                のプレミアム50%OFFバースデークーポンが自動発行されます。
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-medium">
                <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border shadow-2xs ${
                  isMens ? "bg-zinc-800 border-zinc-700 text-zinc-100" : "bg-white border-lavender-300 text-[#180d26]"
                }`}>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>サロン全施術コース（水光マグネット・アート含む）対象</span>
                </div>
                <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border shadow-2xs ${
                  isMens ? "bg-zinc-800 border-zinc-700 text-zinc-100" : "bg-white border-lavender-300 text-[#180d26]"
                }`}>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>公式EC ネイルチップ＆ケア用品全品対象</span>
                </div>
                <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border shadow-2xs ${
                  isMens ? "bg-zinc-800 border-zinc-700 text-zinc-100" : "bg-white border-lavender-300 text-[#180d26]"
                }`}>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>誕生月中、お好きなタイミングで1回利用可能</span>
                </div>
              </div>
            </div>

            {/* 右側：クーポンビジュアルカード */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="relative w-full max-w-sm rounded-2xl p-6 bg-gradient-to-br from-rose-600 via-purple-900 to-amber-700 text-white shadow-2xl border border-white/30 overflow-hidden transform hover:scale-[1.02] transition-transform">
                <div className="absolute top-0 right-0 -mr-6 -mt-6 w-24 h-24 bg-white/10 rounded-full blur-xl pointer-events-none" />
                <div className="flex justify-between items-start border-b border-white/20 pb-3">
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span className="font-serif tracking-widest text-[10px] uppercase text-white font-bold">
                      Salon de Fraise
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-white/20 text-[9px] font-mono tracking-wider font-semibold">
                    SPECIAL BIRTHDAY PASS
                  </span>
                </div>

                <div className="my-5 text-center space-y-1">
                  <p className="text-[11px] tracking-widest text-amber-200 font-serif uppercase font-bold">
                    HAPPY BIRTHDAY COUPON
                  </p>
                  <p className="text-4xl sm:text-5xl font-serif font-black tracking-tight text-white drop-shadow-md">
                    50<span className="text-2xl font-light">%</span> <span className="text-xl font-normal">OFF</span>
                  </p>
                  <p className="text-[11px] text-white/95 font-medium pt-1">
                    サロン全施術 ＆ 公式オンラインショップ全品対象
                  </p>
                </div>

                <div className="pt-3 border-t border-dashed border-white/30 flex justify-between items-center text-[10px] text-white/90 font-medium">
                  <span>対象：全会員様（誕生日登録者）</span>
                  <span>有効期限：誕生月末日まで</span>
                </div>

                <div className="mt-4">
                  <Link
                    href="/mypage"
                    className="w-full py-2.5 rounded-xl bg-white text-plum-950 hover:bg-amber-100 text-xs font-bold flex items-center justify-center gap-1.5 shadow-md transition-colors"
                  >
                    <span>マイページでお誕生日を登録する</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* 4段階会員ランク カード一覧 */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <p className={`text-xs font-serif tracking-widest uppercase font-bold ${
                isMens ? "text-zinc-400" : "text-plum-800"
              }`}>
                Tier Hierarchy &amp; Privileges
              </p>
              <h3 className={`text-2xl sm:text-3xl font-serif font-bold mt-1 ${
                isMens ? "text-white" : "text-[#180d26]"
              }`}>
                4つの会員ランクと豪華優待特典
              </h3>
            </div>
            <p className={`text-xs font-medium max-w-md ${
              isMens ? "text-zinc-300" : "text-[#2e203c]"
            }`}>
              サロン施術・公式ECご利用の累計ポイントに応じて自動昇格。ランクが上がるほどポイント還元率とお得な限定クーポンが増加します。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
            {MEMBER_RANKS_CONFIG.map((tier) => {
              const isGold = tier.rank === "Gold";
              const isPlatinum = tier.rank === "Platinum";
              const isSilver = tier.rank === "Silver";
              const isRegular = tier.rank === "Regular";
              const isCurrent = user?.rank === tier.rank;

              return (
                <div
                  key={tier.rank}
                  className={`relative rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 shadow-xl ${
                    isMens
                      ? isPlatinum
                        ? "bg-gradient-to-b from-zinc-800 to-zinc-900 border-2 border-zinc-500 ring-1 ring-zinc-400/40 text-white"
                        : isGold
                        ? "bg-zinc-900 border-2 border-zinc-600 text-white"
                        : "bg-zinc-950 border border-zinc-800 text-white"
                      : isPlatinum
                      ? "border-2 border-purple-400 bg-gradient-to-b from-purple-50/60 via-white to-purple-50/30 ring-2 ring-purple-300/40"
                      : isGold
                      ? "border-2 border-amber-400 bg-gradient-to-b from-amber-50/60 via-white to-amber-50/30 ring-2 ring-amber-300/40"
                      : isSilver
                      ? "border-2 border-slate-300 bg-white"
                      : "border-2 border-stone-300 bg-white"
                  }`}
                >
                  {/* おすすめ・人気バッジ */}
                  {isGold && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-gradient-to-r from-amber-500 to-gold-500 text-white text-[10px] font-extrabold tracking-wider uppercase shadow-md flex items-center gap-1 border border-amber-300">
                      <Sparkles className="w-3.5 h-3.5 text-white" />
                      <span>Popular Tier</span>
                    </div>
                  )}
                  {isPlatinum && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-gradient-to-r from-purple-950 to-plum-950 text-amber-300 text-[10px] font-extrabold tracking-wider uppercase shadow-md flex items-center gap-1 border border-amber-400/80">
                      <Crown className="w-3.5 h-3.5 text-amber-300" />
                      <span>Highest Prestige</span>
                    </div>
                  )}

                  {/* 上部ヘッダー */}
                  <div>
                    <div className="flex items-center justify-between">
                      <span className={`text-[11px] px-3 py-1 rounded-full border font-mono font-bold shadow-2xs ${
                        isMens
                          ? tier.badgeBg
                          : isPlatinum
                          ? "bg-purple-900 text-amber-200 border-purple-700"
                          : isGold
                          ? "bg-amber-100 text-amber-950 border-amber-400"
                          : isSilver
                          ? "bg-slate-100 text-slate-900 border-slate-300"
                          : "bg-stone-100 text-stone-900 border-stone-300"
                      }`}>
                        ★ {tier.rank}
                      </span>
                      {isCurrent && (
                        <span className="text-[10px] px-2 py-0.5 rounded-md bg-emerald-600 text-white font-bold shadow-2xs">
                          現在のランク
                        </span>
                      )}
                    </div>

                    {/* ランク名（特大・濃色で圧倒的な視認性） */}
                    <h4 className={`text-2xl font-serif font-bold mt-3.5 ${
                      isMens ? "text-white" : "text-[#180d26]"
                    }`}>
                      {tier.name}
                    </h4>

                    {/* 昇格条件 */}
                    <div className={`mt-2 text-xs font-medium flex items-center gap-1.5 ${
                      isMens ? "text-zinc-300" : "text-[#241a2f]"
                    }`}>
                      <TrendingUp className={`w-3.5 h-3.5 ${isMens ? "text-zinc-400" : "text-gold-600"}`} />
                      <span>
                        昇格条件:{" "}
                        <strong className={`font-bold ${isMens ? "text-white" : "text-[#180d26]"}`}>
                          {tier.minPoints === 0 ? "無料会員登録" : `累計 ${tier.minPoints.toLocaleString()} pt 〜`}
                        </strong>
                      </span>
                    </div>

                    {/* ポイント還元率ボックス */}
                    <div className={`mt-4 p-4 rounded-2xl border text-center shadow-xs ${
                      isMens
                        ? "bg-zinc-950 border-zinc-700"
                        : isPlatinum
                        ? "bg-purple-100/70 border-purple-300"
                        : isGold
                        ? "bg-amber-100/70 border-amber-300"
                        : isSilver
                        ? "bg-slate-100/80 border-slate-300"
                        : "bg-stone-100/80 border-stone-300"
                    }`}>
                      <p className={`text-[10px] uppercase tracking-widest font-mono font-bold ${
                        isMens ? "text-zinc-400" : "text-[#3b2354]"
                      }`}>
                        Point Return Rate
                      </p>
                      <p className={`text-3xl sm:text-4xl font-serif font-black mt-0.5 tracking-tight ${
                        isMens
                          ? "text-white"
                          : isPlatinum
                          ? "text-purple-950"
                          : isGold
                          ? "text-amber-950"
                          : "text-[#180d26]"
                      }`}>
                        {tier.rateLabel}
                      </p>
                      <p className={`text-[11px] font-semibold mt-0.5 ${
                        isMens ? "text-zinc-400" : "text-[#3b2354]"
                      }`}>
                        サロン施術 ＆ 公式EC全品共通
                      </p>
                    </div>

                    {/* 特典一覧 */}
                    <div className="mt-5 space-y-2.5">
                      <p className={`text-xs font-bold tracking-wider uppercase flex items-center gap-1 ${
                        isMens ? "text-zinc-200" : "text-[#180d26]"
                      }`}>
                        <Award className={`w-3.5 h-3.5 ${isMens ? "text-zinc-300" : "text-gold-600"}`} />
                        <span>ランク特典・優待</span>
                      </p>
                      <ul className={`space-y-2 text-xs font-normal leading-relaxed ${
                        isMens ? "text-zinc-300" : "text-[#241a2f]"
                      }`}>
                        {tier.perks.map((perk, pIdx) => (
                          <li key={pIdx} className="flex items-start gap-2">
                            <CheckCircle2 className={`w-4 h-4 mt-0.5 shrink-0 ${
                              isMens
                                ? "text-zinc-300"
                                : isPlatinum
                                ? "text-purple-700"
                                : isGold
                                ? "text-amber-600"
                                : "text-lavender-700"
                            }`} />
                            <span className="font-medium">{perk}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* 高ランク限定割引クーポン */}
                    <div className={`mt-5 pt-4 border-t border-dashed space-y-2.5 ${
                      isMens ? "border-zinc-800" : "border-lavender-300"
                    }`}>
                      <p className={`text-xs font-bold tracking-wider uppercase flex items-center gap-1 ${
                        isMens ? "text-zinc-200" : "text-[#180d26]"
                      }`}>
                        <BadgePercent className="w-3.5 h-3.5 text-rose-600" />
                        <span>ランク限定 割引クーポン</span>
                      </p>
                      {tier.exclusiveCoupons.map((cp, cIdx) => (
                        <div
                          key={cIdx}
                          className={`p-3 rounded-xl border text-xs space-y-1 shadow-xs ${
                            isMens
                              ? "bg-zinc-950 border-zinc-700 text-zinc-100"
                              : "bg-[#faf6fd] border-rose-200/90 text-[#180d26]"
                          }`}
                        >
                          <div className="flex justify-between items-center font-bold">
                            <span className="truncate pr-1.5">{cp.title}</span>
                            <span className="text-white bg-rose-600 px-2 py-0.5 rounded font-black text-[11px] shrink-0 shadow-2xs">
                              {cp.discount}
                            </span>
                          </div>
                          <p className={`text-[11px] font-normal ${
                            isMens ? "text-zinc-400" : "text-[#4a3463]"
                          }`}>
                            {cp.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 下部アクション */}
                  <div className={`mt-6 pt-4 border-t ${
                    isMens ? "border-zinc-800" : "border-lavender-200"
                  }`}>
                    <Link
                      href={user ? "/mypage" : "/login"}
                      className={`w-full py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-xs ${
                        isMens
                          ? "bg-white hover:bg-zinc-200 text-zinc-950"
                          : isGold || isPlatinum
                          ? "bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white shadow-sm"
                          : "bg-lavender-100 hover:bg-lavender-200 border border-lavender-300 text-[#180d26]"
                      }`}
                    >
                      <span>{user ? "マイページで詳細を見る" : "新規登録してランクに参加"}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>

                </div>
              );
            })}
          </div>
        </div>

        {/* 共通ポイントの仕組み解説バナー */}
        <div className={`mt-16 rounded-3xl p-6 sm:p-8 border shadow-lg ${
          isMens
            ? "bg-zinc-900 border-zinc-700 text-zinc-200"
            : "bg-white border-lavender-300 text-[#180d26]"
        }`}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 text-xs font-serif text-gold-700 uppercase tracking-widest font-bold">
                <Sparkles className="w-4 h-4 text-gold-600" />
                <span>Seamless Experience</span>
              </div>
              <h4 className="text-xl font-serif font-bold text-[#180d26] dark:text-white">
                サロン店頭 ＆ 公式オンラインショップ<br />
                完全共通ポイント（1pt = ¥1）
              </h4>
            </div>

            <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs leading-relaxed">
              <div className={`p-4 rounded-2xl border ${
                isMens ? "bg-zinc-950 border-zinc-800" : "bg-lavender-50/70 border-lavender-200"
              }`}>
                <div className="flex items-center gap-2 font-bold text-[#180d26] dark:text-white mb-1.5">
                  <span className="w-5 h-5 rounded-full bg-gold-500 text-white flex items-center justify-center text-[10px] font-bold">1</span>
                  <span>サロン施術で貯まる＆使える</span>
                </div>
                <p className={`text-[11px] font-normal leading-relaxed ${
                  isMens ? "text-zinc-300" : "text-[#2e203c]"
                }`}>
                  ご来店の施術会計時に会員証をご提示いただくと、ランク還元率（最大5%）でポイントを即時付与。お会計時のポイント値引き（1pt=¥1）も可能です。
                </p>
              </div>

              <div className={`p-4 rounded-2xl border ${
                isMens ? "bg-zinc-950 border-zinc-800" : "bg-lavender-50/70 border-lavender-200"
              }`}>
                <div className="flex items-center gap-2 font-bold text-[#180d26] dark:text-white mb-1.5">
                  <span className="w-5 h-5 rounded-full bg-gold-500 text-white flex items-center justify-center text-[10px] font-bold">2</span>
                  <span>公式オンラインショップで共通利用</span>
                </div>
                <p className={`text-[11px] font-normal leading-relaxed ${
                  isMens ? "text-zinc-300" : "text-[#2e203c]"
                }`}>
                  パラジェルネイルチップやケア用品のご注文時にも、サロンで貯めたポイントを自由にご利用可能。ご購入金額に対してもランク還元率が適用されます。
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
