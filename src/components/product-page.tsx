// Template halaman produk (/archipay, /sakudagang): hero + mockup, untuk
// siapa, lalu seksi-seksi (masalah → solusi, laporan, fitur, alur kerja,
// harga, FAQ) yang urutannya bisa diatur per produk lewat `sectionOrder`.
// Isi diambil dari content/products.ts.

import { ArrowRightIcon, CheckIcon, LogInIcon, MessageCircleIcon, PlusIcon, XIcon } from "lucide-react";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ProductMockup } from "@/components/mockups/product-mockup";
import { ReportMockup } from "@/components/mockups/report-mockup";
import { CtaBand } from "@/components/sections/cta-band";
import { HeroBackdrop } from "@/components/sections/hero-backdrop";
import { FaqList } from "@/components/sections/faq-list";
import { PricingTable } from "@/components/sections/pricing-table";
import { Section, SectionHeading } from "@/components/sections/section";
import { Button } from "@/components/ui/button";
import { DEFAULT_SECTION_ORDER, type Product, type ProductSectionKey } from "@/content/products";
import { formatRupiah } from "@/lib/format";
import { SITE, whatsappLink } from "@/lib/site";

export function productMetadata(product: Product): Metadata {
  return {
    title: `${product.name}: ${product.tagline}`,
    description: product.summary,
    alternates: { canonical: `/${product.slug}` },
    openGraph: { url: `/${product.slug}`, title: `${product.name} | ${SITE.name}`, description: product.summary },
  };
}

