// Identitas & kontak Realitech Solusi Digital. SATU-SATUNYA tempat mengubah nomor
// WhatsApp, email, dan alamat web; semua tombol "Konsultasi" / "Minta demo"
// membaca dari sini.

export const SITE = {
  name: "Realitech Solusi Digital",
  shortName: "Realitech",
  url: "https://realitech.id",
  // Tagline umum (tidak menyebut produk) agar tetap berlaku saat produk bertambah.
  tagline: "Digitalisasi bisnis Anda. Coba gratis.",
  description:
    "Realitech Solusi Digital membuat aplikasi bisnis yang sederhana, siap pakai, dan dibuat untuk cara kerja usaha di Indonesia.",
  // TODO: isi nomor WhatsApp bisnis (format 62..., tanpa + dan spasi).
  whatsapp: "6285714325506",
  // TODO: isi email bisnis.
  email: "halo@realitech.id",
  // Ditulis manual agar halaman tetap statis. Perbarui tiap tahun.
  copyrightYear: 2026,
} as const;

// Tautan WhatsApp click-to-chat dengan pesan pembuka.
export function whatsappLink(message: string) {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function mailtoLink(subject: string) {
  return `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}`;
}
