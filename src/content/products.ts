// Isi halaman produk. Untuk produk baru: tambah satu objek di sini, lalu
// buat app/<slug>/page.tsx yang merender <ProductPage> (lihat app/archipay)
// dan mockup-nya di components/mockups/product-mockup.tsx.
//
// Fitur yang ditulis di sini harus SESUAI dengan yang sudah ada di aplikasi
// (docs/BUSINESS-FLOW.md di repo archipay & sakudagang). Jangan menjanjikan
// fitur yang belum dibuat.

import {
  BadgeCheckIcon,
  BellRingIcon,
  BoxesIcon,
  ChartColumnIcon,
  ClipboardCheckIcon,
  FileClockIcon,
  FileTextIcon,
  FolderKanbanIcon,
  HandCoinsIcon,
  NotebookPenIcon,
  PiggyBankIcon,
  ReceiptIcon,
  ScanLineIcon,
  ShieldCheckIcon,
  ShoppingCartIcon,
  SheetIcon,
  TruckIcon,
  UserLockIcon,
  WalletIcon,
  type LucideIcon,
} from "lucide-react";

export type ProductSlug = "archipay" | "sakudagang";

// Periode paket, sama dengan aplikasi (1, 6, 12 bulan).
export type PlanMonths = 1 | 6 | 12;

export type Product = {
  slug: ProductSlug;
  name: string;
  tagline: string;
  // Satu kalimat untuk kartu produk & meta description.
  summary: string;
  appUrl: string;
  // Untuk siapa produk ini cocok.
  audiences: string[];
  hero: { title: string; description: string };
  // Pasangan masalah → jawaban produk.
  problems: { problem: string; solution: string }[];
  features: { icon: LucideIcon; title: string; description: string }[];
  steps: { title: string; description: string }[];
  // Harga total per periode dalam rupiah. null = belum diumumkan
  // (tampil "Hubungi kami"). TODO: isi harga sebelum web dipublikasikan.
  plans: { months: PlanMonths; price: number | null }[];
  // Lama masa coba gratis (hari). TODO: sesuaikan dengan aplikasi.
  trialDays: number;
  faq: { question: string; answer: string }[];
};

