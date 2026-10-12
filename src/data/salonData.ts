// src/data/salonData.ts

export interface NailDesign {
  id: string;
  title: string;
  category: "all" | "office" | "simple" | "glam" | "magnet" | "foot";
  categoryLabel: string;
  image: string;
  description: string;
  price: string;
  priceValue: number; // 数値価格（絞り込み用）
  duration: string;
  durationMinutes: number; // 所要時間（分）
  colorTone: "lavender" | "pink" | "beige" | "gold" | "white" | "multi"; // カラー系統
  colorChangeable: boolean; // 色変更の可否
  paragelIncluded: boolean; // パラジェルベース込み
  tags: string[];
  features?: string[];
}

export interface Staff {
  id: string;
  name: string;
  kana: string;
  role: string;
  experience: string;
  image: string;
  specialty: string[];
  message: string;
  favoriteStyle?: string;
  signatureDesignId: string;
  signatureDesignTitle: string;
}

export interface MenuItem {
  category: string;
  items: {
    name: string;
    description: string;
    price: string;
    time: string;
    recommended?: boolean;
    paragel: boolean;
  }[];
}

export interface FaqItem {
  q: string;
  a: string;
  category: "paragel" | "magnet" | "service" | "access";
}

export const SALON_INFO = {
  name: "Salon de Fraise",
  japaneseName: "サロンドフレーズ",
  concept: "自爪を削らず、素爪から美しく。白・ラベンダー・シャンパンゴールドの煌めきを纏う、大人のパラジェル＆水光マグネット専門サロン",
  hours: "10:00 - 20:00",
  holiday: "不定休（年末年始を除き、GW・お盆休み・シルバーウィークなどの長期休暇も休まず営業）",
  phone: "03-6800-0000（デモ用番号）",
  address: "東京都渋谷区神宮前4丁目12-10 メゾン・ド・フレーズ 2F（※デモ用架空住所）",
  access: "各線「表参道駅」A2出口より徒歩4分 / 「明治神宮前駅」より徒歩5分",
  seats: {
    hand: 2,
    foot: 2,
    details: "ハンド2席・フット2席（全席リクライニング仕様・全4席のプライベート空間）"
  },
  parking: "お客様専用駐車場 3台完備（無料・お車でのご来店歓迎）",
  features: [
    "パラジェル登録・認定サロン（自爪を削らないノンサンディング）",
    "丁寧なウォーターケア＆美爪フィルイン技術（3〜4週間持続）",
    "50種類以上の洗練マグネットカラー（水光マグネット・強光マグネット完備）",
    "白・ラベンダー・ゴールドが織りなす上質な大人可愛いデザイン",
    "ペット同伴・お子様同伴歓迎（ベビーカー横付けOK）",
    "選べる6種類のこだわり無料カフェドリンクサービス",
    "お客様専用駐車場3台完備",
    "大型連休（GW・お盆・SW）も休まず営業"
  ],
  payments: "クレジットカード（VISA/Master/JCB/Amex/Diners）、デビット、PayPay、交通系IC、現金",
  drinks: [
    { name: "ホットコーヒー", en: "Hot Coffee", desc: "挽きたて深煎りの芳醇なアロマ" },
    { name: "アイスコーヒー", en: "Iced Coffee", desc: "すっきり澄んだクリアな苦味" },
    { name: "ホットティー", en: "Hot Tea", desc: "甘い香りの厳選ダージリン" },
    { name: "アイスティー", en: "Iced Tea", desc: "爽やかなベルガモットアールグレイ" },
    { name: "静岡県産 緑茶", en: "Japanese Green Tea", desc: "茶葉の甘みと上品な旨味" },
    { name: "香ばし烏龍茶", en: "Oolong Tea", desc: "口内をさっぱり整える香ばしさ" },
    { name: "深煎りほうじ茶", en: "Hojicha", desc: "心までリラックスできる温もり" },
    { name: "特製カフェラテ", en: "Café Latte", desc: "濃厚スチームミルクとエスプレッソ" }
  ],
  links: {
    hotpepper: "https://beauty.hotpepper.jp",
    hotpepperWork: "https://work.beauty.hotpepper.jp",
    indeed: "https://jp.indeed.com",
    memberPortal: "/mypage",
    phone: "tel:0368000000"
  },
  nominationFee: "550円（税込）"
};

