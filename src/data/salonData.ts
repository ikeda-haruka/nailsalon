// src/data/salonData.ts

export interface NailDesign {
  id: string;
  title: string;
  category: "spring" | "summer" | "autumn" | "winter" | "magnet" | "office";
  categoryLabel: string;
  image: string;
  description: string;
  price: string;
  duration: string;
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
  favoriteStyle: string;
}

export interface MenuItem {
  category: string;
  items: {
    name: string;
    description: string;
    price: string;
    time: string;
    recommended?: boolean;
  }[];
}

export const SALON_INFO = {
  name: "Salon de Fraise",
  japaneseName: "サロンドフレーズ",
  concept: "自爪を削らず、素爪から美しく。白・ラベンダー・シャンパンゴールドの煌めきを纏う、大人のパラジェル＆水光マグネット専門サロン",
  hours: "10:00 - 20:00",
  holiday: "不定休（年末年始を除き、GW・お盆休み・シルバーウィークなどの長期休暇も休まず営業）",
  phone: "03-5989-XXXX",
  address: "東京都渋谷区神宮前X-XX-XX メゾン・ド・フレーズ 2F",
  access: "各線「表参道駅」A2出口より徒歩4分 / 「明治神宮前駅」より徒歩5分",
  seats: {
    hand: 2,
    foot: 2,
    details: "ハンド2席・フット2席（全席ゆったりとくつろげるリクライニング仕様・全4席のみのプライベート空間）"
  },
  parking: "お客様専用駐車場 3台完備（無料・お車でのご来店も安心です）",
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
  payments: [
    "各種クレジットカード（VISA / Mastercard / JCB / American Express / Diners Club）",
    "デビットカード",
    "PayPay",
    "交通系ICカード（Suica / PASMO / ICOCA 等）",
    "現金"
  ],
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
    line: "https://line.me/R/ti/p/@fraise-nail",
    phone: "tel:035989XXXX"
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
    favoriteStyle: "自爪を傷めずに3〜4週間持続させるフィルイン技術と、奥行き感のある大人可愛いニュアンスアートが得意です。",
    message: "爪が薄くてお悩みの方や、ジェルネイルを長く続けたい方へ。削らないパラジェルの心地よさと、上品な煌めきをお届けします。"
  },
  {
    id: "takahashi",
    name: "高橋",
    kana: "Yuki Takahashi",
    role: "トップネイリスト",
    experience: "歴6年",
    image: "/images/magnet_nail.jpg",
    specialty: ["50種以上のマグネットネイル", "水光・強光マグネット", "オフィスネイル", "丁寧なネイルケア"],
    favoriteStyle: "オフィスでも褒められるラベンダーモーブやシャンパンゴールドの水光マグネット、肌馴染みの上品カラーが得意です。",
    message: "当サロン自慢のマグネットネイルは光彩の繊細さに徹底的にこだわっています。他店では出会えない特別な煌めきをご体感ください。"
  },
  {
    id: "mizuno",
    name: "水野",
    kana: "Aoi Mizuno",
    role: "ネイリスト",
    experience: "歴4年",
    image: "/images/spring_nail.jpg",
    specialty: ["春夏秋冬の季節アート", "手描きフラワー・桜・ひまわり", "トレンドフットネイル", "パーツアート"],
    favoriteStyle: "季節の移ろいを感じるフラワーアートや、サンダルが楽しくなるフットネイルが得意です。",
    message: "春の桜や夏の海、冬のゴールドパーツなど、見るたびに心がときめくデザインをご提案します。お子様やペット連れの方もお気軽にお越しください！"
  }
];

