"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  ShoppingBag,
  Heart,
  Star,
  CheckCircle2,
  ChevronRight,
  Filter,
  Search,
  X,
  Plus,
  Minus,
  Trash2,
  Award,
  Truck,
  ShieldCheck,
  RefreshCw,
  Gift,
  ArrowRight,
  Info
} from "lucide-react";
import { SHOP_PRODUCTS, SHOP_CATEGORIES, ShopCategory, ShopProduct } from "@/data/shopData";
import { useAuth } from "@/context/AuthContext";

interface CartItem {
  product: ShopProduct;
  quantity: number;
}

export default function ShopPage() {
  const { user } = useAuth();

  const [activeCategory, setActiveCategory] = useState<ShopCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"featured" | "priceAsc" | "priceDesc" | "rating">("featured");
  const [selectedProduct, setSelectedProduct] = useState<ShopProduct | null>(null);

  // カートState
  const [cart, setCart] = useState<CartItem[]>([
    // デモ初期状態で主力ネイルチップを1点セット
    { product: SHOP_PRODUCTS[0], quantity: 1 }
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [usePoints, setUsePoints] = useState(false);
  const [orderCompleteModal, setOrderCompleteModal] = useState(false);

  // お気に入りState
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});

  const toggleFavorite = (productId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites(prev => ({ ...prev, [productId]: !prev[productId] }));
  };

  // フィルタリング ＆ ソート
  const filteredProducts = useMemo(() => {
    let list = SHOP_PRODUCTS.filter((item) => {
      if (activeCategory !== "all" && item.category !== activeCategory) return false;
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesSub = item.subtitle.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesCategory = item.categoryLabel.toLowerCase().includes(query);
        if (!matchesName && !matchesSub && !matchesDesc && !matchesCategory) return false;
      }
      return true;
    });

    if (sortBy === "priceAsc") {
      list = [...list].sort((a, b) => a.price - b.price);
    } else if (sortBy === "priceDesc") {
      list = [...list].sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      list = [...list].sort((a, b) => b.rating - a.rating);
    } else {
      // featured: 主力商品・ベストセラー優先
      list = [...list].sort((a, b) => (b.isHeroProduct ? 1 : 0) - (a.isHeroProduct ? 1 : 0));
    }

    return list;
  }, [activeCategory, searchQuery, sortBy]);

  // カート操作
  const addToCart = (product: ShopProduct, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQ = item.quantity + delta;
            return newQ > 0 ? { ...item, quantity: newQ } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  // 金額計算
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const totalItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const shippingFee = subtotal >= 8000 || subtotal === 0 ? 0 : 550;
  const userPointBalance = user?.points || 0;
  const appliedPoints = usePoints ? Math.min(userPointBalance, subtotal) : 0;
  const grandTotal = Math.max(0, subtotal + shippingFee - appliedPoints);

  // 注文完了処理
  const handleCheckout = () => {
    if (cart.length === 0) return;
    setOrderCompleteModal(true);
    setCart([]);
    setIsCartOpen(false);
  };

  return (
    <div className="min-h-screen pt-28 pb-24 aurora-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

        {/* ページパンくず＆トップナビ */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-lavender-200/60 pb-4">
          <div className="flex items-center gap-2 text-xs font-serif text-plum-600">
            <Link href="/" className="hover:text-lavender-700 transition-colors">
              サロンTOP
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-lavender-400" />
            <span className="text-plum-950 font-normal">公式オンラインショップ</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            {/* カートトグルボタン */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative px-4 py-2 rounded-full bg-white hover:bg-lavender-50 border border-gold-300/80 shadow-xs flex items-center gap-2 text-xs font-medium text-plum-900 transition-all cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4 text-gold-600" />
              <span>ショッピングカート</span>
              {totalItemCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-plum-900 text-gold-300 text-[10px] font-bold flex items-center justify-center">
                  {totalItemCount}
                </span>
              )}
            </button>

            {user && (
              <Link
                href="/mypage"
                className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gold-50 border border-gold-200 text-xs text-plum-900"
              >
                <Award className="w-3.5 h-3.5 text-gold-600" />
                <span>保有: <strong>{user.points} pt</strong></span>
              </Link>
            )}
          </div>
        </div>

        {/* 主力商品：パラジェル ネイルチップ 特集ヒーローバナー */}
        <div className="pearl-glass rounded-[2.5rem] p-6 sm:p-10 border-2 border-gold-300/80 shadow-xl relative overflow-hidden bg-gradient-to-r from-white via-lavender-50/60 to-gold-50/50">
          <div className="shimmer-sweep pointer-events-none opacity-40"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-7 space-y-4 text-center lg:text-left">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-gold-100 text-gold-900 text-[11px] font-semibold tracking-widest uppercase border border-gold-300 font-serif">
                <Sparkles className="w-3.5 h-3.5 text-gold-600" />
                <span>SIGNATURE FLAGSHIP PRODUCT</span>
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-normal text-plum-950 leading-[1.3] tracking-wide">
                自爪を削らない極上の美爪。<br />
                <span className="water-glow-text font-medium">パラジェル ネイルチップ</span>
              </h1>

              <p className="text-xs sm:text-sm text-plum-800 leading-relaxed font-normal max-w-xl mx-auto lg:mx-0">
                お仕事や学校で普段ジェルネイルができない方のために、サロン専任ネイリストが1点ずつ丹精込めて制作。
                最高峰パラジェルベースと水光マグネットの艶めきを、繰り返し30回以上お使いいただけます。
              </p>

              <div className="flex flex-wrap justify-center lg:justify-start gap-2 pt-1 text-[11px] text-plum-900">
                <span className="px-3 py-1 rounded-full bg-white border border-lavender-200 shadow-2xs flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-lavender-600" />
                  サイズ測定用チップ無料送付
                </span>
                <span className="px-3 py-1 rounded-full bg-white border border-gold-200 shadow-2xs flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-gold-600" />
                  高密着グミシール2回分付属
                </span>
                <span className="px-3 py-1 rounded-full bg-white border border-lavender-200 shadow-2xs flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-lavender-600" />
                  繰り返し30回以上使用可能
                </span>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
                <button
                  onClick={() => {
                    setActiveCategory("tips");
                    const el = document.getElementById("shop-catalog");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="luxe-button w-full sm:w-auto px-7 py-3 rounded-full text-xs font-medium flex items-center justify-center gap-2 shadow-lg tracking-wider cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>ネイルチップのラインナップを見る</span>
                </button>

                <button
                  onClick={() => addToCart(SHOP_PRODUCTS[0])}
                  className="gold-button w-full sm:w-auto px-6 py-3 rounded-full text-xs font-semibold flex items-center justify-center gap-2 shadow-md cursor-pointer"
                >
                  <span>人気No.1チップを今すぐカートへ</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* 右側：ネイルチップ写真ギャラリー */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-xl aspect-4/3 sm:aspect-16/10 border border-lavender-200">
                <Image
                  src="/images/hero.jpg"
                  alt="パラジェル ネイルチップ 透き通る水光ラベンダー"
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-3 left-3 right-3 p-3 rounded-2xl bg-plum-950/80 backdrop-blur-md text-white text-xs flex justify-between items-center">
                  <div>
                    <p className="font-serif font-medium">透き通る水光ラベンダー × ゴールド</p>
                    <p className="text-[10px] text-lavender-200 font-light">サロン人気No.1のシグネチャーモデル</p>
                  </div>
                  <span className="font-serif font-light text-base text-gold-300">¥6,800</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ショップ特典・安心保証バナー */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 text-xs text-plum-900">
          <div className="pearl-glass p-4 rounded-2xl border border-lavender-200 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gold-50 border border-gold-200 flex items-center justify-center text-gold-600 shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <p className="font-medium text-plum-950">¥8,000以上で送料無料</p>
              <p className="text-[11px] text-plum-700">ヤマト運輸・丁寧なギフトBOX配送</p>
            </div>
          </div>

          <div className="pearl-glass p-4 rounded-2xl border border-lavender-200 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-lavender-50 border border-lavender-200 flex items-center justify-center text-lavender-600 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="font-medium text-plum-950">パラジェル公式正規品保証</p>
              <p className="text-[11px] text-plum-700">サロン認定正規ルート仕入れ100%</p>
            </div>
          </div>

          <div className="pearl-glass p-4 rounded-2xl border border-lavender-200 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gold-50 border border-gold-200 flex items-center justify-center text-gold-600 shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <p className="font-medium text-plum-950">会員ポイントが使える・貯まる</p>
              <p className="text-[11px] text-plum-700">1pt=¥1として利用可能（還元率2%〜）</p>
            </div>
          </div>
        </div>

        {/* 商品カタログセクション */}
        <div id="shop-catalog" className="space-y-6 pt-4">

          {/* 検索・ソートコントロールバー */}
          <div className="pearl-glass p-4 rounded-2xl border border-lavender-200 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
            {/* 検索インプット */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-plum-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="商品名、パラジェル、マグネット、キットで検索..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-white border border-lavender-200 text-xs text-plum-900 placeholder:text-plum-400 focus:outline-hidden focus:ring-2 focus:ring-lavender-400"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-plum-400 hover:text-plum-700"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* ソートセレクター */}
            <div className="flex items-center gap-2 self-end md:self-auto text-xs text-plum-800">
              <Filter className="w-3.5 h-3.5 text-lavender-600" />
              <span>並び替え:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="py-1.5 px-3 rounded-xl bg-white border border-lavender-200 text-xs text-plum-900 focus:outline-hidden cursor-pointer"
              >
                <option value="featured">おすすめ順（主力ネイルチップ優先）</option>
                <option value="rating">レビュー高評価順</option>
                <option value="priceAsc">価格が安い順</option>
                <option value="priceDesc">価格が高い順</option>
              </select>
            </div>
          </div>

          {/* カテゴリー切り替えタブ */}
          <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
            {SHOP_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`py-2 px-4 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeCategory === cat.id
                    ? "bg-plum-900 text-white shadow-sm"
                    : "bg-white/80 hover:bg-white text-plum-800 border border-lavender-200"
                }`}
              >
                {cat.id === "tips" && <Sparkles className="w-3.5 h-3.5 text-gold-400" />}
                <span>{cat.label}</span>
                {cat.id === "tips" && (
                  <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-gold-400 text-plum-950 font-bold">
                    主力
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* 検索結果件数 */}
          <div className="flex items-center justify-between text-xs text-plum-700">
            <span>該当商品: <strong className="text-plum-950 font-serif text-sm">{filteredProducts.length}</strong> 点</span>
            {activeCategory !== "all" && (
              <button
                onClick={() => setActiveCategory("all")}
                className="text-lavender-700 hover:underline text-xs cursor-pointer"
              >
                すべてのカテゴリーを表示
              </button>
            )}
          </div>

          {/* 商品グリッド */}
          {filteredProducts.length === 0 ? (
            <div className="pearl-glass p-12 rounded-3xl text-center space-y-3 border border-lavender-200">
              <ShoppingBag className="w-10 h-10 text-lavender-400 mx-auto" />
              <p className="text-sm font-medium text-plum-900">条件に一致する商品が見つかりませんでした。</p>
              <button
                onClick={() => { setActiveCategory("all"); setSearchQuery(""); }}
                className="text-xs text-lavender-700 font-medium hover:underline cursor-pointer"
              >
                フィルターをリセットして全商品を表示
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {filteredProducts.map((product) => {
                const isFav = favorites[product.id];
                return (
                  <div
                    key={product.id}
                    onClick={() => setSelectedProduct(product)}
                    className={`pearl-glass rounded-2xl sm:rounded-3xl overflow-hidden group cursor-pointer flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl border ${
                      product.isHeroProduct
                        ? "border-gold-300 shadow-md ring-1 ring-gold-200/60 bg-white"
                        : "border-lavender-200/80 bg-white/95"
                    }`}
                  >
                    <div>
                      {/* 写真コンテナ */}
                      <div className="relative aspect-square overflow-hidden bg-lavender-100">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />

                        {/* タグバッジ */}
                        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 items-start">
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider font-serif shadow-xs ${
                              product.isHeroProduct
                                ? "bg-gold-500 text-plum-950"
                                : "bg-white/95 text-lavender-800 border border-lavender-200"
                            }`}
                          >
                            {product.tag}
                          </span>
                        </div>

                        {/* お気に入りボタン */}
                        <button
                          onClick={(e) => toggleFavorite(product.id, e)}
                          aria-label="お気に入りに追加"
                          className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center transition-transform active:scale-125 border border-lavender-100 shadow-2xs"
                        >
                          <Heart
                            className={`w-4 h-4 transition-colors ${
                              isFav ? "fill-rose-500 text-rose-500" : "text-plum-400"
                            }`}
                          />
                        </button>
                      </div>

                      {/* 本文エリア */}
                      <div className="p-4 sm:p-5 space-y-2">
                        <div className="flex items-center justify-between text-[11px] text-plum-600">
                          <span className="font-serif text-gold-700 font-medium">{product.categoryLabel}</span>
                          <span className="flex items-center gap-1 font-mono">
                            <Star className="w-3.5 h-3.5 fill-gold-400 text-gold-400" />
                            {product.rating} ({product.reviewCount})
                          </span>
                        </div>

                        <h3 className="text-sm font-serif font-medium text-plum-950 group-hover:text-lavender-700 transition-colors line-clamp-2 leading-snug">
                          {product.name}
                        </h3>

                        <p className="text-xs text-plum-700 font-light line-clamp-2 leading-relaxed">
                          {product.subtitle}
                        </p>

                        <p className="text-[10px] text-plum-500 font-mono">
                          {product.volumeOrSpec}
                        </p>
                      </div>
                    </div>

                    {/* 下部：価格 ＆ カート追加ボタン */}
                    <div className="p-4 sm:p-5 pt-0 border-t border-lavender-100/70 mt-2 flex items-center justify-between gap-2">
                      <div>
                        <span className="text-[10px] text-plum-500 block leading-tight">税込価格</span>
                        <span className="text-base sm:text-lg font-serif font-medium text-gold-700 tracking-wider">
                          {product.priceFormatted}
                        </span>
                      </div>

                      <button
                        onClick={(e) => addToCart(product, e)}
                        className="py-2 px-3.5 rounded-full luxe-button text-xs font-medium flex items-center gap-1.5 shadow-sm transition-all hover:scale-103 cursor-pointer shrink-0"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>カートへ</span>
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>
          )}

        </div>

      </div>

      {/* ======================================================== */}
      {/* スライドイン ショッピングカート ドロワー */}
      {/* ======================================================== */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-200">
          <div
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-plum-950/60 backdrop-blur-xs transition-opacity"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-300">
              
              {/* カートヘッダー */}
              <div className="p-5 sm:p-6 border-b border-lavender-100 flex items-center justify-between bg-lavender-50/50">
                <div className="flex items-center gap-2 text-plum-950 font-serif">
                  <ShoppingBag className="w-5 h-5 text-gold-600" />
                  <h2 className="text-base sm:text-lg font-medium">ショッピングカート ({totalItemCount}点)</h2>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="w-8 h-8 rounded-full bg-white border border-lavender-200 flex items-center justify-center text-plum-800 hover:text-plum-950 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* カート内アイテム一覧 */}
              <div className="flex-1 p-5 sm:p-6 space-y-4 overflow-y-auto divide-y divide-lavender-100">
                {cart.length === 0 ? (
                  <div className="py-16 text-center space-y-3">
                    <ShoppingBag className="w-12 h-12 text-lavender-300 mx-auto" />
                    <p className="text-xs text-plum-700">カートに商品が入っていません。</p>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div key={item.product.id} className="pt-4 first:pt-0 flex gap-3.5 items-center">
                      <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-lavender-200 bg-lavender-50">
                        <Image
                          src={item.product.image}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="flex-1 space-y-1 text-xs">
                        <h4 className="font-serif font-medium text-plum-950 line-clamp-1">
                          {item.product.name}
                        </h4>
                        <p className="text-gold-700 font-medium font-serif">
                          {item.product.priceFormatted}
                        </p>

                        {/* 数量コントロール */}
                        <div className="flex items-center gap-2 pt-1">
                          <div className="flex items-center border border-lavender-200 rounded-lg bg-lavender-50/60">
                            <button
                              onClick={() => updateQuantity(item.product.id, -1)}
                              className="w-6 h-6 flex items-center justify-center text-plum-700 hover:bg-white rounded-l-lg cursor-pointer"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-7 text-center font-mono text-xs">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.product.id, 1)}
                              className="w-6 h-6 flex items-center justify-center text-plum-700 hover:bg-white rounded-r-lg cursor-pointer"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="text-plum-400 hover:text-rose-600 transition-colors p-1 cursor-pointer"
                            title="削除"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <div className="text-right text-xs font-serif font-medium text-plum-950">
                        ¥{(item.product.price * item.quantity).toLocaleString()}
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* カートフッター（金額・ポイント割引・注文確定） */}
              {cart.length > 0 && (
                <div className="p-5 sm:p-6 bg-lavender-50/70 border-t border-lavender-200 space-y-3.5">
                  
                  {/* 会員ポイント利用スイッチ */}
                  {user && user.points > 0 && (
                    <div className="p-3 rounded-xl bg-white border border-gold-300 shadow-2xs space-y-1.5 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-plum-950 flex items-center gap-1.5">
                          <Award className="w-4 h-4 text-gold-600" />
                          <span>会員ポイントを利用する</span>
                        </span>
                        <input
                          type="checkbox"
                          checked={usePoints}
                          onChange={(e) => setUsePoints(e.target.checked)}
                          className="w-4 h-4 accent-gold-600 cursor-pointer"
                        />
                      </div>
                      <p className="text-[11px] text-plum-600">
                        所持: <strong>{user.points} pt</strong> （最大 ¥{Math.min(user.points, subtotal).toLocaleString()} 割引）
                      </p>
                    </div>
                  )}

                  {/* 料金明細 */}
                  <div className="space-y-1.5 text-xs text-plum-800">
                    <div className="flex justify-between">
                      <span>商品小計</span>
                      <span className="font-mono">¥{subtotal.toLocaleString()}</span>
                    </div>

                    <div className="flex justify-between">
                      <span>送料（¥8,000以上で無料）</span>
                      <span className="font-mono">
                        {shippingFee === 0 ? "無料" : `¥${shippingFee.toLocaleString()}`}
                      </span>
                    </div>

                    {appliedPoints > 0 && (
                      <div className="flex justify-between text-rose-600 font-medium">
                        <span>ポイント割引</span>
                        <span className="font-mono">-¥{appliedPoints.toLocaleString()}</span>
                      </div>
                    )}

                    <div className="pt-2 border-t border-lavender-200 flex justify-between items-baseline text-sm font-serif">
                      <span className="font-medium text-plum-950">お支払い合計</span>
                      <span className="text-xl text-gold-700 font-semibold font-mono">
                        ¥{grandTotal.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* 注文確定ボタン */}
                  <button
                    onClick={handleCheckout}
                    className="w-full py-3.5 rounded-full gold-button text-xs font-semibold flex items-center justify-center gap-2 shadow-lg cursor-pointer tracking-wider"
                  >
                    <span>デモ注文を確定する（送料無料対象）</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <p className="text-[10px] text-center text-plum-500 font-light">
                    ※当ショップはポートフォリオ実績用のサンプルECです。実際の課金は発生いたしません。
                  </p>
                </div>
              )}

            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 商品詳細モーダル */}
      {/* ======================================================== */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-plum-950/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="pearl-glass max-w-2xl w-full rounded-[2rem] border border-lavender-200 shadow-2xl p-6 sm:p-8 overflow-hidden relative max-h-[90vh] overflow-y-auto bg-white">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-lavender-50 border border-lavender-200 flex items-center justify-center text-plum-800 hover:text-plum-950 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-start">
              <div className="sm:col-span-5 relative aspect-square rounded-2xl overflow-hidden border border-lavender-200">
                <Image
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="sm:col-span-7 space-y-3.5 text-xs">
                <div>
                  <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-gold-100 text-gold-900 border border-gold-300 font-serif">
                    {selectedProduct.categoryLabel}
                  </span>
                  <h3 className="text-base sm:text-lg font-serif font-medium text-plum-950 mt-1.5 leading-snug">
                    {selectedProduct.name}
                  </h3>
                  <p className="text-xs text-plum-600 font-light mt-0.5">
                    {selectedProduct.subtitle}
                  </p>
                </div>

                <div className="flex items-baseline gap-2 pt-1 border-t border-lavender-100">
                  <span className="text-2xl font-serif font-semibold text-gold-700">
                    {selectedProduct.priceFormatted}
                  </span>
                  <span className="text-[11px] text-plum-500">（税込 / 送料無料ライン対象）</span>
                </div>

                <p className="text-xs text-plum-800 leading-relaxed font-normal bg-lavender-50/60 p-3 rounded-xl border border-lavender-100">
                  {selectedProduct.description}
                </p>

                <div className="space-y-1">
                  <p className="font-semibold text-plum-900">商品のこだわり・特徴:</p>
                  <ul className="space-y-1 text-plum-700">
                    {selectedProduct.features.map((f, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-gold-600 shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-2 flex gap-2">
                  <button
                    onClick={() => {
                      addToCart(selectedProduct);
                      setSelectedProduct(null);
                    }}
                    className="flex-1 py-3 rounded-full luxe-button text-xs font-semibold flex items-center justify-center gap-2 shadow-md cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>この商品をカートに追加する</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* デモ注文完了モーダル */}
      {/* ======================================================== */}
      {orderCompleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-plum-950/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="pearl-glass max-w-md w-full rounded-[2rem] border border-gold-300 shadow-2xl p-8 text-center space-y-5 bg-white">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center border border-emerald-300">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-mono tracking-widest uppercase px-2.5 py-0.5 rounded-full bg-gold-100 text-gold-900 border border-gold-300">
                Demo Order Completed
              </span>
              <h3 className="text-xl font-serif font-medium text-plum-950">
                ご注文を受け付けました
              </h3>
              <p className="text-xs text-plum-700 leading-relaxed font-normal">
                デモ注文が正常に完了しました。<br />
                主力商品のネイルチップをお選びの場合、まずは無料のサイズ測定用チップをお届けいたします。
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-lavender-50 border border-lavender-200 text-xs text-plum-800 space-y-1">
              <p className="font-semibold text-lavender-800">★ 会員特典ポイント進呈:</p>
              <p>お買い上げ金額の2%のサロンポイントが付与されました！</p>
            </div>

            <div className="pt-2 space-y-2">
              <button
                onClick={() => setOrderCompleteModal(false)}
                className="w-full py-3 rounded-full luxe-button text-xs font-medium cursor-pointer"
              >
                ショッピングを続ける
              </button>
              <Link
                href="/mypage"
                className="w-full py-2.5 rounded-full bg-white border border-lavender-200 text-xs font-medium text-plum-800 block hover:bg-lavender-50"
              >
                マイページでポイントを確認する
              </Link>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