export const STAFFS: Staff[] = [
  {
    id: "ikeda",
    name: "池田",
    kana: "Haruka Ikeda",
    role: "店長 / パラジェルエデュケーター",
    experience: "歴9年",
    image: "/images/hero.jpg",
    specialty: ["パラジェルフィルイン", "大人ニュアンス", "ラベンダー×ゴールド", "美爪育成ケア"],
    message: "自爪を傷めずに3〜4週間持続させるフィルイン技術と、奥行き感のある大人可愛いニュアンスアートが得意です。",
    favoriteStyle: "大人ニュアンス＆水光マグネット",
    signatureDesignId: "glam-gold-mirror",
    signatureDesignTitle: "ホワイトパール＆ゴールドミラーライン"
  },
  {
    id: "takahashi",
    name: "高橋",
    kana: "Aoi Takahashi",
    role: "トップネイリスト",
    experience: "歴6年",
    image: "/images/magnet_nail.jpg",
    specialty: ["水光マグネット50色調合", "オフィス微粒子パール", "ワンカラー美フォルム"],
    message: "光の当たり方で表情を変える水光マグネットが得意です。爪の形を最も美しく見せるフォルム作りにこだわっています。",
    favoriteStyle: "ちゅるん水光マグネット",
    signatureDesignId: "magnet-water-glow",
    signatureDesignTitle: "水光ペールラベンダー × シャンパンマグネット"
  },
  {
    id: "mizuno",
    name: "水野",
    kana: "Saki Mizuno",
    role: "ネイリスト",
    experience: "歴4年",
    image: "/images/spring_nail.jpg",
    specialty: ["季節のフラワーアート", "トレンドパーツ配置", "フット角質＆スパケア"],
    message: "春の桜やタンポポ、夏の海、秋のボルドーなど、季節の移ろいを感じられる繊細な手描きアートをご提案します。",
    favoriteStyle: "季節のフラワー＆フットアート",
    signatureDesignId: "glam-spring-sakura",
    signatureDesignTitle: "春風の桜＆タンポポ パステルニュアンス"
  }
];

