// Beranda realitech.id: siapa Realitech, masalah yang diselesaikan, dua
// produk, keunggulan, cara mulai, dan FAQ umum.

import {
  ArrowRightIcon,
  CloudIcon,
  HeadsetIcon,
  MessageCircleIcon,
  ShieldCheckIcon,
  SmartphoneIcon,
  TagIcon,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { ProductMockup } from "@/components/mockups/product-mockup";
import { CtaBand } from "@/components/sections/cta-band";
import { FaqList } from "@/components/sections/faq-list";
import { Section, SectionHeading } from "@/components/sections/section";
import { Button } from "@/components/ui/button";
import { PRODUCTS } from "@/content/products";
import { SITE, whatsappLink } from "@/lib/site";

const CONSULT_MESSAGE = "Halo Realitech, saya ingin konsultasi kebutuhan aplikasi untuk usaha saya.";

const STRENGTHS: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: SmartphoneIcon,
    title: "Nyaman di HP",
    description: "Dibuka lewat browser di HP maupun laptop, tanpa memasang aplikasi.",
  },
  {
    icon: CloudIcon,
    title: "Data di cloud",
    description: "Tidak perlu server sendiri. Data tersimpan online dan bisa dibuka dari mana saja.",
  },
  {
    icon: ShieldCheckIcon,
    title: "Hak akses per peran",
    description: "Pemilik, admin, dan karyawan hanya melihat yang menjadi bagiannya.",
  },
  {
    icon: MessageCircleIcon,
    title: "Terhubung WhatsApp",
    description: "Pengingat dan notifikasi penting dikirim langsung ke WhatsApp.",
  },
  {
    icon: HeadsetIcon,
    title: "Dibantu sampai jalan",
    description: "Kami bantu menyiapkan akun dan pengguna, lalu siap menjawab lewat WhatsApp.",
  },
  {
    icon: TagIcon,
    title: "Langganan jelas",
    description: "Paket 1, 6, atau 12 bulan dengan masa coba gratis. Tanpa biaya tersembunyi.",
  },
];

const STEPS = [
  { title: "Konsultasi", description: "Ceritakan cara kerja usaha Anda lewat WhatsApp. Gratis." },
  { title: "Kami siapkan akun", description: "Akun perusahaan atau toko dan pengguna pertama dibuatkan." },
  { title: "Coba gratis", description: "Pakai semua fitur selama masa coba bersama tim Anda." },
  { title: "Berlangganan", description: "Pilih paket 1, 6, atau 12 bulan bila sudah cocok." },
];

const FAQ = [
  {
    question: "Apakah data usaha saya aman?",
    answer:
      "Koneksi selalu terenkripsi (HTTPS), password disimpan dalam bentuk acak (hash), dan setiap pengguna hanya bisa membuka data sesuai perannya.",
  },
  {
    question: "Apakah perlu membeli perangkat khusus?",
    answer: "Tidak. Cukup HP atau laptop yang terhubung internet.",
  },
  {
    question: "Bagaimana cara membayar langganan?",
    answer: "Melalui transfer bank atau QRIS. Detailnya kami kirimkan saat Anda memilih paket.",
  },
  {
    question: "Apa yang terjadi bila langganan berakhir?",
    answer:
      "Pelanggan berbayar mendapat masa tenggang beberapa hari dengan pengingat. Setelah itu akses dikunci sementara, dan data tetap tersimpan sampai langganan diperpanjang. Pada masa coba gratis, akses langsung terkunci begitu masa coba habis.",
  },
];

