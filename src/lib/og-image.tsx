// Gambar pratinjau saat tautan dibagikan (WhatsApp, Facebook, dll), dibuat
// saat build dengan ImageResponse. Satori (mesin di balik ImageResponse) tidak
// membaca Tailwind maupun warna oklch, jadi gaya ditulis inline dengan hex.
//
// Referensi: node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/01-metadata/opengraph-image.md

import { ImageResponse } from "next/og";
import { SITE } from "./site";

export const OG_SIZE = { width: 1200, height: 630 };

export function renderOgImage({ eyebrow, title, color }: { eyebrow: string; title: string; color: string }) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#f8fafc",
          color: "#0f172a",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <svg width="64" height="64" viewBox="0 0 48 48">
            <rect width="48" height="48" rx="12" fill="#0b2545" />
            <path d="M15 37V11h10.5a8 8 0 0 1 0 16H15" fill="none" stroke="#ffffff" strokeWidth="5.4" strokeLinejoin="round" />
            <path d="M25 27l8 10" fill="none" stroke="#ffffff" strokeWidth="5.4" />
            <circle cx="37.5" cy="37" r="4.4" fill="#f5a623" />
          </svg>
          <div style={{ fontSize: 32, fontWeight: 600 }}>{SITE.name}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 32, fontWeight: 600, color }}>{eyebrow}</div>
          <div style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.1, maxWidth: 1000 }}>{title}</div>
        </div>
        <div style={{ display: "flex", height: 12, borderRadius: 6, background: color }} />
      </div>
    ),
    OG_SIZE,
  );
}