export const DESIGNS: NailDesign[] = [
  {
    id: "magnet-water-glow",
    title: "水光ペールラベンダー × シャンパンマグネット",
    category: "magnet",
    categoryLabel: "水光マグネット",
    image: "/images/magnet_nail.jpg",
    description: "透き通るペールラベンダーをベースに、微粒子シャンパンゴールドマグネットの光彩を重ねた当店不動の人気No.1デザイン。",
    price: "¥8,800",
    priceValue: 8800,
    duration: "75分",
    durationMinutes: 75,
    colorTone: "lavender",
    colorChangeable: true,
    paragelIncluded: true,
    tags: ["水光マグネット", "ラベンダー", "シャンパンゴールド", "うるツヤ", "50色選択可"],
    features: ["自爪削りなし", "フィルイン対応", "カラー変更無料", "3〜4週持続"]
  },
  {
    id: "office-nude",
    title: "オフィス向け 血色感ヌーディピンクベージュ",
    category: "office",
    categoryLabel: "オフィス向け",
    image: "/images/hero.jpg",
    description: "厳しめの職場でも好印象な肌馴染み抜群のシアーベージュ。丁寧なウォーターケアで甘皮周りを整え、美しいフォルムで仕上げます。",
    price: "¥7,150",
    priceValue: 7150,
    duration: "60分",
    durationMinutes: 60,
    colorTone: "beige",
    colorChangeable: true,
    paragelIncluded: true,
    tags: ["オフィスネイル", "美フォルム", "シンプル", "肌馴染み抜群"],
    features: ["自爪削りなし", "カラー変更無料", "清潔感"]
  },
  {
    id: "simple-sheer-lavender",
    title: "大人シンプル シアーラベンダーワンカラー",
    category: "simple",
    categoryLabel: "シンプル",
    image: "/images/hero.jpg",
    description: "透け感のあるミルキーラベンダーのちゅるんワンカラー。自爪を健康に保ちながら指先をスラリと長く魅せます。",
    price: "¥7,150",
    priceValue: 7150,
    duration: "60分",
    durationMinutes: 60,
    colorTone: "lavender",
    colorChangeable: true,
    paragelIncluded: true,
    tags: ["シンプル派", "透明感", "自爪育成", "ワンカラー"],
    features: ["自爪削りなし", "フィルイン対応", "約200色から選択可"]
  },
  {
    id: "glam-spring-sakura",
    title: "春風の桜＆タンポポ パステルニュアンス",
    category: "glam",
    categoryLabel: "華やかトレンド",
    image: "/images/spring_nail.jpg",
    description: "桜を思わせる柔らかなピンクとタンポポイエローを織り交ぜた、華やかで大人可愛い手描きフラワーニュアンスアート。",
    price: "¥9,350",
    priceValue: 9350,
    duration: "90分",
    durationMinutes: 90,
    colorTone: "pink",
    colorChangeable: true,
    paragelIncluded: true,
    tags: ["春ネイル", "手描きフラワー", "大人可愛い", "ニュアンスアート"],
    features: ["自爪削りなし", "アート込み", "カラー変更無料"]
  },
  {
    id: "glam-gold-mirror",
    title: "ホワイトパール＆ゴールドミラーライン",
    category: "glam",
    categoryLabel: "華やかトレンド",
    image: "/images/hero.jpg",
    description: "上品なパールホワイトにシャンパンゴールドの立体ミラーラインをあしらった、華やかで洗練された大人ジュエリーネイル。",
    price: "¥9,900",
    priceValue: 9900,
    duration: "85分",
    durationMinutes: 85,
    colorTone: "gold",
    colorChangeable: true,
    paragelIncluded: true,
    tags: ["ミラーアート", "パールホワイト", "ゴールド", "ブライダル/お呼ばれ"],
    features: ["自爪削りなし", "パーツコーティング込", "3〜4週持続"]
  },
  {
    id: "magnet-strong-beam",
    title: "強光ゴールドビーム × モーブニュアンス",
    category: "magnet",
    categoryLabel: "水光マグネット",
    image: "/images/magnet_nail.jpg",
    description: "光の筋がシャープに走る強光マグネット。指先を細く長く魅せる指長効果抜群の特殊パウダーを使用。",
    price: "¥9,350",
    priceValue: 9350,
    duration: "80分",
    durationMinutes: 80,
    colorTone: "gold",
    colorChangeable: true,
    paragelIncluded: true,
    tags: ["強光マグネット", "指長効果", "モーブ", "特殊パウダー"],
    features: ["自爪削りなし", "50色以上から選択可"]
  },
  {
    id: "foot-shell-summer",
    title: "親指シェルアート＆天然石サマーフットジェル",
    category: "foot",
    categoryLabel: "フットネイル",
    image: "/images/spring_nail.jpg",
    description: "親指に上質な天然シェルと金箔を埋め込んだフットネイル。全席リクライニングチェアでフットバス＆甘皮ケア付き。",
    price: "¥8,800",
    priceValue: 8800,
    duration: "75分",
    durationMinutes: 75,
    colorTone: "white",
    colorChangeable: true,
    paragelIncluded: true,
    tags: ["フットネイル", "シェル", "フットバス付", "リクライニング席"],
    features: ["フット専用席", "角質ケア対応可", "カラー変更無料"]
  },
  {
    id: "simple-french-gold",
    title: "極細シャンパンゴールドのスキニーフレンチ",
    category: "simple",
    categoryLabel: "シンプル",
    image: "/images/hero.jpg",
    description: "シアーなベースに爪先だけ繊細なゴールドラインを引いた大人のスキニーフレンチ。オフィスやお出かけにも万能。",
    price: "¥7,700",
    priceValue: 7700,
    duration: "70分",
    durationMinutes: 70,
    colorTone: "gold",
    colorChangeable: true,
    paragelIncluded: true,
    tags: ["スキニーフレンチ", "美爪", "シンプル", "オフィスOK"],
    features: ["自爪削りなし", "ベースカラー変更無料"]
  }
];

