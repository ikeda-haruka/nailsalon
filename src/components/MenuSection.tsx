"use client";

import React from "react";
import { Sparkles, Calendar, MessageCircle, Clock, ShieldCheck, Ticket, CreditCard, ChevronRight } from "lucide-react";
import { MENU_CATEGORIES, SALON_INFO } from "@/data/salonData";

export default function MenuSection() {
  return (
    <section id="menu" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* セクションヘッダー */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ffe5ec] text-[#e8436e] text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-[#ff758f]" />
            <span>Menu & Price</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#3a2b2c]">
            明朗会計・安心のパラジェルメニュー
          </h2>
          <p className="text-sm text-[#5e4748] leading-relaxed">
            全コースで自爪を削らない高品質パラジェルを使用しています。<br className="hidden sm:inline" />
            自爪をいたわる丁寧なウォーターケアと、高持続フィルイン技術が一律料金に含まれています。
          </p>
        </div>

        {/* 公式LINE限定クーポン・回数券プロモーションバナー */}
        <div className="mb-16 p-8 rounded-3xl bg-gradient-to-r from-[#06C755]/10 via-[#ffe5ec]/40 to-[#ff758f]/10 border-2 border-[#06C755]/30 relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-[#06C755] text-white flex items-center justify-center shrink-0 shadow-lg shadow-[#06C755]/20">
                <Ticket className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-[#06C755] uppercase tracking-wider bg-white px-2.5 py-0.5 rounded-full inline-block border border-[#06C755]/20">
                  ★ 公式LINE友だち限定 特典
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-[#3a2b2c]">
                  お得な回数券＆毎月届く限定クーポンを配布中！
                </h3>
                <p className="text-xs text-[#5e4748]">
                  継続してネイルを楽しみたい方向けのお得な3回・5回回数券は公式LINEよりご購入いただけます。<br className="hidden sm:inline" />
                  友だち追加ですぐに使える初回来店クーポンもプレゼント中！
                </p>
              </div>
            </div>

            <div className="shrink-0 w-full md:w-auto">
              <a
                href={SALON_INFO.links.line}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full md:w-auto px-6 py-3.5 rounded-full bg-[#06C755] hover:bg-[#05a847] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>公式LINEでクーポンを受け取る</span>
              </a>
            </div>
          </div>
        </div>

        {/* メニューカテゴリー別一覧 */}
        <div className="space-y-12">
          {MENU_CATEGORIES.map((cat, idx) => (
            <div key={idx} className="space-y-6">
              <div className="flex items-center gap-3 border-b-2 border-[#ffe3e9] pb-3">
                <div className="w-3 h-3 rounded-full bg-[#ff758f]" />
                <h3 className="text-xl font-serif font-bold text-[#3a2b2c]">
                  {cat.category}
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {cat.items.map((item, itemIdx) => (
                  <div
                    key={itemIdx}
                    className={`strawberry-card p-6 relative flex flex-col justify-between ${
                      item.recommended ? "border-[#ff758f] shadow-md bg-gradient-to-br from-white to-[#fff8f9]" : ""
                    }`}
                  >
                    <div>
                      {item.recommended && (
                        <div className="inline-block px-2.5 py-0.5 rounded-full bg-[#e8436e] text-white text-[10px] font-bold mb-2">
                          おすすめ / 人気No.1
                        </div>
                      )}
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <h4 className="text-base font-serif font-bold text-[#3a2b2c] leading-snug">
                          {item.name}
                        </h4>
                        <span className="text-lg font-serif font-bold text-[#e8436e] shrink-0">
                          {item.price}
                        </span>
                      </div>
                      <p className="text-xs text-[#5e4748] leading-relaxed mb-4">
                        {item.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-[#ffe3e9] text-xs text-[#8c7374]">
                      {item.time !== "-" ? (
                        <span className="flex items-center gap-1 text-[11px]">
                          <Clock className="w-3.5 h-3.5 text-[#ff758f]" />
                          施術時間目安: {item.time}
                        </span>
                      ) : (
                        <span className="text-[11px] text-[#e8436e] font-medium">
                          指名料: {SALON_INFO.nominationFee}
                        </span>
                      )}
                      <a
                        href={SALON_INFO.links.hotpepper}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] font-bold text-[#e8436e] hover:text-[#cc2855] flex items-center gap-0.5"
                      >
                        予約する <ChevronRight className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* 指名料および注意事項 */}
        <div className="mt-12 p-6 rounded-2xl bg-[#fff9fa] border border-[#ffd1dc] text-xs text-[#5e4748] space-y-2">
          <p className="font-bold text-[#3a2b2c] flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#e8436e]" />
            料金・指名料に関するご案内
          </p>
          <ul className="list-disc list-inside space-y-1 text-[11px] text-[#5e4748]">
            <li>在籍スタッフ3名（池田・高橋・水野）をご指名いただく場合、指名料金として追加で<strong>550円（税込）</strong>を頂戴いたします。</li>
            <li>表示価格はすべて消費税込みの総額表示となっております。</li>
            <li>全ハンドメニューに丁寧なウォーターケア・自爪を傷めないフィルイン技術が含まれております。</li>
            <li>デザインの持ち込みやご予算に応じたアートの調整も承っておりますのでお気軽にご相談ください。</li>
          </ul>
        </div>

        {/* 決済方法バナー */}
        <div className="mt-8 p-6 rounded-2xl bg-white border border-[#ffe3e9] shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#ffe5ec] flex items-center justify-center text-[#e8436e] shrink-0">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#3a2b2c]">多彩なキャッシュレス決済に対応</p>
              <p className="text-[11px] text-[#8c7374]">
                VISA / Master / JCB / Amex / Diners / デビットカード / PayPay / 交通系IC / 現金
              </p>
            </div>
          </div>
          <a
            href={SALON_INFO.links.hotpepper}
            target="_blank"
            rel="noopener noreferrer"
            className="strawberry-button text-xs font-bold px-6 py-2.5 rounded-full shrink-0"
          >
            クーポンを見て予約
          </a>
        </div>

      </div>
    </section>
  );
}
