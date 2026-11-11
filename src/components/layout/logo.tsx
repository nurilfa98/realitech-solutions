// Logo Realitech Solutions: huruf R geometris dengan simpul amber di ujung kaki ("R." = solusi yang tuntas).
// Warna identitas tetap (bukan token tema): navy #0B2545 = kokoh & tepercaya, amber #F5A623 = solusi yang menyala.
// Mode gelap memakai kotak terang agar tetap terbaca. Sama dengan app/icon.svg dan public/brand/realitech-mark.svg. Lockup bertulisan ada di public/brand/realitech-logo*.svg.

import Link from "next/link";
import { SITE } from "@/lib/site";

export function LogoMark({ className = "size-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" className={className}>
      <rect width="48" height="48" rx="12" className="fill-[#0b2545] dark:fill-[#f8fafc]" />
      <path
        d="M15 37V11h10.5a8 8 0 0 1 0 16H15"
        fill="none"
        strokeWidth="5.4"
        strokeLinejoin="round"
        className="stroke-white dark:stroke-[#0b2545]"
      />
      <path d="M25 27l8 10" fill="none" strokeWidth="5.4" className="stroke-white dark:stroke-[#0b2545]" />
      <circle cx="37.5" cy="37" r="4.4" className="fill-[#f5a623]" />
    </svg>
  );
}

export function Logo() {
  return (
    <Link href="/" aria-label={SITE.name} className="flex items-center gap-2.5">
      <LogoMark className="size-9" />
      <span className="flex flex-col gap-1 leading-none">
        <span className="text-[1.15rem] font-semibold tracking-tight">{SITE.shortName}</span>
        <span className="text-[0.5625rem] font-medium tracking-[0.26em] text-muted-foreground uppercase">Solutions</span>
      </span>
    </Link>
  );
}
