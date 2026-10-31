// Identitas & kontak Realitech Solutions. SATU-SATUNYA tempat mengubah nomor
// WhatsApp, email, dan alamat web; semua tombol "Konsultasi" / "Minta demo"
// membaca dari sini.

export const SITE = {
  name: "Realitech Solutions",
  shortName: "Realitech",
  url: "https://realitech.id",
  description:
    "Realitech Solutions membuat aplikasi bisnis siap pakai untuk usaha di Indonesia: ArchiPay untuk kontrol uang muka & keuntungan per project, SakuDagang untuk kasir, stok, dan laba toko.",
  // TODO: isi nomor WhatsApp bisnis (format 62..., tanpa + dan spasi).
  whatsapp: "6280000000000",
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
