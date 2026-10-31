// Root layout: header, footer, font, dan tema terang/gelap untuk semua halaman.
//
// Referensi:
// - node_modules/next/dist/docs/01-app/01-getting-started/03-layouts-and-pages.md
// - node_modules/next/dist/docs/01-app/01-getting-started/14-metadata-and-og-images.md

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { SITE } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  // Dipakai untuk mengubah URL relatif (gambar OG, canonical) menjadi absolut.
  metadataBase: new URL(SITE.url),
  title: { default: `${SITE.name} | Aplikasi bisnis untuk usaha Indonesia`, template: `%s | ${SITE.name}` },
  description: SITE.description,
  applicationName: SITE.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: SITE.name,
    url: "/",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // suppressHydrationWarning: next-themes memasang class "dark" di <html>
    // sebelum React berjalan, jadi class-nya memang berbeda dengan hasil server.
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col">
        <ThemeProvider>
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}