export default function HomePage() {
  return (
    <>
      <JsonLd />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 -z-10 h-[32rem] bg-linear-to-b from-brand-soft to-transparent"
        />
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 px-4 pt-16 pb-12 text-center sm:pt-24">
          <p className="flex items-center gap-2 rounded-full border bg-background px-3 py-1 text-xs font-medium text-muted-foreground">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-brand-accent" />
            Aplikasi bisnis buatan Indonesia
          </p>
          <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-balance sm:text-6xl">
            Rapikan uang dan operasional usaha Anda, mulai dari HP
          </h1>
          <p className="max-w-2xl text-lg text-pretty text-muted-foreground">
            {SITE.name} membuat aplikasi siap pakai untuk masalah yang paling sering membuat pemilik usaha pusing:
            kasbon karyawan, nota yang tercecer, stok yang selisih, dan laba yang tidak jelas.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              size="xl"
              nativeButton={false}
              render={<a href={whatsappLink(CONSULT_MESSAGE)} target="_blank" rel="noopener noreferrer" />}
            >
              <MessageCircleIcon />
              Konsultasi gratis
            </Button>
            <Button size="xl" variant="outline" nativeButton={false} render={<a href="#produk" />}>
              Lihat produk
              <ArrowRightIcon />
            </Button>
          </div>
        </div>
      </section>

      {/* Masalah */}
      <Section className="pt-8 sm:pt-12">
        <SectionHeading
          title="Masalah yang kami bantu selesaikan"
          description="Pilih yang paling mirip dengan kondisi usaha Anda."
        />
        <div className="grid gap-4 md:grid-cols-2">
          {PRODUCTS.map((product) => (
            <div key={product.slug} className={`product-${product.slug} flex flex-col gap-4 rounded-2xl border bg-card p-6`}>
              <p className="text-sm font-semibold text-product">{product.audiences.slice(0, 3).join(" · ")}</p>
              <ul className="flex flex-col gap-3">
                {product.problems.map((item) => (
                  <li key={item.problem} className="flex gap-3 text-sm">
                    <span aria-hidden="true" className="mt-1.5 size-1.5 shrink-0 rounded-full bg-product" />
                    {item.problem}
                  </li>
                ))}
              </ul>
              <Link
                href={`/${product.slug}`}
                className="mt-auto inline-flex items-center gap-1 text-sm font-medium text-product hover:underline"
              >
                Solusinya: {product.name}
                <ArrowRightIcon className="size-4" />
              </Link>
            </div>
          ))}
        </div>
      </Section>

      {/* Produk */}
      <Section id="produk" className="bg-card">
        <SectionHeading eyebrow="Produk" title="Dua aplikasi, satu tujuan: usaha yang lebih terkendali" />
        <div className="flex flex-col gap-20">
          {PRODUCTS.map((product, index) => (
            <article
              key={product.slug}
              className={`product-${product.slug} grid items-center gap-10 lg:grid-cols-2`}
            >
              <div className={`flex flex-col gap-5 ${index % 2 === 1 ? "lg:order-2" : ""}`}>
                <div>
                  <p className="text-sm font-semibold text-product">{product.tagline}</p>
                  <h3 className="mt-1 text-3xl font-semibold tracking-tight">{product.name}</h3>
                </div>
                <p className="text-muted-foreground">{product.summary}</p>
                <ul className="grid gap-2 text-sm sm:grid-cols-2">
                  {product.features.slice(0, 6).map((feature) => (
                    <li key={feature.title} className="flex items-center gap-2">
                      <feature.icon className="size-4 shrink-0 text-product" />
                      {feature.title}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-3">
                  <Button size="lg" variant="product" nativeButton={false} render={<Link href={`/${product.slug}`} />}>
                    Pelajari {product.name}
                    <ArrowRightIcon />
                  </Button>
                  <Button size="lg" variant="outline" nativeButton={false} render={<a href={product.appUrl} />}>
                    Masuk
                  </Button>
                </div>
              </div>
              <ProductMockup slug={product.slug} className="mx-2 mb-10 sm:mx-8" />
            </article>
          ))}
        </div>
      </Section>

      {/* Keunggulan */}
      <Section>
        <SectionHeading
          eyebrow={`Kenapa ${SITE.shortName}`}
          title="Dibuat untuk cara kerja usaha di Indonesia"
          description="Bahasa Indonesia, rupiah, WhatsApp, dan HP sebagai perangkat utama."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {STRENGTHS.map((item) => (
            <div key={item.title} className="flex flex-col gap-3 rounded-2xl border bg-card p-6">
              <div className="flex size-10 items-center justify-center rounded-lg bg-brand-soft text-brand">
                <item.icon className="size-5" />
              </div>
              <p className="font-semibold">{item.title}</p>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Cara mulai */}
      <Section id="cara-mulai" className="bg-card">
        <SectionHeading title="Cara mulai" description="Dari konsultasi sampai dipakai tim Anda, tanpa ribet." />
        <ol className="grid gap-4 md:grid-cols-4">
          {STEPS.map((step, index) => (
            <li key={step.title} className="flex flex-col gap-2 rounded-2xl border bg-background p-6">
              <span className="flex size-8 items-center justify-center rounded-full bg-brand text-sm font-semibold text-brand-foreground">
                {index + 1}
              </span>
              <p className="font-semibold">{step.title}</p>
              <p className="text-sm text-muted-foreground">{step.description}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* FAQ */}
      <Section>
        <SectionHeading title="Pertanyaan yang sering diajukan" />
        <FaqList items={FAQ} />
      </Section>

      <CtaBand
        title="Ceritakan masalah usaha Anda, kami bantu carikan solusinya"
        description="Konsultasi gratis, tanpa kewajiban berlangganan."
        whatsappMessage={CONSULT_MESSAGE}
        emailSubject="Konsultasi aplikasi untuk usaha saya"
      />
    </>
  );
}

// Data terstruktur untuk mesin pencari (schema.org Organization).
function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.name,
    url: SITE.url,
    email: SITE.email,
    logo: `${SITE.url}/icon.svg`,
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
