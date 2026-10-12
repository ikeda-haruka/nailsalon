// src/data/mensShopData.ts
// メンズ専用公式オンラインショップ「Salon de Fraise HOMME ONLINE」データ定義

export type MensShopCategory =
  | "all"
  | "tips" // メンズネイルチップ
  | "gel" // パラジェル（ベース＆マットトップ）
  | "color" // モノトーン・マグネットカラー
  | "care" // メンズケア・オイル
  | "kit"; // メンズスターターキット

export interface MensShopProduct {
  id: string;
  itemCode: string; // 商品コード (例: M-TIP-001)
  name: string;
  subtitle: string;
  category: MensShopCategory;
  categoryLabel: string;
  price: number;
  priceFormatted: string;
  rating: number;
  reviewCount: number;
  image: string;
  isHeroProduct?: boolean;
  isBestSeller?: boolean;
  tag: string;
  volumeOrSpec: string;
  description: string;
  features: string[];
  usage: string;
}

export const MENS_SHOP_POLICY = {
  freeShippingThreshold: 20000, // 20,000円以上で送料無料
  shippingCarrier: "ヤマト運輸 宅急便（※宅急便にてのみ配送可能）",
  paymentMethods: [
    { id: "credit", name: "クレジットカード", desc: "VISA / Mastercard / JCB / AMEX / Diners（即時決済）" },
    { id: "bank", name: "銀行振込", desc: "三井住友銀行 / ご入金確認後の出荷（振込手数料お客様ご負担）" },
    { id: "cod", name: "代金引換", desc: "ヤマト運輸 宅急便コレクト（代引手数料 一律330円税込）" },
    { id: "convenience", name: "コンビニ決済", desc: "セブン-イレブン / ローソン / ファミリーマート等" }
  ],
  shippingSchedule: "日曜・祝日は商品出荷を行っておりません（平日・土曜に出荷対応）",
  staffOperationNotice: "サロン在籍男性スタッフ（5名体制）が、サロンワークの合間にご注文商品の検品・梱包・出荷を一貫して担当しております。",
  giftOptionNotice: "メンズ特製シックブラックBOX（+¥550）＆無料メッセージカード代筆に対応。金額非表示のギフト直送も承ります。"
};

export const MENS_SHOP_CATEGORIES: { id: MensShopCategory; label: string; desc: string }[] = [
  { id: "all", label: "ALL ITEMS", desc: "全アイテム一覧" },
  { id: "tips", label: "MENS TIPS", desc: "メンズパラジェル ネイルチップ（主力）" },
  { id: "gel", label: "PARAGEL", desc: "自爪補強ベース＆完全マットトップ" },
  { id: "color", label: "COLOR & MAGNET", desc: "モノトーン＆スモーキーマグネット" },
  { id: "care", label: "NAIL CARE", desc: "メンズ専用ネイルオイル＆ヤスリ" },
  { id: "kit", label: "STARTER KIT", desc: "メンズ身だしなみコンプリートキット" }
];

