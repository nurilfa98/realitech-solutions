// Footer dengan id="kontak" (tujuan menu "Kontak" di semua halaman).
// Di HP, kolom Produk dan Informasi berdampingan; tautan dibuat cukup tinggi
// agar nyaman disentuh.

import { MailIcon, MessageCircleIcon } from "lucide-react";
import Link from "next/link";
import { PRODUCTS } from "@/content/products";
import { mailtoLink, SITE, whatsappLink } from "@/lib/site";
import { Logo } from "./logo";

export function SiteFooter() {
  return (
    <footer id="kontak" className="border-t bg-card">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-x-6 gap-y-10 px-4 py-12 md:grid-cols-[1.6fr_1fr_1fr]">
        <div className="col-span-2 flex flex-col gap-4 md:col-span-1">
          <Logo />
          <p className="max-w-sm text-sm text-muted-foreground">
            {SITE.tagline}. Dibuat dan didukung langsung oleh tim lokal.
          </p>
          <div className="flex flex-col text-sm">
            <a
              href={whatsappLink("Halo Realitech, saya ingin bertanya.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-10 items-center gap-2 hover:text-brand"
            >
              <MessageCircleIcon className="size-4" />
              WhatsApp {formatWhatsapp(SITE.whatsapp)}
            </a>
            <a href={mailtoLink("Pertanyaan tentang produk Realitech")} className="inline-flex min-h-10 items-center gap-2 hover:text-brand">
              <MailIcon className="size-4" />
              {SITE.email}
            </a>
          </div>
        </div>

        <FooterColumn title="Produk">
          {PRODUCTS.map((product) => (
            <FooterLink key={product.slug} href={`/${product.slug}`}>
              {product.name}
            </FooterLink>
          ))}
        </FooterColumn>

        <FooterColumn title="Informasi">
          <FooterLink href="/kebijakan-privasi">Kebijakan Privasi</FooterLink>
          <FooterLink href="/syarat-layanan">Syarat Layanan</FooterLink>
        </FooterColumn>
      </div>
      <div className="border-t">
        {/* pb-20 di HP: memberi ruang agar tombol WhatsApp mengambang tidak menutupi teks. */}
        <p className="mx-auto max-w-6xl px-4 pt-5 pb-20 text-xs text-muted-foreground md:pb-5">
          © {SITE.copyrightYear} {SITE.name}. Semua hak dilindungi.
        </p>
      </div>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm font-semibold">{title}</p>
      <ul className="flex flex-col text-sm text-muted-foreground">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="inline-flex min-h-10 items-center hover:text-foreground">
        {children}
      </Link>
    </li>
  );
}

// "6281234567890" → "+62 812-3456-7890"
function formatWhatsapp(number: string) {
  const local = number.replace(/^62/, "");
  return `+62 ${local.replace(/^(\d{3})(\d{4})(\d+)$/, "$1-$2-$3")}`;
}
