import React from "react";
import Link from "next/link";
import { Sparkles, MapPin, Clock, Calendar, Phone, CreditCard, Car, Coffee, Dog, Baby, ExternalLink, Heart } from "lucide-react";
import { SALON_INFO } from "@/data/salonData";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-pearl-50 to-lavender-100/60 text-plum-900 pt-16 pb-28 border-t border-lavender-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* ブランド */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-lavender-500 to-gold-400 flex items-center justify-center text-white shadow-md">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-xl font-serif font-black text-plum-900">
                  Salon de Fraise
                </span>
                <p className="text-[10px] text-lavender-700 font-bold tracking-widest uppercase">
                  Paragel & Magnet Nails
                </p>
              </div>
            </div>
            <p className="text-xs text-plum-700 font-medium leading-relaxed">
              自爪を削らないパラジェル専門店。丁寧なケアと高持続フィルイン技術で3〜4週間綺麗な状態をキープ。
            </p>
            <div className="flex flex-wrap gap-1.5 text-[10px] font-bold">
              <span className="px-2.5 py-1 rounded-full bg-white text-lavender-700 border border-lavender-200 shadow-xs">
                🐾 ペット同伴可
              </span>
              <span className="px-2.5 py-1 rounded-full bg-white text-lavender-700 border border-lavender-200 shadow-xs">
                👶 お子様同伴可
              </span>
              <span className="px-2.5 py-1 rounded-full bg-white text-lavender-700 border border-lavender-200 shadow-xs">
                🚗 駐車場3台
              </span>
            </div>
          </div>

          {/* 営業時間・設備 */}
          <div className="space-y-3">
            <h3 className="text-xs font-black tracking-wider text-plum-900 uppercase border-b border-lavender-200 pb-2">
              SALON INFO & HOURS
            </h3>
            <ul className="text-xs text-plum-700 space-y-2 font-medium">
              <li className="flex justify-between">
                <span>営業時間:</span>
                <span className="font-bold text-plum-900">{SALON_INFO.hours}</span>
              </li>
              <li className="flex justify-between">
                <span>定休日:</span>
                <span>不定休</span>
              </li>
              <li className="text-[11px] text-plum-900 font-bold bg-white/90 p-2.5 rounded-xl border border-lavender-200">
                ✦ 年末年始を除き、GW・お盆・SWなどの連休中も休まず営業中！
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
            <h3 className="text-xs font-black tracking-wider text-plum-900 uppercase border-b border-lavender-200 pb-2">
              PAYMENTS & AMENITIES
            </h3>
            <div className="text-xs text-plum-700 space-y-2 font-medium">
              <div>
                <p className="font-bold text-plum-900 mb-1">ご利用可能な決済方法:</p>
                <p className="text-[11px] text-plum-600 leading-relaxed">
                  クレジットカード（VISA, Master, JCB, Amex, Diners）、デビット、PayPay、交通系IC、現金
                </p>
              </div>
              <div>
                <p className="font-bold text-plum-900 mb-0.5">無料カフェドリンク（全6種）:</p>
                <p className="text-[11px] text-plum-500">
                  珈琲・紅茶・緑茶・烏龍茶・ほうじ茶・カフェラテ
                </p>
              </div>
            </div>
          </div>

          {/* 予約・採用リンク */}
          <div className="space-y-3">
            <h3 className="text-xs font-black tracking-wider text-plum-900 uppercase border-b border-lavender-200 pb-2">
              RESERVATION & RECRUIT
            </h3>
            <div className="space-y-2">
              <a
                href={SALON_INFO.links.hotpepper}
                target="_blank"
                rel="noopener noreferrer"
                className="luxe-button w-full text-center py-2.5 rounded-full text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>HOT PEPPER Beauty 予約</span>
              </a>
              <a
                href={SALON_INFO.links.line}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center py-2.5 rounded-full bg-[#06C755] hover:bg-[#05a847] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-all hover:scale-102"
              >
                <span>公式LINE限定クーポン</span>
              </a>
              <a
                href={SALON_INFO.links.hotpepperWork}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center py-2 rounded-full bg-white text-plum-700 border border-lavender-200 hover:bg-lavender-50 text-[11px] font-bold flex items-center justify-center gap-1 transition-all"
              >
                <span>ネイリスト求人（HPB WORK）</span>
                <ExternalLink className="w-3 h-3 text-lavender-500" />
              </a>
              <a
                href={SALON_INFO.links.indeed}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center py-2 rounded-full bg-white text-plum-700 border border-lavender-200 hover:bg-lavender-50 text-[11px] font-bold flex items-center justify-center gap-1 transition-all"
              >
                <span>ネイリスト求人（Indeed）</span>
                <ExternalLink className="w-3 h-3 text-lavender-500" />
              </a>
            </div>
          </div>

        </div>

        {/* 最下部コピーライト */}
        <div className="pt-8 border-t border-lavender-200/80 flex flex-col sm:flex-row items-center justify-between text-xs text-plum-500 gap-4">
          <p>© 2026 Salon de Fraise (サロン ド フレーズ). All Rights Reserved.</p>
          <div className="flex gap-4 text-[11px]">
            <a href="#concept" className="hover:text-lavender-700 transition-colors">サロンの強み</a>
            <a href="#gallery" className="hover:text-lavender-700 transition-colors">デザインカタログ</a>
            <a href="#magnet-lab" className="hover:text-lavender-700 transition-colors">水光マグネット体験</a>
            <a href="#menu" className="hover:text-lavender-700 transition-colors">料金表</a>
            <a href="#staff" className="hover:text-lavender-700 transition-colors">ネイリスト</a>
            <a href="#recruit" className="hover:text-lavender-700 transition-colors">採用情報</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
