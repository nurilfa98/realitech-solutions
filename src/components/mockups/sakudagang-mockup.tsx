// Ilustrasi SakuDagang: kotak pemisahan dana + layar kasir di HP. Data fiktif.

import { MinusIcon, PlusIcon } from "lucide-react";
import { formatRupiah } from "@/lib/format";
import { cn } from "@/lib/utils";
import { AppFrame } from "./app-frame";

const CART = [
  { name: "Beras 5 kg", qty: 1, price: 74_000 },
  { name: "Minyak Goreng 1 L", qty: 2, price: 18_000 },
  { name: "Gula ½ kg", qty: 3, price: 9_500 },
] as const;

export function SakuDagangMockup({ className }: { className?: string }) {
  const total = CART.reduce((sum, item) => sum + item.qty * item.price, 0);

  return (
    <div className={cn("product-sakudagang relative", className)}>
      <AppFrame url="sakudagang.realitech.id" label="Contoh tampilan SakuDagang: pemisahan uang modal dan laba">
        <div className="flex flex-col gap-4 text-sm">
          <div>
            <p className="font-semibold">Warung Bu Sri</p>
            <p className="text-xs text-muted-foreground">Ringkasan bulan ini</p>
          </div>
          <div className="grid gap-2 sm:grid-cols-3">
            <Fund label="Uang modal" hint="harus diputar" value={18_250_000} />
            <Fund label="Uang laba" hint="boleh diambil" value={4_730_000} accent />
            <Fund label="Piutang" hint="bon belum dibayar" value={1_120_000} />
          </div>
          <div className="flex h-28 items-end gap-1.5 rounded-xl border p-3">
            {[40, 55, 35, 70, 62, 80, 58, 90, 66, 74, 85, 60].map((height, index) => (
              <div key={index} className="flex-1 rounded-t bg-product/80" style={{ height: `${height}%` }} />
            ))}
          </div>
        </div>
      </AppFrame>

      <div className="absolute -right-2 -bottom-10 w-52 rounded-3xl border-4 border-slate-900 bg-card p-3 text-xs shadow-xl sm:-right-6 dark:border-slate-700">
        <p className="mb-2 font-semibold">Kasir</p>
        <ul className="flex flex-col gap-2">
          {CART.map((item) => (
            <li key={item.name} className="flex items-center gap-2">
              <span className="min-w-0 flex-1 truncate">{item.name}</span>
              <span className="flex items-center gap-1">
                <MinusIcon className="size-3 text-muted-foreground" />
                <span className="w-3 text-center tabular-nums">{item.qty}</span>
                <PlusIcon className="size-3 text-muted-foreground" />
              </span>
            </li>
          ))}
        </ul>
        <div className="mt-3 flex justify-between border-t pt-2 font-semibold tabular-nums">
          <span>Total</span>
          <span>{formatRupiah(total)}</span>
        </div>
        <div className="mt-2 grid grid-cols-3 gap-1 text-center text-[0.65rem]">
          <span className="rounded-md bg-product py-1 text-product-foreground">Tunai</span>
          <span className="rounded-md bg-muted py-1">QRIS</span>
          <span className="rounded-md bg-muted py-1">Bon</span>
        </div>
      </div>
    </div>
  );
}

function Fund({ label, hint, value, accent }: { label: string; hint: string; value: number; accent?: boolean }) {
  return (
    <div className={cn("rounded-lg p-2.5", accent ? "bg-product-soft" : "bg-muted/60")}>
      <p className="text-xs font-medium">{label}</p>
      <p className={cn("text-sm font-semibold tabular-nums", accent && "text-product")}>{formatRupiah(value)}</p>
      <p className="text-[0.7rem] text-muted-foreground">{hint}</p>
    </div>
  );
}
