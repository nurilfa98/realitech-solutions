// Beranda realitech.id: siapa Realitech, produk (kartu yang otomatis bertambah
// dari content/products.ts), keunggulan, cara mulai, dan FAQ umum. Teks sengaja
// umum (tidak menyebut produk tertentu) agar tetap benar saat produk bertambah.

import {
  ArrowRightIcon,
  CheckIcon,
  HeadsetIcon,
  MessageCircleIcon,
  ShieldCheckIcon,
  SmartphoneIcon,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { ProductMockup } from "@/components/mockups/product-mockup";
import { CtaBand } from "@/components/sections/cta-band";
import { FaqList } from "@/components/sections/faq-list";
import { HeroBackdrop } from "@/components/sections/hero-backdrop";
import { Section, SectionHeading } from "@/components/sections/section";
import { Button } from "@/components/ui/button";
import { PRODUCTS } from "@/content/products";
import { SITE, whatsappLink } from "@/lib/site";

const CONSULT_MESSAGE = "Halo Realitech, saya ingin konsultasi kebutuhan aplikasi untuk usaha saya.";

const STRENGTHS: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: SmartphoneIcon,
    title: "Pasang di layar HP",
    description:
      "Berbentuk PWA: bisa dipasang di layar utama dan tampil layar penuh seperti aplikasi biasa, tanpa Play Store atau App Store. Di laptop cukup dibuka dari browser.",
  },
  {
    icon: MessageCircleIcon,
    title: "Terhubung WhatsApp",
    description: "Pengingat dan notifikasi penting langsung masuk ke WhatsApp.",
  },
  {
    icon: ShieldCheckIcon,
    title: "Data aman",
    description: "Tersimpan di cloud, terpisah untuk tiap usaha, dengan hak akses sesuai peran.",
  },
  {
    icon: HeadsetIcon,
    title: "Dibantu sampai jalan",
    description: "Kami bantu menyiapkan akun dan pengguna, lalu siap menjawab lewat WhatsApp.",
  },
];

const STEPS = [
  { title: "Konsultasi", description: "Ceritakan cara kerja usaha Anda lewat WhatsApp. Gratis." },
  { title: "Siapkan akun", description: "Kami buatkan akun usaha dan pengguna pertama." },
  { title: "Coba gratis", description: "Pakai semua fitur bersama tim Anda selama masa coba." },
  { title: "Berlangganan", description: "Pilih paket 1, 6, atau 12 bulan bila sudah cocok." },
];

