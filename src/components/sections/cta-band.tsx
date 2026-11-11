// Ajakan bertindak di akhir halaman: WhatsApp (utama) dan email.

import { MailIcon, MessageCircleIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { mailtoLink, whatsappLink } from "@/lib/site";

export function CtaBand({
  title,
  description,
  whatsappMessage,
  emailSubject,
}: {
  title: string;
  description: string;
  whatsappMessage: string;
  emailSubject: string;
}) {
  return (
    <section className="px-4 pb-16 sm:pb-24">
      <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-6 overflow-hidden rounded-[2rem] bg-product px-6 py-14 text-center text-product-foreground shadow-xl sm:px-12 sm:py-16">
        <div aria-hidden="true" className="pointer-events-none absolute -top-24 -right-16 size-72 rounded-full bg-white/10 blur-2xl" />
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-28 -left-10 size-72 rounded-full bg-white/5 blur-2xl" />
        <h2 className="relative max-w-2xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl">{title}</h2>
        <p className="relative max-w-xl text-pretty opacity-90 sm:text-lg">{description}</p>
        <div className="relative flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <Button
            size="xl"
            variant="secondary"
            nativeButton={false}
            render={<a href={whatsappLink(whatsappMessage)} target="_blank" rel="noopener noreferrer" />}
          >
            <MessageCircleIcon />
            Chat WhatsApp
          </Button>
          <Button
            size="xl"
            variant="ghost"
            className="border-current/30 text-product-foreground hover:bg-white/10 hover:text-product-foreground dark:hover:bg-black/10"
            nativeButton={false}
            render={<a href={mailtoLink(emailSubject)} />}
          >
            <MailIcon />
            Kirim email
          </Button>
        </div>
      </div>
    </section>
  );
}