export function ProductPage({ product }: { product: Product }) {
  const demoMessage = `Halo Realitech, saya ingin mencoba ${product.name} untuk usaha saya.`;

  const sections: Record<ProductSectionKey, ReactNode> = {
    // Masalah → solusi
    problems: (
      <Section key="problems" className="bg-card">
        <SectionHeading eyebrow="Masalah & solusi" title={`Yang berubah setelah memakai ${product.name}`} />
        <div className="grid gap-4 md:grid-cols-2">
          {product.problems.map((item) => (
            <div key={item.problem} className="flex flex-col gap-4 rounded-3xl border bg-background p-6 transition-transform duration-300 ease-out motion-safe:hover:scale-[1.03] hover:shadow-lg">
              <p className="flex gap-3 text-sm text-muted-foreground">
                <XIcon className="mt-0.5 size-4 shrink-0 text-rose-500" />
                {item.problem}
              </p>
              <p className="flex gap-3 font-medium">
                <CheckIcon className="mt-0.5 size-4 shrink-0 text-product" />
                {item.solution}
              </p>
            </div>
          ))}
        </div>
      </Section>
    ),

    // Laporan (mis. PDF)
    report: product.report ? (
      <section key="report" id="laporan" className="bg-product-soft/60 py-16 sm:py-24">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-4 lg:grid-cols-2">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <p className="text-sm font-semibold text-product">{product.report.eyebrow}</p>
              <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">{product.report.title}</h2>
              <p className="text-base text-pretty text-muted-foreground sm:text-lg">{product.report.description}</p>
            </div>
            <ul className="flex flex-col gap-4">
              {product.report.contents.map((item) => (
                <li key={item.title} className="flex gap-3">
                  <CheckIcon className="mt-1 size-4 shrink-0 text-product" />
                  <p className="text-sm">
                    <span className="font-semibold">{item.title}.</span>{" "}
                    <span className="text-muted-foreground">{item.description}</span>
                  </p>
                </li>
              ))}
            </ul>
            <ul className="flex flex-col gap-1 text-sm text-muted-foreground">
              {product.report.notes.map((note) => (
                <li key={note}>· {note}</li>
              ))}
            </ul>
          </div>
          <ReportMockup className="mx-2 sm:mx-8" />
        </div>
      </section>
    ) : null,

    // Fitur
    features: (
      <Section key="features" id="fitur">
        <SectionHeading eyebrow="Fitur" title="Hanya yang Anda butuhkan, langsung ke intinya" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {product.features.map((feature) => (
            <div key={feature.title} className="flex flex-col gap-3 rounded-3xl border bg-card p-6 transition-transform duration-300 ease-out motion-safe:hover:scale-[1.03] hover:shadow-lg">
              <div className="flex size-10 items-center justify-center rounded-lg bg-product-soft text-product">
                <feature.icon className="size-5" />
              </div>
              <p className="font-semibold">{feature.title}</p>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </Section>
    ),

    // Alur kerja
    steps: (
      <Section key="steps" className="bg-card">
        <SectionHeading eyebrow="Alur kerja" title="Begini cara kerjanya" />
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-flow-col lg:auto-cols-fr lg:grid-cols-none">
          {product.steps.map((step, index) => (
            <li key={step.title} className="relative flex flex-col gap-2 rounded-3xl border bg-background p-6 transition-transform duration-300 ease-out motion-safe:hover:scale-[1.03] hover:shadow-lg">
              <span className="flex size-8 items-center justify-center rounded-full bg-product text-sm font-semibold text-product-foreground">
                {index + 1}
              </span>
              <p className="font-semibold">{step.title}</p>
              <p className="text-sm text-muted-foreground">{step.description}</p>
              {index < product.steps.length - 1 && (
                <ArrowRightIcon
                  aria-hidden="true"
                  className="absolute top-8 -right-3.5 z-10 hidden size-5 rounded-full bg-card text-muted-foreground lg:block"
                />
              )}
            </li>
          ))}
        </ol>
      </Section>
    ),

    // Harga
    pricing: (
      <Section key="pricing" id="harga">
        <SectionHeading
          eyebrow="Harga"
          title="Pilih paket langganan"
          description={
            product.pricing
              ? `Gratis ${product.trialDays} hari dengan semua fitur. Setelah itu ${formatRupiah(product.pricing.basePrice)}/bulan untuk ${product.pricing.includedUsers} pengguna${product.pricing.normalBasePrice ? ` (harga normal ${formatRupiah(product.pricing.normalBasePrice)} berlaku untuk klien baru)` : ""}, makin hemat untuk paket 6 bulan dan 1 tahun.`
              : "Harga total per periode. Makin panjang periodenya, makin hemat."
          }
        />
        <PricingTable product={product} />
        {product.addons && (
          <div className="mt-14 flex flex-col gap-6">
            <div className="mx-auto flex max-w-2xl flex-col gap-2 text-center">
              <h3 className="text-xl font-semibold tracking-tight text-balance sm:text-2xl">{product.addons.title}</h3>
              <p className="text-sm text-pretty text-muted-foreground sm:text-base">{product.addons.description}</p>
            </div>
            <div className="mx-auto grid w-full max-w-3xl gap-4 md:grid-cols-2">
              {product.addons.items.map((addon) => {
                const price = product.pricing?.addons.find((item) => item.name === addon.name)?.pricePerUserMonth;
                return (
                  <div key={addon.name} className="flex flex-col gap-3 rounded-3xl border bg-card p-6">
                    <div className="flex items-start justify-between gap-3">
                      <p className="flex items-center gap-2 font-semibold">
                        <PlusIcon className="size-4 text-product" />
                        {addon.name}
                      </p>
                      {price !== undefined && (
                        <span className="rounded-full bg-product-soft px-2.5 py-0.5 text-xs font-medium text-product tabular-nums">
                          +{formatRupiah(price)}/pengguna/bulan
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{addon.description}</p>
                    <ul className="flex flex-col gap-1.5 text-sm">
                      {addon.points.map((point) => (
                        <li key={point} className="flex gap-2">
                          <CheckIcon className="mt-0.5 size-4 shrink-0 text-product" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </Section>
    ),

    // FAQ
    faq: (
      <Section key="faq" className="bg-card">
        <SectionHeading title={`Pertanyaan tentang ${product.name}`} />
        <FaqList items={product.faq} />
      </Section>
    ),
  };

  const order = product.sectionOrder ?? DEFAULT_SECTION_ORDER;

  return (
    <div className={`product-${product.slug}`}>
      <JsonLd product={product} />

      {/* Hero (selalu paling atas) */}
      <section className="relative overflow-hidden">
        <HeroBackdrop glow="bg-product/15" />
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-4 pt-14 pb-16 animate-in fade-in slide-in-from-bottom-3 duration-700 sm:pt-20 lg:grid-cols-2">
          <div className="flex flex-col gap-6">
            <p className="w-fit rounded-full border bg-background/80 px-3.5 py-1.5 text-xs font-medium shadow-sm backdrop-blur">
              <span className="text-product">{product.name}</span>
              <span className="text-muted-foreground"> · {product.tagline}</span>
            </p>
            <h1 className="text-[2.1rem] leading-[1.12] font-semibold tracking-tight text-balance sm:text-5xl sm:leading-[1.1]">{product.hero.title}</h1>
            <p className="text-lg text-pretty text-muted-foreground">{product.hero.description}</p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                size="xl"
                variant="product"
                nativeButton={false}
                render={<a href={whatsappLink(demoMessage)} target="_blank" rel="noopener noreferrer" />}
              >
                <MessageCircleIcon />
                Coba gratis {product.trialDays} hari
              </Button>
              <Button size="xl" variant="outline" nativeButton={false} render={<a href={product.appUrl} target="_blank" rel="noopener noreferrer" />}>
                <LogInIcon />
                Masuk
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {product.audiences.map((audience) => (
                <span key={audience} className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">
                  {audience}
                </span>
              ))}
            </div>
          </div>
          <ProductMockup slug={product.slug} className="mx-2 mb-10 sm:mx-8" />
        </div>
      </section>

      {/* Seksi sesuai urutan per produk */}
      {order.map((key) => sections[key])}

      <div className="pt-16 sm:pt-24">
        <CtaBand
          title={`Siap mencoba ${product.name}?`}
          description={`Gratis ${product.trialDays} hari. Kami bantu menyiapkan akun sampai tim Anda siap memakai.`}
          whatsappMessage={demoMessage}
          emailSubject={`Ingin mencoba ${product.name}`}
        />
      </div>
    </div>
  );
}

// Data terstruktur schema.org SoftwareApplication. Harga hanya ikut bila sudah diisi.
function JsonLd({ product }: { product: Product }) {
  const prices = product.plans.flatMap((plan) => (plan.price === null ? [] : [plan.price]));
  const data = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: product.name,
    description: product.summary,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: `${SITE.url}/${product.slug}`,
    publisher: { "@type": "Organization", name: SITE.name, url: SITE.url },
    ...(prices.length > 0 && {
      offers: {
        "@type": "AggregateOffer",
        priceCurrency: "IDR",
        lowPrice: Math.min(...prices),
        highPrice: Math.max(...prices),
      },
    }),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
