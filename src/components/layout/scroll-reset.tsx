// Setiap pindah halaman (misalnya dari beranda ke /archipay), tampilan langsung
// berada di paling atas. Dilewati bila URL punya hash (#...), karena halaman
// itu memang harus turun ke bagian tertentu.
//
// Perlu "instant": html memakai scroll-smooth, jadi gulungan bawaan Next.js
// terlihat animasi dan bisa berhenti di tengah jalan.

"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function ScrollReset() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.location.hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}
