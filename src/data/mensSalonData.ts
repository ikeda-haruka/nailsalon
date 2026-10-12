// src/data/mensSalonData.ts
// メンズ専用パラジェルネイルサロン「Salon de Fraise HOMME」データ定義

export interface MensStaff {
  id: string;
  name: string;
  kana: string;
  role: string;
  experience: string;
  specialty: string;
  message: string;
  signatureStyle: string;
  nominationFee: string;
  image: string;
}

export interface MensMenuItem {
  id: string;
  category: "care" | "paragel" | "art" | "repair";
  name: string;
  subtitle: string;
  time: string;
  price: number;
  priceFormatted: string;
  popular?: boolean;
  recommendedFor: string;
  features: string[];
}

export const MENS_SALON_INFO = {
  name: "Salon de Fraise HOMME",
  nameJp: "サロンドフレーズ オム",
  tagline: "「男なのになんでネイル？」その問いに、堂々と胸を張れる未来を。",
  conceptShort: "ネイル＝女性のものという固定概念を壊す、全員男性ネイリストによるメンズ専用パラジェルサロン。",
  conceptStatement:
    "「男なのに、なんでネイルしているの？」と聞かれ、居心地の悪さや息苦しさを感じたことはありませんか。手元は、ビジネスでもプライベートでも、他人の視線と自分自身の視界に最も入る場所。私たちは『ネイルは身だしなみであり、清潔感であり、自信を宿す現代の鎧である』と信じています。女性向けサロンの片隅ではなく、気兼ねなく通える完全プライベートな空間を。スタッフも全員男性ネイリストが揃い、男性特有の爪の厚み・骨格・ライフスタイルに寄り添います。",
  staffCount: "在籍5名（全員男性ネイリスト / 完全個室・半個室）",
  nominationFee: "550円（税込）",
  hours: "11:00 - 21:00（最終受付 20:00）※お仕事帰りにも通いやすい夜遅め営業",
  closedDays: "不定休（年末年始除く）",
  address: "東京都渋谷区神宮前4-XX-XX 表参道テラスB1F",
  access: "東京メトロ「表参道駅」A2出口より徒歩3分（青山通り裏手の隠れ家プライベートサロン）",
  phone: "03-XXXX-XXXX",
  facilities: [
    "全席完全個室・半個室（他のお客様と顔を合わせない設計）",
    "施術者全員が男性ネイリスト（男性同士だから話せる気軽さ）",
    "自爪を一切削らないパラジェル専門（爪を痛めず健康を維持）",
    "ビジネスシーンでバレない「完全ツヤ消し自爪風マット仕上げ」完備",
    "高速Wi-Fi・全席コンセント・厳選ドリップコーヒー＆クラフト炭酸水無料"
  ],
  links: {
    hotpepper: "https://beauty.hotpepper.jp/",
    hotpepperWork: "https://work.beauty.hotpepper.jp/",
    indeed: "https://jp.indeed.com/"
  }
};

