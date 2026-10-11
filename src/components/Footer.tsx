import React from "react";
import Link from "next/link";
import { Sparkles, MapPin, Clock, Calendar, Phone, CreditCard, Car, Coffee, Dog, Baby, ExternalLink, Heart } from "lucide-react";
import { SALON_INFO } from "@/data/salonData";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-[#fff5f7] to-[#ffe8ee] text-[#3a2b2c] pt-16 pb-28 border-t border-[#ffd1dc]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* ブランド情報 */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-[#ff758f] flex items-center justify-center text-white shadow-md">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xl font-serif font-bold text-[#3a2b2c]">
                  Salon de Fraise
                </span>
                <p className="text-[10px] text-[#8c7374] tracking-wider">
                  パラジェル＆水光マグネット専門
                </p>
              </div>
            </div>
            <p className="text-xs text-[#5e4748] leading-relaxed">
              削らない自爪に優しいパラジェル専門店。丁寧なケアとフィルイン技術で3〜4週間綺麗な状態を楽しんでいただける大人可愛いサロンです。
            </p>
            <div className="pt-2 flex flex-wrap gap-2 text-[11px]">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white border border-[#ffb3c6] text-[#e8436e]">
                <Dog className="w-3 h-3" /> ペット同伴可
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white border border-[#ffb3c6] text-[#e8436e]">
                <Baby className="w-3 h-3" /> お子様同伴可
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white border border-[#ffb3c6] text-[#e8436e]">
                <Car className="w-3 h-3" /> 駐車場3台完備
              </span>
            </div>
          </div>

          {/* 営業時間・営業日・設備 */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold tracking-wider text-[#3a2b2c] border-b border-[#ffb3c6] pb-2 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#e8436e]" /> 営業時間・営業カレンダー
            </h3>
            <ul className="text-xs text-[#5e4748] space-y-2">
              <li className="flex justify-between">
                <span className="font-medium text-[#3a2b2c]">営業時間:</span>
                <span>{SALON_INFO.hours}</span>
              </li>
              <li className="flex justify-between">
                <span className="font-medium text-[#3a2b2c]">定休日:</span>
                <span>不定休</span>
              </li>
              <li className="text-[11px] text-[#cc2855] bg-white/70 p-2 rounded-lg border border-[#ffd1dc] leading-relaxed">
                ※年末年始を除き、GW・お盆休み・シルバーウィーク等の長期休暇も休まず営業中！
              </li>
              <li className="flex justify-between pt-1">
                <span className="font-medium text-[#3a2b2c]">サロン設備:</span>
                <span>ハンド2席 / フット2席</span>
              </li>
              <li className="flex justify-between">
                <span className="font-medium text-[#3a2b2c]">駐車場:</span>
                <span>お客様専用 3台（無料）</span>
              </li>
            </ul>
          </div>

          {/* お支払い方法・サービス */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold tracking-wider text-[#3a2b2c] border-b border-[#ffb3c6] pb-2 flex items-center gap-1.5">
              <CreditCard className="w-4 h-4 text-[#e8436e]" /> お支払い・おもてなし
            </h3>
            <div className="text-xs text-[#5e4748] space-y-2.5">
              <div>
                <p className="font-medium text-[#3a2b2c] mb-1">ご利用可能な決済方法:</p>
                <p className="text-[11px] text-[#5e4748] leading-relaxed">
                  クレジットカード（VISA, Master, JCB, Amex, Diners）、デビットカード、PayPay、交通系ICカード、現金
                </p>
              </div>
              <div>
                <p className="font-medium text-[#3a2b2c] mb-1 flex items-center gap-1">
                  <Coffee className="w-3.5 h-3.5 text-[#e8436e]" /> ドリンクサービス（無料）:
                </p>
                <p className="text-[11px] text-[#8c7374] leading-relaxed">
                  珈琲、紅茶、緑茶、烏龍茶、ほうじ茶、カフェラテ（ホット/アイス）
                </p>
              </div>
            </div>
          </div>

          {/* 予約・求人・アクセス */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold tracking-wider text-[#3a2b2c] border-b border-[#ffb3c6] pb-2 flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-[#e8436e]" /> ご予約・採用情報
            </h3>
            <div className="space-y-2 text-xs">
              <a
                href={SALON_INFO.links.hotpepper}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center py-2 px-3 bg-[#e8436e] text-white rounded-lg font-bold hover:bg-[#cc2855] transition-colors shadow-sm"
              >
                HOT PEPPER Beauty 24h予約
              </a>
              <a
                href={SALON_INFO.links.line}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center py-2 px-3 bg-[#06C755] text-white rounded-lg font-bold hover:bg-[#05a847] transition-colors"
              >
                公式LINE（クーポン・空席・回数券）
              </a>
              <div className="pt-2 border-t border-[#ffd1dc] flex flex-col gap-1.5 text-[11px]">
                <span className="font-medium text-[#3a2b2c]">ネイリスト採用情報（随時募集）:</span>
                <div className="flex gap-2">
                  <a
                    href={SALON_INFO.links.hotpepperWork}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-[#e8436e] hover:text-[#cc2855] flex items-center gap-0.5"
                  >
                    HOT PEPPER Beauty WORK <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                  <span>/</span>
                  <a
                    href={SALON_INFO.links.indeed}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-[#e8436e] hover:text-[#cc2855] flex items-center gap-0.5"
                  >
                    Indeed <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* コピーライト */}
        <div className="pt-8 border-t border-[#ffb3c6] text-center text-xs text-[#8c7374] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© {new Date().getFullYear()} Salon de Fraise. All rights reserved.</p>
          <p className="flex items-center gap-1 text-[11px]">
            Portfolio Work Designed with <Heart className="w-3.5 h-3.5 text-[#e8436e] fill-[#e8436e]" /> for Haruka Ikeda
          </p>
        </div>
      </div>
    </footer>
  );
}
