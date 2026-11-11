import { OG_SIZE, renderOgImage } from "@/lib/og-image";
import { SITE } from "@/lib/site";

export const alt = `${SITE.name}: ${SITE.tagline}`;
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage({
    eyebrow: SITE.tagline,
    title: "Aplikasi bisnis yang sederhana dan siap pakai untuk usaha Indonesia",
    color: "#0b2545",
  });
}
