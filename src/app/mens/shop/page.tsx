"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
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
  Info,
  CreditCard,
  Package,
  Calendar,
  Mail,
  ArrowLeftRight,
  User,
  Lock,
  Ticket,
  Sparkles,
  AlertCircle
} from "lucide-react";

import {
  MENS_SHOP_PRODUCTS,
  MENS_SHOP_CATEGORIES,
  MENS_SHOP_POLICY,
  MENS_GIFT_WRAPPING_OPTIONS,
  MENS_MESSAGE_CARD_THEMES,
  MensShopCategory,
  MensShopProduct
} from "@/data/mensShopData";
import { useAuth } from "@/context/AuthContext";
import { getRankPointRate } from "@/data/memberData";
import MensHeader from "@/components/mens/MensHeader";
import MensFooter from "@/components/mens/MensFooter";
import MensBrandLogoPlaceholder from "@/components/mens/MensBrandLogoPlaceholder";
import ProductImage from "@/components/ProductImage";

interface MensCartItem {
  product: MensShopProduct;
  quantity: number;
}

export default function MensShopPage() {
  const { user, useCoupon, checkoutShop } = useAuth();

  const [activeCategory, setActiveCategory] = useState<MensShopCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"featured" | "priceAsc" | "priceDesc" | "rating">("featured");
  const [selectedProduct, setSelectedProduct] = useState<MensShopProduct | null>(null);

  // 商品コード直接注文（クイックオーダー）State
  const [codeOrderInput, setCodeOrderInput] = useState("");
  const [codeOrderQuantity, setCodeOrderQuantity] = useState(1);
  const [codeOrderNotification, setCodeOrderNotification] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // ギフトラッピング・メッセージカードState
  const [giftWrappingId, setGiftWrappingId] = useState<"none" | "ribbon" | "box">("none");
  const [includeMessageCard, setIncludeMessageCard] = useState<boolean>(false);
  const [cardThemeId, setCardThemeId] = useState<"for_you" | "birthday" | "thank_you" | "blank">("for_you");
  const [cardMessage, setCardMessage] = useState<string>("");
  const [hidePriceInInvoice, setHidePriceInInvoice] = useState<boolean>(true);

  // カートState
  const [cart, setCart] = useState<MensCartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [usePoints, setUsePoints] = useState(false);
  const [selectedCouponId, setSelectedCouponId] = useState<string | null>(null);
  const [orderCompleteModal, setOrderCompleteModal] = useState(false);
  const [needLoginModal, setNeedLoginModal] = useState(false);


  // お気に入りState
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});

  const toggleFavorite = (productId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites(prev => ({ ...prev, [productId]: !prev[productId] }));
  };

  // 商品コードによるリアルタイム検索
  const matchedProductByCode = useMemo(() => {
    if (!codeOrderInput.trim()) return null;
    const q = codeOrderInput.trim().toUpperCase();
    return MENS_SHOP_PRODUCTS.find((p) => p.itemCode.toUpperCase() === q) || null;
  }, [codeOrderInput]);

  // キーワード＆カテゴリ絞り込み
  const filteredProducts = useMemo(() => {
    let list = MENS_SHOP_PRODUCTS.filter((item) => {
      if (activeCategory !== "all" && item.category !== activeCategory) return false;
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesCode = item.itemCode.toLowerCase().includes(query);
        const matchesSub = item.subtitle.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesCategory = item.categoryLabel.toLowerCase().includes(query);
        if (!matchesName && !matchesCode && !matchesSub && !matchesDesc && !matchesCategory) return false;
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
      list = [...list].sort((a, b) => (b.isHeroProduct ? 1 : 0) - (a.isHeroProduct ? 1 : 0));
    }

    return list;
  }, [activeCategory, searchQuery, sortBy]);

  // カート操作
  const addToCart = (product: MensShopProduct, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
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
        .filter(Boolean) as MensCartItem[]
    );
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  // コード直接注文処理
  const handleCodeOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!matchedProductByCode) {
      setCodeOrderNotification({
        type: "error",
        text: `商品コード「${codeOrderInput}」に該当する製品が見つかりません。一覧のコード（M-TIP-001等）をご確認ください。`
      });
      return;
    }

    const qty = Math.max(1, codeOrderQuantity);
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === matchedProductByCode.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === matchedProductByCode.id ? { ...item, quantity: item.quantity + qty } : item
        );
      }
      return [...prev, { product: matchedProductByCode, quantity: qty }];
    });

    setCodeOrderNotification({
      type: "success",
      text: `【コード注文完了】[${matchedProductByCode.itemCode}] ${matchedProductByCode.name} × ${qty}点 をカートに追加しました！`
    });
    setCodeOrderInput("");
    setCodeOrderQuantity(1);
    setIsCartOpen(true);
  };

  // ギフト選択情報
  const selectedWrapping = useMemo(() => {
    return MENS_GIFT_WRAPPING_OPTIONS.find((opt) => opt.id === giftWrappingId) || MENS_GIFT_WRAPPING_OPTIONS[0];
  }, [giftWrappingId]);

  const selectedTheme = useMemo(() => {
    return MENS_MESSAGE_CARD_THEMES.find((t) => t.id === cardThemeId) || MENS_MESSAGE_CARD_THEMES[0];
  }, [cardThemeId]);

  // 金額計算
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  // 利用可能なクーポン一覧（サロン専用以外の未使用クーポン）
  const availableCoupons = useMemo(() => {
    if (!user) return [];
    return user.coupons.filter((c) => !c.isUsed && c.usableAt !== "salon");
  }, [user]);

  const selectedCoupon = useMemo(() => {
    if (!selectedCouponId) return null;
    return availableCoupons.find((c) => c.id === selectedCouponId) || null;
  }, [selectedCouponId, availableCoupons]);

  // クーポン割引額計算
  const couponDiscount = useMemo(() => {
    if (!selectedCoupon) return 0;
    if (selectedCoupon.discountPercent) {
      return Math.floor(subtotal * (selectedCoupon.discountPercent / 100));
    }
    if (selectedCoupon.discountAmount) {
      return Math.min(subtotal, selectedCoupon.discountAmount);
    }
    return 0;
  }, [selectedCoupon, subtotal]);

  // 金額計算（20,000円以上で送料無料）
  const FREE_SHIPPING_THRESHOLD = 20000;
  const totalItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const shippingFee = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : 550;
  const wrappingFee = selectedWrapping.price;
  const userPointBalance = user?.points || 0;
  const discountedSubtotal = Math.max(0, subtotal - couponDiscount);
  const appliedPoints = usePoints ? Math.min(userPointBalance, discountedSubtotal + wrappingFee) : 0;
  const grandTotal = Math.max(0, discountedSubtotal + wrappingFee + shippingFee - appliedPoints);

  // 会員ランクに応じたポイント還元率（Regular: 1%, Silver: 2%, Gold: 3.5%, Platinum: 5%）
  const rankRate = user ? getRankPointRate(user.rank) : 0.01;
  const earnedPoints = Math.floor(grandTotal * rankRate);

  const [checkoutDetail, setCheckoutDetail] = useState<{
    usedPoints: number;
    earnedPoints: number;
    grandTotal: number;
    subtotal: number;
    couponDiscount: number;
    couponName: string;
    shippingFee: number;
    prevBalance: number;
    wrappingName: string;
    wrappingPrice: number;
    hasCard: boolean;
    cardThemeName: string;
    cardMessage: string;
    hidePrice: boolean;
  }>({
    usedPoints: 0,
    earnedPoints: 0,
    grandTotal: 0,
    subtotal: 0,
    couponDiscount: 0,
    couponName: "",
    shippingFee: 0,
    prevBalance: 0,
    wrappingName: "なし",
    wrappingPrice: 0,
    hasCard: false,
    cardThemeName: "",
    cardMessage: "",
    hidePrice: true
  });

  // 注文処理
  const handleCheckout = async () => {
    if (cart.length === 0) return;
    
    // 会員ログイン必須チェック
    if (!user) {
      setNeedLoginModal(true);
      return;
    }

    const baseSummary = cart.map((i) => `${i.product.name}×${i.quantity}`).join(", ");
    const giftSummary = selectedWrapping.id !== "none" ? ` [メンズギフト: ${selectedWrapping.name}]` : "";
    const cardSummary = includeMessageCard ? ` [カード: ${selectedTheme.name}]` : "";
    const couponSummary = selectedCoupon ? ` [クーポン: ${selectedCoupon.title}]` : "";
    const orderSummary = `[HOMME EC] ${baseSummary}${giftSummary}${cardSummary}${couponSummary}`;
    const prevBalance = user?.points || 0;

    setCheckoutDetail({
      usedPoints: appliedPoints,
      earnedPoints,
      grandTotal,
      subtotal,
      couponDiscount,
      couponName: selectedCoupon?.title || "",
      shippingFee,
      prevBalance,
      wrappingName: selectedWrapping.name,
      wrappingPrice: selectedWrapping.price,
      hasCard: includeMessageCard,
      cardThemeName: selectedTheme.name,
      cardMessage: cardMessage.trim() || selectedTheme.sampleMessage,
      hidePrice: hidePriceInInvoice
    });

    if (user) {
      if (selectedCouponId) {
        await useCoupon(selectedCouponId);
      }
      await checkoutShop(appliedPoints, earnedPoints, orderSummary);
    }

    setOrderCompleteModal(true);
    setCart([]);
    setUsePoints(false);
    setSelectedCouponId(null);
    setIsCartOpen(false);
  };


  return (
    <div className="min-h-screen mens-bg selection:bg-zinc-800 selection:text-white flex flex-col justify-between">
      <MensHeader />

      <main className="pt-36 sm:pt-40 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-10">
        
        {/* トップパンくず＆レディースEC切り替え */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
            <Link href="/mens" className="hover:text-white transition-colors">
              HOMME TOP
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
            <span className="text-white font-medium">メンズ公式オンラインショップ</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <Link
              href="/shop"
              className="text-[11px] px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700 transition-colors flex items-center gap-1.5"
            >
              <ArrowLeftRight className="w-3 h-3 text-gold-400" />
              <span>レディースショップへ切替</span>
            </Link>

            <button
              onClick={() => setIsCartOpen(true)}
              className="relative px-4 py-2 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-white text-xs font-medium flex items-center gap-2 transition-colors cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4 text-zinc-300" />
              <span>メンズカート</span>
              {totalItemCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-white text-zinc-950 text-[10px] font-bold flex items-center justify-center">
                  {totalItemCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* 新規会員登録1,000ptバナー（モノトーン） */}
        <div className="rounded-3xl bg-zinc-950 border border-zinc-700 p-5 sm:p-7 shadow-2xl relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-zinc-900 border border-zinc-700 text-[10px] font-mono text-zinc-300 uppercase">
              <span>HOMME MEMBER BENEFIT</span>
            </div>
            <h2 className="text-base sm:text-xl font-serif font-light text-white">
              新規会員登録で <span className="font-semibold mens-silver-text">1,000ポイント（¥1,000相当）</span> 即時進呈
            </h2>
            <p className="text-xs text-zinc-400 font-light">
              1pt = 1円換算。メンズサロン施術 ＆ メンズ公式オンラインショップ共通で即日ご利用いただけます。
            </p>
          </div>

          {!user ? (
            <Link
              href="/login"
              className="mens-button-white shrink-0 px-6 py-3 rounded-full text-xs font-semibold shadow-lg"
            >
              新規登録して1,000ptを受け取る
            </Link>
          ) : (
            <div className="shrink-0 px-4 py-2 rounded-2xl bg-zinc-900 border border-zinc-800 text-xs text-right">
              <span className="text-[10px] text-zinc-500 block">共通保有ポイント</span>
              <span className="font-serif text-lg font-medium text-white">{user.points} pt</span>
            </div>
          )}
        </div>

        {/* 4大ポリシーパネル */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="mens-glass p-4 rounded-2xl border border-zinc-800 space-y-1.5">
            <div className="flex items-center gap-2 text-white font-serif">
              <div className="w-8 h-8 rounded-lg bg-zinc-900 text-zinc-300 flex items-center justify-center shrink-0">
                <Truck className="w-4 h-4" />
              </div>
              <div>
                <p className="leading-tight font-medium">配送は宅急便のみ</p>
                <span className="text-[10px] text-zinc-400 font-mono">ヤマト運輸 宅急便限定</span>
              </div>
            </div>
            <p className="text-[11px] text-zinc-400 leading-relaxed font-light">
              繊細なチップやボトルを安全にお届けするため、ヤマト宅急便にてのみ発送可能です。
            </p>
          </div>

          <div className="mens-glass p-4 rounded-2xl border border-zinc-700 space-y-1.5 bg-zinc-900/50">
            <div className="flex items-center gap-2 text-white font-serif">
              <div className="w-8 h-8 rounded-lg bg-white text-zinc-950 flex items-center justify-center shrink-0">
                <Gift className="w-4 h-4" />
              </div>
              <div>
                <p className="leading-tight font-medium">¥20,000以上で送料無料</p>
                <span className="text-[10px] text-zinc-300 font-mono">全品全国どこでも無料</span>
              </div>
            </div>
            <p className="text-[11px] text-zinc-400 leading-relaxed font-light">
              1回のご注文合計が<strong className="text-white">20,000円（税込）以上で送料無料</strong>（未満は一律550円）。
            </p>
          </div>

          <div className="mens-glass p-4 rounded-2xl border border-zinc-800 space-y-1.5">
            <div className="flex items-center gap-2 text-white font-serif">
              <div className="w-8 h-8 rounded-lg bg-zinc-900 text-zinc-300 flex items-center justify-center shrink-0">
                <CreditCard className="w-4 h-4" />
              </div>
              <div>
                <p className="leading-tight font-medium">4つの安心決済</p>
                <span className="text-[10px] text-zinc-400 font-mono">多彩な決済方法に対応</span>
              </div>
            </div>
            <p className="text-[11px] text-zinc-400 leading-relaxed font-light">
              クレジットカード・銀行振込・代金引換・コンビニ決済がご利用いただけます。
            </p>
          </div>

          <div className="mens-glass p-4 rounded-2xl border border-zinc-800 space-y-1.5">
            <div className="flex items-center gap-2 text-white font-serif">
              <div className="w-8 h-8 rounded-lg bg-zinc-900 text-zinc-300 flex items-center justify-center shrink-0">
                <Calendar className="w-4 h-4" />
              </div>
              <div>
                <p className="leading-tight font-medium">日曜・祝日は出荷休業</p>
                <span className="text-[10px] text-zinc-400 font-mono">平日・土曜に出荷対応</span>
              </div>
            </div>
            <p className="text-[11px] text-zinc-400 leading-relaxed font-light">
              在籍男性スタッフ5名が検品梱包。日曜・祝日は出荷休業のため翌営業日発送です。
            </p>
          </div>
        </div>

        {/* 商品コード直接注文（クイックオーダー） */}
        <div className="mens-glass p-6 sm:p-7 rounded-3xl border border-zinc-800 space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-zinc-800 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-white text-zinc-950 flex items-center justify-center">
                <Package className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-serif text-sm sm:text-base font-medium text-white flex items-center gap-2">
                  <span>商品コードで直接注文</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-300 font-mono">
                    Quick Order
                  </span>
                </h3>
                <p className="text-[11px] text-zinc-400 font-light">
                  商品コード（例: M-TIP-001, M-CLR-001）を入力して直接カートに追加
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-1.5 text-[10px]">
              <span className="text-zinc-500 font-mono">人気コード例:</span>
              {["M-TIP-001", "M-TIP-002", "M-CLR-001", "M-COT-001", "M-KIT-001"].map((code) => (
                <button
                  key={code}
                  type="button"
                  onClick={() => {
                    setCodeOrderInput(code);
                    setCodeOrderNotification(null);
                  }}
                  className="px-2 py-1 rounded bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 font-mono cursor-pointer transition-colors"
                >
                  {code}
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleCodeOrderSubmit} className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
              <div className="sm:col-span-5 relative">
                <label className="block text-[10px] font-mono text-zinc-400 mb-1">商品コード</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="M-TIP-001, M-CLR-001 等..."
                    value={codeOrderInput}
                    onChange={(e) => {
                      setCodeOrderInput(e.target.value);
                      setCodeOrderNotification(null);
                    }}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white font-mono uppercase focus:outline-none focus:border-zinc-500"
                  />
                  {codeOrderInput && (
                    <button
                      type="button"
                      onClick={() => setCodeOrderInput("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              <div className="sm:col-span-3">
                <label className="block text-[10px] text-zinc-400 mb-1">数量</label>
                <div className="flex items-center border border-zinc-800 rounded-xl bg-zinc-950 overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setCodeOrderQuantity((q) => Math.max(1, q - 1))}
                    className="w-9 h-9 flex items-center justify-center text-zinc-400 hover:bg-zinc-900 cursor-pointer"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="flex-1 text-center font-mono text-xs text-white">
                    {codeOrderQuantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setCodeOrderQuantity((q) => Math.min(10, q + 1))}
                    className="w-9 h-9 flex items-center justify-center text-zinc-400 hover:bg-zinc-900 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="sm:col-span-4 self-end">
                <button
                  type="submit"
                  disabled={!codeOrderInput.trim()}
                  className="mens-button-white w-full py-2.5 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>コードでカートに追加</span>
                </button>
              </div>
            </div>

            {matchedProductByCode && (
              <div className="p-3 rounded-xl bg-zinc-900/90 border border-zinc-700 flex items-center justify-between text-xs animate-in fade-in duration-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg overflow-hidden relative shrink-0 border border-zinc-800 bg-zinc-950 flex items-center justify-center font-serif text-xs text-white">
                    H
                  </div>
                  <div>
                    <span className="font-mono text-[10px] text-zinc-400 block">
                      [{matchedProductByCode.itemCode}] {matchedProductByCode.categoryLabel}
                    </span>
                    <p className="font-serif font-medium text-white">{matchedProductByCode.name}</p>
                  </div>
                </div>
                <span className="font-serif font-medium text-white">{matchedProductByCode.priceFormatted}</span>
              </div>
            )}

            {codeOrderNotification && (
              <div className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
                codeOrderNotification.type === "success" ? "bg-zinc-900 text-white border border-zinc-700" : "bg-rose-950/60 text-rose-200 border border-rose-800"
              }`}>
                {codeOrderNotification.type === "success" ? <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> : <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />}
                <p>{codeOrderNotification.text}</p>
              </div>
            )}
          </form>
        </div>

        {/* 検索・絞り込みバー */}
        <div className="mens-glass p-5 rounded-3xl border border-zinc-800 space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="商品名、商品コード（M-TIP-001等）、特徴で検索..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-zinc-500"
              />
            </div>

            <div className="flex items-center gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                aria-label="並び順を選択"
                className="py-2.5 px-3 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-300 focus:outline-none"
              >
                <option value="featured">おすすめ順</option>
                <option value="priceAsc">価格が安い順</option>
                <option value="priceDesc">価格が高い順</option>
                <option value="rating">評価順</option>
              </select>
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5 pt-1">
            {MENS_SHOP_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? "bg-white text-zinc-950 font-bold"
                    : "bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* 商品一覧グリッド */}
        <div className="space-y-4">
          <div className="flex justify-between items-center text-xs text-zinc-400">
            <span>該当製品: <strong className="text-white font-mono">{filteredProducts.length}</strong> 点</span>
            {activeCategory !== "all" && (
              <button onClick={() => setActiveCategory("all")} className="text-zinc-300 hover:underline">
                全商品を表示
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((p) => {
              const isFav = favorites[p.id];
              return (
                <div
                  key={p.id}
                  onClick={() => setSelectedProduct(p)}
                  className="mens-glass-card rounded-3xl overflow-hidden cursor-pointer flex flex-col justify-between group transition-all"
                >
                  <div>
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-950">
                      <ProductImage
                        product={p}
                        alt={p.name}
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        placeholderSize="md"
                        className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 contrast-125"
                      />

                      <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-zinc-900/90 text-white text-[10px] font-mono border border-zinc-700">
                        {p.tag}
                      </span>

                      <button
                        onClick={(e) => toggleFavorite(p.id, e)}
                        aria-label="お気に入りに追加"
                        className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-zinc-900/80 backdrop-blur-md flex items-center justify-center border border-zinc-800"
                      >
                        <Heart className={`w-4 h-4 ${isFav ? "fill-rose-500 text-rose-500" : "text-zinc-500"}`} />
                      </button>
                    </div>

                    <div className="p-5 space-y-2">
                      <span className="text-[10px] font-mono text-zinc-400 block">
                        コード: {p.itemCode} / {p.categoryLabel}
                      </span>
                      <h3 className="font-serif text-sm font-medium text-white line-clamp-1 group-hover:text-zinc-200">
                        {p.name}
                      </h3>
                      <p className="text-xs text-zinc-400 font-light line-clamp-2">
                        {p.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="p-5 pt-0 flex items-center justify-between border-t border-zinc-800/80">
                    <span className="font-serif text-base font-semibold text-white">
                      {p.priceFormatted}
                    </span>
                    <button
                      onClick={(e) => addToCart(p, e)}
                      className="px-3 py-1.5 rounded-full bg-zinc-800 hover:bg-white hover:text-zinc-950 text-white text-xs font-medium transition-colors cursor-pointer"
                    >
                      カートへ
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </main>

      {/* スライドイン ショッピングカート */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-200">
          <div
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-[#0f0f12] text-white border-l border-zinc-800 shadow-2xl flex flex-col justify-between overflow-y-auto">
              
              <div className="p-5 sm:p-6 border-b border-zinc-800 flex items-center justify-between">
                <div className="flex items-center gap-2 font-serif">
                  <ShoppingBag className="w-5 h-5 text-white" />
                  <h2 className="text-base font-medium">メンズショッピングカート ({totalItemCount}点)</h2>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* 送料無料プログレス */}
              <div className="px-5 py-3 bg-zinc-950 border-b border-zinc-800 space-y-1.5 text-xs">
                <div className="flex items-center justify-between text-zinc-300">
                  <span className="flex items-center gap-1.5 font-medium">
                    <Truck className="w-3.5 h-3.5 text-zinc-400" />
                    <span>
                      {subtotal >= 20000
                        ? "送料無料でお届けします（ヤマト宅急便）"
                        : `あと ¥${(20000 - subtotal).toLocaleString()} で送料無料`}
                    </span>
                  </span>
                  <span className="font-mono text-zinc-400">¥20,000ライン</span>
                </div>
                <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-white h-full transition-all duration-300"
                    style={{ width: `${Math.min(100, (subtotal / 20000) * 100)}%` }}
                  />
                </div>
              </div>

              {/* カート商品一覧 */}
              <div className="flex-1 p-5 space-y-4 overflow-y-auto divide-y divide-zinc-800">
                {cart.length === 0 ? (
                  <div className="py-16 text-center text-xs text-zinc-500">カートは空です</div>
                ) : (
                  cart.map((item) => (
                    <div key={item.product.id} className="pt-4 first:pt-0 flex gap-3.5 items-center">
                      <div className="w-14 h-14 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-center font-serif text-sm text-white shrink-0">
                        H
                      </div>
                      <div className="flex-1 space-y-1 text-xs">
                        <span className="font-mono text-[9px] text-zinc-400 block">{item.product.itemCode}</span>
                        <h4 className="font-serif font-medium text-white line-clamp-1">{item.product.name}</h4>
                        <p className="font-mono text-zinc-300">{item.product.priceFormatted}</p>

                        <div className="flex items-center gap-2 pt-1">
                          <div className="flex items-center border border-zinc-800 rounded-lg bg-zinc-900">
                            <button
                              onClick={() => updateQuantity(item.product.id, -1)}
                              className="w-6 h-6 flex items-center justify-center text-zinc-400 hover:text-white"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-7 text-center font-mono text-xs">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.product.id, 1)}
                              className="w-6 h-6 flex items-center justify-center text-zinc-400 hover:text-white"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="text-zinc-500 hover:text-rose-400 p-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                      <div className="text-right text-xs font-mono font-medium text-white">
                        ¥{(item.product.price * item.quantity).toLocaleString()}
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* カートフッター */}
              {cart.length > 0 && (
                <div className="p-5 bg-zinc-950 border-t border-zinc-800 space-y-3.5 text-xs">
                  
                  {/* ギフトラッピング設定 */}
                  <div className="p-3.5 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-2.5">
                    <div className="flex items-center justify-between border-b border-zinc-800 pb-1.5">
                      <span className="font-medium text-white flex items-center gap-1.5">
                        <Gift className="w-3.5 h-3.5 text-zinc-300" />
                        <span>メンズギフト包装 ＆ メッセージカード</span>
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      {MENS_GIFT_WRAPPING_OPTIONS.map((opt) => (
                        <label key={opt.id} className="flex items-start gap-2 p-2 rounded-xl bg-zinc-950/70 border border-zinc-800/80 cursor-pointer">
                          <input
                            type="radio"
                            name="mensGift"
                            value={opt.id}
                            checked={giftWrappingId === opt.id}
                            onChange={() => setGiftWrappingId(opt.id as any)}
                            className="mt-0.5 accent-white"
                          />
                          <div className="flex-1 text-[11px]">
                            <div className="flex justify-between">
                              <span className="text-white font-medium">{opt.name}</span>
                              <span className="font-mono text-zinc-400">{opt.priceFormatted}</span>
                            </div>
                            <p className="text-[10px] text-zinc-500 leading-tight mt-0.5">{opt.desc}</p>
                          </div>
                        </label>
                      ))}
                    </div>

                    {/* メッセージカード */}
                    <div className="pt-2 border-t border-zinc-800">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={includeMessageCard}
                          onChange={(e) => setIncludeMessageCard(e.target.checked)}
                          className="w-3.5 h-3.5 accent-white"
                        />
                        <span className="text-[11px] text-zinc-300">メッセージカードを同封する（無料代筆）</span>
                      </label>
                    </div>
                  </div>

                  {/* 会員限定割引クーポン選択 */}
                  {user && availableCoupons.length > 0 && (
                    <div className="p-3.5 rounded-2xl bg-zinc-900 border border-zinc-700 space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-white flex items-center gap-1.5">
                          <Ticket className="w-3.5 h-3.5 text-zinc-300" />
                          <span>保有割引クーポンを利用する</span>
                        </span>
                        <span className="text-[10px] text-zinc-400 bg-zinc-800 px-2 py-0.5 rounded-full border border-zinc-700">
                          {availableCoupons.length}枚利用可能
                        </span>
                      </div>
                      <select
                        value={selectedCouponId || ""}
                        onChange={(e) => setSelectedCouponId(e.target.value || null)}
                        className="w-full p-2.5 rounded-xl border border-zinc-700 bg-zinc-950 text-white text-xs focus:ring-1 focus:ring-zinc-400 cursor-pointer"
                      >
                        <option value="">クーポンを利用しない</option>
                        {availableCoupons.map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.isBirthdayCoupon ? "🎂 " : c.rankRequired ? "★ " : ""}
                            {c.title} ({c.discount})
                          </option>
                        ))}
                      </select>
                      {selectedCoupon && (
                        <div className="p-2 rounded-lg bg-zinc-950 border border-zinc-700 text-[11px] text-zinc-200 flex justify-between items-center">
                          <span className="font-medium truncate pr-1">{selectedCoupon.title}</span>
                          <span className="font-bold font-mono text-white shrink-0">
                            -¥{couponDiscount.toLocaleString()} 割引適用
                          </span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* ポイント利用 */}
                  {user && user.points > 0 && (
                    <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-zinc-300 font-medium flex items-center gap-1.5">
                          <Award className="w-3.5 h-3.5 text-zinc-400" />
                          <span>保有ポイントを利用する（1pt=¥1）</span>
                        </span>
                        <input
                          type="checkbox"
                          checked={usePoints}
                          onChange={(e) => setUsePoints(e.target.checked)}
                          className="w-4 h-4 accent-white"
                        />
                      </div>
                      <p className="text-[10px] text-zinc-500">
                        サロン共通保有: {user.points} pt （最大 ¥{Math.min(user.points, discountedSubtotal + wrappingFee).toLocaleString()} 割引）
                      </p>
                    </div>
                  )}

                  {/* 料金明細 */}
                  <div className="space-y-1.5 text-zinc-300 font-light">
                    <div className="flex justify-between">
                      <span>商品小計</span>
                      <span className="font-mono text-white">¥{subtotal.toLocaleString()}</span>
                    </div>
                    {couponDiscount > 0 && (
                      <div className="flex justify-between text-zinc-100 font-medium">
                        <span>クーポン割引（{selectedCoupon?.title.slice(0, 14)}…）</span>
                        <span className="font-mono text-white">-¥{couponDiscount.toLocaleString()}</span>
                      </div>
                    )}
                    {wrappingFee > 0 && (
                      <div className="flex justify-between">
                        <span>ギフト包装</span>
                        <span className="font-mono text-white">+¥{wrappingFee.toLocaleString()}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>送料（¥20,000以上で無料）</span>
                      <span className="font-mono text-white">{shippingFee === 0 ? "無料" : `¥${shippingFee}`}</span>
                    </div>
                    {appliedPoints > 0 && (
                      <div className="flex justify-between text-emerald-400">
                        <span>ポイント割引</span>
                        <span className="font-mono">-¥{appliedPoints.toLocaleString()}</span>
                      </div>
                    )}
                    <div className="pt-2 border-t border-zinc-800 flex justify-between items-baseline font-serif text-sm">
                      <span className="font-medium text-white">合計</span>
                      <span className="text-lg font-mono font-bold text-white">¥{grandTotal.toLocaleString()}</span>
                    </div>

                    {/* 会員ランク連動 ポイント還元案内 */}
                    {user && (
                      <div className="pt-1 text-[11px] text-right text-zinc-400 flex justify-end items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5 text-zinc-300" />
                        <span>
                          ★ {user.rank}会員特典（{(rankRate * 100).toFixed(1)}%還元）:{" "}
                          <strong className="text-white font-mono font-bold">
                            +{earnedPoints.toLocaleString()} pt
                          </strong>{" "}
                          獲得予定
                        </span>
                      </div>
                    )}
                  </div>


                  {/* 注文確定ボタン / 会員ログイン誘導 */}
                  {user ? (
                    <button
                      onClick={handleCheckout}
                      className="mens-button-white w-full py-3.5 rounded-full text-xs font-semibold shadow-xl cursor-pointer"
                    >
                      メンズデモ注文を確定する（ヤマト宅急便）
                    </button>
                  ) : (
                    <div className="space-y-2 pt-1">
                      <div className="p-3 rounded-2xl bg-zinc-900 border border-zinc-700 text-zinc-300 flex items-start gap-2.5">
                        <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                        <div className="text-[11px] leading-relaxed">
                          <p className="font-semibold text-white">ご注文には会員ログインが必要です</p>
                          <p className="text-zinc-400 text-[10px] mt-0.5">
                            公式オンラインショップでのご注文には会員登録が必要です。Salon de Fraise 共通会員登録で今すぐ使える<strong className="text-white font-bold underline">1,000ポイント（¥1,000相当）</strong>を進呈中！
                          </p>
                        </div>
                      </div>

                      <Link
                        href="/login"
                        className="mens-button-white w-full py-3.5 rounded-full text-xs font-semibold flex items-center justify-center gap-2 shadow-xl tracking-wider group text-center"
                      >
                        <User className="w-4 h-4 text-zinc-900" />
                        <span>ログイン・新規会員登録へ進む</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Link>

                      <button
                        type="button"
                        onClick={() => setNeedLoginModal(true)}
                        className="w-full py-2 rounded-full border border-zinc-800 text-zinc-400 hover:bg-zinc-900 text-[11px] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Lock className="w-3.5 h-3.5 text-zinc-500" />
                        <span>未ログインのため注文ボタンはロックされています</span>
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 注文完了モーダル */}
      {orderCompleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="mens-glass max-w-md w-full rounded-[2rem] border border-zinc-700 p-7 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-zinc-900 border border-zinc-700 text-white mx-auto flex items-center justify-center font-serif text-xl font-bold">
              H
            </div>

            <div className="space-y-1.5">
              <span className="text-[10px] font-mono tracking-widest uppercase px-2.5 py-0.5 rounded-full bg-zinc-900 text-zinc-300 border border-zinc-800">
                Order Completed
              </span>
              <h3 className="text-xl font-serif font-medium text-white">メンズ注文を受け付けました</h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-light">
                デモ注文が完了しました。ヤマト運輸宅急便にて、男性スタッフ5名が責任を持って丁寧に梱包・出荷いたします（日曜祝日出荷休業）。
              </p>
            </div>

            {/* 注文明細ボックス */}
            <div className="p-3.5 rounded-xl bg-zinc-900/90 border border-zinc-800 text-xs text-zinc-300 space-y-2 text-left">
              {checkoutDetail.couponDiscount > 0 && (
                <div className="flex justify-between items-center text-white pb-1.5 border-b border-zinc-800">
                  <span className="text-[11px] text-zinc-400">適用クーポン:</span>
                  <span className="font-semibold">{checkoutDetail.couponName} (-¥{checkoutDetail.couponDiscount.toLocaleString()})</span>
                </div>
              )}
              <div className="flex justify-between items-center text-white">
                <span className="text-[11px] text-zinc-400">お支払い合計:</span>
                <span className="font-mono font-bold text-sm">¥{checkoutDetail.grandTotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center text-zinc-300 pt-1 border-t border-zinc-800 text-[11px]">
                <span className="text-zinc-400">獲得共通ポイント:</span>
                <span className="text-white font-mono font-bold">+{checkoutDetail.earnedPoints} pt（即時同期）</span>
              </div>
            </div>

            <div className="pt-2 space-y-2">

              <button
                onClick={() => setOrderCompleteModal(false)}
                className="mens-button-white w-full py-3 rounded-full text-xs font-semibold cursor-pointer"
              >
                ショッピングを続ける
              </button>
              <Link
                href="/mypage"
                className="w-full py-2.5 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-medium text-zinc-300 block hover:bg-zinc-800"
              >
                マイページでポイントを確認する
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* 商品詳細モーダル */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
          <div className="mens-glass max-w-2xl w-full rounded-[2rem] border border-zinc-700 shadow-2xl p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-start">
              <div className="sm:col-span-5 aspect-square rounded-2xl overflow-hidden bg-zinc-950 border border-zinc-800 relative">
                <ProductImage
                  product={selectedProduct}
                  alt={selectedProduct.name}
                  sizes="(max-width: 640px) 100vw, 40vw"
                  placeholderSize="lg"
                  className="object-cover"
                />
              </div>

              <div className="sm:col-span-7 space-y-3 text-xs text-zinc-300">
                <div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 text-zinc-400 border border-zinc-800">
                    {selectedProduct.categoryLabel}
                  </span>
                  <h3 className="text-base sm:text-lg font-serif font-medium text-white mt-1">
                    {selectedProduct.name}
                  </h3>
                  <p className="text-xs text-zinc-400 font-light mt-0.5">{selectedProduct.subtitle}</p>
                </div>

                <div className="text-2xl font-serif font-medium text-white pt-1 border-t border-zinc-800">
                  {selectedProduct.priceFormatted}
                </div>

                <p className="text-xs text-zinc-300 leading-relaxed font-light p-3 rounded-xl bg-zinc-950 border border-zinc-800">
                  {selectedProduct.description}
                </p>

                <div className="space-y-1">
                  <p className="font-medium text-white">特徴・こだわり:</p>
                  <ul className="space-y-1 text-zinc-400">
                    {selectedProduct.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-zinc-300 shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => {
                      addToCart(selectedProduct);
                      setSelectedProduct(null);
                    }}
                    className="mens-button-white w-full py-3 rounded-full text-xs font-semibold cursor-pointer"
                  >
                    この商品をメンズカートに追加
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 注文時ログイン必須モーダル（モノトーン） */}
      {needLoginModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="max-w-md w-full rounded-3xl border border-zinc-700 bg-zinc-950 p-6 sm:p-7 text-center space-y-4 relative shadow-2xl">
            <button
              onClick={() => setNeedLoginModal(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="w-14 h-14 rounded-full bg-zinc-900 border border-zinc-700 flex items-center justify-center mx-auto shadow-inner">
              <Lock className="w-7 h-7 text-zinc-300" />
            </div>

            <div className="space-y-1.5">
              <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700 font-mono">
                MEMBER REQUIRED
              </span>
              <h3 className="font-serif text-lg font-medium text-white">
                ご注文には会員ログインが必要です
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-light">
                公式オンラインショップでのご注文には、<strong className="text-white font-medium">Salon de Fraise 共通会員</strong>へのログインまたは新規登録が必要です。
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-zinc-900/90 border border-zinc-800 text-left space-y-2 text-xs">
              <div className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-white mt-1.5 shrink-0" />
                <p className="text-zinc-200">
                  <strong className="text-white font-bold">新規会員登録で1,000pt（¥1,000割引）</strong>を即時進呈！初回注文からご利用可能です。
                </p>
              </div>
              <div className="flex items-start gap-2 border-t border-zinc-800/80 pt-2">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 mt-1.5 shrink-0" />
                <p className="text-zinc-400 text-[11px]">
                  レディース・メンズサロンおよび両ECショップでポイント（2%還元）が共通管理されます。
                </p>
              </div>
            </div>

            <div className="space-y-2 pt-1">
              <Link
                href="/login"
                className="mens-button-white w-full py-3.5 rounded-full text-xs font-semibold flex items-center justify-center gap-2 shadow-xl tracking-wider block"
              >
                <User className="w-4 h-4 text-zinc-900" />
                <span>ログイン・新規会員登録へ進む</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <button
                type="button"
                onClick={() => setNeedLoginModal(false)}
                className="w-full py-2.5 rounded-full bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-xs text-zinc-400 transition-colors cursor-pointer"
              >
                ショッピングに戻る
              </button>
            </div>
          </div>
        </div>
      )}

      <MensFooter />
    </div>
  );
}