export const MENU_CATEGORIES: MenuItem[] = [
  {
    category: "パラジェル・ハンドメニュー",
    items: [
      {
        name: "【自爪育成】パラジェル・美爪ケア＋クリア",
        description: "自爪を削らず保護。丁寧なウォーターケアで甘皮周りを整え、清潔で艶やかな指先に仕上げます。",
        price: "¥6,050",
        time: "60分",
        paragel: true
      },
      {
        name: "【大人定番】パラジェル・上品ワンカラー / グラデーション",
        description: "自爪を削らないパラジェル使用。白・ラベンダー・肌馴染みモーブなど約200色からお選びいただけます。",
        price: "¥7,150",
        time: "60分",
        recommended: true,
        paragel: true
      },
      {
        name: "【当店人気No.1】50種から選ぶ水光・強光マグネットネイルコース",
        description: "水光ラベンダーやシャンパンゴールドなど50種以上。他店にはない圧倒的なうるうる奥行き感を実現。",
        price: "¥8,800",
        time: "75分",
        recommended: true,
        paragel: true
      },
      {
        name: "【季節のトレンド】四季のアート＆大人ニュアンスコース",
        description: "春の桜/タンポポ、秋のボルドー/カーキ、冬のホワイト/パーツなど季節のアートを楽しめます。",
        price: "¥9,350〜",
        time: "90分",
        paragel: true
      }
    ]
  },
  {
    category: "パラジェル・フットメニュー",
    items: [
      {
        name: "パラジェル・フットワンカラー（フットバス・ケア付）",
        description: "贅沢なフットバスと丁寧な甘皮・爪周りケア付き。リクライニング席でゆったりお過ごしいただけます。",
        price: "¥7,700",
        time: "60分",
        paragel: true
      },
      {
        name: "フット・親指シェルアート＆マグネットコース",
        description: "サンダルに映えるシェルやニュアンス、マグネットなど、親指にこだわりアートを施す人気コース。",
        price: "¥8,800",
        time: "75分",
        recommended: true,
        paragel: true
      }
    ]
  },
  {
    category: "オフ＆ケア・指名料・オプション",
    items: [
      {
        name: "自爪を傷めない高持続フィルイン（一層残し）",
        description: "アセトンを使わずベースジェルを一層残して新しく塗り直す技術。3〜4週間綺麗な状態をキープ。",
        price: "コース内込み",
        time: "+0分",
        paragel: true
      },
      {
        name: "他店オフ（初回他店オフ無料クーポンあり）",
        description: "他店のジェルを優しくオフ。自爪の状態を確認しながら丁寧に施術します。",
        price: "¥1,650（初回無料）",
        time: "30分",
        paragel: false
      },
      {
        name: "スタッフ指名料金",
        description: "池田・高橋・水野の各スタッフをご指名いただく場合にかかる料金です。",
        price: "¥550",
        time: "-",
        paragel: false
      },
      {
        name: "WEB会員限定・お得な特典＆クーポン",
        description: "リピーター様に大好評！新規登録¥1,000OFFクーポンや、施術ポイントで交換できる水光アート無料チケット・オリジナルオイルをマイページにて配信中。",
        price: "マイページにて配信中",
        time: "-",
        paragel: false
      }
    ]
  }
];

export const FEE_TABLE = [
  { item: "初回 他店ジェルオフ（付け替え時）", price: "無料（¥0）", note: "ご新規様限定クーポン適用で0円" },
  { item: "再来 自店ジェルオフ（フィルイン付け替え）", price: "無料（¥0）", note: "アセトン不使用の一層残しフィルイン込" },
  { item: "再来 他店ジェルオフ（付け替え時）", price: "¥1,100", note: "自爪を傷めず丁寧にオフ" },
  { item: "オフのみ（自店ジェル・ネイルケア込）", price: "¥3,300", note: "整爪＋甘皮ケア＋シャイナー仕上げ" },
  { item: "オフのみ（他店ジェル・ネイルケア込）", price: "¥3,850", note: "整爪＋甘皮ケア＋保湿トリートメント" },
  { item: "自爪亀裂補強（シルクラップ補修）", price: "¥550 / 1本", note: "割れた爪を保護・補強してそのまま施術OK" },
  { item: "長さ出し（ジェルスカルプ）", price: "¥880 / 1本", note: "折れて短くなった爪の長さを揃えます" },
  { item: "スタッフ指名料金", price: "¥550", note: "池田・高橋・水野のご指名（税込）" },
];

