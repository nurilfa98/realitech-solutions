// Ilustrasi ArchiPay: ringkasan keuangan satu project + daftar nota +
// pengingat WhatsApp. Data fiktif.

import { BellRingIcon, Building2Icon, CheckIcon, ClockIcon, XIcon } from "lucide-react";
import { formatRupiah } from "@/lib/format";
import { cn } from "@/lib/utils";
import { AppFrame } from "./app-frame";

const NOTES = [
  { label: "Semen 40 sak", category: "Material", amount: 2_600_000, status: "ok" },
  { label: "Upah tukang minggu 2", category: "Tenaga kerja", amount: 3_500_000, status: "ok" },
  { label: "Sewa molen", category: "Peralatan", amount: 450_000, status: "wait" },
  { label: "Bensin & parkir", category: "Transport", amount: 85_000, status: "rejected" },
] as const;

export function ArchiPayMockup({ className }: { className?: string }) {
  const contract = 185_000_000;
  const expense = 112_400_000;
  const used = Math.round((expense / contract) * 100);

  return (
    <div className={cn("product-archipay relative", className)}>
      <AppFrame url="archipay.realitech.id/projects" label="Contoh tampilan ArchiPay: keuangan project dan daftar nota">
        <div className="flex flex-col gap-4 text-sm">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-product text-product-foreground">
              <Building2Icon className="size-5" />
            </div>
            <div className="min-w-0">
              <p className="truncate font-semibold">Renovasi Ruko Blok A</p>
              <p className="truncate text-xs text-muted-foreground">PT Contoh Sejahtera</p>
            </div>
            <span className="ml-auto rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
              Aktif
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <Kpi label="Nilai kontrak" value={formatRupiah(contract)} />
            <Kpi label="Pengeluaran" value={formatRupiah(expense)} />
            <Kpi label="Keuntungan" value={formatRupiah(contract - expense)} accent />
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Pemakaian nilai kontrak</span>
              <span className="tabular-nums">{used}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-muted">
              <div className="h-full rounded-full bg-product" style={{ width: `${used}%` }} />
            </div>
          </div>

          <div className="rounded-xl border">
            <p className="border-b px-3 py-2 text-xs font-medium text-muted-foreground">PJ-2026-11-0007 · Budi</p>
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
          <span className="font-semibold">WhatsApp:</span> Batas unggah nota UM-2026-11-0012 tinggal 1 hari.
        </p>
      </div>
    </div>
  );
}

function Kpi({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="rounded-lg bg-muted/60 p-2.5">
      <p className="text-[0.7rem] text-muted-foreground">{label}</p>
      <p className={cn("truncate text-xs font-semibold tabular-nums sm:text-sm", accent && "text-product")}>{value}</p>
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
