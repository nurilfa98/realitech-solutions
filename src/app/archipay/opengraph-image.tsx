import { ARCHIPAY } from "@/content/products";
import { OG_SIZE, renderOgImage } from "@/lib/og-image";

export const alt = `${ARCHIPAY.name}: ${ARCHIPAY.tagline}`;
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  // Warna sama dengan .product-archipay di globals.css.
  return renderOgImage({ eyebrow: `${ARCHIPAY.name} · ${ARCHIPAY.tagline}`, title: ARCHIPAY.hero.title, color: "#4f46e5" });
}