export const FAQS: FaqItem[] = [
  {
    category: "paragel",
    q: "パラジェルとは何ですか？通常のジェルネイルと何が違いますか？",
    a: "従来のジェルネイルは密着を高めるために爪表面をヤスリで削る（サンディング）必要があり、繰り返すことで爪が薄くなる原因となっていました。パラジェルは最高峰の密着技術により【自爪を一切削らず】塗布できます。そのため自爪を健康な厚みに育てながら、ジェルネイルを長く楽しんでいただけます。"
  },
  {
    category: "paragel",
    q: "ネイルの持ちはどのくらい続きますか？",
    a: "お客様の爪の状態や生活習慣、水仕事の頻度によっても異なりますが、当サロンでは丁寧なウォーターケアとアセトンを使わないフィルイン（一層残し）技術により、平均して【3〜4週間綺麗な状態】をキープできます。施術後には長持ちさせるホームケアのコツもしっかりお伝えします。"
  },
  {
    category: "magnet",
    q: "水光マグネットネイルとはどんなものですか？色変更はできますか？",
    a: "超微粒子の磁石粉（マグネットパウダー）をジェルに配合し、専用マグネットで光の筋を集めることで、まるで水面のようにうるうると揺らめく奥行き感を演出する大人気ネイルです。当サロンでは大人可愛いラベンダーやシャンパンゴールドをはじめ【50種類以上のカラー】をご用意しており、すべてカラー変更可能です。"
  },
  {
    category: "paragel",
    q: "自爪が薄くて割れやすいのですが、施術を受けられますか？",
    a: "はい、大歓迎です。当サロンには「他店で爪が薄くなって痛む」「自爪が弱くて伸ばせない」とお悩みのお客様が多くご来店されます。削らないパラジェルと丁寧なケアにより、薄くなった爪を保護しながら健康な自爪へと育てていくことができます。"
  },
  {
    category: "service",
    q: "持ち込みデザインのオーダーは可能ですか？",
    a: "はい、可能です！インスタグラムやお写真などのご希望画像を施術前のカウンセリングでお見せください。パーツやカラーの在庫状況に応じて、当サロンの上品な世界観（白・ラベンダー・ゴールド等）を調和させながら最適なご提案をいたします。"
  },
  {
    category: "service",
    q: "他店ジェルのオフのみでも予約できますか？",
    a: "はい、オフのみのメニュー（他店オフ＋美爪ケア付き ¥3,850）をご用意しております。自爪を削らず丁寧にオフし、爪の長さを整え、甘皮ケアと保湿オイルで清潔で健康的な素爪に仕上げます。"
  },
  {
    category: "service",
    q: "爪に亀裂が入っていたり折れていたりしても施術できますか？",
    a: "はい、対応可能です。亀裂補強（シルクラップ補修 1本¥550）や、折れてしまった爪の長さ出し（ジェルスカルプ 1本¥880）を行っております。自爪を短く切り揃えずに他の指と長さを均一にして施術できますので、安心してご来店ください。"
  },
  {
    category: "service",
    q: "施術時間はどのくらいかかりますか？",
    a: "ワンカラー・グラデーションはオフ込みで約60〜70分、水光マグネットコースは約75〜85分、アート・ニュアンスコースは約90分が目安です。初回ご来店時は丁寧なカウンセリングのため＋10分ほどお時間をいただいております。"
  },
  {
    category: "service",
    q: "ペットや子どもを連れて行っても大丈夫ですか？",
    a: "はい、全席ゆったりとしたスペースを確保しており、ペット同伴・お子様同伴でのご来店を歓迎しております。ベビーカーの横付けも可能です。ご予約時に一言お伝えいただければ、より快適にお過ごしいただけるお席をご用意いたします。"
  },
  {
    category: "access",
    q: "お客様用駐車場はありますか？",
    a: "はい、サロン敷地内に【無料のお客様専用駐車場を3台分】完備しております。お車でのご来店でも駐車料金を気にせずご利用いただけます。"
  },
  {
    category: "service",
    q: "GWやお盆、シルバーウィークなどの連休中は営業していますか？",
    a: "はい、年末年始を除き、ゴールデンウィーク・お盆休み・シルバーウィークといった長期休暇中も休まず営業（10:00〜20:00 / 不定休）しております。"
  },
  {
    category: "service",
    q: "予約の変更やキャンセルは可能ですか？",
    a: "前日までのご連絡であれば、HOT PEPPER Beautyの予約画面、またはWEB会員マイページ・お電話にてスムーズにご変更・キャンセルいただけます。体調不良等の急な場合もお気軽にお電話にてご連絡ください。"
  }
];