export const DESIGNS: NailDesign[] = [
  {
    id: "magnet-water-glow",
    title: "極上うる艶 水光ラベンダー＆シャンパンゴールド",
    category: "magnet",
    categoryLabel: "水光マグネット",
    image: "/images/hero.jpg",
    description: "当店人気No.1。白と淡いラベンダーベースに、水面のように光が揺らめくシャンパンゴールドの特殊水光マグネット。大人の品格ある指先に。",
    price: "¥8,800",
    duration: "75分",
    tags: ["水光マグネット", "ラベンダーパープル", "シャンパンゴールド", "人気No.1", "50種類以上"],
    features: ["自爪削りなし", "特殊パウダー使用", "3〜4週キープ"]
  },
  {
    id: "magnet-pearl-white",
    title: "パールホワイト＆微粒子ゴールドビーム",
    category: "magnet",
    categoryLabel: "マグネット",
    image: "/images/magnet_nail.jpg",
    description: "清楚なミルキーパールホワイトにゴールドの光筋がシャープに走る洗練デザイン。指先を細く長く魅せるハイエンドスタイル。",
    price: "¥9,350",
    duration: "80分",
    tags: ["強光マグネット", "パールホワイト", "指長効果", "上品デザイン"],
    features: ["高発色パウダー", "ゴールドミラーアート"]
  },
  {
    id: "spring-sakura",
    title: "春風の桜＆タンポポ パステルグラデーション",
    category: "spring",
    categoryLabel: "春デザイン",
    image: "/images/spring_nail.jpg",
    description: "桜を思わせる柔らかなピンクと、タンポポのような優しいイエローの春爛漫デザイン。パラジェルでうるつや仕上げ。",
    price: "¥9,350",
    duration: "90分",
    tags: ["桜ネイル", "タンポポイエロー", "パラジェル", "春トレンド", "手描きフラワー"],
    features: ["自爪削りなし", "フィルイン対応", "3〜4週キープ"]
  },
  {
    id: "summer-sunflower",
    title: "夏の陽光ひまわり＆オーシャンニュアンス",
    category: "summer",
    categoryLabel: "夏デザイン",
    image: "https://images.unsplash.com/photo-1632345031435-8727f6897d53?w=600&auto=format&fit=crop&q=80",
    description: "元気なひまわりアートと透明感あふれる波打ち際の海デザイン。夏のお出かけやリゾートにぴったりの爽やかな輝き。",
    price: "¥9,900",
    duration: "90分",
    tags: ["ひまわりアート", "海ネイル", "夏トレンド", "ぷっくり水滴"],
    features: ["パラジェルベース", "夏限定パーツ"]
  },
  {
    id: "summer-foot",
    title: "ターコイズ＆シェル サマーフットジェル",
    category: "summer",
    categoryLabel: "夏デザイン",
    image: "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=600&auto=format&fit=crop&q=80",
    description: "サンダル映え抜群のフットネイル。深みのあるマリンブルーと天然シェルの輝きで足元をエレガントに。",
    price: "¥8,800",
    duration: "75分",
    tags: ["フットネイル", "シェルストーン", "夏フット", "リクライニング席"],
    features: ["フット専用席", "角質ケア対応"]
  },
  {
    id: "autumn-bordeaux",
    title: "秋のくすみボルドー＆カーキの大人ニュアンス",
    category: "autumn",
    categoryLabel: "秋デザイン",
    image: "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?w=600&auto=format&fit=crop&q=80",
    description: "深みのあるボルドーと洗練されたカーキ、ブラウンの絶妙な掛け合わせ。ワンカラーはもちろんニュアンスにも最適なシックな色合い。",
    price: "¥9,350",
    duration: "90分",
    tags: ["ボルドー", "カーキ", "くすみカラー", "大人ニュアンス", "秋ネイル"],
    features: ["大人可愛い", "肌馴染み抜群"]
  },
  {
    id: "winter-white-parts",
    title: "冬のホワイトスノー＆ゴールド・シルバーパーツ",
    category: "winter",
    categoryLabel: "冬デザイン",
    image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&auto=format&fit=crop&q=80",
    description: "淡いグレーとミルキーホワイトをベースに、厳選されたゴールド＆シルバーパーツをあしらった洗練された冬のデザイン。",
    price: "¥10,450",
    duration: "100分",
    tags: ["冬ネイル", "スノーホワイト", "ゴールドパーツ", "洗練デザイン", "上品グレー"],
    features: ["パーツ取れ防止コーティング", "3〜4週持続"]
  },
  {
    id: "office-simple",
    title: "オフィスにも馴染む血色感ちゅるんワンカラー",
    category: "office",
    categoryLabel: "オフィス・シンプル",
    image: "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=600&auto=format&fit=crop&q=80",
    description: "規定が厳しい職場でも愛される肌馴染み抜群のラベンダーベージュトーン。丁寧なウォーターケアと美フォルム形成で手元全体が美しく。",
    price: "¥7,150",
    duration: "60分",
    tags: ["オフィスネイル", "美フォルム", "パラジェルワンカラー", "シンプル派"],
    features: ["ウォーターケア付", "清潔感"]
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
        time: "60分"
      },
      {
        name: "【大人可愛い定番】パラジェル・上品ワンカラー / グラデーション",
        description: "自爪を削らないパラジェル使用。白・ラベンダー・肌馴染みモーブなど約200色からお選びいただけます。",
        price: "¥7,150",
        time: "60分",
        recommended: true
      },
      {
        name: "【名物】50種から選ぶ水光・強光マグネットネイルコース",
        description: "水光ラベンダーやシャンパンゴールドなど50種以上を贅沢に使用。他店にはない圧倒的なうるうる奥行き感を実現。",
        price: "¥8,800",
        time: "75分",
        recommended: true
      },
      {
        name: "【季節のトレンド】四季のアート＆ニュアンスコース",
        description: "春の桜/タンポポ、夏の海、秋のボルドー/カーキ、冬のホワイト/ゴールドパーツなど季節のアートを楽しめます。",
        price: "¥9,350〜",
        time: "90分"
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
        time: "60分"
      },
      {
        name: "フット・サマートレンド＆親指アートコース",
        description: "サンダルに映えるシェルやニュアンス、マグネットなど、親指にこだわりアートを施す人気コース。",
        price: "¥8,800",
        time: "75分",
        recommended: true
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
        time: "+0分"
      },
      {
        name: "他店オフ（初回他店オフ無料クーポンあり）",
        description: "他店のジェルを優しくオフ。自爪の状態を確認しながら丁寧に施術します。",
        price: "¥1,650（初回無料）",
        time: "30分"
      },
      {
        name: "スタッフ指名料金",
        description: "池田・高橋・水野の各スタッフをご指名いただく場合にかかる料金です。",
        price: "¥550",
        time: "-"
      },
      {
        name: "公式LINE限定・お得な回数券＆クーポン",
        description: "リピーター様に大好評！3回・5回のお得な回数券や、毎月届く限定割引クーポンは公式LINEにて配布中。",
        price: "LINEにて配信中",
        time: "-"
      }
    ]
  }
];

