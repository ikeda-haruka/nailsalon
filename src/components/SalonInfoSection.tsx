"use client";

import React from "react";
import Image from "next/image";
import { 
  Clock, Calendar, Car, Armchair, Coffee, Dog, Baby, CreditCard, 
  MapPin, Phone, ShieldCheck, Sparkles, Check 
} from "lucide-react";
import { SALON_INFO } from "@/data/salonData";

export default function SalonInfoSection() {
  return (
    <section id="salon-info" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* セクションヘッダー */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ffe5ec] text-[#e8436e] text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-[#ff758f]" />
            <span>Salon Information & Amenities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#3a2b2c]">
            心地よさを追求した<br className="sm:hidden" />
            サロン設備とおもてなし
          </h2>
          <p className="text-sm text-[#5e4748] leading-relaxed">
            忙しい日常を忘れ、自分へのご褒美時間をお過ごしいただけるよう、<br className="hidden sm:inline" />
            空間作りから設備、各種サービスまで細やかな配慮を行っています。
          </p>
        </div>

        {/* 主要スペック4つのハイライトカード */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          
          {/* 営業時間・連休営業 */}
          <div className="strawberry-card p-6 border-[#ffe3e9] flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#fff0f3] flex items-center justify-center text-[#e8436e] mb-4">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-base font-serif font-bold text-[#3a2b2c] mb-1">
                営業時間・営業日
              </h3>
              <p className="text-xl font-serif font-bold text-[#e8436e] mb-2">
                10:00 - 20:00
              </p>
              <p className="text-xs text-[#5e4748] leading-relaxed">
                定休日は不定休。
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#ffe3e9]">
              <span className="text-[11px] font-bold text-[#cc2855] bg-[#ffe5ec] px-2 py-1 rounded-md inline-block">
                GW・お盆・SWも休まず営業！
              </span>
              <p className="text-[10px] text-[#8c7374] mt-1">
                ※年末年始のみ休業となります
              </p>
            </div>
          </div>

          {/* 設備: ハンド2・フット2 */}
          <div className="strawberry-card p-6 border-[#ffe3e9] flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#fff0f3] flex items-center justify-center text-[#e8436e] mb-4">
                <Armchair className="w-6 h-6" />
              </div>
              <h3 className="text-base font-serif font-bold text-[#3a2b2c] mb-1">
                サロン設備
              </h3>
              <p className="text-xl font-serif font-bold text-[#e8436e] mb-2">
                ハンド2席 / フット2席
              </p>
              <p className="text-xs text-[#5e4748] leading-relaxed">
                ゆったりとした間隔を確保した個室感覚のプライベート空間。全席リクライニングチェアを導入しています。
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#ffe3e9]">
              <span className="text-[11px] text-[#5e4748]">
                長時間の施術でも疲れにくい設計
              </span>
            </div>
          </div>

          {/* 駐車場3台 */}
          <div className="strawberry-card p-6 border-[#ffe3e9] flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#fff0f3] flex items-center justify-center text-[#e8436e] mb-4">
                <Car className="w-6 h-6" />
              </div>
              <h3 className="text-base font-serif font-bold text-[#3a2b2c] mb-1">
                お客様専用駐車場
              </h3>
              <p className="text-xl font-serif font-bold text-[#e8436e] mb-2">
                3台完備（無料）
              </p>
              <p className="text-xs text-[#5e4748] leading-relaxed">
                サロンの敷地内に専用パーキングをご用意しております。雨の日やお子様連れでも安心してお車でお越しいただけます。
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#ffe3e9]">
              <span className="text-[11px] text-[#5e4748]">
                事前予約不要・そのまま駐車いただけます
              </span>
            </div>
          </div>

          {/* ペット・お子様同伴可能 */}
          <div className="strawberry-card p-6 border-[#ffe3e9] flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#fff0f3] flex items-center justify-center text-[#e8436e] mb-4">
                <div className="flex items-center gap-1">
                  <Dog className="w-5 h-5" />
                  <Baby className="w-5 h-5" />
                </div>
              </div>
              <h3 className="text-base font-serif font-bold text-[#3a2b2c] mb-1">
                ペット・お子様同伴
              </h3>
              <p className="text-xl font-serif font-bold text-[#e8436e] mb-2">
                同伴大歓迎
              </p>
              <p className="text-xs text-[#5e4748] leading-relaxed">
                愛犬・愛猫とご一緒の来店や、小さなお子様連れ（ベビーカー横付けOK）でのご来店も歓迎しております。
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#ffe3e9]">
              <span className="text-[11px] text-[#5e4748]">
                予約時にお気軽にお知らせください
              </span>
            </div>
          </div>

        </div>

        {/* ドリンクサービス カフェメニュー一覧 */}
        <div className="bg-gradient-to-br from-[#fff5f7] via-[#fff9fa] to-[#ffe8ee] rounded-3xl p-8 sm:p-12 border border-[#ffd1dc] mb-16 shadow-sm">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 text-center sm:text-left">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#e8436e] text-white flex items-center justify-center shadow-md shadow-pink-200">
                  <Coffee className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#3a2b2c]">
                    こだわりの無料ドリンクサービス
                  </h3>
                  <p className="text-xs text-[#8c7374]">
                    施術中にお召し上がりいただける、カフェさながらの6種類のお飲み物をご用意しています
                  </p>
                </div>
              </div>
              <span className="text-xs px-3 py-1 rounded-full bg-white text-[#e8436e] font-bold border border-[#ffb3c6]">
                おかわり自由
              </span>
            </div>

            {/* ドリンクグリッド */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {SALON_INFO.drinks.map((drink, i) => (
                <div
                  key={i}
                  className="bg-white/90 p-4 rounded-2xl border border-[#ffe3e9] shadow-sm hover:border-[#ff758f] transition-all"
                >
                  <p className="text-[10px] text-[#ff758f] font-bold uppercase tracking-wider">
                    {drink.en}
                  </p>
                  <h4 className="text-sm font-serif font-bold text-[#3a2b2c] mb-1">
                    {drink.name}
                  </h4>
                  <p className="text-[11px] text-[#8c7374] leading-relaxed">
                    {drink.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* サロン概要テーブル & アクセス */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* 左: サロンスペック表 */}
          <div className="lg:col-span-7 bg-[#fffafb] p-8 rounded-3xl border border-[#ffe3e9] shadow-sm">
            <h3 className="text-lg font-serif font-bold text-[#3a2b2c] mb-6 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#e8436e]" />
              サロン概要・インフォメーション
            </h3>
            
            <dl className="divide-y divide-[#ffe3e9] text-xs">
              <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="font-bold text-[#3a2b2c]">サロン名</dt>
                <dd className="mt-1 sm:mt-0 sm:col-span-2 text-[#5e4748]">
                  {SALON_INFO.name} ({SALON_INFO.japaneseName})
                </dd>
              </div>
              <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="font-bold text-[#3a2b2c]">所在地</dt>
                <dd className="mt-1 sm:mt-0 sm:col-span-2 text-[#5e4748]">
                  {SALON_INFO.address}<br />
                  <span className="text-[11px] text-[#8c7374]">{SALON_INFO.access}</span>
                </dd>
              </div>
              <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="font-bold text-[#3a2b2c]">営業時間</dt>
                <dd className="mt-1 sm:mt-0 sm:col-span-2 text-[#5e4748]">
                  {SALON_INFO.hours}
                </dd>
              </div>
              <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="font-bold text-[#3a2b2c]">定休日</dt>
                <dd className="mt-1 sm:mt-0 sm:col-span-2 text-[#5e4748]">
                  {SALON_INFO.holiday}
                </dd>
              </div>
              <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="font-bold text-[#3a2b2c]">設備席数</dt>
                <dd className="mt-1 sm:mt-0 sm:col-span-2 text-[#5e4748]">
                  {SALON_INFO.seats.details}
                </dd>
              </div>
              <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="font-bold text-[#3a2b2c]">駐車場</dt>
                <dd className="mt-1 sm:mt-0 sm:col-span-2 text-[#5e4748]">
                  {SALON_INFO.parking}
                </dd>
              </div>
              <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="font-bold text-[#3a2b2c]">お支払い方法</dt>
                <dd className="mt-1 sm:mt-0 sm:col-span-2 text-[#5e4748] space-y-1">
                  {SALON_INFO.payments.map((p, i) => (
                    <div key={i} className="flex items-center gap-1.5">
                      <Check className="w-3 h-3 text-[#e8436e]" />
                      <span>{p}</span>
                    </div>
                  ))}
                </dd>
              </div>
              <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="font-bold text-[#3a2b2c]">こだわり条件</dt>
                <dd className="mt-1 sm:mt-0 sm:col-span-2 text-[#5e4748]">
                  自爪削りなし（パラジェル）/ フィルイン / ペット同伴可 / お子様同伴可 / 駐車場あり / ドリンクサービス / 連休営業
                </dd>
              </div>
            </dl>
          </div>

          {/* 右: サロン内装写真 ＆ 問い合わせCTA */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-3xl overflow-hidden border border-[#ffe3e9] shadow-md relative h-64">
              <Image
                src="/images/interior.jpg"
                alt="サロンドフレーズ 店内写真"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[10px] bg-[#e8436e] px-2 py-0.5 rounded-full font-bold">
                  清潔感あふれる空間
                </span>
                <p className="text-sm font-serif font-bold mt-1">
                  衛生管理を徹底し、快適なネイル時間をご提供します
                </p>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-[#fff5f7] border border-[#ffd1dc] text-center space-y-3">
              <h4 className="text-base font-serif font-bold text-[#3a2b2c]">
                お電話でのお問い合わせ・当日予約
              </h4>
              <p className="text-xs text-[#5e4748]">
                道案内や空席のお問い合わせもお気軽にどうぞ
              </p>
              <a
                href={`tel:${SALON_INFO.phone}`}
                className="inline-flex items-center gap-2 text-xl font-serif font-bold text-[#e8436e] hover:text-[#cc2855] transition-colors"
              >
                <Phone className="w-5 h-5" />
                <span>{SALON_INFO.phone}</span>
              </a>
              <p className="text-[10px] text-[#8c7374]">
                受付時間: 10:00〜20:00（不定休・連休営業）
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
