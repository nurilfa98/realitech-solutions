"use client";

// Menu di HP: bukan sidebar. Tombol menu membuka panel selebar layar yang turun
// dari bawah header, dengan "Produk" yang bisa dibuka (akordeon) dan tombol
// konsultasi di bawahnya. Ditutup lewat tombol X, area gelap, tombol Esc, atau
// saat salah satu tautan dipilih.

import { ArrowRightIcon, ChevronDownIcon, MenuIcon, MessageCircleIcon, XIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { PRODUCTS } from "@/content/products";
import { whatsappLink } from "@/lib/site";
import { cn } from "@/lib/utils";
import { NAV_LINKS } from "./nav-config";

const CONSULT_MESSAGE = "Halo Realitech, saya ingin konsultasi kebutuhan aplikasi untuk usaha saya.";

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const close = () => setOpen(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    // Halaman di belakang panel tidak ikut bergulir.
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <Button
        variant="ghost"
        size="icon"
        aria-label={open ? "Tutup menu" : "Buka menu"}
        aria-expanded={open}
        aria-controls="menu-hp"
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <XIcon /> : <MenuIcon />}
      </Button>

      {open && (
        <>
          {/* absolute (bukan fixed): backdrop-blur pada header membuat elemen fixed mengikuti kotak header. */}
          <div aria-hidden="true" onClick={close} className="absolute inset-x-0 top-full -z-10 h-dvh bg-foreground/30 backdrop-blur-[2px]" />
          <nav
            id="menu-hp"
            aria-label="Menu utama"
            className="absolute inset-x-0 top-full max-h-[calc(100dvh-4rem)] overflow-y-auto rounded-b-3xl border-b bg-background px-4 pt-2 pb-5 shadow-xl animate-in fade-in slide-in-from-top-2 duration-200"
          >
            <button
              type="button"
              aria-expanded={productsOpen}
              onClick={() => setProductsOpen((value) => !value)}
              className="flex min-h-12 w-full items-center justify-between rounded-2xl px-3 text-base font-medium hover:bg-muted"
            >
              Produk
              <ChevronDownIcon className={cn("size-5 text-muted-foreground transition-transform", productsOpen && "rotate-180")} />
            </button>
            <div className={cn("grid transition-[grid-template-rows] duration-300", productsOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
              <div className="overflow-hidden" inert={!productsOpen}>
                <ul className="flex flex-col gap-1 pb-2">
                  {PRODUCTS.map((product) => (
                    <li key={product.slug}>
                      <Link
                        href={`/${product.slug}`}
                        onClick={close}
                        className={`product-${product.slug} flex items-center gap-3 rounded-2xl p-3 hover:bg-muted`}
                      >
                        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-product-soft text-product">
                          <product.icon className="size-5" />
                        </span>
                        <span className="flex flex-col">
                          <span className="text-sm font-semibold">{product.name}</span>
                          <span className="text-xs text-muted-foreground">{product.tagline}</span>
                        </span>
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link
                      href="/#produk"
                      onClick={close}
                      className="flex min-h-11 items-center gap-2 rounded-2xl px-3 text-sm font-medium text-muted-foreground hover:bg-muted"
                    >
                      Lihat semua produk
                      <ArrowRightIcon className="size-4" />
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {NAV_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={close}
                className="flex min-h-12 items-center rounded-2xl px-3 text-base font-medium hover:bg-muted"
              >
                {item.title}
              </Link>
            ))}

            <Button
              size="xl"
              className="mt-3 w-full"
              nativeButton={false}
              render={<a href={whatsappLink(CONSULT_MESSAGE)} target="_blank" rel="noopener noreferrer" onClick={close} />}
            >
              <MessageCircleIcon />
              Konsultasi gratis
            </Button>
          </nav>
        </>
      )}
    </div>
  );
}