export const MENS_SHOP_PRODUCTS: MensShopProduct[] = [
  {
    id: "mens-tip-matte-black",
    itemCode: "M-TIP-001",
    name: "メンズ パラジェル ネイルチップ 【漆黒マットブラック × チタンスクエア】",
    subtitle: "男性の爪幅・カーブに完全フィット。休日やイベントで魅せるモードな指先",
    category: "tips",
    categoryLabel: "メンズネイルチップ",
    price: 6800,
    priceFormatted: "¥6,800",
    rating: 4.9,
    reviewCount: 32,
    image: "/images/brand_logo_homme.svg",
    isHeroProduct: true,
    isBestSeller: true,
    tag: "メンズ人気No.1",
    volumeOrSpec: "10枚セット（メンズ専用ワイドサイズ展開） / 強力粘着グミシール2回分・ウッドスティック付",
    description: "男性の平らで幅広な爪に自然にフィットするメンズ専用Cカーブ設計。光沢を抑えた重厚なマットブラックに、チタンシルバーの極細ラインを施したスタイリッシュなデザインです。",
    features: [
      "自爪を削らないパラジェルベース処方で自爪を傷めない",
      "男性の指先に馴染むフラットスクエアシェイプ",
      "水仕事や手洗いでも剥がれにくい高密着グミシール付属",
      "お湯で簡単に外せるため休日だけの装着にも最適"
    ],
    usage: "付属の測定チップでサイズを確認後、自爪の油分を拭き取り、付属グミで貼り付けるだけで完成します。"
  },
  {
    id: "mens-tip-natural-skin",
    itemCode: "M-TIP-002",
    name: "メンズ パラジェル ネイルチップ 【自爪風ナチュラルスキン × ノーグロス】",
    subtitle: "会社でもバレない極限の自然さ。清潔感と自爪保護を両立する万能チップ",
    category: "tips",
    categoryLabel: "メンズネイルチップ",
    price: 6200,
    priceFormatted: "¥6,200",
    rating: 5.0,
    reviewCount: 45,
    image: "/images/brand_logo_homme.svg",
    isHeroProduct: true,
    tag: "ビジネス・清潔感重視",
    volumeOrSpec: "10枚セット / 強力粘着グミシール2回分付属",
    description: "自爪本来の健康的な血色感を忠実に再現したスキンカラーチップ。完全ツヤ消し仕上げのため、誰が見ても『手入れが行き届いた清潔な自爪』にしか見えません。商談やプレゼン前に。",
    features: [
      "至近距離でも塗っていることが分からない特殊マット質感",
      "深爪や凹凸のある爪も美しくフラットにカバー",
      "何度でも繰り返し使える高耐久アクリルベース"
    ],
    usage: "大事な打ち合わせや出張の前に貼るだけで、即座に清潔感のある手元が手に入ります。"
  },
  {
    id: "mens-tip-charcoal-magnet",
    itemCode: "M-TIP-003",
    name: "メンズ パラジェル ネイルチップ 【ダークチャコール × スモーキーマグネット】",
    subtitle: "微粒子のシルバーパウダーが光の角度で鋭く光る洗練デザイン",
    category: "tips",
    categoryLabel: "メンズネイルチップ",
    price: 7200,
    priceFormatted: "¥7,200",
    rating: 4.8,
    reviewCount: 21,
    image: "/images/brand_logo_homme.svg",
    isHeroProduct: true,
    tag: "モード・クリエイター向け",
    volumeOrSpec: "10枚セット / 強力粘着グミシール2回分付属",
    description: "深みのあるチャコールグレーに、超微粒子のシルバーマグネットパウダーを流し込んだ現代的な光彩アート。無骨さと艶っぽさが同居する、男性のためのマグネットネイルです。",
    features: [
      "男性ネイリストが1点ずつ手作業で磁石を操り光筋を形成",
      "シルバーアクセサリーや時計（ステンレス・チタン）と相性抜群",
      "自爪に負担をかけないノンサンディング仕様"
    ],
    usage: "専用グミシールで貼り付けるだけで、サロン施術そのままのマグネットアートが完成します。"
  },
  {
    id: "mens-gel-ex-clear",
    itemCode: "M-CLR-001",
    name: "パラジェル HOMME EXクリアベース 4g",
    subtitle: "自爪を一切削らない！爪が薄い・割れやすい男性のための高密着補強ベース",
    category: "gel",
    categoryLabel: "メンズパラジェル",
    price: 4950,
    priceFormatted: "¥4,950",
    rating: 4.9,
    reviewCount: 38,
    image: "/images/brand_logo_homme.svg",
    isBestSeller: true,
    tag: "自爪補強・割れ爪防止",
    volumeOrSpec: "容量: 4g / LED硬化30秒",
    description: "自爪を一切削らず、爪表面のケラチンプレートに密着するプロ用パラジェルベース。PC作業やスポーツ、重い荷物を持つ男性の爪を割れや欠けから強固に守ります。",
    features: [
      "削らないから爪が薄くならず、むしろ強く育つ",
      "皮脂や油分の多い男性の手肌でも驚異的な持続力",
      "LEDライト30秒で完全硬化"
    ],
    usage: "プレパレーション後、薄く塗りLEDライトで30秒硬化させます。"
  },
  {
    id: "mens-cot-matte-top",
    itemCode: "M-COT-001",
    name: "パラジェル HOMME 完全マットトップコーティング 7ml",
    subtitle: "塗るだけで完全ツヤ消し！テカリゼロのナチュラル自爪質感へ",
    category: "gel",
    categoryLabel: "メンズパラジェル",
    price: 3630,
    priceFormatted: "¥3,630",
    rating: 4.9,
    reviewCount: 52,
    image: "/images/brand_logo_homme.svg",
    isBestSeller: true,
    tag: "ツヤ消し・ボトルタイプ",
    volumeOrSpec: "容量: 7ml（ハケ付きボトル） / LED硬化30秒",
    description: "ジェルの光沢を100%消し去り、さらっとした素爪のような質感に仕上げる特殊マットトップ。ハケ付きボトルタイプで筆の手入れも不要です。",
    features: [
      "ビジネスシーンでも全く違和感のないリアルな自爪仕上げ",
      "皮脂や汚れが付きにくいアンチステインコート",
      "拭き取り不要のノンワイプ仕様"
    ],
    usage: "ベースやカラーの上からハケで均一に塗り、LEDライトで30秒硬化するだけです。"
  },
  {
    id: "mens-col-obsidian-magnet",
    itemCode: "M-COL-001",
    name: "メンズ 水光マグネットジェル 【MG-H01 オブシディアンブラック】",
    subtitle: "黒曜石の如き深い漆黒にシルバーの閃光が走るメンズ専用マグネット",
    category: "color",
    categoryLabel: "メンズカラー",
    price: 3850,
    priceFormatted: "¥3,850",
    rating: 4.8,
    reviewCount: 19,
    image: "/images/brand_logo_homme.svg",
    tag: "漆黒マグネット",
    volumeOrSpec: "容量: 4g / 専用磁石対応",
    description: "男性の肌色を引き締めて魅せる、濃厚な漆黒ベースのマグネットジェル。付属の磁石をかざすだけで、光の筋がシルバーに輝く立体的な手元に仕上がります。",
    features: [
      "男性の短い爪（ショートネイル）に映えるシャープな発色",
      "微粒子パウダー採用で滑らかな仕上がり",
      "マットトップと組み合わせることでスモーキーな質感に変化"
    ],
    usage: "ベース硬化後、本品を塗り、磁石を当てて光を集めてからLED30秒硬化します。"
  },
  {
    id: "mens-oil-cedarwood",
    itemCode: "M-OIL-001",
    name: "メンズ オーガニック ネイル＆ハンドオイル 10ml",
    subtitle: "ベタつかない速乾処方。シダーウッド＆シトラスの上質な香り",
    category: "care",
    categoryLabel: "メンズケア",
    price: 2750,
    priceFormatted: "¥2,750",
    rating: 5.0,
    reviewCount: 64,
    image: "/images/brand_logo_homme.svg",
    isBestSeller: true,
    tag: "ベタつかない速乾性",
    volumeOrSpec: "容量: 10ml（ロールオン容器） / 100%植物由来成分",
    description: "「オイルを塗るとスマホやPCキーボードがベタつく」という男性の悩みを解消した、超微粒子浸透オイル。ささくれや乾燥を防ぎ、清潔感のある爪先を維持します。",
    features: [
      "塗って10秒でサラサラに馴染む速乾ドライ処方",
      "持ち運びに便利なポケットサイズのロールオンボトル",
      "女性にも好印象を与える洗練されたシダーウッドの香り"
    ],
    usage: "爪の生え際や甘皮部分にロールを軽く転がし、指先で優しく揉み込んで馴染ませます。"
  },
  {
    id: "mens-kit-complete-starter",
    itemCode: "M-KIT-001",
    name: "メンズ パラジェル身だしなみ コンプリートスターターキット",
    subtitle: "削らないベース・マットトップ・36W LEDライト・ケア用品一式",
    category: "kit",
    categoryLabel: "メンズキット",
    price: 19800,
    priceFormatted: "¥19,800",
    rating: 4.9,
    reviewCount: 42,
    image: "/images/brand_logo_homme.svg",
    isHeroProduct: true,
    isBestSeller: true,
    tag: "フルセット ★ 単品より¥5,000お得",
    volumeOrSpec: "EXベース、マットトップ、メンズLEDライト、ネイルファイル、オイル、初心者用解説マニュアル",
    description: "自宅で自爪補強・清潔感ケアを始めたい男性のためのオールインワンキット。男性ネイリストが書き下ろした『誰でもバレずにできる自爪風ネイル解説書』付きです。",
    features: [
      "必要なツールが全て揃った届いてすぐ使えるセット",
      "完全マット仕上げでビジネスマンも安心",
      "割れ爪・二枚爪のストレスから永久に解放"
    ],
    usage: "付属のステップアップマニュアルに沿って、ケアからベース・マット仕上げまで簡単に行えます。"
  }
];

