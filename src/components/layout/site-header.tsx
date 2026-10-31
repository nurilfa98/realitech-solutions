// Header menempel di atas. Layar lebar: menu sebaris. HP: tombol menu
// membuka Sheet dari kanan.

import { MenuIcon, MessageCircleIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { whatsappLink } from "@/lib/site";
import { Logo } from "./logo";
import { NAV_ITEMS } from "./nav-config";

const CONSULT_MESSAGE = "Halo Realitech, saya ingin konsultasi kebutuhan aplikasi untuk usaha saya.";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/85 backdrop-blur supports-backdrop-filter:bg-background/70">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-4">
        <Logo />
        <nav aria-label="Menu utama" className="ml-6 hidden items-center gap-1 md:flex">
          {NAV_ITEMS.map((item) => (
            <Button key={item.href} variant="ghost" nativeButton={false} render={<a href={item.href} />}>
              {item.title}
            </Button>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-1">
          <ThemeToggle />
          <Button
            className="hidden sm:inline-flex"
            nativeButton={false}
            render={<a href={whatsappLink(CONSULT_MESSAGE)} target="_blank" rel="noopener noreferrer" />}
          >
            <MessageCircleIcon />
            Konsultasi gratis
          </Button>
          <Sheet>
            <SheetTrigger render={<Button variant="ghost" size="icon" className="md:hidden" aria-label="Buka menu" />}>
              <MenuIcon />
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <nav aria-label="Menu utama" className="flex flex-col gap-1 px-4">
                {NAV_ITEMS.map((item) => (
                  <SheetClose
                    key={item.href}
                    nativeButton={false}
                    render={<a href={item.href} />}
                    className="rounded-lg px-3 py-2.5 text-base font-medium hover:bg-muted"
                  >
                    {item.title}
                  </SheetClose>
                ))}
              </nav>
              <div className="mt-auto p-4">
                <Button
                  size="lg"
                  className="w-full"
                  nativeButton={false}
                  render={<a href={whatsappLink(CONSULT_MESSAGE)} target="_blank" rel="noopener noreferrer" />}
                >
                  <MessageCircleIcon />
                  Konsultasi gratis
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
