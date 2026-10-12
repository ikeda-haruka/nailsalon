-- ========================================================
-- Salon de Fraise / HOMME バックエンドデータベース初期化 DDL
-- アーキテクチャ: 完全永久無料・30日失効制限なし
-- 対象DB: H2 Database (MODE=PostgreSQL) / PostgreSQL 16+ 互換
-- ========================================================

-- --------------------------------------------------------
-- 1. 会員マスター (会員ランク・ポイント・生年月日)
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS members (
    id VARCHAR(36) PRIMARY KEY,
    member_number VARCHAR(20) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    kana VARCHAR(100),
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(20),
    password_hash VARCHAR(255) NOT NULL,
    rank VARCHAR(20) NOT NULL DEFAULT 'Regular', -- Regular, Silver, Gold, Platinum
    points INTEGER NOT NULL DEFAULT 1000,        -- 新規登録特典 1,000pt
    birthday DATE,                               -- 誕生月50%OFF判定用
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- --------------------------------------------------------
-- 2. サロンメニュー一元マスター (Single Source of Truth)
-- メニュー詳細・予約枠・管理画面・料金の一貫性を保証
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS salon_menus (
    id VARCHAR(50) PRIMARY KEY,
    salon_type VARCHAR(20) NOT NULL,            -- ladies, mens, both
    name VARCHAR(255) NOT NULL,
    category VARCHAR(50) NOT NULL,               -- care, magnet, simple, nuance, etc.
    price INTEGER NOT NULL,
    duration_minutes INTEGER NOT NULL,           -- 空き枠算出用所要時間(分)
    paragel_included BOOLEAN NOT NULL DEFAULT TRUE,
    description TEXT,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- --------------------------------------------------------
-- 3. 予約台帳テーブル (排他制御・二重予約防止)
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS reservations (
    id VARCHAR(50) PRIMARY KEY,
    member_id VARCHAR(36) NOT NULL,
    menu_id VARCHAR(50) NOT NULL,
    staff_id VARCHAR(50) NOT NULL,               -- 指名スタッフID (nomination-none: 指名なし)
    staff_name VARCHAR(100) NOT NULL,
    salon_type VARCHAR(20) NOT NULL,            -- ladies, mens
    reservation_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,                      -- start_time + duration_minutes
    duration_minutes INTEGER NOT NULL,
    base_price INTEGER NOT NULL,
    final_price INTEGER NOT NULL,
    discount_amount INTEGER NOT NULL DEFAULT 0,
    points_used INTEGER NOT NULL DEFAULT 0,
    status VARCHAR(20) NOT NULL DEFAULT 'confirmed', -- confirmed, completed, cancelled
    note TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (member_id) REFERENCES members(id),
    FOREIGN KEY (menu_id) REFERENCES salon_menus(id)
);

-- 空き枠検索および二重予約判定を高速化する複合インデックス
CREATE INDEX IF NOT EXISTS idx_reservations_slot ON reservations (
    reservation_date, 
    status, 
    start_time, 
    end_time
);

-- スタッフ別の時間重複防止インデックス
CREATE INDEX IF NOT EXISTS idx_reservations_staff ON reservations (
    staff_id, 
    reservation_date, 
    status
);

-- --------------------------------------------------------
-- 4. ポイント増減履歴テーブル (ランク還元・消込明細)
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS point_transactions (
    id VARCHAR(50) PRIMARY KEY,
    member_id VARCHAR(36) NOT NULL,
    type VARCHAR(20) NOT NULL,                   -- grant(付与), redeem(利用)
    amount INTEGER NOT NULL,                     -- 増減ポイント
    balance_after INTEGER NOT NULL,              -- 取引後残高
    reason VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (member_id) REFERENCES members(id)
);

-- --------------------------------------------------------
-- 5. 会員保有クーポンテーブル (誕生月50%OFF・ランク限定)
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS member_coupons (
    id VARCHAR(50) PRIMARY KEY,
    member_id VARCHAR(36) NOT NULL,
    coupon_id VARCHAR(50) NOT NULL,              -- cp-birthday-50 等
    title VARCHAR(255) NOT NULL,
    discount_percent INTEGER NOT NULL DEFAULT 0, -- 50 (50%OFF)
    is_used BOOLEAN NOT NULL DEFAULT FALSE,
    used_at TIMESTAMP,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (member_id) REFERENCES members(id)
);
