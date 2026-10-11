import React from "react";
import Link from "next/link";
import { Sparkles, MapPin, Clock, Calendar, Phone, CreditCard, Car, Coffee, Dog, Baby, ExternalLink, Heart } from "lucide-react";
import { SALON_INFO } from "@/data/salonData";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-[#fff0f3] to-[#ffe5ec] text-[#2c181b] pt-16 pb-28 border-t border-pink-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* ブランド */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#ff3366] to-[#ff85a1] flex items-center justify-center text-white shadow-md">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xl font-serif font-black text-[#2c181b]">
                  Salon de Fraise
                </span>
                <p className="text-[10px] text-[#ff6584] font-bold tracking-widest uppercase">
                  Paragel & Magnet Nails
                </p>
              </div>
            </div>
            <p className="text-xs text-[#5e4748] font-medium leading-relaxed">
              削らない自爪に優しいパラジェル専門店。丁寧なケアとフィルイン技術で3〜4週間綺麗な状態をキープ。
            </p>
            <div className="flex flex-wrap gap-1.5 text-[10px] font-bold">
              <span className="px-2.5 py-1 rounded-full bg-white text-[#ff3366] shadow-xs">
                🐾 ペット同伴可
              </span>
              <span className="px-2.5 py-1 rounded-full bg-white text-[#ff3366] shadow-xs">
                👶 お子様同伴可
              </span>
              <span className="px-2.5 py-1 rounded-full bg-white text-[#ff3366] shadow-xs">
                🚗 駐車場3台
              </span>
            </div>
          </div>

          {/* 営業時間・設備 */}
          <div className="space-y-3">
            <h3 className="text-xs font-black tracking-wider text-[#2c181b] uppercase border-b border-pink-200 pb-2">
              SALON INFO & HOURS
            </h3>
            <ul className="text-xs text-[#5e4748] space-y-2 font-medium">
              <li className="flex justify-between">
                <span>営業時間:</span>
                <span className="font-bold text-[#2c181b]">{SALON_INFO.hours}</span>
              </li>
              <li className="flex justify-between">
                <span>定休日:</span>
                <span>不定休</span>
              </li>
              <li className="text-[11px] text-[#ff3366] font-bold bg-white/80 p-2.5 rounded-xl border border-pink-200">
                🎀 年末年始を除き、GW・お盆・SWなどの連休中も休まず営業中！
              </li>
              <li className="flex justify-between">
                <span>設備席数:</span>
                <span>ハンド2席 / フット2席</span>
              </li>
              <li className="flex justify-between">
                <span>駐車場:</span>
                <span>お客様専用 3台完備</span>
              </li>
            </ul>
          </div>

          {/* 決済・おもてなし */}
          <div className="space-y-3">
            <h3 className="text-xs font-black tracking-wider text-[#2c181b] uppercase border-b border-pink-200 pb-2">
              PAYMENTS & AMENITIES
            </h3>
            <div className="text-xs text-[#5e4748] space-y-2 font-medium">
              <div>
                <p className="font-bold text-[#2c181b] mb-1">ご利用可能な決済方法:</p>
                <p className="text-[11px] text-[#5e4748] leading-relaxed">
                  クレジットカード（VISA, Master, JCB, Amex, Diners）、デビット、PayPay、交通系IC、現金
                </p>
              </div>
              <div>
                <p className="font-bold text-[#2c181b] mb-0.5">無料カフェドリンク（全6種）:</p>
                <p className="text-[11px] text-[#8c7374]">
                  珈琲・紅茶・緑茶・烏龍茶・ほうじ茶・カフェラテ
                </p>
              </div>
            </div>
          </div>

          {/* 予約・採用リンク */}
          <div className="space-y-3">
            <h3 className="text-xs font-black tracking-wider text-[#2c181b] uppercase border-b border-pink-200 pb-2">
              RESERVATION & RECRUIT
            </h3>
            <div className="space-y-2">
              <a
                href={SALON_INFO.links.hotpepper}
                target="_blank"
                rel="noopener noreferrer"
                className="jelly-button block text-center py-2.5 px-3 rounded-full text-xs font-bold shadow-md"
              >
                HOT PEPPER Beauty 24h即時予約
              </a>
              <a
                href={SALON_INFO.links.line}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center py-2.5 px-3 rounded-full text-xs font-bold bg-[#06C755] hover:bg-[#05a847] text-white shadow-sm transition-all"
              >
                公式LINE（クーポン・回数券）
              </a>
              <div className="pt-2 border-t border-pink-200/80 flex flex-col gap-1 text-[11px]">
                <span className="font-bold text-[#2c181b]">ネイリスト採用情報（随時募集中）:</span>
                <div className="flex gap-2">
                  <a
                    href={SALON_INFO.links.hotpepperWork}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#ff3366] hover:underline flex items-center gap-0.5 font-bold"
                  >
                    HOT PEPPER WORK <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                  <span>/</span>
                  <a
                    href={SALON_INFO.links.indeed}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#003A9B] hover:underline flex items-center gap-0.5 font-bold"
                  >
                    Indeed <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* コピーライト */}
        <div className="pt-8 border-t border-pink-200/80 text-center text-xs text-[#8c7374] flex flex-col sm:flex-row items-center justify-between gap-3 font-medium">
          <p>© {new Date().getFullYear()} Salon de Fraise. All rights reserved.</p>
          <p className="flex items-center gap-1 text-[11px]">
            Portfolio Work Designed with <Heart className="w-3.5 h-3.5 text-[#ff3366] fill-[#ff3366]" /> for Haruka Ikeda
          </p>
        </div>
      </div>
    </footer>
  );
}
