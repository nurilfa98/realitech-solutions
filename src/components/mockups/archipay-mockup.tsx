// Ilustrasi ArchiPay: ringkasan keuangan satu proyek + daftar nota +
// pengingat WhatsApp. Angka sama dengan data demo di aplikasi (scripts/seed-demo-proyek.mjs).

import { BellRingIcon, Building2Icon, CheckIcon, ClockIcon, FileTextIcon, XIcon } from "lucide-react";
import { formatRupiah } from "@/lib/format";
import { cn } from "@/lib/utils";
import { AppFrame } from "./app-frame";

const NOTES = [
  { label: "Katering & snack acara serah terima", category: "Konsumsi", amount: 3_750_000, status: "ok" },
  { label: "Cetak & jilid laporan akhir proyek", category: "ATK & Fotokopi", amount: 925_000, status: "ok" },
  { label: "Sewa scissor lift 5 hari", category: "Sewa Alat & Peralatan", amount: 2_750_000, status: "wait" },
  { label: "Parkir lokasi klien", category: "Parkir & Tol", amount: 30_000, status: "rejected" },
] as const;

// Angka ringkas ("Rp 340 jt") agar tidak terpotong di layar sempit.
const juta = (value: number) => `Rp ${new Intl.NumberFormat("id-ID", { maximumFractionDigits: 1 }).format(value / 1_000_000)} jt`;
const pct = (value: number) => `${(Math.round(value * 10) / 10).toString().replace(".", ",")}%`;

export function ArchiPayMockup({ className }: { className?: string }) {
  const contract = 340_000_000;
  const expense = 256_845_000;
  const used = (expense / contract) * 100;

  return (
    <div className={cn("product-archipay relative", className)}>
      <AppFrame url="archipay.realitech.id/projects" label="Contoh tampilan ArchiPay: keuangan proyek dan daftar nota (data demo)">
        <div className="flex flex-col gap-4 text-sm">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-product text-product-foreground">
              <Building2Icon className="size-5" />
            </div>
            <div className="min-w-0">
              <p className="truncate font-semibold">Interior Showroom Kopi Senja</p>
              <p className="truncate text-xs text-muted-foreground">CV Kopi Senja Nusantara</p>
            </div>
            <span className="ml-auto flex shrink-0 flex-col items-end gap-1 sm:flex-row sm:items-center sm:gap-1.5">
              <span className="flex items-center gap-1 rounded-md border px-2 py-0.5 text-xs font-medium">
                <FileTextIcon className="size-3" />
                PDF
              </span>
              <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                Selesai
              </span>
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <Kpi label="Nilai kontrak" value={juta(contract)} />
            <Kpi label="Pengeluaran" value={juta(expense)} />
            <Kpi label="Untung (final)" value={juta(contract - expense)} accent />
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

          <div className="rounded-xl border">
            <p className="border-b px-3 py-2 text-xs font-medium text-muted-foreground">PJ-2026-10-009 · Siti Rahma</p>
            <ul className="divide-y">
              {NOTES.map((note) => (
                <li key={note.label} className="flex items-center gap-3 px-3 py-2">
                  <NoteStatus status={note.status} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium">{note.label}</p>
                    <p className="text-xs text-muted-foreground">{note.category}</p>
                  </div>
                  <span className="tabular-nums">{formatRupiah(note.amount)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </AppFrame>

      <div className="absolute -bottom-6 -left-2 flex max-w-64 items-start gap-2 rounded-xl border bg-card p-3 text-xs shadow-lg sm:-left-8">
        <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white">
          <BellRingIcon className="size-3.5" />
        </div>
        <p>
          <span className="font-semibold">WhatsApp:</span> Batas unggah nota UM-2026-11-012 tinggal 1 hari.
        </p>
      </div>
    </div>
  );
}

function Kpi({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="rounded-lg bg-muted/60 p-2 sm:p-2.5">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className={cn("text-[0.8rem] font-semibold whitespace-nowrap tabular-nums sm:text-sm", accent && "text-product")}>{value}</p>
    </div>
  );
}

function NoteStatus({ status }: { status: "ok" | "wait" | "rejected" }) {
  const styles = {
    ok: { icon: CheckIcon, className: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300" },
    wait: { icon: ClockIcon, className: "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300" },
    rejected: { icon: XIcon, className: "bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300" },
  }[status];
  const Icon = styles.icon;
  return (
    <span className={cn("flex size-6 shrink-0 items-center justify-center rounded-full", styles.className)}>
      <Icon className="size-3.5" />
    </span>
  );
}
