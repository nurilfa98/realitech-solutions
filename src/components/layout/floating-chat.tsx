// Tombol WhatsApp mengambang, hanya di HP (di layar lebar tombol "Konsultasi
// gratis" sudah ada di header).

import { MessageCircleIcon } from "lucide-react";
import { whatsappLink } from "@/lib/site";

export function FloatingChat() {
  return (
    <a
      href={whatsappLink("Halo Realitech, saya ingin bertanya.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat WhatsApp"
      className="fixed right-4 bottom-4 z-30 inline-flex h-12 items-center gap-2 rounded-full bg-brand px-5 text-sm font-semibold text-brand-foreground shadow-lg ring-1 ring-black/5 transition-transform active:scale-95 md:hidden"
    >
      <MessageCircleIcon className="size-5" />
      Chat
    </a>
  );
}
