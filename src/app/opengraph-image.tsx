import { OG_SIZE, renderOgImage } from "@/lib/og-image";
import { SITE } from "@/lib/site";

export const alt = `${SITE.name}: aplikasi bisnis untuk usaha Indonesia`;
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage({
    eyebrow: "ArchiPay · SakuDagang",
    title: "Rapikan uang dan operasional usaha Anda, mulai dari HP",
    color: "#0d9488",
  });
}
