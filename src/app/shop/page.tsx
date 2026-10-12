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
  Info,
  CreditCard,
  Package,
  Calendar,
  AlertCircle,
  Mail,
  FileText,
  Check
} from "lucide-react";
import {
  SHOP_PRODUCTS,
  SHOP_CATEGORIES,
  SHOP_POLICY,
  GIFT_WRAPPING_OPTIONS,
  MESSAGE_CARD_THEMES,
  ShopCategory,
  ShopProduct,
  GiftWrappingOption,
  MessageCardTheme
} from "@/data/shopData";
import { useAuth } from "@/context/AuthContext";
import ProductImage from "@/components/ProductImage";
import BrandLogoStorySection from "@/components/BrandLogoStorySection";

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

  // 入力された商品コードから商品をリアルタイム検索
  const matchedProductByCode = useMemo(() => {
    if (!codeOrderInput.trim()) return null;
    const q = codeOrderInput.trim().toUpperCase();
    return SHOP_PRODUCTS.find((p) => p.itemCode.toUpperCase() === q) || null;
  }, [codeOrderInput]);

  // キーワード（商品名・商品コード・説明文）＆ カテゴリによる複合検索
  const filteredProducts = useMemo(() => {
    let list = SHOP_PRODUCTS.filter((item) => {
      // カテゴリ絞り込み
      if (activeCategory !== "all" && item.category !== activeCategory) return false;
      
      // キーワード検索（商品名、商品コード、サブタイトル、説明文、カテゴリ名）
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

  // 商品コードでの直接クイック注文処理
  const handleCodeOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!matchedProductByCode) {
      setCodeOrderNotification({
        type: "error",
        text: `商品コード「${codeOrderInput}」に該当する製品が見つかりません。一覧のコード（TIP-001, CLR-001等）をご確認ください。`
      });
      return;
    }

    const qty = Math.max(1, codeOrderQuantity);
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === matchedProductByCode.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === matchedProductByCode.id
            ? { ...item, quantity: item.quantity + qty }
            : item
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

  // 選択されたギフトオプションとメッセージカード情報
  const selectedWrapping = useMemo(() => {
    return GIFT_WRAPPING_OPTIONS.find((opt) => opt.id === giftWrappingId) || GIFT_WRAPPING_OPTIONS[0];
  }, [giftWrappingId]);

  const selectedTheme = useMemo(() => {
    return MESSAGE_CARD_THEMES.find((t) => t.id === cardThemeId) || MESSAGE_CARD_THEMES[0];
  }, [cardThemeId]);

  // 金額計算（20,000円以上のご購入で送料無料）
  const FREE_SHIPPING_THRESHOLD = 20000;
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const totalItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const shippingFee = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : 550;
  const wrappingFee = selectedWrapping.price;
  const userPointBalance = user?.points || 0;
  const appliedPoints = usePoints ? Math.min(userPointBalance, subtotal + wrappingFee) : 0;
  const grandTotal = Math.max(0, subtotal + wrappingFee + shippingFee - appliedPoints);
  const earnedPoints = Math.floor(grandTotal * 0.02); // 購入金額の2%をサロン・ショップ共通ポイントとして付与

  const [checkoutDetail, setCheckoutDetail] = useState<{
    usedPoints: number;
    earnedPoints: number;
    grandTotal: number;
    subtotal: number;
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
    shippingFee: 0,
    prevBalance: 0,
    wrappingName: "なし",
    wrappingPrice: 0,
    hasCard: false,
    cardThemeName: "",
    cardMessage: "",
    hidePrice: true
  });

  const { checkoutShop } = useAuth();

  // 注文完了処理（サロン会員情報・ポイント残高との完全同期）
  const handleCheckout = async () => {
    if (cart.length === 0) return;
    const baseSummary = cart.map((i) => `${i.product.name}×${i.quantity}`).join(", ");
    const giftSummary = selectedWrapping.id !== "none" ? ` [ギフト: ${selectedWrapping.name}]` : "";
    const cardSummary = includeMessageCard ? ` [カード: ${selectedTheme.name}]` : "";
    const orderSummary = `${baseSummary}${giftSummary}${cardSummary}`;
    const prevBalance = user?.points || 0;

    setCheckoutDetail({
      usedPoints: appliedPoints,
      earnedPoints,
      grandTotal,
      subtotal,
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
      await checkoutShop(appliedPoints, earnedPoints, orderSummary);
    }

    setOrderCompleteModal(true);
    setCart([]);
    setUsePoints(false);
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
                <span>サロン共通: <strong>{user.points} pt</strong> (¥{user.points})</span>
              </Link>
            )}
          </div>
        </div>

        {/* ★ 新規会員登録1,000pt進呈バナー ＆ サロン・ショップ共通ポイント（1pt=1円換算） ＆ 20,000円以上送料無料 特集バナー */}
        <div className="pearl-glass p-5 sm:p-7 rounded-3xl border-2 border-gold-300 shadow-md bg-linear-to-r from-gold-50/85 via-white to-lavender-50/80 relative overflow-hidden">
          <div className="shimmer-sweep pointer-events-none opacity-30"></div>
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 relative z-10">
            <div className="space-y-2 text-center lg:text-left flex-1">
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
                <span className="px-3 py-0.5 rounded-full bg-linear-to-r from-gold-400 to-amber-500 text-plum-950 text-xs font-serif font-bold tracking-wider shadow-2xs">
                  新規会員登録特典
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-lavender-100 text-lavender-800 text-[11px] font-medium border border-lavender-200">
                  サロン ＆ ショップ共通ポイント
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-white text-gold-800 text-[11px] font-medium border border-gold-300">
                  1ポイント = 1円換算
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-plum-900 text-white text-[11px] font-serif">
                  ¥20,000以上で送料無料
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl md:text-3xl font-serif text-plum-950 font-normal leading-snug">
                新規WEB会員登録で、公式オンラインショップで使える
                <span className="text-gold-700 font-bold mx-1 text-2xl sm:text-3xl">1,000ポイント</span>
                を進呈！
              </h2>

              <p className="text-xs sm:text-sm text-plum-700 leading-relaxed font-light max-w-3xl">
                サロン施術でも公式オンラインショップでも、<strong className="text-plum-950 font-medium">会員情報・ポイント残高（1pt＝1円換算）は完全に共有</strong>されます。
                自爪を削らない主力ネイルチップやサロン専売ジェルのご購入時に、即座にポイント割引をご利用いただけます。
                また、公式オンラインショップは<strong className="text-gold-800 font-semibold underline decoration-gold-400 decoration-2 underline-offset-2">20,000円以上のご購入で全国送料無料</strong>にてお届けいたします。
              </p>
            </div>

            {/* 会員状態別アクションカード */}
            <div className="shrink-0 flex flex-col sm:flex-row lg:flex-col gap-2.5 w-full lg:w-auto">
              {user ? (
                <div className="text-center p-3.5 rounded-2xl bg-white border border-gold-300 shadow-2xs space-y-1 min-w-[220px]">
                  <span className="text-[10px] text-plum-500 block font-serif tracking-wide">
                    サロン＆ショップ共通ポイント
                  </span>
                  <p className="text-base sm:text-lg font-serif font-medium text-plum-950">
                    {user.name} 様: <span className="text-gold-700 font-bold text-xl">{user.points} pt</span>
                  </p>
                  <p className="text-[10px] text-lavender-700">
                    （¥{user.points.toLocaleString()} 相当・カートで即時利用可）
                  </p>
                  <Link
                    href="/mypage"
                    className="inline-block mt-1 text-[11px] text-plum-600 hover:text-lavender-700 underline underline-offset-2"
                  >
                    マイページで確認する →
                  </Link>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="px-6 py-3.5 rounded-full bg-linear-to-r from-plum-900 to-purple-900 text-white font-medium text-xs shadow-md hover:shadow-xl hover:scale-105 active:scale-95 transition-all text-center flex items-center justify-center gap-2 tracking-wider"
                >
                  <Sparkles className="w-4 h-4 text-gold-300" />
                  <span>新規登録して1,000pt受け取る</span>
                </Link>
              )}
            </div>
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

        {/* 公式オンラインショップご利用案内・配送・決済・出荷ポリシー（4大特徴パネル） */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          {/* 1. 配送方法 */}
          <div className="pearl-glass p-4 rounded-2xl border border-lavender-200/90 space-y-1.5 bg-white/90">
            <div className="flex items-center gap-2 text-plum-950 font-serif font-medium">
              <div className="w-8 h-8 rounded-lg bg-lavender-100 text-lavender-700 flex items-center justify-center shrink-0">
                <Truck className="w-4 h-4" />
              </div>
              <div>
                <p className="leading-tight">配送は宅急便のみ</p>
                <span className="text-[10px] text-gold-700 font-sans font-semibold">ヤマト運輸 宅急便限定</span>
              </div>
            </div>
            <p className="text-[11px] text-plum-600 leading-relaxed font-light">
              繊細なネイルチップやジェルを安全にお届けするため、<strong className="text-plum-900 font-medium">ヤマト運輸 宅急便にてのみ</strong>配送可能です（メール便・定形外不可）。
            </p>
          </div>

          {/* 2. 送料無料条件 */}
          <div className="pearl-glass p-4 rounded-2xl border border-gold-300/80 space-y-1.5 bg-linear-to-br from-gold-50/40 via-white to-lavender-50/40">
            <div className="flex items-center gap-2 text-plum-950 font-serif font-medium">
              <div className="w-8 h-8 rounded-lg bg-gold-100 text-gold-800 flex items-center justify-center shrink-0">
                <Gift className="w-4 h-4" />
              </div>
              <div>
                <p className="leading-tight">¥20,000以上で送料無料</p>
                <span className="text-[10px] text-gold-800 font-sans font-semibold">全品全国どこでも無料</span>
              </div>
            </div>
            <p className="text-[11px] text-plum-600 leading-relaxed font-light">
              1回のご注文合計が<strong className="text-gold-800 font-semibold">20,000円（税込）以上で送料無料</strong>となります（20,000円未満は一律550円）。
            </p>
          </div>

          {/* 3. 決済方法 */}
          <div className="pearl-glass p-4 rounded-2xl border border-lavender-200/90 space-y-1.5 bg-white/90">
            <div className="flex items-center gap-2 text-plum-950 font-serif font-medium">
              <div className="w-8 h-8 rounded-lg bg-lavender-100 text-lavender-700 flex items-center justify-center shrink-0">
                <CreditCard className="w-4 h-4" />
              </div>
              <div>
                <p className="leading-tight">多彩な決済に対応</p>
                <span className="text-[10px] text-lavender-700 font-sans">4つの安心決済方法</span>
              </div>
            </div>
            <p className="text-[11px] text-plum-600 leading-relaxed font-light">
              <strong className="text-plum-900 font-medium">クレジットカード・銀行振込・代金引換・コンビニ決済</strong>がご使用いただけます。
            </p>
          </div>

          {/* 4. 出荷スケジュール ＆ スタッフ体制 */}
          <div className="pearl-glass p-4 rounded-2xl border border-lavender-200/90 space-y-1.5 bg-white/90">
            <div className="flex items-center gap-2 text-plum-950 font-serif font-medium">
              <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-700 flex items-center justify-center shrink-0">
                <Calendar className="w-4 h-4" />
              </div>
              <div>
                <p className="leading-tight">日曜・祝日は出荷休業</p>
                <span className="text-[10px] text-rose-700 font-sans font-medium">平日・土曜に出荷対応</span>
              </div>
            </div>
            <p className="text-[11px] text-plum-600 leading-relaxed font-light">
              <strong className="text-plum-900 font-medium">日曜・祝日は商品出荷を行っておりません</strong>。サロン在籍スタッフ（12名／毎日2〜3名シフト勤務）が丁寧に出荷検品を行っております。
            </p>
          </div>
        </div>

        {/* ギフトラッピング ＆ メッセージカードの安心ご案内バナー */}
        <div className="pearl-glass p-3.5 sm:p-4 rounded-2xl border border-gold-300/80 bg-linear-to-r from-lavender-50/70 via-white to-gold-50/70 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-2xs">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gold-100 text-gold-800 flex items-center justify-center shrink-0 border border-gold-300">
              <Gift className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-serif font-medium text-plum-950 flex flex-wrap items-center gap-2">
                <span>大切な方への贈り物に：特製ギフトラッピング ＆ メッセージカード対応</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-sans font-medium">無料カード印字</span>
              </p>
              <p className="text-[11px] text-plum-600 font-light mt-0.5">
                ご注文時（カート内）にて、ラベンダーリボン包装（+¥330）やプレミアムゴールドBOX（+¥550）、用途別メッセージカード（無料印字）をお選びいただけます。納品書の金額非表示（ギフト直送）も承ります。
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            className="px-3.5 py-1.5 rounded-full bg-white border border-gold-300 hover:bg-gold-50 text-[11px] font-medium text-plum-900 transition-colors shrink-0 shadow-2xs cursor-pointer"
          >
            カートでギフト指定を見る
          </button>
        </div>

        {/* ======================================================== */}
        {/* ★ 商品コードで注文（クイックオーダー）セクション */}
        {/* ======================================================== */}
        <div className="pearl-glass p-6 sm:p-7 rounded-3xl border-2 border-lavender-300 shadow-md bg-linear-to-r from-white via-lavender-50/50 to-white space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-lavender-200/70 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-plum-900 text-gold-300 flex items-center justify-center">
                <Package className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-serif text-sm sm:text-base font-medium text-plum-950 flex items-center gap-2">
                  <span>商品コードで直接注文</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-gold-400 text-plum-950 font-sans font-bold">
                    Quick Order
                  </span>
                </h3>
                <p className="text-[11px] text-plum-600 font-light">
                  商品コード（例: TIP-001, CLR-001）を入力して、そのまま直接カートに追加できます
                </p>
              </div>
            </div>

            {/* 代表コードのクイック入力ピル */}
            <div className="flex flex-wrap items-center gap-1.5 text-[10px]">
              <span className="text-plum-400 font-mono">人気コード例:</span>
              {[
                { code: "TIP-001", name: "水光チップ" },
                { code: "TIP-002", name: "ヌードチップ" },
                { code: "CLR-001", name: "EXベース" },
                { code: "COL-001", name: "マグネット" },
                { code: "LGT-001", name: "LEDライト" },
                { code: "KIT-001", name: "スターター" }
              ].map((p) => (
                <button
                  key={p.code}
                  type="button"
                  onClick={() => {
                    setCodeOrderInput(p.code);
                    setCodeOrderNotification(null);
                  }}
                  className="px-2 py-1 rounded-md bg-white hover:bg-lavender-100 border border-lavender-200 text-plum-800 font-mono transition-colors cursor-pointer"
                  title={`${p.code}: ${p.name}`}
                >
                  {p.code}
                </button>
              ))}
            </div>
          </div>

          {/* クイック注文フォーム */}
          <form onSubmit={handleCodeOrderSubmit} className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
              
              {/* 商品コード入力 */}
              <div className="sm:col-span-5 relative">
                <label className="block text-[10px] font-mono text-plum-500 mb-1">
                  商品コード (Item Code)
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="TIP-001, CLR-001, LGT-001 等..."
                    value={codeOrderInput}
                    onChange={(e) => {
                      setCodeOrderInput(e.target.value);
                      setCodeOrderNotification(null);
                    }}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-lavender-200 text-xs text-plum-900 font-mono uppercase placeholder:text-plum-400 focus:outline-hidden focus:ring-2 focus:ring-gold-400"
                  />
                  {codeOrderInput && (
                    <button
                      type="button"
                      onClick={() => setCodeOrderInput("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-plum-400 hover:text-plum-700"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* 数量 */}
              <div className="sm:col-span-3">
                <label className="block text-[10px] text-plum-500 mb-1">
                  注文数量
                </label>
                <div className="flex items-center border border-lavender-200 rounded-xl bg-white overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setCodeOrderQuantity((q) => Math.max(1, q - 1))}
                    className="w-9 h-9 flex items-center justify-center text-plum-700 hover:bg-lavender-50 cursor-pointer"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="flex-1 text-center font-mono text-xs text-plum-950 font-medium">
                    {codeOrderQuantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setCodeOrderQuantity((q) => Math.min(10, q + 1))}
                    className="w-9 h-9 flex items-center justify-center text-plum-700 hover:bg-lavender-50 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* カート追加ボタン */}
              <div className="sm:col-span-4 self-end">
                <button
                  type="submit"
                  disabled={!codeOrderInput.trim()}
                  className="w-full py-2.5 px-4 rounded-xl gold-button text-xs font-semibold flex items-center justify-center gap-2 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>商品コードでカートに追加</span>
                </button>
              </div>
            </div>

            {/* リアルタイム一致商品のプレビュー */}
            {matchedProductByCode && (
              <div className="p-3 rounded-xl bg-white border border-gold-300 shadow-2xs flex items-center justify-between text-xs animate-in fade-in duration-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg overflow-hidden relative shrink-0 border border-lavender-200">
                    <ProductImage
                      product={matchedProductByCode}
                      alt={matchedProductByCode.name}
                      placeholderSize="sm"
                    />
                  </div>
                  <div>
                    <span className="font-mono text-[10px] text-gold-700 font-bold block">
                      [{matchedProductByCode.itemCode}] {matchedProductByCode.categoryLabel}
                    </span>
                    <p className="font-serif font-medium text-plum-950 line-clamp-1">
                      {matchedProductByCode.name}
                    </p>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <span className="font-serif font-medium text-plum-950 text-sm">
                    {matchedProductByCode.priceFormatted}
                  </span>
                  <span className="text-[10px] text-plum-500 block">
                    (小計: ¥{(matchedProductByCode.price * codeOrderQuantity).toLocaleString()})
                  </span>
                </div>
              </div>
            )}

            {/* 通知メッセージ */}
            {codeOrderNotification && (
              <div
                className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
                  codeOrderNotification.type === "success"
                    ? "bg-emerald-50 text-emerald-900 border border-emerald-300"
                    : "bg-rose-50 text-rose-900 border border-rose-300"
                }`}
              >
                {codeOrderNotification.type === "success" ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                )}
                <span>{codeOrderNotification.text}</span>
              </div>
            )}
          </form>
        </div>

        {/* ======================================================== */}
        {/* 商品カタログセクション（キーワード検索 ＆ カテゴリ検索） */}
        {/* ======================================================== */}
        <div id="shop-catalog" className="space-y-6 pt-2">

          {/* 検索・ソートコントロールバー */}
          <div className="pearl-glass p-4 rounded-2xl border border-lavender-200 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
            {/* 検索インプット（キーワード名 ＆ 商品コード検索） */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-plum-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="商品名、商品コード（TIP-001等）、キーワードで検索..."
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
                        <ProductImage
                          product={product}
                          alt={product.name}
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
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setCodeOrderInput(product.itemCode);
                              const el = document.getElementById("shop-catalog");
                              if (el) el.scrollIntoView({ behavior: "smooth" });
                            }}
                            className="font-mono text-[10px] font-semibold px-2 py-0.5 rounded bg-lavender-100 hover:bg-gold-300 text-plum-900 border border-lavender-200 transition-colors cursor-pointer"
                            title="クリックして商品コードで直接注文"
                          >
                            コード: {product.itemCode} ✎
                          </button>
                        </div>

                        <h3 className="text-sm font-serif font-medium text-plum-950 group-hover:text-lavender-700 transition-colors line-clamp-2 leading-snug">
                          {product.name}
                        </h3>

                        <p className="text-xs text-plum-700 font-light line-clamp-2 leading-relaxed">
                          {product.subtitle}
                        </p>

                        <div className="flex items-center justify-between text-[10px] text-plum-500 pt-0.5">
                          <span className="font-mono truncate max-w-[180px]">{product.volumeOrSpec}</span>
                          <span className="flex items-center gap-1 font-mono shrink-0">
                            <Star className="w-3.5 h-3.5 fill-gold-400 text-gold-400" />
                            {product.rating} ({product.reviewCount})
                          </span>
                        </div>
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

                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          onClick={(e) => addToCart(product, e)}
                          className="py-2 px-3.5 rounded-full luxe-button text-xs font-medium flex items-center gap-1.5 shadow-sm transition-all hover:scale-103 cursor-pointer shrink-0"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>カートへ</span>
                        </button>
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>
          )}

        </div>

        {/* ======================================================== */}
        {/* ★ ブランドロゴに込められたメッセージセクション */}
        {/* ======================================================== */}
        <div className="pt-6">
          <BrandLogoStorySection />
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

              {/* 送料無料プログレスバー（20,000円基準） */}
              <div className="px-5 py-3 bg-white border-b border-lavender-100 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-serif text-plum-950 flex items-center gap-1.5 font-medium">
                    <Truck className="w-3.5 h-3.5 text-gold-600" />
                    <span>
                      {subtotal >= 20000
                        ? "送料無料でお届けします！（宅急便）"
                        : `あと ¥${(20000 - subtotal).toLocaleString()} で送料無料`}
                    </span>
                  </span>
                  <span className="text-[10px] text-plum-500 font-mono">送料無料ライン: ¥20,000</span>
                </div>
                <div className="w-full bg-lavender-100 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-linear-to-r from-lavender-500 to-gold-500 h-full transition-all duration-300"
                    style={{ width: `${Math.min(100, (subtotal / 20000) * 100)}%` }}
                  />
                </div>
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
                        <ProductImage
                          product={item.product}
                          alt={item.product.name}
                          placeholderSize="sm"
                        />
                      </div>

                      <div className="flex-1 space-y-1 text-xs">
                        <div className="flex items-center gap-1.5">
                          <span className="font-mono text-[9px] px-1.5 py-0.2 rounded bg-lavender-100 text-plum-800 border border-lavender-200 font-semibold">
                            {item.product.itemCode}
                          </span>
                          <span className="text-[10px] text-gold-700 font-serif font-medium truncate max-w-[140px]">
                            {item.product.categoryLabel}
                          </span>
                        </div>
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

              {/* カートフッター（金額・ギフト選択・ポイント割引・配送決済注記・注文確定） */}
              {cart.length > 0 && (
                <div className="p-5 sm:p-6 bg-lavender-50/70 border-t border-lavender-200 space-y-3.5">
                  
                  {/* ======================================================== */}
                  {/* ギフトラッピング ＆ メッセージカード設定（任意オプション） */}
                  {/* ======================================================== */}
                  <div className="p-3.5 sm:p-4 rounded-2xl bg-white border border-gold-300 shadow-2xs space-y-3.5 text-xs">
                    <div className="flex items-center justify-between border-b border-lavender-100 pb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-lg bg-gold-100 text-gold-800 flex items-center justify-center shrink-0">
                          <Gift className="w-3.5 h-3.5" />
                        </div>
                        <h4 className="font-serif font-medium text-plum-950">
                          ギフトラッピング ＆ メッセージカード
                        </h4>
                      </div>
                      <span className="text-[10px] text-gold-800 bg-gold-50 border border-gold-200 px-2 py-0.5 rounded-full font-serif font-medium">
                        プレゼント対応
                      </span>
                    </div>

                    {/* 1. ギフトラッピング選択 */}
                    <div className="space-y-2">
                      <label className="block text-[11px] font-medium text-plum-900">
                        ① ギフトラッピングをお選びください
                      </label>
                      <div className="space-y-1.5">
                        {GIFT_WRAPPING_OPTIONS.map((opt) => (
                          <label
                            key={opt.id}
                            className={`flex items-start gap-2.5 p-2.5 rounded-xl border transition-all cursor-pointer ${
                              giftWrappingId === opt.id
                                ? "bg-gold-50/50 border-gold-400 shadow-2xs"
                                : "bg-white border-lavender-200/80 hover:bg-lavender-50/50"
                            }`}
                          >
                            <input
                              type="radio"
                              name="giftWrapping"
                              value={opt.id}
                              checked={giftWrappingId === opt.id}
                              onChange={() => setGiftWrappingId(opt.id)}
                              className="mt-0.5 accent-gold-600 cursor-pointer"
                            />
                            <div className="flex-1 space-y-0.5">
                              <div className="flex items-center justify-between">
                                <span className="font-serif font-medium text-plum-950 text-xs">
                                  {opt.name}
                                </span>
                                <span className={`font-mono text-xs font-semibold ${opt.price > 0 ? "text-gold-700" : "text-plum-500"}`}>
                                  {opt.priceFormatted}
                                </span>
                              </div>
                              <p className="text-[10px] text-plum-600 font-light leading-snug">
                                {opt.desc}
                              </p>
                              <span className="inline-block text-[9px] text-lavender-700 font-sans">
                                おすすめ: {opt.recommendedFor}
                              </span>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* 2. メッセージカード選択 */}
                    <div className="space-y-2.5 pt-2 border-t border-lavender-100">
                      <div className="flex items-center justify-between">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={includeMessageCard}
                            onChange={(e) => {
                              setIncludeMessageCard(e.target.checked);
                              if (e.target.checked && !cardMessage) {
                                setCardMessage(selectedTheme.sampleMessage);
                              }
                            }}
                            className="w-4 h-4 accent-gold-600 cursor-pointer"
                          />
                          <span className="font-serif font-medium text-plum-950 text-xs flex items-center gap-1">
                            <Mail className="w-3.5 h-3.5 text-lavender-600" />
                            <span>② メッセージカードを添える</span>
                          </span>
                        </label>
                        <span className="text-[10px] text-emerald-700 font-medium bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                          無料代筆印字サービス
                        </span>
                      </div>

                      {includeMessageCard && (
                        <div className="pl-6 space-y-2.5 animate-in fade-in duration-200">
                          {/* カードテーマ選択 */}
                          <div>
                            <span className="block text-[10px] text-plum-500 mb-1">
                              カードのデザイン用途をお選びください:
                            </span>
                            <div className="grid grid-cols-2 gap-1.5">
                              {MESSAGE_CARD_THEMES.map((theme) => (
                                <button
                                  key={theme.id}
                                  type="button"
                                  onClick={() => {
                                    setCardThemeId(theme.id);
                                    if (!cardMessage || cardMessage === selectedTheme.sampleMessage) {
                                      setCardMessage(theme.sampleMessage);
                                    }
                                  }}
                                  className={`p-2 rounded-xl text-left border text-[11px] transition-all cursor-pointer ${
                                    cardThemeId === theme.id
                                      ? "bg-lavender-100/70 border-lavender-400 text-plum-950 font-medium shadow-2xs"
                                      : "bg-white border-lavender-200 text-plum-700 hover:bg-lavender-50/50"
                                  }`}
                                >
                                  <div className="font-serif leading-tight">{theme.name}</div>
                                  <div className="text-[9px] text-plum-400 font-light mt-0.5">{theme.badge}</div>
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* メッセージ本文入力 */}
                          {cardThemeId !== "blank" ? (
                            <div className="space-y-1.5">
                              <div className="flex items-center justify-between text-[10px]">
                                <span className="text-plum-600">印字メッセージ本文 (最大80文字):</span>
                                <span className="font-mono text-plum-400">{cardMessage.length} / 80</span>
                              </div>
                              <textarea
                                rows={2}
                                maxLength={80}
                                value={cardMessage}
                                onChange={(e) => setCardMessage(e.target.value)}
                                placeholder={selectedTheme.sampleMessage}
                                className="w-full p-2.5 rounded-xl border border-lavender-200 text-xs text-plum-950 placeholder:text-plum-300 focus:outline-hidden focus:ring-1 focus:ring-gold-400 bg-white"
                              />

                              {/* 定型文ボタン */}
                              <div className="flex flex-wrap items-center gap-1 text-[10px]">
                                <span className="text-plum-400">定型文挿入:</span>
                                <button
                                  type="button"
                                  onClick={() => setCardMessage("お誕生日おめでとうございます！素敵な1年になりますように。")}
                                  className="px-2 py-0.5 rounded bg-lavender-50 hover:bg-lavender-100 border border-lavender-200 text-plum-700 cursor-pointer"
                                >
                                  お誕生日
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setCardMessage("いつも本当にありがとうございます。日頃の感謝の気持ちを込めて。")}
                                  className="px-2 py-0.5 rounded bg-lavender-50 hover:bg-lavender-100 border border-lavender-200 text-plum-700 cursor-pointer"
                                >
                                  感謝・お礼
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setCardMessage("心ときめく指先の輝きをお届けします。気に入っていただけますように。")}
                                  className="px-2 py-0.5 rounded bg-lavender-50 hover:bg-lavender-100 border border-lavender-200 text-plum-700 cursor-pointer"
                                >
                                  贈り物
                                </button>
                              </div>

                              {/* プレビューカード */}
                              <div className="p-2.5 rounded-xl bg-linear-to-br from-lavender-50/70 via-white to-gold-50/60 border border-gold-300 text-[10px] space-y-1">
                                <div className="flex items-center justify-between text-[9px] text-gold-800 font-serif border-b border-gold-200/60 pb-1">
                                  <span>✦ Salon de Fraise Message Card ✦</span>
                                  <span className="font-mono">{selectedTheme.name}</span>
                                </div>
                                <p className="font-serif text-plum-900 italic leading-relaxed pt-0.5 whitespace-pre-wrap">
                                  &ldquo;{cardMessage.trim() || selectedTheme.sampleMessage}&rdquo;
                                </p>
                              </div>
                            </div>
                          ) : (
                            <p className="p-2.5 rounded-xl bg-lavender-50 border border-lavender-200 text-[10px] text-plum-600 font-light leading-relaxed">
                              ※手書きメッセージ用のサロン専用オリジナルブランクカードを封筒付きで同封いたします。ご自身で手書きメッセージをご記入いただけます。
                            </p>
                          )}
                        </div>
                      )}
                    </div>

                    {/* 3. 納品書金額非表示チェック */}
                    <div className="pt-2 border-t border-lavender-100">
                      <label className="flex items-center gap-2 cursor-pointer text-[10px] text-plum-700">
                        <input
                          type="checkbox"
                          checked={hidePriceInInvoice}
                          onChange={(e) => setHidePriceInInvoice(e.target.checked)}
                          className="w-3.5 h-3.5 accent-gold-600 cursor-pointer"
                        />
                        <span>納品書に金額を表示しない（受取人様へ直接お届けするギフト配送仕様）</span>
                      </label>
                    </div>

                  </div>

                  {/* 会員ポイント利用スイッチ */}
                  {user && user.points > 0 && (
                    <div className="p-3 rounded-xl bg-white border border-gold-300 shadow-2xs space-y-1.5 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-plum-950 flex items-center gap-1.5">
                          <Award className="w-4 h-4 text-gold-600" />
                          <span>会員ポイントを利用する（1pt=¥1）</span>
                        </span>
                        <input
                          type="checkbox"
                          checked={usePoints}
                          onChange={(e) => setUsePoints(e.target.checked)}
                          className="w-4 h-4 accent-gold-600 cursor-pointer"
                        />
                      </div>
                      <p className="text-[11px] text-plum-600">
                        サロン共通保有: <strong>{user.points} pt</strong> （最大 ¥{Math.min(user.points, subtotal + wrappingFee).toLocaleString()} 割引）
                      </p>
                    </div>
                  )}

                  {/* 配送・決済・出荷の明記ボックス */}
                  <div className="p-2.5 rounded-xl bg-white/90 border border-lavender-200/80 text-[10px] text-plum-700 space-y-1">
                    <p className="flex items-center gap-1 font-medium text-plum-900">
                      <Truck className="w-3 h-3 text-lavender-600 shrink-0" />
                      <span>配送: <strong>ヤマト運輸 宅急便</strong>（※宅急便のみ対応）</span>
                    </p>
                    <p className="flex items-center gap-1 font-medium text-plum-900">
                      <CreditCard className="w-3 h-3 text-lavender-600 shrink-0" />
                      <span>決済: クレジット / 銀行振込 / 代金引換 / コンビニ</span>
                    </p>
                    <p className="text-rose-700 font-medium">
                      ※ 日曜・祝日は商品出荷を行っておりません（平日・土曜にサロン常勤スタッフ12名が出荷検品対応）
                    </p>
                  </div>

                  {/* 料金明細 */}
                  <div className="space-y-1.5 text-xs text-plum-800">
                    <div className="flex justify-between">
                      <span>商品小計</span>
                      <span className="font-mono">¥{subtotal.toLocaleString()}</span>
                    </div>

                    {wrappingFee > 0 && (
                      <div className="flex justify-between text-gold-800 font-medium">
                        <span>ギフトラッピング（{selectedWrapping.name}）</span>
                        <span className="font-mono">+¥{wrappingFee.toLocaleString()}</span>
                      </div>
                    )}

                    {includeMessageCard && (
                      <div className="flex justify-between text-lavender-700">
                        <span>メッセージカード（{selectedTheme.name}）</span>
                        <span className="font-sans font-medium text-emerald-700">無料</span>
                      </div>
                    )}

                    <div className="flex justify-between">
                      <span>送料（¥20,000以上で無料）</span>
                      <span className="font-mono">
                        {shippingFee === 0 ? "無料（宅急便）" : `¥${shippingFee.toLocaleString()}`}
                      </span>
                    </div>

                    {appliedPoints > 0 && (
                      <div className="flex justify-between text-rose-600 font-medium">
                        <span>サロン共通ポイント割引</span>
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
                    <span>デモ注文を確定する（ヤマト宅急便）</span>
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
                <ProductImage
                  product={selectedProduct}
                  alt={selectedProduct.name}
                  placeholderSize="lg"
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
          <div className="pearl-glass max-w-md w-full rounded-[2rem] border border-gold-300 shadow-2xl p-7 text-center space-y-4 bg-white">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center border border-emerald-300">
              <CheckCircle2 className="w-7 h-7" />
            </div>

            <div className="space-y-1.5">
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

            {/* 配送・決済・出荷・ギフト・サロン共通ポイント情報詳細 */}
            <div className="p-3.5 rounded-xl bg-lavender-50 border border-lavender-200 text-xs text-plum-800 space-y-2.5 text-left max-h-[42vh] overflow-y-auto">
              {/* ギフトサービス適用内容 */}
              {(checkoutDetail.wrappingPrice > 0 || checkoutDetail.hasCard) && (
                <div className="p-2.5 rounded-lg bg-white border border-gold-300 space-y-1 text-[11px]">
                  <p className="font-semibold text-gold-900 flex items-center gap-1.5">
                    <Gift className="w-3.5 h-3.5 text-gold-600 shrink-0" />
                    <span>ギフトサービス指定内容:</span>
                  </p>
                  <p className="text-plum-800 pl-5">
                    ・ラッピング: <strong className="text-plum-950">{checkoutDetail.wrappingName}</strong>
                    {checkoutDetail.wrappingPrice > 0 && ` (+¥${checkoutDetail.wrappingPrice.toLocaleString()})`}
                  </p>
                  {checkoutDetail.hasCard && (
                    <div className="text-plum-800 pl-5 space-y-0.5">
                      <p>
                        ・カード: <strong className="text-plum-950">{checkoutDetail.cardThemeName}</strong>
                      </p>
                      <p className="p-1.5 rounded bg-lavender-50 text-[10px] text-plum-700 italic border border-lavender-100 whitespace-pre-wrap">
                        &ldquo;{checkoutDetail.cardMessage}&rdquo;
                      </p>
                    </div>
                  )}
                  {checkoutDetail.hidePrice && (
                    <p className="text-[10px] text-plum-600 pl-5">
                      ※ 納品書の金額非表示（プレゼント受取人様へ直送対応）
                    </p>
                  )}
                </div>
              )}

              <div className="flex items-start gap-2">
                <Truck className="w-4 h-4 text-lavender-700 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-plum-950">配送: ヤマト運輸 宅急便（宅急便のみ）</p>
                  <p className="text-[11px] text-plum-600 leading-snug">
                    ※ 日曜・祝日は出荷休業のため、翌営業日に常勤スタッフ12名（毎日2〜3名体制）が丁寧に梱包・出荷いたします。
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2 pt-1 border-t border-lavender-200/60">
                <CreditCard className="w-4 h-4 text-lavender-700 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-plum-950">決済: クレカ / 銀行振込 / 代引 / コンビニ</p>
                  <p className="text-[11px] text-plum-600 leading-snug">
                    ご指定の決済方法にて安全にお手続きを完了いたしました（お支払い合計: <strong>¥{checkoutDetail.grandTotal.toLocaleString()}</strong>）。
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2 pt-1 border-t border-lavender-200/60">
                <Sparkles className="w-4 h-4 text-gold-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-gold-800">サロン ＆ EC共通ポイント同期完了:</p>
                  <p className="text-[11px] text-plum-700 leading-snug">
                    今回の獲得ポイント（+{checkoutDetail.earnedPoints} pt）がサロン共通残高に即時反映されました。店舗施術でもオンラインショップでも相互にご利用可能です。
                  </p>
                </div>
              </div>
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
                className="w-full py-2.5 rounded-full bg-white border border-lavender-200 text-xs font-medium text-plum-800 block hover:bg-lavender-50 transition-colors"
              >
                マイページで共通ポイントを確認する
              </Link>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
