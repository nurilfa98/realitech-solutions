// Latar hero: gradasi lembut, cahaya hangat, dan pola titik halus yang
// memudar ke bawah. Dipakai beranda dan halaman produk (warna mengikuti
// --product-soft / --product).

import { cn } from "@/lib/utils";

export function HeroBackdrop({ glow = "bg-brand-accent/15", className }: { glow?: string; className?: string }) {
  return (
    <div aria-hidden="true" className={cn("pointer-events-none absolute inset-x-0 top-0 -z-10 h-[40rem] overflow-hidden", className)}>
      <div className="absolute inset-0 bg-linear-to-b from-product-soft to-transparent" />
      <div className={cn("absolute -top-40 left-1/2 size-[34rem] -translate-x-1/2 rounded-full blur-3xl", glow)} />
      <div className="absolute inset-0 opacity-70 [background-image:radial-gradient(circle_at_1px_1px,var(--border)_1px,transparent_0)] [background-size:22px_22px] [mask-image:linear-gradient(to_bottom,black,transparent_70%)]" />
    </div>
  );
}
