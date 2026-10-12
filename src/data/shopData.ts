// src/data/shopData.ts

export type ShopCategory =
  | "all"
  | "tips" // ネイルチップ（主力）
  | "clear" // クリアジェル（ベース・トップ）
  | "color" // カラージェル（マグネット・ナチュラル）
  | "coating" // コーティングジェル
  | "light" // パラジェル用LEDライト
  | "kit" // ネイルキット
  | "polish"; // パラポリッシュ

export interface ShopProduct {
  id: string;
  itemCode: string; // 商品コード（例: TIP-001, CLR-001）
  name: string;
  subtitle: string;
  category: ShopCategory;
  categoryLabel: string;
  price: number;
  priceFormatted: string;
  rating: number;
  reviewCount: number;
  image: string;
  isHeroProduct?: boolean; // 主力商品フラグ
  isNew?: boolean;
  isBestSeller?: boolean;
  tag: string;
  volumeOrSpec: string;
  description: string;
  features: string[];
  usage: string;
}

// ギフトラッピング＆メッセージカードのオプション定義
export interface GiftWrappingOption {
  id: "none" | "ribbon" | "box";
  name: string;
  price: number;
  priceFormatted: string;
  desc: string;
  recommendedFor: string;
}

export interface MessageCardTheme {
  id: "for_you" | "birthday" | "thank_you" | "blank";
  name: string;
  badge: string;
  sampleMessage: string;
}

export const GIFT_WRAPPING_OPTIONS: GiftWrappingOption[] = [
  {
    id: "none",
    name: "ラッピングなし（通常エコ包装）",
    price: 0,
    priceFormatted: "¥0",
    desc: "緩衝材で保護した通常段ボール（ヤマト宅急便）にて丁寧にお届けします。",
    recommendedFor: "ご自宅用"
  },
  {
    id: "ribbon",
    name: "サロン特製オーガンジーリボン包装",
    price: 330,
    priceFormatted: "+¥330",
    desc: "サロンカラーの上品な透け感ラベンダーリボン＆サロンロゴタグでお包みします。",
    recommendedFor: "プチギフト・お礼に"
  },
  {
    id: "box",
    name: "プレミアムゴールドギフトBOX ＆ ショッパー付",
    price: 550,
    priceFormatted: "+¥550",
    desc: "シャンパンゴールド箔押しBOXにリボンを掛け、お渡し用のサロン専用ショッパー（手提げ紙袋）を同封します。",
    recommendedFor: "誕生日・記念日・本命ギフトに"
  }
];

export const MESSAGE_CARD_THEMES: MessageCardTheme[] = [
  {
    id: "for_you",
    name: "Special For You",
    badge: "記念日・贈り物",
    sampleMessage: "いつも素敵なあなたへ。心ときめく指先の輝きをお届けします。"
  },
  {
    id: "birthday",
    name: "Happy Birthday",
    badge: "お誕生日お祝い",
    sampleMessage: "お誕生日おめでとうございます！笑顔あふれる素晴らしい1年になりますように。"
  },
  {
    id: "thank_you",
    name: "Thank You",
    badge: "感謝・お礼",
    sampleMessage: "いつも本当にありがとうございます。日頃の感謝の気持ちを込めて贈ります。"
  },
  {
    id: "blank",
    name: "手書き用ブランクカード",
    badge: "自筆用（無地）",
    sampleMessage: "（ご自身で手書きメッセージをご記入いただける専用カードを同封します）"
  }
];

// 公式オンラインショップ利用規約・配送・決済ポリシー
export const SHOP_POLICY = {
  freeShippingThreshold: 20000, // 20,000円以上のご購入で送料無料
  shippingCarrier: "ヤマト運輸 宅急便（※宅急便にてのみ配送可能）",
  paymentMethods: [
    { id: "credit", name: "クレジットカード", desc: "VISA / Mastercard / JCB / AMEX / Diners（即時決済）" },
    { id: "bank", name: "銀行振込", desc: "三井住友銀行 / ご入金確認後の出荷（振込手数料お客様ご負担）" },
    { id: "cod", name: "代金引換", desc: "ヤマト運輸 宅急便コレクト（代引手数料 一律330円税込）" },
    { id: "convenience", name: "コンビニ決済", desc: "セブン-イレブン / ローソン / ファミリーマート等" }
  ],
  shippingSchedule: "日曜・祝日は商品出荷を行っておりません（平日・土曜のみ出荷対応）",
  staffOperationNotice: "サロン在籍スタッフ（12名／毎日2〜3名シフト勤務）が、サロンワークの合間にご注文商品の検品・梱包・出荷を一貫して担当しております。",
  giftOptionNotice: "ギフトラッピング（リボン包装・特製ゴールドBOX）およびメッセージカード（無料代筆印字）に対応。金額非表示のギフト配送も承ります。"
};

