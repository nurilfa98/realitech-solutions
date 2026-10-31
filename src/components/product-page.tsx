// Template halaman produk (/archipay, /sakudagang): hero + mockup, untuk
// siapa, masalah → solusi, fitur, alur kerja, harga, FAQ, ajakan bertindak.
// Isi diambil dari content/products.ts.

import { ArrowRightIcon, CheckIcon, LogInIcon, MessageCircleIcon, XIcon } from "lucide-react";
import type { Metadata } from "next";
import { ProductMockup } from "@/components/mockups/product-mockup";
import { CtaBand } from "@/components/sections/cta-band";
import { FaqList } from "@/components/sections/faq-list";
import { PricingTable } from "@/components/sections/pricing-table";
import { Section, SectionHeading } from "@/components/sections/section";
import { Button } from "@/components/ui/button";
import type { Product } from "@/content/products";
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

  return (
    <div className={`product-${product.slug}`}>
      <JsonLd product={product} />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 -z-10 h-[36rem] bg-linear-to-b from-product-soft to-transparent"
        />
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 pt-14 pb-16 sm:pt-20 lg:grid-cols-2">
          <div className="flex flex-col gap-6">
            <p className="w-fit rounded-full border bg-background px-3 py-1 text-xs font-medium">
              <span className="text-product">{product.name}</span>
              <span className="text-muted-foreground"> · {product.tagline}</span>
            </p>
            <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl">{product.hero.title}</h1>
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
              <Button size="xl" variant="outline" nativeButton={false} render={<a href={product.appUrl} />}>
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

      {/* Masalah → solusi */}
      <Section className="bg-card">
        <SectionHeading
          eyebrow="Masalah & solusi"
          title={`Yang berubah setelah memakai ${product.name}`}
        />
        <div className="grid gap-4 md:grid-cols-2">
          {product.problems.map((item) => (
            <div key={item.problem} className="flex flex-col gap-4 rounded-2xl border bg-background p-6">
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

      {/* Fitur */}
      <Section id="fitur">
        <SectionHeading eyebrow="Fitur" title="Semua yang dibutuhkan, tanpa yang tidak perlu" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {product.features.map((feature) => (
            <div key={feature.title} className="flex flex-col gap-3 rounded-2xl border bg-card p-6">
              <div className="flex size-10 items-center justify-center rounded-lg bg-product-soft text-product">
                <feature.icon className="size-5" />
              </div>
              <p className="font-semibold">{feature.title}</p>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Alur kerja */}
      <Section className="bg-card">
        <SectionHeading eyebrow="Alur kerja" title="Begini cara kerjanya" />
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-flow-col lg:auto-cols-fr lg:grid-cols-none">
          {product.steps.map((step, index) => (
            <li key={step.title} className="relative flex flex-col gap-2 rounded-2xl border bg-background p-6">
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

      {/* Harga */}
      <Section id="harga">
        <SectionHeading
          eyebrow="Harga"
          title="Pilih paket langganan"
          description="Harga total per periode. Makin panjang periodenya, makin hemat."
        />
        <PricingTable product={product} />
      </Section>

      {/* FAQ */}
      <Section className="bg-card">
        <SectionHeading title={`Pertanyaan tentang ${product.name}`} />
        <FaqList items={product.faq} />
      </Section>

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
