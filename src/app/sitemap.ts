// Referensi: node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/01-metadata/sitemap.md

import type { MetadataRoute } from "next";
import { PRODUCTS } from "@/content/products";
import { SITE } from "@/lib/site";

// Tanggal terakhir isi halaman diperbarui. Ubah manual setiap kali teks halaman
// berubah, supaya Google tahu kapan harus membaca ulang.
const CONTENT_UPDATED = new Date("2026-11-24");
const LEGAL_UPDATED = new Date("2026-11-24");

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE.url, lastModified: CONTENT_UPDATED, changeFrequency: "monthly", priority: 1 },
    ...PRODUCTS.map((product) => ({
      url: `${SITE.url}/${product.slug}`,
      lastModified: CONTENT_UPDATED,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    { url: `${SITE.url}/kebijakan-privasi`, lastModified: LEGAL_UPDATED, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE.url}/syarat-layanan`, lastModified: LEGAL_UPDATED, changeFrequency: "yearly", priority: 0.3 },
  ];
}
