// Logo aplikasi produk (ikon yang sama dengan ikon aplikasi saat dipasang di
// layar HP). Dipakai di menu Produk, menu HP, dan kartu produk. Gambarnya
// diambil dari `product.logo` di content/products.ts, jadi produk baru tinggal
// menambah file di public/brand.

import Image from "next/image";
import { cn } from "@/lib/utils";

export function ProductLogo({ src, className }: { src: string; className?: string }) {
  return <Image src={src} alt="" width={96} height={96} className={cn("shrink-0", className)} />;
}
