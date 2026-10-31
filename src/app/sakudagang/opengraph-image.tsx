import { SAKUDAGANG } from "@/content/products";
import { OG_SIZE, renderOgImage } from "@/lib/og-image";

export const alt = `${SAKUDAGANG.name}: ${SAKUDAGANG.tagline}`;
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  // Warna sama dengan .product-sakudagang di globals.css.
  return renderOgImage({ eyebrow: `${SAKUDAGANG.name} · ${SAKUDAGANG.tagline}`, title: SAKUDAGANG.hero.title, color: "#0369a1" });
}