export const ARCHIPAY: Product = {
  slug: "archipay",
  name: "ArchiPay",
  tagline: "Kontrol uang muka & keuntungan per project",
  summary:
    "Uang muka (kasbon) karyawan, nota, dan pertanggungjawaban tercatat rapi per project, sehingga Anda tahu persis berapa pengeluaran dan keuntungan setiap project.",
  appUrl: "https://archipay.realitech.id",
  audiences: ["Kontraktor & developer", "Konsultan arsitek & interior", "Event organizer", "Bisnis berbasis project"],
  hero: {
    title: "Setiap rupiah uang muka karyawan jelas ke mana perginya",
    description:
      "ArchiPay mencatat uang muka per project dari pencairan sampai nota terakhir diverifikasi. Sisa dana kembali tepat waktu, dan Anda melihat keuntungan setiap project tanpa rekap manual.",
  },
  problems: [
    {
      problem: "Kasbon karyawan hanya dicatat di buku atau chat WhatsApp, sulit dilacak siapa memegang berapa.",
      solution: "Setiap uang muka punya nomor, penerima, project, dan saldo yang dihitung otomatis.",
    },
    {
      problem: "Nota hilang, terlambat dilaporkan, atau ditumpuk sampai akhir bulan.",
      solution: "Karyawan memotret nota langsung dari HP, dengan batas waktu dan pengingat WhatsApp otomatis.",
    },
    {
      problem: "Sisa uang muka tidak pernah kembali, atau kekurangan karyawan tidak terganti.",
      solution: "Selisih dihitung otomatis: sisa wajib dikembalikan, kekurangan diganti, yang lewat batas masuk daftar potong gaji.",
    },
    {
      problem: "Untung atau rugi sebuah project baru ketahuan setelah project selesai.",
      solution: "Beranda Owner menampilkan nilai kontrak, pengeluaran, keuntungan, dan margin per project secara langsung.",
    },
  ],
  features: [
    {
      icon: FolderKanbanIcon,
      title: "Uang muka per project",
      description: "Owner mencairkan langsung, Finance mengusulkan, atau karyawan mengajukan sendiri dengan persetujuan Owner.",
    },
    {
      icon: BadgeCheckIcon,
      title: "Konfirmasi terima dana",
      description: "Karyawan mengonfirmasi dana yang diterima beserta pernyataan pertanggungjawabannya, tersimpan sebagai bukti.",
    },
    {
      icon: ScanLineIcon,
      title: "Nota dari HP",
      description: "Foto atau PDF nota diunggah dari HP dan dikompres otomatis. Biaya kecil tanpa nota cukup diberi alasan.",
    },
    {
      icon: ClipboardCheckIcon,
      title: "Verifikasi nota",
      description: "Finance atau Owner menyetujui atau menolak tiap nota, dan bisa mengembalikan laporan untuk diperbaiki.",
    },
    {
      icon: WalletIcon,
      title: "Saldo otomatis",
      description: "Pengembalian sisa dana dan penggantian kekurangan dicatat di buku besar, saldo selalu cocok.",
    },
    {
      icon: BellRingIcon,
      title: "Pengingat WhatsApp",
      description: "Pengingat otomatis sebelum batas unggah nota dan batas pengembalian sisa dana.",
    },
    {
      icon: HandCoinsIcon,
      title: "Potong gaji",
      description: "Sisa dana yang tidak dikembalikan tepat waktu masuk daftar potong gaji dan bisa diekspor ke Excel.",
    },
    {
      icon: ChartColumnIcon,
      title: "Keuntungan per project",
      description: "Nilai kontrak, pengeluaran per kategori dan per bulan, keuntungan, margin, serta dana yang masih beredar.",
    },
    {
      icon: FileTextIcon,
      title: "Laporan PDF per project",
      description: "Ringkasan, rincian per kategori & karyawan, dan daftar nota dalam satu dokumen siap dibagikan.",
    },
    {
      icon: FileClockIcon,
      title: "Audit log",
      description: "Riwayat siapa melakukan apa dan kapan, lengkap dengan data sebelum dan sesudah perubahan.",
    },
    {
      icon: UserLockIcon,
      title: "Hak akses per peran",
      description: "Owner, Finance, dan Karyawan hanya melihat dan melakukan yang menjadi bagiannya.",
    },
    {
      icon: ShieldCheckIcon,
      title: "Batas kasbon tertunda",
      description: "Karyawan yang masih menunggak pertanggungjawaban tidak bisa menerima uang muka baru.",
    },
  ],
  steps: [
    { title: "Uang muka dicairkan", description: "Owner atau Finance mencatat pencairan untuk karyawan di sebuah project." },
    { title: "Karyawan konfirmasi", description: "Karyawan menerima WhatsApp dan mengonfirmasi dana yang diterima." },
    { title: "Nota diunggah", description: "Setiap belanja difoto dari HP, lalu laporan dikirim sebelum batas waktu." },
    { title: "Verifikasi & selisih", description: "Nota diverifikasi, sisa dana dikembalikan atau kekurangan diganti." },
    { title: "Keuntungan terlihat", description: "Pengeluaran langsung masuk ke perhitungan keuntungan project." },
  ],
  plans: [
    { months: 1, price: null },
    { months: 6, price: null },
    { months: 12, price: null },
  ],
  trialDays: 14,
  faq: [
    {
      question: "Apakah karyawan harus memasang aplikasi?",
      answer: "Tidak. ArchiPay dibuka lewat browser di HP atau laptop, cukup login dengan email dan password.",
    },
    {
      question: "Bagaimana jika karyawan tidak menyimpan nota untuk biaya kecil?",
      answer: "Biaya kecil seperti parkir atau ojek boleh dicatat tanpa nota dengan alasan, sampai batas nominal yang Anda atur.",
    },
    {
      question: "Siapa yang bisa melihat nilai kontrak dan keuntungan?",
      answer: "Hanya Owner. Finance dan karyawan hanya melihat data uang muka sesuai perannya.",
    },
    {
      question: "Apakah data lama bisa dipindahkan?",
      answer: "Bisa dibicarakan saat konsultasi. Kami bantu menyiapkan akun, project, dan pengguna sebelum mulai dipakai.",
    },
  ],
};

