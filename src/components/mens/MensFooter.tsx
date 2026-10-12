"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeftRight, Sparkles, MapPin, Clock, Phone, ShoppingBag } from "lucide-react";
import { MENS_SALON_INFO } from "@/data/mensSalonData";

export default function MensFooter() {
  return (
    <footer className="bg-[#09090b] text-zinc-400 border-t border-zinc-800 text-xs font-light">
      {/* 上部提携サロン導線 */}
      <div className="border-b border-zinc-900 py-6 px-4 sm:px-6 lg:px-8 bg-zinc-950/60">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300">
              <ArrowLeftRight className="w-4 h-4 text-gold-400" />
            </div>
            <div>
              <p className="font-serif text-sm text-white">提携サロンのご案内</p>
              <p className="text-[11px] text-zinc-500">
                女性向けパラジェル＆水光マグネット専門サロン「Salon de Fraise 表参道」
              </p>
            </div>
          </div>
          <Link
            href="/"
            className="px-5 py-2 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-white text-xs font-medium transition-colors"
          >
            レディースサロンのサイトへ移動
          </Link>
        </div>
      </div>

      {/* メインフッター */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* ブランド情報（5カラム） */}
        <div className="md:col-span-5 space-y-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full p-0.5 bg-zinc-750 shrink-0">
              <div className="w-full h-full rounded-full overflow-hidden bg-zinc-950">
                <Image
                  src="/images/brand_emblem_homme.svg"
                  alt="Salon de Fraise HOMME 公式ブランドロゴ"
                  width={32}
                  height={32}
                  className="w-full h-full object-contain p-0.5"
                />
              </div>
            </div>
            <h4 className="font-serif text-base text-white tracking-widest font-medium">
              Salon de Fraise <span className="text-zinc-500 font-light text-xs">HOMME</span>
            </h4>
          </div>
          <p className="text-[11px] text-zinc-400 leading-relaxed font-light">
            「男なのになんでネイル？」という固定概念を壊す、全員男性ネイリストによるメンズ専用パラジェルネイルサロン。<br />
            自爪を削らないパラジェル処方と、ビジネスでバレない自爪風マット仕上げを提供します。
          </p>
          <p className="text-[10px] text-zinc-600 font-mono">
            All Male Nailists (5 Staffs) / Private Rooms / Paragel Certified
          </p>
        </div>

        {/* サイトマップ（3カラム） */}
        <div className="md:col-span-3 space-y-2.5">
          <p className="font-mono text-[10px] uppercase tracking-widest text-zinc-500 font-semibold">NAVIGATION</p>
          <ul className="space-y-1.5 text-zinc-400 text-xs">
            <li><Link href="/mens#concept" className="hover:text-white transition-colors">設立の想い・コンセプト</Link></li>
            <li><Link href="/mens#menu" className="hover:text-white transition-colors">メニュー・料金表</Link></li>
            <li><Link href="/mens#catalog" className="hover:text-white transition-colors">メンズスタイルカタログ</Link></li>
            <li><Link href="/mens#staff" className="hover:text-white transition-colors">男性ネイリスト（在籍5名）</Link></li>
            <li><Link href="/mens#recruit" className="hover:text-white transition-colors">男性スタッフ採用情報</Link></li>
            <li><Link href="/mens/shop" className="hover:text-white transition-colors">メンズ公式オンラインショップ</Link></li>
          </ul>
        </div>

        {/* 共通システム・マイページ（4カラム） */}
        <div className="md:col-span-4 space-y-2.5">
          <p className="font-mono text-[10px] uppercase tracking-widest text-zinc-500 font-semibold">SHARED SERVICES</p>
          <ul className="space-y-1.5 text-zinc-400 text-xs">
            <li><Link href="/mypage" className="hover:text-white transition-colors">会員マイページ（サロン・EC共通）</Link></li>
            <li><Link href="/login" className="hover:text-white transition-colors">会員登録 / ログイン（新規1000pt）</Link></li>
            <li><Link href="/mens/shop" className="hover:text-white transition-colors">メンズパラジェル ネイルチップ</Link></li>
            <li><Link href="/" className="hover:text-white transition-colors">提携レディースサロン（Salon de Fraise）</Link></li>
          </ul>
        </div>

      </div>

      {/* ポートフォリオ実績用デモ明記バナー */}
      <div className="border-t border-zinc-900/80 py-4 px-4 sm:px-6 lg:px-8 bg-zinc-950/40 text-center text-[11px] text-zinc-500">
        <p className="font-mono text-zinc-400">
          【ポートフォリオ実績用デモサイト】
        </p>
        <p className="font-light mt-0.5 leading-relaxed">
          当サイト（Salon de Fraise HOMME）に掲載されている店舗・男性ネイリスト・施術メニュー・予約枠・オンラインショップ等は、Webエンジニアとしてのシステム設計・実装力を示すためのポートフォリオデモです。実在の店舗や課金・施術は発生いたしません。
        </p>
      </div>

      {/* コピーライト */}
      <div className="border-t border-zinc-900 py-6 text-center text-[10px] text-zinc-600 font-mono">
        &copy; {new Date().getFullYear()} Salon de Fraise HOMME. All Rights Reserved. Designed for Modern Gentlemen.
      </div>
    </footer>
  );
}
