"use client";

import React from "react";
import { Calendar, MapPin, Clock, Phone, ShieldCheck, Wifi, Coffee, CheckCircle2 } from "lucide-react";
import { MENS_SALON_INFO } from "@/data/mensSalonData";

export default function MensReservationSection() {
  return (
    <section id="reservation" className="py-24 sm:py-32 mens-bg-subtle relative border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* セクションヘッダー */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-zinc-700 text-xs font-mono text-zinc-300 shadow-sm uppercase tracking-widest">
            <Calendar className="w-3.5 h-3.5 text-zinc-400" />
            <span>Reservation &amp; Access</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-light text-white leading-tight">
            メンズWeb即時予約 ＆ サロン案内
          </h2>

          <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed">
            24時間リアルタイムで空席確認・即時予約が可能です。<br />
            完全個室・半個室空間にて、スタッフ一同心よりお待ちしております。
          </p>
        </div>

        {/* 2カラム：予約アクション ＆ サロン設備スペック */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-5xl mx-auto">
          
          {/* 左側：予約CTA（7カラム） */}
          <div className="lg:col-span-7 mens-glass p-8 sm:p-10 rounded-[2.5rem] border border-zinc-800 shadow-2xl space-y-6">
            <div className="space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                本日・明日の空席状況をリアルタイム確認中
              </span>
              <h3 className="text-xl sm:text-2xl font-serif font-light text-white leading-snug">
                HOT PEPPER Beauty より<br />
                今すぐ24時間即時予約
              </h3>
              <p className="text-xs text-zinc-400 font-light leading-relaxed">
                希望日時・担当男性ネイリスト・メニューを選択して、3ステップで予約完了。<br />
                リクルートポイントも貯まる・使える安心の公式連携予約です。
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-2 text-xs text-zinc-300">
              <p className="font-medium text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-zinc-400" />
                <span>男性のお客様専用・完全予約制プライベートサロン</span>
              </p>
              <p className="text-[11px] text-zinc-400 font-light leading-relaxed">
                女性のお客様と居合わせることはございません。初めてのネイルサロンでも、リラックスしてお過ごしいただけます。
              </p>
            </div>

            <a
              href={MENS_SALON_INFO.links.hotpepper}
              target="_blank"
              rel="noopener noreferrer"
              className="mens-button-white w-full py-4 rounded-full text-xs font-semibold flex items-center justify-center gap-2 shadow-2xl tracking-wider cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>HOT PEPPER で空席確認・予約する</span>
            </a>
          </div>

          {/* 右側：サロン情報＆アクセス（5カラム） */}
          <div className="lg:col-span-5 mens-glass-card p-6 sm:p-8 rounded-[2.5rem] space-y-5 text-xs">
            <h4 className="font-serif font-medium text-sm text-white border-b border-zinc-800 pb-3 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-zinc-400" /> サロン概要・アクセス
            </h4>

            <ul className="space-y-3 text-zinc-300 font-light">
              <li className="space-y-1">
                <span className="text-zinc-500 block text-[10px] font-mono">SALON NAME</span>
                <span className="text-white font-serif font-medium text-sm">{MENS_SALON_INFO.name}</span>
                <span className="text-zinc-400 block text-[11px]">（{MENS_SALON_INFO.nameJp}）</span>
              </li>
              <li className="space-y-0.5 border-t border-zinc-900 pt-2.5">
                <span className="text-zinc-500 block text-[10px] font-mono">ACCESS</span>
                <span className="text-white">{MENS_SALON_INFO.access}</span>
              </li>
              <li className="space-y-0.5 border-t border-zinc-900 pt-2.5">
                <span className="text-zinc-500 block text-[10px] font-mono">HOURS</span>
                <span className="text-white font-mono">{MENS_SALON_INFO.hours}</span>
              </li>
              <li className="space-y-0.5 border-t border-zinc-900 pt-2.5">
                <span className="text-zinc-500 block text-[10px] font-mono">STAFF</span>
                <span className="text-white">{MENS_SALON_INFO.staffCount}</span>
              </li>
            </ul>

            <div className="pt-3 border-t border-zinc-800/80 space-y-1.5">
              <span className="text-[10px] font-mono text-zinc-500 block">FACILITIES</span>
              <div className="flex flex-wrap gap-1.5">
                {["完全個室", "男性ネイリストのみ", "削らないパラジェル", "高速Wi-Fi", "電源", "カフェ無料"].map((f, i) => (
                  <span key={i} className="text-[10px] px-2 py-0.5 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-400">
                    {f}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
