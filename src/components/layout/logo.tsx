// Logo Realitech: tanda "R" dalam kotak teal + nama. Sama dengan app/icon.svg.

import Link from "next/link";
import { SITE } from "@/lib/site";

export function LogoMark({ className = "size-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={className}>
      <rect width="32" height="32" rx="8" className="fill-brand" />
      <path
        d="M10 23V9h6.5a4.5 4.5 0 0 1 1.4 8.78L22 23h-3.6l-3.6-5H13.2v5H10Zm3.2-8h3.2a1.6 1.6 0 0 0 0-3.2h-3.2V15Z"
        className="fill-brand-foreground"
      />
    </svg>
  );
}

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
      <LogoMark />
      <span>{SITE.shortName}</span>
    </Link>
  );
}