export const SHOP_CATEGORIES: { id: ShopCategory; label: string; desc: string }[] = [
  { id: "all", label: "ALL ITEMS", desc: "全商品一覧" },
  { id: "tips", label: "NAIL TIPS", desc: "パラジェル ネイルチップ（主力商品）" },
  { id: "clear", label: "CLEAR GEL", desc: "ベースジェル・トップジェル" },
  { id: "color", label: "COLOR GEL", desc: "マグネット・ナチュラルカラー" },
  { id: "coating", label: "COATING GEL", desc: "ノンワイプ・コーティング" },
  { id: "light", label: "LED LIGHT", desc: "パラジェル専用LEDライト" },
  { id: "kit", label: "NAIL KITS", desc: "スターターキット・限定セット" },
  { id: "polish", label: "PARAPOLISH", desc: "時短パラポリッシュ" },
];

export const SHOP_PRODUCTS: ShopProduct[] = [
  // ==========================================
  // 1. ネイルチップ（主力商品・サイズオーダー＆パラジェル仕様）
  // ==========================================
  {
    id: "tip-waterglow-lavender",
    itemCode: "TIP-001",
    name: "パラジェル ネイルチップ 【透き通る水光ラベンダー × ゴールド】",
    subtitle: "自爪を傷めないプロ仕様。サイズオーダー・粘着グミ＆測定用チップ付属",
    category: "tips",
    categoryLabel: "ネイルチップ（主力）",
    price: 6800,
    priceFormatted: "¥6,800",
    rating: 4.9,
    reviewCount: 38,
    image: "/images/hero.jpg",
    isHeroProduct: true,
    isBestSeller: true,
    tag: "主力おすすめ ★ No.1",
    volumeOrSpec: "10枚セット（サイズオーダー） / 粘着グミ2回分・ファイル・ウッドスティック付",
    description: "サロンで最も人気の「透き通る水光ラベンダー」と繊細なシャンパンゴールドミラーを、ご自宅で何度でも繰り返し使える高級ネイルチップに仕立てました。ベースに自爪を削らないパラジェル処方を採用し、チップ自体にも柔らかなフィット感を持たせています。",
    features: [
      "サロン専属トップネイリストによる完全ハンドメイド制作",
      "プロ用パラジェルベース＆高持続トップ仕上げで抜群の艶感",
      "無料のサイズ測定用チップが事前に届くためサイズ間違いなし",
      "専用グミシールで1日中外れず、お湯で簡単にオフ可能"
    ],
    usage: "付属の測定チップでご自身の爪番号を選び、オーダー後に届いたチップを付属の高密着グミシールで自爪に貼るだけで完成します。"
  },
  {
    id: "tip-nude-french",
    itemCode: "TIP-002",
    name: "パラジェル ネイルチップ 【大人上品ヌードベージュ × スキニーフレンチ】",
    subtitle: "オフィスやブライダルにも映える血色感美爪チップ",
    category: "tips",
    categoryLabel: "ネイルチップ（主力）",
    price: 6200,
    priceFormatted: "¥6,200",
    rating: 4.8,
    reviewCount: 24,
    image: "/images/office_nude_nail.jpg",
    isHeroProduct: true,
    tag: "オフィス・冠婚葬祭対応",
    volumeOrSpec: "10枚セット（サイズオーダー） / 粘着グミ2回分付属",
    description: "自爪の血色感を自然に引き上げるナチュラルスキンカラーに、極細のシャンパンゴールドラインを引いた大人のスキニーフレンチ。仕事で普段ネイルができない方の休日やセレモニー用として大人気です。",
    features: [
      "指先を細く長く魅せる美フォルム・アーモンドシェイプ",
      "黄ばまない高透明度パラジェルトップコーティング",
      "繰り返し30回以上使える高耐久アクリルチップベース"
    ],
    usage: "爪の油分を拭き取った後、密着グミを貼ってチップを根元からゆっくり押し当てて装着します。"
  },
  {
    id: "tip-autumn-nuance",
    itemCode: "TIP-003",
    name: "パラジェル ネイルチップ 【シックボルドー × シェルニュアンス】",
    subtitle: "深みのある天然石風奥行きアートとゴールド箔の煌めき",
    category: "tips",
    categoryLabel: "ネイルチップ（主力）",
    price: 7200,
    priceFormatted: "¥7,200",
    rating: 5.0,
    reviewCount: 19,
    image: "/images/gallery-3.jpg",
    isHeroProduct: true,
    isNew: true,
    tag: "季節限定トレンド",
    volumeOrSpec: "10枚セット（サイズオーダー） / 粘着グミ2回分付属",
    description: "秋冬のファッションを引き立てる深みボルドーに、本真珠パウダーとゴールド箔を閉じ込めたリッチなニュアンスデザイン。手元がパッと華やぐ主役級の存在感です。",
    features: [
      "天然シェルと微粒子ゴールドラメの立体奥行きアート",
      "引っかかりのないフラットなプロ仕上げコーティング",
      "自爪にフィットしやすいCカーブ形状"
    ],
    usage: "特別なイベントやディナーのお出かけ前に、5分でサロン級のネイルが完成します。"
  },

  // ==========================================
  // 2. クリアジェル（ベース・トップ）
  // ==========================================
  {
    id: "gel-clear-ex",
    itemCode: "CLR-001",
    name: "パラジェル EX クリアジェル 4g",
    subtitle: "自爪を一切削らないノンサンディング密着ベースジェル",
    category: "clear",
    categoryLabel: "ベースジェル",
    price: 4950,
    priceFormatted: "¥4,950",
    rating: 4.9,
    reviewCount: 52,
    image: "/images/gallery-1.jpg",
    isBestSeller: true,
    tag: "プロ認定サロン専売",
    volumeOrSpec: "容量: 4g（約30回分） / LED波長: 405nm（硬化30秒）",
    description: "パラジェルの代名詞。サンディング（自爪削り）が一切不要で、爪の最高層にあるケラチンプレートに優しく吸着密着。自爪を薄くせず、薄くなった爪も健康に伸ばしながらジェルを楽しめます。",
    features: [
      "自爪への削り・プライマー塗布が一切不要",
      "水仕事や油分に強い独自の高吸着フォーミュラ",
      "サロンクオリティの3〜4週間持続"
    ],
    usage: "プレパレーション後、爪表面の油分を拭き取り、薄く均一に塗布してLEDライトで30秒硬化させます。"
  },
  {
    id: "gel-top-clear",
    itemCode: "CLR-002",
    name: "パラジェル トップジェル 4g",
    subtitle: "濡れたような極上の艶が3〜4週間続く最高峰トップジェル",
    category: "clear",
    categoryLabel: "トップジェル",
    price: 4950,
    priceFormatted: "¥4,950",
    rating: 4.9,
    reviewCount: 41,
    image: "/images/gallery-2.jpg",
    tag: "高透明・黄ばみ防止",
    volumeOrSpec: "容量: 4g（約30回分） / LED波長: 405nm（硬化30秒）",
    description: "一切黄ばまないクリスタルのような高い透明度と、ガラスのようなうるツヤ感を誇るパラジェル専用トップジェル。適度な粘度でセルフレベリングし、なめらかなハイポイントを形成できます。",
    features: [
      "施術後約1ヶ月間、サロン帰りの濡れ艶が褪せない",
      "日光や紫外線による黄変を徹底ブロックするUVフィルター配合",
      "拭き取り用パラクリーナーでピカピカに仕上がる"
    ],
    usage: "カラー塗布後、全体を包み込むように塗布しLEDで30秒硬化。パラクリーナーで未硬化ジェルを拭き取ります。"
  },

  // ==========================================
  // 3. カラージェル（マグネット・ナチュラル）
  // ==========================================
  {
    id: "gel-magnet-waterglow",
    itemCode: "COL-001",
    name: "パラジェル 水光マグネットジェル 【MG01 オーロララベンダー】",
    subtitle: "微粒子パウダーが水面のように揺らめくサロンシグネチャーカラー",
    category: "color",
    categoryLabel: "マグネットカラー",
    price: 3850,
    priceFormatted: "¥3,850",
    rating: 5.0,
    reviewCount: 67,
    image: "/images/hero.jpg",
    isBestSeller: true,
    tag: "サロン人気 No.1 カラー",
    volumeOrSpec: "容量: 4g / マグネットスティック対応",
    description: "Salon de Fraise 表参道で一番選ばれている、透き通る水光ラベンダーのマグネットジェル。超微粒子のマグネットパウダーが磁石に素早く反応し、ちゅるんと奥行きのある光彩を作れます。",
    features: [
      "微粒子仕様でザラつきのないシルキーなグラデーション",
      "磁石を近づけるだけで光の筋が自由自在にコントロール可能",
      "肌馴染みの良いペールラベンダートーン"
    ],
    usage: "ベース硬化後、本品を塗布し、硬化前に専用マグネットスティックを当てて光を集めた後、LED30秒硬化します。"
  },
  {
    id: "gel-color-natural-pink",
    itemCode: "COL-002",
    name: "パラジェル ナチュラルシアーカラー 【NC03 ベールピンク】",
    subtitle: "オフィスでも愛される自然な血色感とちゅるん感",
    category: "color",
    categoryLabel: "ナチュラルカラー",
    price: 3520,
    priceFormatted: "¥3,520",
    rating: 4.8,
    reviewCount: 31,
    image: "/images/spring.jpg",
    tag: "美爪・血色感カラー",
    volumeOrSpec: "容量: 4g / LED硬化30秒",
    description: "爪先のフリーエッジを程よくカバーしつつ、自爪そのものが美しく健康的に見える透け感ピンクベージュ。手肌のトーンをワントーン明るく見せてくれます。",
    features: [
      "ムラになりにくい滑らかなセルフレベリング処方",
      "1度塗りで素爪風、2度塗りで清楚な美爪仕上がり"
    ],
    usage: "ベース硬化後に薄く塗布してLED30秒硬化。お好みの発色に合わせて2度塗りしてください。"
  },

  // ==========================================
  // 4. コーティングジェル
  // ==========================================
  {
    id: "gel-coating-nonwipe",
    itemCode: "COT-001",
    name: "パラジェル ノンワイプ トップコーティング 7ml",
    subtitle: "拭き取り不要！ボトルタイプで手軽に極上ガラスコーティング",
    category: "coating",
    categoryLabel: "コーティングジェル",
    price: 3630,
    priceFormatted: "¥3,630",
    rating: 4.7,
    reviewCount: 29,
    image: "/images/gallery-1.jpg",
    tag: "拭き取り不要・時短",
    volumeOrSpec: "容量: 7ml（ハケ付きボトル） / LED硬化30秒",
    description: "硬化後の未硬化ジェル拭き取りが不要なノンワイプタイプ。ハケ付きボトルなので筆を用意する必要がなく、チップのコーティングやセルフネイルの仕上げに最適です。",
    features: [
      "未硬化ジェルが出ない完全硬化ノンワイプ処方",
      "擦れや傷に強いハードな防汚コーティング膜を形成",
      "ネイルパーツの隙間埋めや固定にも便利"
    ],
    usage: "アートやカラーの仕上げにハケで均一に塗り、LEDライトで30〜45秒完全硬化させます。"
  },

  // ==========================================
  // 5. LEDライト（パラジェル専用）
  // ==========================================
  {
    id: "light-led-paragel",
    itemCode: "LGT-001",
    name: "パラジェル専用 プロフェッショナル LEDライト 36W",
    subtitle: "波長405nm・硬化熱軽減ローヒートモード搭載",
    category: "light",
    categoryLabel: "パラジェル用LEDライト",
    price: 18700,
    priceFormatted: "¥18,700",
    rating: 4.9,
    reviewCount: 45,
    image: "/images/interior.jpg",
    isBestSeller: true,
    tag: "プロ用認定マシン",
    volumeOrSpec: "出力: 36W（LED波長405nm±5nm） / 底板マグネット着脱式（フット対応） / タイマー: 10/30/60/90秒",
    description: "パラジェルの硬化特性に完全最適化されたサロン仕様のハイパワーLEDライト。独自の硬化熱軽減モード（ローヒート機能）を搭載し、熱さを感じやすいベースジェルも快適に硬化できます。",
    features: [
      "パラジェルが最短30秒で完全硬化する高精度LED素子",
      "爪が薄い方でも熱くならない段階的出力アップ機能",
      "底板が簡単に外れるためフットネイルにもそのまま使用可能",
      "手を差し込むだけで自動点灯するスマート赤外線センサー"
    ],
    usage: "ACアダプターを接続し、手を入れると自動感知で点灯します。タイマーボタンでお好みの硬化時間（10/30/60秒）を設定できます。"
  },

  // ==========================================
  // 6. ネイルキット（スターター・限定セット）
  // ==========================================
  {
    id: "kit-paragel-starter",
    itemCode: "KIT-001",
    name: "パラジェル オールインワン スターターフルキット",
    subtitle: "削らないベース・トップ・36W LEDライト・ケア用品が全て揃う",
    category: "kit",
    categoryLabel: "スターターキット",
    price: 24800,
    priceFormatted: "¥24,800",
    rating: 5.0,
    reviewCount: 83,
    image: "/images/hero.jpg",
    isHeroProduct: true,
    isBestSeller: true,
    tag: "お得なセット ★ ¥6,000お得",
    volumeOrSpec: "EXベース4g、トップ4g、LEDライト36W、パラクリーナー、パラリムーバー、ファイル2種、キューティクルオイル一式",
    description: "これからパラジェルを始めたい方に最適な、サロン公認のコンプリートキット。削らない施術に必要なすべてのアイテムと、わかりやすい初心者向けステップアップ解説書が付属します。",
    features: [
      "単品購入より約¥6,000お得なスターター特別価格",
      "サロンの現役ネイリストが監修した詳しい公式ガイドブック付き",
      "届いたその日からすぐに自宅でサロン品質のネイルが可能"
    ],
    usage: "付属のガイドブックの手順に沿って、プレパレーションからベース、トップの拭き取りまで行えます。"
  },
  {
    id: "kit-magnet-glow",
    itemCode: "KIT-002",
    name: "水光マグネット体験キット 【ジェル2色 ＆ 専用ダブルヘッド磁石付】",
    subtitle: "ちゅるんとした光彩アートを自宅で完全再現できるスペシャルセット",
    category: "kit",
    categoryLabel: "アートキット",
    price: 8800,
    priceFormatted: "¥8,800",
    rating: 4.8,
    reviewCount: 27,
    image: "/images/gallery-3.jpg",
    tag: "サロン限定セット",
    volumeOrSpec: "マグネットジェル2色（ラベンダー、シャンパンゴールド）、専用強力マグネットスティック1本",
    description: "サロンで大人気の水光マグネットアートをセルフで楽しめる限定キット。強力なネオジム磁石スティック（丸型・角型ダブルエンド）が付属し、フレンチ型やグラデーション型の光彩を自在に演出できます。",
    features: [
      "プロネイリストが厳選した一番人気の2色セット",
      "サロン級の強力ダブルヘッドマグネット付き",
      "パラジェルベースの上に重ねるだけで簡単プロ仕上げ"
    ],
    usage: "ベース塗布後、ジェルを塗り、付属の磁石を約5秒かざして光を集めたあとLEDで硬化します。"
  },

  // ==========================================
  // 7. パラポリッシュ (parapolish)
  // ==========================================
  {
    id: "polish-parapolish-gel",
    itemCode: "POL-001",
    name: "パラポリッシュ カラージェル 7ml 【PL01 シルキーモーブ】",
    subtitle: "サンディング不要・ハケ付きボトルで15分時短完成",
    category: "polish",
    categoryLabel: "パラポリッシュ",
    price: 2970,
    priceFormatted: "¥2,970",
    rating: 4.7,
    reviewCount: 36,
    image: "/images/spring.jpg",
    tag: "時短・マニキュア感覚",
    volumeOrSpec: "容量: 7ml / ハケ付きボトルタイプ / LED硬化30秒",
    description: "マニキュアのようにハケでさっと塗れて、LEDライト30秒でカチッと乾く「パラポリッシュ」。もちろん自爪サンディング不要で、忙しい朝やオフしたい日も手軽に使える次世代ジェルです。",
    features: [
      "筆のお手入れ不要！ハケ付きボトルで初心者でも簡単",
      "自爪を削らず傷めないパラジェル品質を継承",
      "約2〜3週間の美しい発色と持ちを実現"
    ],
    usage: "油分除去後、ハケで自爪に直接塗り、LEDライトで30秒硬化するだけで美しく仕上がります。"
  },
  {
    id: "polish-top-shine",
    itemCode: "POL-002",
    name: "パラポリッシュ シャイントップ 7ml",
    subtitle: "パラポリッシュ専用の超光沢トップコート",
    category: "polish",
    categoryLabel: "パラポリッシュ",
    price: 2970,
    priceFormatted: "¥2,970",
    rating: 4.8,
    reviewCount: 22,
    image: "/images/gallery-2.jpg",
    tag: "ポリッシュ用トップ",
    volumeOrSpec: "容量: 7ml / ハケ付きボトルタイプ / LED硬化30秒",
    description: "パラポリッシュカラーの持ちとツヤをさらに高める専用トップコート。さっとひと塗りで凹凸を包み込み、瑞々しいガラスのような光沢をキープします。",
    features: [
      "パラポリッシュと抜群の密着相性",
      "傷がつきにくい高硬度プロテクト被膜",
      "オフもスピーディーで爪に優しい"
    ],
    usage: "カラー硬化後、爪全体に均一に塗布してLEDで30秒硬化し、パラクリーナーで軽く拭き取ります。"
  }
];
