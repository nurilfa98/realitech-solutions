// Bingkai jendela browser untuk mockup aplikasi. Mockup adalah ilustrasi
// (role="img" + label), bukan screenshot: datanya fiktif dan bisa diganti
// gambar asli nanti.

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function AppFrame({
  url,
  label,
  className,
  children,
}: {
  url: string;
  label: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      role="img"
      aria-label={label}
      className={cn("overflow-hidden rounded-2xl border bg-background shadow-xl shadow-slate-900/10", className)}
    >
      <div className="flex items-center gap-2 border-b bg-muted/60 px-4 py-2.5" aria-hidden="true">
        <span className="size-2.5 rounded-full bg-rose-400" />
        <span className="size-2.5 rounded-full bg-amber-400" />
        <span className="size-2.5 rounded-full bg-emerald-400" />
        <span className="ml-2 truncate rounded-md bg-background px-3 py-0.5 text-xs text-muted-foreground">{url}</span>
      </div>
      <div aria-hidden="true" className="p-4 sm:p-5">
        {children}
      </div>
    </div>
  );
}