export const SAKUDAGANG: Product = {
  slug: "sakudagang",
  name: "SakuDagang",
  tagline: "Kasir, stok & laba toko",
  summary:
    "Kasir di HP, stok otomatis, bon pelanggan, dan laporan laba yang memisahkan uang modal dari uang yang boleh Anda ambil.",
  appUrl: "https://sakudagang.realitech.id",
  audiences: ["Warung sembako & kelontong", "Toko bangunan", "Toko pertanian", "Toko ritel kecil"],
  hero: {
    title: "Tahu persis mana uang modal, mana uang laba",
    description:
      "SakuDagang mencatat penjualan, belanja stok, bon, dan pengeluaran toko Anda, lalu menghitung sendiri berapa uang yang harus diputar lagi dan berapa yang benar-benar untung.",
  },
  problems: [
    {
      problem: "Toko ramai, tetapi uang terasa habis dan tidak tahu ke mana.",
      solution: "Dashboard memisahkan uang modal (harus diputar), uang laba (boleh diambil), dan piutang.",
    },
    {
      problem: "Laba hanya ditebak karena harga modal berubah setiap belanja.",
      solution: "Harga modal rata-rata dihitung otomatis dari setiap pembelian, laba per transaksi langsung tercatat.",
    },
    {
      problem: "Stok sering selisih atau tiba-tiba habis.",
      solution: "Setiap barang masuk & keluar tercatat, ada daftar perlu restock, dan stok opname bulanan menghitung selisihnya.",
    },
    {
      problem: "Bon pelanggan lupa ditagih.",
      solution: "Semua bon tercatat per pelanggan, lengkap dengan sisa dan tombol tagih lewat WhatsApp.",
    },
  ],
  features: [
    {
      icon: ShoppingCartIcon,
      title: "Kasir di HP",
      description: "Cari barang, atur jumlah, bayar tunai (kembalian dihitung otomatis), QRIS, atau bon.",
    },
    {
      icon: BoxesIcon,
      title: "Stok otomatis",
      description: "Stok berkurang saat terjual dan bertambah saat belanja, dengan riwayat mutasi per barang.",
    },
    {
      icon: TruckIcon,
      title: "Pembelian & harga modal",
      description: "Catat belanja stok; harga modal rata-rata diperbarui otomatis.",
    },
    {
      icon: NotebookPenIcon,
      title: "Bon pelanggan",
      description: "Piutang per pelanggan, pelunasan bertahap, dan tagih lewat WhatsApp.",
    },
    {
      icon: ReceiptIcon,
      title: "Pengeluaran operasional",
      description: "Listrik, plastik, bensin, gaji kasir, dan biaya lain ikut mengurangi laba bersih.",
    },
    {
      icon: ClipboardCheckIcon,
      title: "Stok opname",
      description: "Cocokkan stok fisik dan sistem tiap akhir bulan; barang hilang/rusak dihitung sebagai penyusutan.",
    },
    {
      icon: PiggyBankIcon,
      title: "Pemisahan dana",
      description: "Uang modal, uang laba, dan piutang tampil terpisah di beranda pemilik.",
    },
    {
      icon: SheetIcon,
      title: "Laporan & Excel",
      description: "Laporan harian, bulanan, dan tahunan, barang terlaris, dan ekspor ke Excel.",
    },
    {
      icon: UserLockIcon,
      title: "Akun kasir",
      description: "Kasir mencatat penjualan tanpa melihat harga modal, dan tidak bisa menjual di bawah modal.",
    },
  ],
  steps: [
    { title: "Masukkan barang", description: "Nama, satuan, harga jual, dan stok awal setiap barang." },
    { title: "Catat belanja", description: "Setiap belanja stok memperbarui stok dan harga modal." },
    { title: "Jualan dari HP", description: "Kasir mencatat penjualan tunai, QRIS, atau bon." },
    { title: "Lihat laba", description: "Beranda menunjukkan uang modal, uang laba, dan piutang bulan ini." },
  ],
  plans: [
    { months: 1, price: null },
    { months: 6, price: null },
    { months: 12, price: null },
  ],
  trialDays: 14,
  faq: [
    {
      question: "Apakah perlu komputer atau mesin kasir khusus?",
      answer: "Tidak. SakuDagang dirancang untuk HP dan dibuka lewat browser, tanpa memasang aplikasi.",
    },
    {
      question: "Bagaimana kalau ada barang terjual tapi stok di sistem kosong?",
      answer: "Penjualan tetap bisa disimpan dengan peringatan. Stok diluruskan saat belanja berikutnya atau stok opname.",
    },
    {
      question: "Apakah kasir bisa melihat keuntungan toko?",
      answer: "Tidak. Kasir hanya melihat harga jual dan transaksinya sendiri; laba hanya untuk pemilik.",
    },
    {
      question: "Apakah saya bisa mencoba dulu?",
      answer: "Bisa. Setiap toko baru mendapat masa gratis sebelum memilih paket langganan.",
    },
  ],
};

export const PRODUCTS: Product[] = [ARCHIPAY, SAKUDAGANG];

export function getProduct(slug: string) {
  return PRODUCTS.find((product) => product.slug === slug);
}

export const PLAN_LABELS: Record<PlanMonths, string> = {
  1: "1 bulan",
  6: "6 bulan",
  12: "1 tahun",
};
