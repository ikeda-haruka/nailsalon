"use client";

import React, { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";

export default function MensFloatingBar() {
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowTopBtn(window.scrollY > 350);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!showTopBtn) return null;

  return (
    <button
      onClick={scrollToTop}
      aria-label="ページトップへ戻る"
      className="fixed bottom-6 right-6 z-40 w-11 h-11 rounded-full bg-zinc-900/90 backdrop-blur-md border border-zinc-700 text-white shadow-2xl flex items-center justify-center hover:bg-black hover:scale-110 active:scale-95 transition-all cursor-pointer"
      title="ページトップへ戻る"
    >
      <ChevronUp className="w-5 h-5" />
    </button>
  );
}