export const MENS_GIFT_WRAPPING_OPTIONS = [
  {
    id: "none",
    name: "ラッピングなし（通常エコ包装）",
    price: 0,
    priceFormatted: "¥0",
    desc: "緩衝材付きのシックなブラック外箱（ヤマト宅急便）にて丁寧にお届けします。",
    recommendedFor: "ご自身用"
  },
  {
    id: "ribbon",
    name: "HOMME 特製ブラック＆シルバーリボン包装",
    price: 330,
    priceFormatted: "+¥330",
    desc: "マットブラックの包み紙にスチールシルバーのサテンリボンを掛けます。",
    recommendedFor: "友人や同僚へのプレゼントに"
  },
  {
    id: "box",
    name: "プレミアムマットブラックBOX ＆ ショッパー付",
    price: 550,
    priceFormatted: "+¥550",
    desc: "重厚なハードギフトBOXにシルバー箔押しロゴをあしらい、専用手提げ袋を同封します。",
    recommendedFor: "誕生日・バレンタイン・特別なギフトに"
  }
];

export const MENS_MESSAGE_CARD_THEMES = [
  {
    id: "for_you",
    name: "For You",
    badge: "贈り物・記念日",
    sampleMessage: "日頃の感謝を込めて。清潔感と自信を宿す特別なケアをあなたへ。"
  },
  {
    id: "birthday",
    name: "Happy Birthday",
    badge: "誕生日お祝い",
    sampleMessage: "お誕生日おめでとうございます！さらに洗練された素敵な1年になりますように。"
  },
  {
    id: "thank_you",
    name: "Thank You",
    badge: "感謝・お礼",
    sampleMessage: "いつも本当にありがとうございます。お疲れ様の手元を労ってください。"
  },
  {
    id: "blank",
    name: "手書き用ブラックカード",
    badge: "自筆用（無地）",
    sampleMessage: "（ご自身で手書きメッセージをご記入いただける専用カードを同封します）"
  }
];