export const MENS_STAFFS: MensStaff[] = [
  {
    id: "ren-kamiya",
    name: "神谷 蓮",
    kana: "カミヤ レン",
    role: "代表メンズネイリスト / ケアマイスター",
    experience: "歴9年",
    specialty: "ビジネス清潔感ケア / 深爪・噛み爪育成 / パラジェル自爪補強",
    message: "「男がネイルサロンに行くなんて…」と最初は誰でも緊張します。でも、爪が清潔に整った瞬間の気分の高揚感は、スーツを仕立てた時の感動と同じです。気兼ねなく何でもご相談ください。",
    signatureStyle: "完全ツヤ消し自爪風ナチュラルマット仕上げ",
    nominationFee: "¥550",
    image: "/images/brand_logo_homme.svg"
  },
  {
    id: "shun-kurosaki",
    name: "黒崎 瞬",
    kana: "クロサキ シュン",
    role: "トップメンズネイリスト / パラジェルエデュケーター",
    experience: "歴7年",
    specialty: "自爪を削らないパラジェル施術 / ギタリスト・アスリート爪補強",
    message: "パラジェルは自爪を削らないから、薄くならず割れにくい。二枚爪や乾燥で悩む男性の手元を根本から強く健康にします。僕自身もパラジェルで爪割れを克服しました。",
    signatureStyle: "高強度パラジェルベース＆チタンクリア補強",
    nominationFee: "¥550",
    image: "/images/brand_logo_homme.svg"
  },
  {
    id: "kohei-saeki",
    name: "佐伯 航平",
    kana: "サエキ コウヘイ",
    role: "メンズネイリスト / モード＆デザインディレクター",
    experience: "歴5年",
    specialty: "スモーキーマグネット / マットブラック / メタリックシルバーアート",
    message: "男性の骨格や指の太さにマッチする、シャープで無骨すぎないモノトーンアートが得意です。1本だけのワンポイントアートでも、ファッションが劇的に洗練されます。",
    signatureStyle: "漆黒マットブラック × スモーキーシルバーマグネット",
    nominationFee: "¥550",
    image: "/images/brand_logo_homme.svg"
  },
  {
    id: "yuma-sanada",
    name: "真田 悠真",
    kana: "サナダ ユウマ",
    role: "メンズネイリスト / ビジネス身だしなみスペシャリスト",
    experience: "歴4年",
    specialty: "精密甘皮ウォーターケア / 手肌角質除去 / 名刺交換で映える指先",
    message: "営業職や経営者の方から『名刺交換や商談で手元を見られても自信が持てるようになった』とのお声を多数いただきます。指先は最も雄弁な名刺です。",
    signatureStyle: "精密ウォーターケア＆血色感スキンコーティング",
    nominationFee: "¥550",
    image: "/images/brand_logo_homme.svg"
  },
  {
    id: "riku-tachibana",
    name: "橘 陸",
    kana: "タチバナ リク",
    role: "メンズネイリスト / 爪質改善アドバイザー",
    experience: "歴3年",
    specialty: "メンズネイル初心者カウンセリング / 自宅セルフケア指導",
    message: "初めてサロンに来られる方の不安をゼロにすることが僕の役目です。道具の使い方やオイルの塗り方まで、丁寧にお伝えします。男同士、気楽に話しましょう！",
    signatureStyle: "自爪育成トリートメント＆高保湿メンズオイル仕上げ",
    nominationFee: "¥550",
    image: "/images/brand_logo_homme.svg"
  }
];

