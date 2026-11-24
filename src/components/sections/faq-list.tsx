// FAQ memakai <details> bawaan browser: bisa dibuka/tutup tanpa JavaScript,
// dan isinya tetap terbaca mesin pencari. Semua <details> dalam satu daftar
// memakai atribut `name` yang sama, jadi membuka satu pertanyaan otomatis
// menutup yang sebelumnya (browser lama tanpa dukungan atribut ini tetap
// berfungsi, hanya tidak menutup otomatis).

import { ChevronDownIcon } from "lucide-react";
import { useId } from "react";

export function FaqList({ items }: { items: { question: string; answer: string }[] }) {
  const group = useId();
  return (
    <div className="mx-auto flex max-w-3xl flex-col divide-y rounded-3xl border bg-card px-2 shadow-sm">
      {items.map((item) => (
        <details key={item.question} name={group} className="group px-4 sm:px-5">
          <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-4 font-medium [&::-webkit-details-marker]:hidden">
            {item.question}
            <ChevronDownIcon className="size-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" />
          </summary>
          <p className="pb-4 text-sm leading-relaxed text-muted-foreground">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
