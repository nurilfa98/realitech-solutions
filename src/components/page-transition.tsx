// Transisi antarhalaman (beranda ↔ /archipay ↔ /sakudagang ↔ halaman legal).
// Isi halaman lama memudar cepat, isi halaman baru naik halus dari bawah. Header
// tidak ikut bergerak (lihat site-header.tsx). Gaya animasinya ada di globals.css
// (.page-out dan .page-in). Dipasang di tiap halaman, bukan di layout, karena layout
// tidak dibuat ulang saat pindah halaman sehingga animasi masuk/keluarnya tidak jalan.
//
// Referensi: node_modules/next/dist/docs/01-app/02-guides/view-transitions.md

/// <reference types="react/experimental" />

import { ViewTransition } from "react";
import type { ReactNode } from "react";

export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <ViewTransition enter="page-in" exit="page-out" default="none">
      {children}
    </ViewTransition>
  );
}
