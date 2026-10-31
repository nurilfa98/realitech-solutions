// Referensi: node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/01-metadata/sitemap.md

import type { MetadataRoute } from "next";
import { PRODUCTS } from "@/content/products";
import { SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE.url, changeFrequency: "monthly", priority: 1 },
    ...PRODUCTS.map((product) => ({
      url: `${SITE.url}/${product.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    { url: `${SITE.url}/kebijakan-privasi`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE.url}/syarat-layanan`, changeFrequency: "yearly", priority: 0.3 },
  ];
}
