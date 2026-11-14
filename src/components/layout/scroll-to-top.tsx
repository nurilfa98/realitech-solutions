// Tombol mengambang di pojok kanan bawah: klik untuk kembali ke bagian paling atas halaman.
// Tampil setelah pengguna scroll lebih dari SHOW_AFTER_PX piksel, di semua halaman yang sama.
// Warna memakai token bg-brand, jadi otomatis navy di tema terang dan amber di tema gelap.

"use client";

import { ArrowUpIcon } from "lucide-react";
import { useEffect, useState } from "react";

const SHOW_AFTER_PX = 400;

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const update = () => setVisible(window.scrollY > SHOW_AFTER_PX);

    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Kembali ke atas"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      className={`fixed right-4 bottom-4 z-30 inline-flex size-12 items-center justify-center rounded-full bg-brand text-brand-foreground shadow-lg ring-1 ring-black/5 transition-all duration-300 hover:scale-105 active:scale-95 md:right-6 md:bottom-6 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <ArrowUpIcon className="size-5" />
    </button>
  );
}