export const FAQS = [
  {
    q: "パラジェルとは何ですか？通常のジェルと何が違いますか？",
    a: "通常のジェルネイルは定着させるために爪の表面をヤスリで削る（サンディング）必要がありますが、パラジェルは爪を全く削らずに密着させます。そのため爪が薄くならず、健康な自爪のまま長くジェルネイルを楽しんでいただけます。"
  },
  {
    q: "ネイルの持ちはどのくらいですか？",
    a: "お客様の爪の状態や水仕事・生活習慣、保湿ケアによっても異なりますが、当サロンでは丁寧なウォーターケアとフィルイン技術により、多くのお客様に3〜4週間綺麗な状態を楽しんでいただいております。施術後には長持ちさせるためのホームケア（ネイルオイルやハンドクリームの使い方）もしっかりレクチャーいたします。"
  },
  {
    q: "マグネットネイルの種類はどれくらいありますか？",
    a: "大人可愛いラベンダーやモーブ、シャンパンゴールド、ピンクベージュを中心に、50種類以上のマグネットカラーをご用意しております。水面のように揺らめく「水光マグネット」や、光の筋が鮮明に際立つ「強光マグネット」など、他店ではあまり見られない特殊なパウダーも豊富に取り揃えております。"
  },
  {
    q: "ペットや子どもを連れて行っても大丈夫ですか？",
    a: "はい、大歓迎です！当店はペット同伴・お子様同伴可能となっております。広めの個室ライクな空間で、リラックスしてお過ごしいただけます。ベビーカーの横付けも可能ですので、ご予約時にお気軽にお知らせください。"
  },
  {
    q: "駐車場はありますか？",
    a: "はい、サロン敷地内にお客様専用駐車場を3台分完備しております。お車でのご来店でも駐車料金を気にせずご利用いただけます。"
  },
  {
    q: "連休中（GWやお盆、シルバーウィーク）は営業していますか？",
    a: "年末年始以外は、ゴールデンウィーク・お盆休み・シルバーウィークといった長期休暇中も休まず毎日営業（10:00〜20:00）しております。お出かけ前や休暇中のリフレッシュにぜひご利用ください。"
  },
  {
    q: "予約方法や空席の確認はどうすればいいですか？",
    a: "HOT PEPPER Beautyからの24時間Web予約、お電話、または公式LINEアカウントよりご予約いただけます。リアルタイムの空席情報はHOT PEPPER Beautyおよび公式LINEアカウントのメニューからいつでもご覧いただけます。"
  }
];
