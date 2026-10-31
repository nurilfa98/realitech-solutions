// Menu header & footer. Produk diambil dari content/products.ts agar produk
// baru otomatis muncul.

import { PRODUCTS } from "@/content/products";

export const NAV_ITEMS = [
  ...PRODUCTS.map((product) => ({ title: product.name, href: `/${product.slug}` })),
  { title: "Cara mulai", href: "/#cara-mulai" },
  { title: "Kontak", href: "#kontak" },
];
