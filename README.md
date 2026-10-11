# Salon de Fraise (サロンドフレーズ) 🍓🥛
### パラジェル＆水光マグネット専門ネイルサロン 公式Webサイト (ポートフォリオ実績)

自爪を削らないパラジェル専門サロンの魅力を最大限に伝えるポートフォリオWebサイトです。女性向けに「いちごみるく」のような優しく大人可愛い配色・世界観で統一し、豊富なデザインカタログや50種類以上のマグネットカラー、サロンのこだわりとおもてなしを直感的に体験できるインタラクティブ機能を実装しています。

![Salon de Fraise Hero](/public/images/hero.jpg)

---

## 🌟 プロジェクトの概要・強み

- **自爪を削らない「パラジェル専門」**: サンディング不要で健康な自爪を守りながらネイルを楽しむコンセプトを徹底訴求。
- **丁寧なウォーターケア & フィルイン技術**: アセトンを使わない一層残しと丁寧なケアにより、**3〜4週間綺麗な状態**をキープ。
- **50種以上のマグネットカラー**: 水面のように光が揺らめく「水光マグネット」や光筋がシャープな「強光マグネット」など、他店では被らない豊富な品揃え。
- **春夏秋冬の季節デザイン**: 桜やタンポポ（春）、ひまわりや海・フット（夏）、ボルドーやくすみ・ニュアンス（秋）、ホワイト＆パーツ（冬）の多彩なラインナップ。
- **居心地の良いサロン空間**: ハンド2席・フット2席、お客様用無料駐車場3台完備、ペット同伴・お子様同伴（ベビーカーOK）歓迎、全6種のカフェ風ドリンクサービス。
- **長期休暇営業**: 年末年始を除き、GW・お盆・シルバーウィークも休まず営業（10:00〜20:00）。
- **マルチ予約導線**: HOT PEPPER Beauty（24時間即時予約・空席カレンダー）、公式LINEアカウント（限定クーポン・回数券）、お電話。
- **ネイリスト採用情報**: HOT PEPPER Beauty WORK・Indeed連携の求人掲載（随時募集中）。
- **在籍ネイリスト3名**: 池田（店長・フィルイン/ニュアンス）、高橋（マグネット/オフィス）、水野（季節アート/フット）。指名料金+550円。

---

## 🎨 デザイントークン & イチゴミルクの世界観

| カラー名 | カラーコード | 用途 |
|---|---|---|
| **Milk Cream** | `#FFF9FA` | メイン背景（まろやかなミルク） |
| **Strawberry White** | `#FFF0F3` | カード背景・淡いアクセント |
| **Strawberry Pink** | `#FFB3C6` | やわらかなイチゴミルクピンク |
| **Vivid Strawberry** | `#E8436E` | メインアクセント・ボタン・バッジ |
| **Cocoa Brown** | `#3A2B2C` | タイポグラフィ（真っ黒を避け優しい印象に） |
| **Water Glow Magnet** | `linear-gradient` | 水光マグネットのうるうるシマーアニメーション |

---

## 🛠️ 主な機能・コンポーネント

1. **Hero Section**: 艶やかなイチゴミルクネイルのキービジュアル、主要バッジ、即時予約・LINEクーポンCTA。
2. **Concept Section**: パラジェルの仕組み図解、高持続フィルインのこだわり、3〜4週持続させるホームケアアドバイス。
3. **Seasonal & Magnet Gallery**: 春夏秋冬・50種マグネット・オフィスネイルのインタラクティブフィルター＆詳細モーダル。
4. **Interactive Nail Diagnosis**: 3問で似合うネイルを導き出す「大人可愛いネイル診断」（Canvas Confetti演出付き）。
5. **Vacancy Simulator**: 直近の空席状況がひと目でわかるシミュレーションカレンダー。
6. **Menu & Price**: ハンド/フット、フィルイン込み、指名料（550円）、LINE限定クーポン＆回数券バナー。
7. **Staff Introduction**: 在籍ネイリスト3名（池田・高橋・水野）の得意分野と指名予約導線。
8. **Salon Info & Amenities**: 営業時間、連休営業、設備（ハンド2/フット2）、駐車場3台、ドリンク全6種、各種決済対応。
9. **FAQ**: よくある質問アコーディオン（パラジェルの違い、持ちの秘訣、ペット・子連れ、連休営業等）。
10. **Recruit**: ネイリスト採用要項、HOT PEPPER Beauty WORK・Indeedリンク。
11. **Floating Reservation Bar**: スクロール時画面下部に常時表示される即時予約・LINEリンク。

---

## 💻 技術スタック

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4, Custom Strawberry-Milk CSS Tokens
- **Icons**: Lucide React
- **Animation**: Framer Motion, CSS Keyframes (`water-glow`), Canvas Confetti
- **Font**: Shippori Mincho, Noto Sans JP (Google Fonts)
- **Deployment**: Vercel
- **Project Management**: GitHub Issues 同期自動化スクリプト

---

## 🚀 開発環境のセットアップ

```bash
# リポジトリのクローン
git clone https://github.com/ikeda-haruka/nailsalon.git
cd nailsalon

# 依存パッケージのインストール
npm install

# 開発サーバーの起動
npm run dev

# 本番ビルド
npm run build
```

---

## 📋 GitHub Issues によるタスク管理

本プロジェクトの開発タスクは GitHub Issues とリアルタイム同期されています：
- **Issue #1**: [Setup] プロジェクト初期化 & イチゴミルクトークン・デザインシステム構築
- **Issue #2**: [Assets] AIビジュアル生成 & アセット整備（パラジェル・マグネット・季節アート）
- **Issue #3**: [Feature] Hero & Concept セクション実装（パラジェル専門・フィルイン技術の強み）
- **Issue #4**: [Feature] Seasonal & Magnet Gallery 実装（春夏秋冬＆50種マグネット）
- **Issue #5**: [Feature] Menu & Price セクション実装（明朗会計・回数券・LINEクーポン）
- **Issue #6**: [Feature] Staff セクション実装（在籍ネイリスト3名・指名予約連携）
- **Issue #7**: [Feature] Salon Info & Services 実装（設備・ドリンク・ペット子連れOK・駐車場）
- **Issue #8**: [Feature] Reservation & Recruit セクション実装（HotPepper/LINE/電話・採用情報）
- **Issue #9**: [Interactive] ネイルカラー＆スタイル診断・空席シミュレーター機能
- **Issue #10**: [Deploy] Vercel デプロイ & リモートリポジトリ同期・最終動作検証