export const MENS_MENUS: MensMenuItem[] = [
  {
    id: "menu-mens-care",
    category: "care",
    name: "メンズ身だしなみ基本ケアコース",
    subtitle: "初めての男性に一番人気。清潔感ある好印象な手元へ",
    time: "45分",
    price: 5500,
    priceFormatted: "¥5,500",
    popular: true,
    recommendedFor: "初めてサロンに来る方・営業職・就活・ブライダル新郎",
    features: [
      "温水ウォーターケアで頑固な甘皮を優しくオフ",
      "ヤスリで爪の形と長さを整え引っかかりをゼロに",
      "自爪の表面の凹凸を磨き上げるナチュラルバッフィング",
      "メンズ専用ウッドアロマオイルで高保湿トリートメント"
    ]
  },
  {
    id: "menu-paragel-matte",
    category: "paragel",
    name: "メンズ パラジェル 【自爪風マット仕上げ】",
    subtitle: "塗っていることがバレない！削らず自爪を守る人気No.1",
    time: "60分",
    price: 8800,
    priceFormatted: "¥8,800",
    popular: true,
    recommendedFor: "会社や学校でネイルがNGな方・二枚爪・割れ爪に悩む方",
    features: [
      "自爪を一切削らない最高峰パラジェルベース使用",
      "光を完全に抑えた特殊マットトップコートで素爪そのものの質感",
      "爪の厚みと強度がアップし、PCタイピングや作業でも割れない",
      "3〜4週間持続・フィルイン（一層残し）で爪を傷めず継続可能"
    ]
  },
  {
    id: "menu-magnet-monotone",
    category: "art",
    name: "メンズ 水光マグネット ＆ モノトーンデザイン",
    subtitle: "ブラック・チャコール・チタンシルバーで魅せるモードな指先",
    time: "75分",
    price: 11000,
    priceFormatted: "¥11,000",
    recommendedFor: "ファッション・クリエイター・自己表現を楽しみたい男性",
    features: [
      "50種以上のマグネットから男性の肌色に映えるクールトーンを厳選",
      "磁石の光筋をシャープに集めるメンズ仕様の光彩スタイリング",
      "1〜2本のアクセントアート、または10本オールデザインから選択可能",
      "ツヤ仕上げ／マット仕上げのミックスも対応"
    ]
  },
  {
    id: "menu-nail-repair",
    category: "repair",
    name: "深爪・噛み爪緩和 ＆ 割れ爪プロテクト補強",
    subtitle: "爪の形にコンプレックスがある男性のための再生ケア",
    time: "60分",
    price: 7700,
    priceFormatted: "¥7,700",
    recommendedFor: "深爪を直したい方・爪噛み癖・スポーツや楽器で爪が割れる方",
    features: [
      "パラジェルの柔軟性と高密着力を活かした自爪ガイド形成",
      "深爪部分を自然に保護し、噛む隙を与えず綺麗に伸ばす",
      "周囲に気づかれない自然なスキンカラー＆マットコート"
    ]
  }
];

export const MENS_RECRUIT_INFO = {
  title: "男性ネイリスト（正社員 / 業務委託 / アルバイト・パート）募集中",
  subtitle: "「メンズネイル」という新しい文化の夜明けを、共に創る熱い仲間を求めています。",
  points: [
    {
      title: "男性スタッフのみのサロンだからこそ築ける強固なチームワーク",
      desc: "在籍ネイリスト5名が全員男性。従来のネイルサロンで感じていた肩身の狭さとは無縁の、互いを尊重し高め合えるフラットで風通しの良い環境です。"
    },
    {
      title: "パラジェル認定技術 ＆ メンズ特有のカウンセリングスキルを習得",
      desc: "自爪を削らないパラジェルの高度なフィルイン技術はもちろん、男性特有の爪質・骨格・身だしなみニーズに特化したカウンセリングノウハウを基礎から研修します。"
    },
    {
      title: "メンズECショップ運営・出荷も兼任（効率的なサロン運営）",
      desc: "サロン施術に加え、メンズ専用公式オンラインショップ（メンズネイルチップ・専売ケア用品）の検品梱包もスタッフが担当。EC専任スタッフを置かない合理的なビジネスモデルで、高い給与還元率を実現しています。"
    },
    {
      title: "高率指名インセンティブ ＆ 明確なキャリアパス",
      desc: "指名手当（550円/件）全額バックに加え、物販・EC売上インセンティブあり。将来的な店舗責任者やFC独立支援も積極的に行っています。"
    }
  ],
  requirements: {
    jobType: "メンズネイリスト（サロン施術 ＆ メンズEC出荷業務）",
    positions: "正社員 / 業務委託 / アルバイト・パート（若干名）",
    salary: "【正社員】月給26万〜48万円 + 指名手当全額 + インセンティブ / 【アルバイト】時給1,350円〜",
    hours: "10:30〜21:30（実働8時間 / シフト制）",
    holidays: "完全週休2日制（シフト制）、有給休暇、年末年始休暇",
    qualifications: "JNECネイリスト技能検定またはJNAジェル検定保持者歓迎（実務未経験・メンズネイル初挑戦の方も研修あり）",
    benefits: "社会保険完備、交通費全額支給、施術・物販社割、制服貸与、独立支援制度"
  }
};
