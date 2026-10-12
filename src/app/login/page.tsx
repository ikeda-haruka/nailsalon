"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Sparkles, User, Mail, Lock, ShieldCheck, Ticket, ArrowRight, CheckCircle2, UserCheck } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { login, register, loginDemoUser, loginDemoStaff, user, isStaff } = useAuth();

  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [kana, setKana] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    if (mode === "login") {
      if (!email) {
        setMessage({ type: "error", text: "メールアドレスを入力してください" });
        setIsSubmitting(false);
        return;
      }
      const ok = await login(email);
      if (ok) {
        router.push("/mypage");
      } else {
        setMessage({ type: "error", text: "ログインに失敗しました" });
      }
    } else {
      if (!name || !email) {
        setMessage({ type: "error", text: "お名前とメールアドレスは必須です" });
        setIsSubmitting(false);
        return;
      }
      const ok = await register(name, email, kana);
      if (ok) {
        router.push("/mypage");
      } else {
        setMessage({ type: "error", text: "会員登録に失敗しました" });
      }
    }
    setIsSubmitting(false);
  };

  const handleDemoUser = async () => {
    await loginDemoUser();
    router.push("/mypage");
  };

  const handleDemoStaff = () => {
    loginDemoStaff(0);
    router.push("/admin");
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8 aurora-bg flex items-center justify-center">
      <div className="max-w-md w-full space-y-6">
        
        {/* ヘッダータイトル */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-block mb-2 text-xs font-serif text-lavender-700 hover:text-lavender-900">
            ← サロン公式トップへ戻る
          </Link>
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-lavender-100 text-lavender-700 text-xs font-normal tracking-widest uppercase border border-lavender-200 font-serif">
            <Sparkles className="w-3.5 h-3.5 text-gold-500" />
            <span>Salon Members Portal</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-normal text-plum-900 tracking-wide">
            {mode === "login" ? "会員ログイン" : "新規WEB会員登録"}
          </h1>
          <p className="text-xs text-plum-700 font-light tracking-wide">
            {mode === "login"
              ? "マイページで保有ポイントや限定クーポンをご確認いただけます。"
              : "登録ですぐに使える¥1,000OFFクーポン＆100ptをプレゼント！"}
          </p>
        </div>

        {/* ポートフォリオ審査・体験用 デモワンクリックログインバナー */}
        <div className="pearl-glass p-4 rounded-2xl border-2 border-gold-300 shadow-sm space-y-2.5 bg-gradient-to-r from-gold-50/70 via-white to-lavender-50/70">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-normal px-2.5 py-0.5 rounded-full bg-gold-500 text-plum-950 font-serif tracking-widest uppercase shadow-2xs">
              Portfolio Demo Mode
            </span>
            <span className="text-[10px] text-plum-500 font-light">ワンクリックで体験可能</span>
          </div>
          <p className="text-xs text-plum-800 font-normal leading-relaxed">
            審査・動作確認用に、架空の会員およびスタッフアカウントですぐに体験いただけます：
          </p>
          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              onClick={handleDemoUser}
              className="py-2.5 px-3 rounded-xl bg-white border border-lavender-300 hover:border-lavender-500 text-xs font-medium text-plum-900 shadow-2xs transition-all hover:scale-102 flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <User className="w-3.5 h-3.5 text-lavender-600" />
              <span>デモ会員でログイン</span>
            </button>
            <button
              onClick={handleDemoStaff}
              className="py-2.5 px-3 rounded-xl bg-plum-900 hover:bg-plum-950 text-white text-xs font-medium shadow-2xs transition-all hover:scale-102 flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <UserCheck className="w-3.5 h-3.5 text-gold-400" />
              <span>スタッフ管理画面へ</span>
            </button>
          </div>
        </div>

        {/* フォームカード */}
        <div className="pearl-glass p-6 sm:p-8 rounded-[2rem] border border-lavender-200 shadow-xl space-y-6">
          
          {/* タブ切り替え */}
          <div className="flex rounded-full bg-lavender-50 p-1 border border-lavender-200">
            <button
              onClick={() => { setMode("login"); setMessage(null); }}
              className={`flex-1 py-2 rounded-full text-xs font-medium transition-all cursor-pointer ${
                mode === "login"
                  ? "bg-white text-plum-900 shadow-sm"
                  : "text-plum-600 hover:text-plum-900"
              }`}
            >
              ログイン
            </button>
            <button
              onClick={() => { setMode("register"); setMessage(null); }}
              className={`flex-1 py-2 rounded-full text-xs font-medium transition-all cursor-pointer ${
                mode === "register"
                  ? "bg-white text-plum-900 shadow-sm"
                  : "text-plum-600 hover:text-plum-900"
              }`}
            >
              新規会員登録
            </button>
          </div>

          {/* メッセージ表示 */}
          {message && (
            <div
              className={`p-3 rounded-xl text-xs ${
                message.type === "success"
                  ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                  : "bg-rose-50 text-rose-800 border border-rose-200"
              }`}
            >
              {message.text}
            </div>
          )}

          {/* 入力フォーム */}
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {mode === "register" && (
              <>
                <div className="space-y-1">
                  <label className="block text-plum-800 font-normal">お名前（漢字） <span className="text-rose-500">*</span></label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="例: 山田 菜々美"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-lavender-200 text-plum-900 placeholder:text-plum-400 focus:outline-hidden focus:ring-2 focus:ring-lavender-400"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-plum-800 font-normal">フリガナ</label>
                  <input
                    type="text"
                    value={kana}
                    onChange={(e) => setKana(e.target.value)}
                    placeholder="例: ヤマダ ナナミ"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-lavender-200 text-plum-900 placeholder:text-plum-400 focus:outline-hidden focus:ring-2 focus:ring-lavender-400"
                  />
                </div>
              </>
            )}

            <div className="space-y-1">
              <label className="block text-plum-800 font-normal">メールアドレス <span className="text-rose-500">*</span></label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@fraise-nail.com"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-lavender-200 text-plum-900 placeholder:text-plum-400 focus:outline-hidden focus:ring-2 focus:ring-lavender-400"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-plum-800 font-normal">パスワード</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="8文字以上（デモ用のため任意）"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-lavender-200 text-plum-900 placeholder:text-plum-400 focus:outline-hidden focus:ring-2 focus:ring-lavender-400"
              />
            </div>

            {mode === "register" && (
              <div className="p-3 rounded-xl bg-lavender-50 border border-lavender-200 space-y-1 text-[11px] text-plum-700 font-light">
                <p className="font-normal text-lavender-800 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-lavender-600" />
                  新規登録でプレゼント付与:
                </p>
                <p>• 全コースで使える【¥1,000 OFF限定クーポン】即時発行</p>
                <p>• 初回【100ポイント】自動進呈（特典交換に使えます）</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="luxe-button w-full py-3 rounded-full text-xs font-medium flex items-center justify-center gap-2 shadow-lg tracking-wider mt-2 cursor-pointer disabled:opacity-50"
            >
              <span>{isSubmitting ? "処理中..." : mode === "login" ? "ログインする" : "会員登録して特典を受け取る"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

        </div>

        {/* フッターリンク */}
        <div className="text-center text-xs text-plum-600 space-y-2">
          <p>
            スタッフ用画面へのアクセスは{" "}
            <button onClick={handleDemoStaff} className="text-lavender-700 hover:underline font-medium cursor-pointer">
              スタッフ管理画面
            </button>{" "}
            から行えます。
          </p>
        </div>

      </div>
    </div>
  );
}
