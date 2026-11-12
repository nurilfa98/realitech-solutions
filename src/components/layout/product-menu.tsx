"use client";

// Menu "Produk" di header (layar lebar): klik membuka daftar produk. Daftarnya
// dari content/products.ts, jadi produk baru otomatis muncul.

import { ArrowRightIcon, ChevronDownIcon } from "lucide-react";
import Link from "next/link";
import { ProductLogo } from "@/components/product-logo";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PRODUCTS } from "@/content/products";

export function ProductMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="ghost" className="gap-1" />}>
        Produk
        <ChevronDownIcon className="size-4 text-muted-foreground transition-transform group-aria-expanded/button:rotate-180" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" sideOffset={10} className="w-88 rounded-2xl p-2 shadow-xl">
        {PRODUCTS.map((product) => (
          <DropdownMenuItem
            key={product.slug}
            render={<Link href={`/${product.slug}`} />}
            className={`product-${product.slug} cursor-pointer items-start gap-3 rounded-xl p-3`}
          >
            <ProductLogo src={product.logo} className="size-10 rounded-xl" />
            <span className="flex flex-col gap-0.5">
              <span className="text-sm font-semibold">{product.name}</span>
              <span className="text-xs whitespace-normal text-muted-foreground">{product.tagline}</span>
            </span>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem render={<Link href="/#produk" />} className="cursor-pointer gap-2 rounded-xl px-3 py-2.5 text-sm font-medium">
          Lihat semua produk
          <ArrowRightIcon className="ml-auto size-4" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
