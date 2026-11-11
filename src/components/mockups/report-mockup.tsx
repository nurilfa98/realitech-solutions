// Ilustrasi halaman pertama Laporan PDF per project ArchiPay. Angkanya sama dengan
// laporan PDF asli dari data demo di aplikasi (Interior Showroom Kopi Senja, 55 nota, 3 halaman).

import { FileTextIcon } from "lucide-react";
import { formatRupiah } from "@/lib/format";
import { cn } from "@/lib/utils";
import { AppFrame } from "./app-frame";

const CATEGORIES = [
  { label: "Material Bangunan", amount: 130_840_000, share: 50.9 },
  { label: "Upah Tukang & Borongan", amount: 90_120_000, share: 35.1 },
  { label: "Konsumsi", amount: 9_220_000, share: 3.6 },
  { label: "Sewa Alat & Peralatan", amount: 8_050_000, share: 3.1 },
  { label: "5 kategori lainnya", amount: 18_615_000, share: 7.3 },
] as const;

const pct = (value: number) => `${(Math.round(value * 10) / 10).toString().replace(".", ",")}%`;

export function ReportMockup({ className }: { className?: string }) {
  const contract = 340_000_000;
  const expense = 256_845_000;
  const profit = contract - expense;
  const margin = (profit / contract) * 100;
  const used = (expense / contract) * 100;

  return (
    <div className={cn("product-archipay", className)}>
      <AppFrame url="laporan-proyek-interior-showroom-kopi-senja.pdf" label="Contoh laporan PDF per project ArchiPay">
        <div className="flex flex-col gap-4 text-sm">
          <div className="flex items-center gap-3 border-b pb-3">
            <div className="flex size-9 items-center justify-center rounded-lg bg-product text-product-foreground">
              <FileTextIcon className="size-4" />
            </div>
            <div className="min-w-0">
              <p className="truncate font-semibold">Laporan Project: Interior Showroom Kopi Senja</p>
              <p className="truncate text-xs text-muted-foreground">CV Kopi Senja Nusantara · 55 nota · Keuntungan final</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Cell label="Nilai kontrak" value={formatRupiah(contract)} />
            <Cell label="Pengeluaran" value={formatRupiah(expense)} />
            <Cell label="Keuntungan" value={formatRupiah(profit)} accent />
            <Cell label="Margin" value={pct(margin)} accent />
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Pemakaian nilai kontrak</span>
              <span className="tabular-nums">{pct(used)}</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-muted">
              <div className="h-full rounded-full bg-product" style={{ width: `${used}%` }} />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-xs font-medium text-muted-foreground">Pengeluaran per kategori</p>
            {CATEGORIES.map((category) => (
              <div key={category.label} className="flex items-center gap-3 text-xs">
                <span className="w-32 shrink-0 truncate">{category.label}</span>
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                  <div className="h-full rounded-full bg-product/70" style={{ width: `${category.share}%`, minWidth: "0.25rem" }} />
                </div>
                <span className="w-28 shrink-0 text-right tabular-nums">{formatRupiah(category.amount)}</span>
              </div>
            ))}
          </div>
        </div>
      </AppFrame>
    </div>
  );
}

function Cell({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="rounded-lg bg-muted/60 p-2.5">
      <p className="text-[0.7rem] text-muted-foreground">{label}</p>
      <p className={cn("truncate text-xs font-semibold tabular-nums sm:text-sm", accent && "text-product")}>{value}</p>
    </div>
  );
}
