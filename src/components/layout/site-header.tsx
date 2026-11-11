// Header menempel di atas. Layar lebar: "Produk" (dropdown), Cara mulai, Kontak.
// HP: tombol menu membuka panel yang turun dari header (components/layout/mobile-menu.tsx).

import { MessageCircleIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { whatsappLink } from "@/lib/site";
import { Logo } from "./logo";
import { MobileMenu } from "./mobile-menu";
import { NAV_LINKS } from "./nav-config";
import { ProductMenu } from "./product-menu";

const CONSULT_MESSAGE = "Halo Realitech, saya ingin konsultasi kebutuhan aplikasi untuk usaha saya.";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md supports-backdrop-filter:bg-background/70">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-4">
        <Logo />
        <nav aria-label="Menu utama" className="ml-4 hidden items-center gap-1 md:flex">
          <ProductMenu />
          {NAV_LINKS.map((item) => (
            <Button key={item.href} variant="ghost" nativeButton={false} render={<a href={item.href} />}>
              {item.title}
            </Button>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-1">
          <ThemeToggle />
          <Button
            className="ml-1 hidden sm:inline-flex"
            nativeButton={false}
            render={<a href={whatsappLink(CONSULT_MESSAGE)} target="_blank" rel="noopener noreferrer" />}
          >
            <MessageCircleIcon />
            Konsultasi gratis
          </Button>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
