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
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 16,
              background: "#0d9488",
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 40,
              fontWeight: 700,
            }}
          >
            R
          </div>
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
