// Tabel paket 1/6/12 bulan. Harga = total per periode (sama dengan aplikasi);
// "setara per bulan" dan "hemat %" dihitung dari paket 1 bulan.
// Harga null tampil "Hubungi kami".

import { CheckIcon, MessageCircleIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PLAN_LABELS, type Product } from "@/content/products";
import { formatRupiah } from "@/lib/format";
import { whatsappLink } from "@/lib/site";
import { cn } from "@/lib/utils";

export function PricingTable({ product }: { product: Product }) {
  const monthly = product.plans.find((plan) => plan.months === 1)?.price ?? null;

  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-4 md:grid-cols-3">
        {product.plans.map((plan) => {
          const highlighted = plan.months === 12;
          const savings =
            plan.price !== null && monthly && plan.months > 1
              ? Math.round(((monthly * plan.months - plan.price) / (monthly * plan.months)) * 100)
              : null;
          const message = `Halo Realitech, saya tertarik ${product.name} paket ${PLAN_LABELS[plan.months]}.`;
          return (
            <div
              key={plan.months}
              className={cn(
                "relative flex flex-col gap-5 rounded-2xl border bg-card p-6",
                highlighted && "border-product ring-1 ring-product",
              )}
            >
              {highlighted && (
                <span className="absolute -top-3 left-6 rounded-full bg-product px-3 py-0.5 text-xs font-medium text-product-foreground">
                  Paling hemat
                </span>
              )}
              <div className="flex flex-col gap-1">
                <p className="font-medium">{PLAN_LABELS[plan.months]}</p>
                {plan.price === null ? (
                  <p className="text-2xl font-semibold tracking-tight">Hubungi kami</p>
                ) : (
                  <>
                    <p className="text-3xl font-semibold tracking-tight tabular-nums">{formatRupiah(plan.price)}</p>
                    {plan.months > 1 && (
                      <p className="text-sm text-muted-foreground tabular-nums">
                        Setara {formatRupiah(Math.round(plan.price / plan.months))}/bulan
                        {savings !== null && savings > 0 && ` · hemat ${savings}%`}
                      </p>
                    )}
                  </>
                )}
              </div>
              <ul className="flex flex-col gap-2 text-sm">
                {["Semua fitur aplikasi", "Bantuan setup akun & pengguna", "Dukungan via WhatsApp"].map(
                  (benefit) => (
                    <li key={benefit} className="flex items-center gap-2">
                      <CheckIcon className="size-4 text-product" />
                      {benefit}
                    </li>
                  ),
                )}
              </ul>
              <Button
                className="mt-auto"
                size="lg"
                variant={highlighted ? "product" : "outline"}
                nativeButton={false}
                render={<a href={whatsappLink(message)} target="_blank" rel="noopener noreferrer" />}
              >
                <MessageCircleIcon />
                Pilih paket
              </Button>
            </div>
          );
        })}
      </div>
      <p className="text-center text-sm text-muted-foreground">
        Gratis {product.trialDays} hari untuk mencoba. Harga belum termasuk PPN bila berlaku. Kebutuhan khusus? Hubungi
        kami untuk penawaran.
      </p>
    </div>
  );
}
