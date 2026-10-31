// Footer dengan id="kontak" (tujuan menu "Kontak" di semua halaman).

import { MailIcon, MessageCircleIcon } from "lucide-react";
import Link from "next/link";
import { PRODUCTS } from "@/content/products";
import { mailtoLink, SITE, whatsappLink } from "@/lib/site";
import { Logo } from "./logo";

export function SiteFooter() {
  return (
    <footer id="kontak" className="border-t bg-card">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-[1.5fr_1fr_1fr]">
        <div className="flex flex-col gap-3">
          <Logo />
          <p className="max-w-sm text-sm text-muted-foreground">
            Aplikasi bisnis siap pakai untuk usaha di Indonesia. Dibuat dan didukung langsung oleh tim lokal.
          </p>
          <div className="flex flex-col gap-2 text-sm">
            <a
              href={whatsappLink("Halo Realitech, saya ingin bertanya.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 hover:text-brand"
            >
              <MessageCircleIcon className="size-4" />
              WhatsApp {formatWhatsapp(SITE.whatsapp)}
            </a>
            <a href={mailtoLink("Pertanyaan tentang produk Realitech")} className="inline-flex items-center gap-2 hover:text-brand">
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
          {PRODUCTS.map((product) => (
            <FooterLink key={`${product.slug}-login`} href={product.appUrl}>
              Masuk ke {product.name}
            </FooterLink>
          ))}
        </FooterColumn>

        <FooterColumn title="Informasi">
          <FooterLink href="/kebijakan-privasi">Kebijakan Privasi</FooterLink>
          <FooterLink href="/syarat-layanan">Syarat Layanan</FooterLink>
        </FooterColumn>
      </div>
      <div className="border-t">
        <p className="mx-auto max-w-6xl px-4 py-5 text-xs text-muted-foreground">
          © {SITE.copyrightYear} {SITE.name}. Semua hak dilindungi.
        </p>
      </div>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm font-semibold">{title}</p>
      <ul className="flex flex-col gap-2 text-sm text-muted-foreground">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="hover:text-foreground">
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
