// Pembungkus bagian halaman: lebar konten seragam + judul bagian.

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Section({
  id,
  className,
  children,
}: {
  id?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={cn("py-16 sm:py-24", className)}>
      <div className="mx-auto max-w-6xl px-4">{children}</div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
}) {
  return (
    <div className={cn("mb-10 flex max-w-2xl flex-col gap-3 sm:mb-14", align === "center" && "mx-auto text-center")}>
      {eyebrow && <p className="text-sm font-semibold text-product">{eyebrow}</p>}
      <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">{title}</h2>
      {description && <p className="text-base text-pretty text-muted-foreground sm:text-lg">{description}</p>}
    </div>
  );
}
