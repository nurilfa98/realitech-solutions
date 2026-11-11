# Realitech Solutions — realitech.id

Web profil & showcase produk Realitech Solutions: **ArchiPay**
(archipay.realitech.id) dan **SakuDagang** (sakudagang.realitech.id).
Semua halaman statis (tanpa database), dibuat dengan Next.js 16, Tailwind v4,
dan komponen shadcn (Base UI), sama dengan kedua aplikasinya.

## Menjalankan

```bash
pnpm install
pnpm dev        # http://localhost:3000
```

| Perintah | Kegunaan |
|---|---|
| `pnpm dev` | Server development |
| `pnpm build` | Build production (semua halaman jadi HTML statis) |
| `pnpm typecheck` | Cek tipe TypeScript |
| `pnpm lint` | Cek kode dengan ESLint |

## Yang wajib diisi sebelum dipublikasikan

| Apa | File |
|---|---|
| Nomor WhatsApp & email bisnis | `src/lib/site.ts` (`whatsapp`, `email`) |
| Harga paket 1/6/12 bulan per produk (`null` = "Hubungi kami") | `src/content/products.ts` (`plans`) |
| Lama masa coba gratis per produk | `src/content/products.ts` (`trialDays`) |
| Isi Kebijakan Privasi & Syarat Layanan (masih **draf**) | `src/app/kebijakan-privasi/page.tsx`, `src/app/syarat-layanan/page.tsx` |

## Struktur

```
src/
├── app/
│   ├── page.tsx                 # Beranda
│   ├── archipay/, sakudagang/   # Halaman produk + gambar OG masing-masing
│   ├── kebijakan-privasi/, syarat-layanan/
│   ├── sitemap.ts, robots.ts, icon.svg, opengraph-image.tsx
│   └── globals.css              # Warna Realitech (navy + amber) & warna tiap produk
├── components/
│   ├── layout/                  # Header, footer (id="kontak"), logo, menu
│   ├── sections/                # Judul bagian, harga, FAQ, ajakan bertindak
│   ├── mockups/                 # Ilustrasi tampilan aplikasi (data fiktif)
│   └── product-page.tsx         # Template halaman produk
├── content/products.ts          # SEMUA isi produk: masalah, fitur, alur, harga, FAQ
└── lib/                         # site.ts (kontak), format, og-image
```

Isi fitur di `content/products.ts` harus sesuai dengan yang benar-benar ada di
aplikasi (lihat `docs/BUSINESS-FLOW.md` di repo archipay & sakudagang).

Mockup di `components/mockups/` bisa diganti screenshot asli: simpan gambar di
`public/` lalu pakai `next/image` di `ProductMockup`.

## Deploy (Vercel)

1. Import repo ini di Vercel (framework Next.js terdeteksi otomatis).
2. Tambahkan domain `realitech.id` (dan `www.realitech.id` → redirect ke
   `realitech.id`) di **Settings → Domains**, lalu atur DNS sesuai petunjuk Vercel.
3. Subdomain `archipay.` dan `sakudagang.` tetap mengarah ke proyek masing-masing.
4. Tidak ada environment variable yang perlu diisi (semua halaman statis, tanpa database).
5. Wilayah (region) diatur di `vercel.json` (`sin1` = Singapura, sama dengan ArchiPay dan SakuDagang).
   Halaman statis tetap disajikan dari CDN global; region hanya menentukan lokasi fungsi server bila kelak
   ada (mis. rute API). Setelah deploy, cek di **Settings → Functions** bahwa region-nya Singapore.