const FAQ = [
  {
    question: "Apakah data usaha saya aman?",
    answer:
      "Koneksi selalu terenkripsi (HTTPS), password disimpan dalam bentuk acak (hash), data tiap usaha dipisahkan, dan setiap pengguna hanya bisa membuka data sesuai perannya.",
  },
  {
    question: "Apa itu PWA? Apakah harus lewat Play Store?",
    answer:
      "PWA (Progressive Web App) adalah aplikasi web yang bisa dipasang di layar utama HP dan dibuka seperti aplikasi biasa, lengkap dengan ikon sendiri dan tampilan layar penuh. Tidak perlu lewat Play Store atau App Store. Di Android pilih \"Install app\" di browser, di iPhone pilih \"Tambahkan ke Layar Utama\" lewat Safari. Di laptop cukup dibuka dari browser.",
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
        <HeroBackdrop />
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-7 px-4 pt-16 pb-14 text-center animate-in fade-in slide-in-from-bottom-3 duration-700 sm:pt-24 sm:pb-20">
          <p className="flex items-center gap-2 rounded-full border bg-background/80 px-3.5 py-1.5 text-xs font-medium text-muted-foreground shadow-sm backdrop-blur">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-brand-accent" />
            Aplikasi bisnis buatan Indonesia
          </p>
          <h1 className="max-w-3xl text-[2.5rem] leading-[1.1] font-semibold tracking-tight text-balance sm:text-6xl sm:leading-[1.08]">
            Solusi teknologi{" "}
            <span className="relative isolate inline-block">
              <span className="relative z-10">nyata</span>
              <span aria-hidden="true" className="absolute inset-x-[-0.08em] bottom-[0.06em] -z-0 h-[0.3em] rounded-full bg-brand-accent/60" />
            </span>{" "}
            untuk usaha Anda
          </h1>
          <p className="max-w-xl text-base text-pretty text-muted-foreground sm:text-lg">
            {SITE.name} membuat aplikasi bisnis yang sederhana, siap pakai, dan dibuat untuk cara kerja usaha di
            Indonesia.
          </p>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
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
          <ul className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
            {["Coba gratis", "Dibantu setup", "Berbentuk PWA, pasang di layar HP"].map((item) => (
              <li key={item} className="flex items-center gap-1.5">
                <CheckIcon className="size-4 text-brand" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Produk */}
      <Section id="produk" className="pt-8 sm:pt-12">
        <SectionHeading
          eyebrow="Produk"
          title="Aplikasi siap pakai untuk kebutuhan usaha Anda"
          description="Setiap produk menyelesaikan satu masalah usaha dengan jelas, dan bisa dicoba gratis."
        />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {PRODUCTS.map((product) => (
            <article
              key={product.slug}
              className={`product-${product.slug} group flex flex-col overflow-hidden rounded-3xl border bg-card shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl`}
            >
              <div className="relative h-64 overflow-hidden bg-product-soft/70 px-5 pt-8 sm:px-8">
                <ProductMockup slug={product.slug} className="mx-auto max-w-md" />
                <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-20 bg-linear-to-t from-card to-transparent" />
              </div>
              <div className="flex flex-1 flex-col gap-4 p-6 sm:p-8">
                <div className="flex items-center gap-3">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-product-soft text-product">
                    <product.icon className="size-5" />
                  </span>
                  <div>
                    <h3 className="text-xl font-semibold tracking-tight">{product.name}</h3>
                    <p className="text-sm text-muted-foreground">{product.tagline}</p>
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">{product.summary}</p>
                <ul className="flex flex-wrap gap-2">
                  {product.audiences.slice(0, 3).map((audience) => (
                    <li key={audience} className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">
                      {audience}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto flex flex-col gap-3 pt-2 sm:flex-row">
                  <Button size="lg" variant="product" nativeButton={false} render={<Link href={`/${product.slug}`} />}>
                    Pelajari {product.name}
                    <ArrowRightIcon />
                  </Button>
                  <Button size="lg" variant="outline" nativeButton={false} render={<a href={product.appUrl} />}>
                    Masuk
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* Keunggulan */}
      <Section className="bg-card">
        <SectionHeading
          eyebrow={`Kenapa ${SITE.shortName}`}
          title="Dibuat untuk cara kerja usaha di Indonesia"
          description="Bahasa Indonesia, rupiah, WhatsApp, dan HP sebagai perangkat utama."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STRENGTHS.map((item) => (
            <div key={item.title} className="flex flex-col gap-3 rounded-3xl border bg-background p-6 transition duration-300 hover:shadow-md">
              <div className="flex size-11 items-center justify-center rounded-2xl bg-brand-soft text-brand">
                <item.icon className="size-5" />
              </div>
              <p className="font-semibold">{item.title}</p>
              <p className="text-sm leading-relaxed text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Cara mulai */}
      <Section id="cara-mulai">
        <SectionHeading eyebrow="Cara mulai" title="Mulai dalam empat langkah" description="Dari konsultasi sampai dipakai tim Anda." />
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, index) => (
            <li key={step.title} className="flex flex-col gap-3 rounded-3xl border bg-card p-6">
              <span className="flex size-9 items-center justify-center rounded-full bg-brand text-sm font-semibold text-brand-foreground">
                {index + 1}
              </span>
              <p className="font-semibold">{step.title}</p>
              <p className="text-sm leading-relaxed text-muted-foreground">{step.description}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* FAQ */}
      <Section className="bg-card">
        <SectionHeading eyebrow="FAQ" title="Pertanyaan yang sering diajukan" />
        <FaqList items={FAQ} />
      </Section>

      <div className="pt-16 sm:pt-24">
        <CtaBand
          title="Ceritakan masalah usaha Anda, kami bantu carikan solusinya"
          description="Konsultasi gratis, tanpa kewajiban berlangganan."
          whatsappMessage={CONSULT_MESSAGE}
          emailSubject="Konsultasi aplikasi untuk usaha saya"
        />
      </div>
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
    description: SITE.description,
    logo: `${SITE.url}/icon.svg`,
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
