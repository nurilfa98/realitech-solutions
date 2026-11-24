// Isi halaman produk. Untuk produk baru: tambah satu objek di sini, lalu
// buat app/<slug>/page.tsx yang merender <ProductPage> (lihat app/archipay)
// dan mockup-nya di components/mockups/product-mockup.tsx.
//
// Fitur yang ditulis di sini harus SESUAI dengan yang sudah ada di aplikasi
// (docs/BUSINESS-FLOW.md di repo archipay & sakudagang). Jangan menjanjikan
// fitur yang belum dibuat.

import {
  BellRingIcon,
  BoxesIcon,
  ChartColumnIcon,
  ClipboardCheckIcon,
  FileClockIcon,
  FileTextIcon,
  FolderKanbanIcon,
  KeyRoundIcon,
  NotebookPenIcon,
  PiggyBankIcon,
  ReceiptIcon,
  ScanLineIcon,
  ShoppingCartIcon,
  SheetIcon,
  SmartphoneIcon,
  TruckIcon,
  Undo2Icon,
  UserLockIcon,
  WalletIcon,
  type LucideIcon,
} from "lucide-react";

import { formatRupiah } from "@/lib/format";

export type ProductSlug = "archipay" | "sakudagang";

// Seksi yang bisa diatur urutannya per produk (lihat `sectionOrder`).
export type ProductSectionKey = "problems" | "report" | "features" | "usecases" | "steps" | "pricing" | "faq";

export const DEFAULT_SECTION_ORDER: ProductSectionKey[] = ["problems", "report", "features", "steps", "pricing", "faq"];

// Periode paket, sama dengan aplikasi (1, 6, 12 bulan).
export type PlanMonths = 1 | 6 | 12;

export type Product = {
  slug: ProductSlug;
  name: string;
  // Logo aplikasi (file di public/brand) untuk menu Produk dan kartu produk.
  logo: string;
  tagline: string;
  // Satu kalimat untuk kartu produk & meta description.
  summary: string;
  appUrl: string;
  // Judul dan deskripsi untuk mesin pencari dan pratinjau tautan. Memuat frasa yang
  // dicari orang (mis. "aplikasi kasir dan stok toko"). Bila kosong, memakai nama + tagline dan summary.
  seo?: { title: string; description: string };
  // Untuk siapa produk ini cocok.
  audiences: string[];
  hero: { title: string; description: string };
  // Pasangan masalah → jawaban produk.
  problems: { problem: string; solution: string }[];
  features: { icon: LucideIcon; title: string; description: string }[];
  // Jenis usaha yang cocok memakai produk ini (opsional, seksi "usecases").
  useCases?: { title: string; description: string; examples: string[] }[];
  // Judul dan syarat singkat di atas seksi "usecases". Opsional.
  useCasesIntro?: { title: string; description: string };
  // Kalimat pembuka seksi harga untuk produk tanpa model harga per pengguna. Opsional.
  pricingIntro?: string;
  steps: { title: string; description: string }[];
  // Harga total per periode dalam rupiah. null = belum diumumkan
  // (tampil "Hubungi kami"). TODO: isi harga sebelum web dipublikasikan.
  // normalPrice (opsional) = harga normal yang dicoret saat `price` adalah harga perkenalan.
  plans: { months: PlanMonths; price: number | null; normalPrice?: number | null }[];
  // Model harga per pengguna (bila ada): ditampilkan di bawah kartu paket.
  pricing?: {
    basePrice: number;
    // Harga normal per bulan di masa depan; bila ada, harga basePrice tampil sebagai harga perkenalan.
    normalBasePrice?: number;
    includedUsers: number;
    extraUserPrice: number;
    discountPercent: { 6: number; 12: number };
    addons: { name: string; pricePerUserMonth: number }[];
  };
  // Bagian khusus hasil akhir (mis. laporan PDF). Opsional.
  report?: {
    eyebrow: string;
    title: string;
    description: string;
    contents: { title: string; description: string }[];
  };
  // Add-on opsional (harga per pengguna ada di `pricing.addons`, dicocokkan lewat nama).
  addons?: {
    title: string;
    description: string;
    items: { name: string; description: string; points: string[] }[];
  };
  // Lama masa coba gratis (hari). TODO: sesuaikan dengan aplikasi.
  trialDays: number;
  faq: { question: string; answer: string }[];
  // Urutan seksi di halaman produk. Bila kosong, memakai DEFAULT_SECTION_ORDER.
  sectionOrder?: ProductSectionKey[];
  // Keunggulan tambahan yang ikut tampil di setiap kartu paket.
  planBenefits?: string[];
};

// Model harga ArchiPay, sama dengan aplikasi (docs/BUSINESS-FLOW.md bagian 17.1 & 17.6):
//   harga per bulan = harga dasar + max(0, pengguna - termasuk) x harga per pengguna tambahan
//   paket N bulan   = harga per bulan x N x (100 - diskon N bulan) / 100
// Angka dicocokkan dengan halaman Langganan aplikasi (10 Nov 2026): harga normal Rp299.000 untuk 10 pengguna,
// harga perkenalan Rp199.000 (di aplikasi: "Harga khusus" per company), tambahan pengguna Rp10.000,
// add-on Absensi Rp7.500 dan Penggajian Rp5.000 per pengguna per bulan, diskon 10% (6 bln) dan 20% (1 thn).
const ARCHIPAY_PRICING: NonNullable<Product["pricing"]> = {
  basePrice: 199_000,
  normalBasePrice: 299_000,
  includedUsers: 10,
  extraUserPrice: 10_000,
  discountPercent: { 6: 10, 12: 20 },
  addons: [
    { name: "Absensi", pricePerUserMonth: 7_500 },
    { name: "Penggajian", pricePerUserMonth: 5_000 },
  ],
};

function archipayPlanPrice(months: PlanMonths, monthlyBase: number = ARCHIPAY_PRICING.basePrice) {
  const discount = months === 1 ? 0 : ARCHIPAY_PRICING.discountPercent[months];
  return Math.round((monthlyBase * months * (100 - discount)) / 100);
}

export const ARCHIPAY: Product = {
  slug: "archipay",
  name: "ArchiPay",
  logo: "/brand/archipay-icon.png",
  tagline: "Uang muka terkendali, untung proyek terlihat",
  summary:
    "Pantau uang muka karyawan dari saat diserahkan sampai nota dan sisa dananya lunas, lalu lihat untung proyek dari nota yang sudah disetujui.",
  appUrl: "https://archipay.realitech.id",
  seo: {
    title: "ArchiPay: Aplikasi Uang Muka dan Nota Proyek",
    description:
      "Aplikasi uang muka dan nota proyek: pantau uang muka karyawan sampai lunas, nota dari HP, pengingat WhatsApp, dan untung tiap proyek. Coba gratis 30 hari.",
  },
  audiences: ["Owner yang memberi uang muka ke tim lapangan", "Kontraktor & developer", "Event organizer", "Konsultan arsitek & interior"],
  hero: {
    title: "Kirim uang ke lapangan tanpa kehilangan jejaknya",
    description:
      "ArchiPay mencatat setiap uang muka sejak diserahkan sampai nota terakhir diverifikasi. Ada batas waktu dan pengingat WhatsApp, sisa dana yang belum kembali terus ditagih sampai lunas, dan untung proyek ikut terlihat dari nota yang sudah disetujui.",
  },
  problems: [
    {
      problem: "Uang muka sudah diserahkan ke karyawan, tetapi nota dan sisa dananya tidak jelas.",
      solution: "Setiap uang muka punya batas waktu nota dan pengembalian. Karyawan diingatkan lewat WhatsApp, sisa dan kekurangan dihitung otomatis, dan sisa yang lewat batas masuk daftar potong gaji.",
    },
    {
      problem: "Nota tercecer di chat, fotonya tidak lengkap, dan sulit dicari saat diperiksa.",
      solution: "Karyawan memotret nota dari HP. Setiap nota tersimpan per proyek dan per karyawan, dengan jejak siapa mengubah apa.",
    },
    {
      problem: "Owner baru tahu untung atau rugi proyek setelah proyek selesai.",
      solution: "Nota yang sudah disetujui langsung masuk pengeluaran. Beranda menampilkan untung dan margin tiap proyek, dengan peringatan saat pengeluaran mendekati nilai kontrak.",
    },
    {
      problem: "Owner harus mengejar karyawan satu per satu soal nota dan pengembalian.",
      solution: "Pengingat WhatsApp berjalan otomatis. Karyawan yang masih menunggak nota tidak bisa menerima uang muka baru.",
    },
  ],
  features: [
    {
      icon: FolderKanbanIcon,
      title: "Uang muka per proyek",
      description: "Owner mencairkan langsung, Finance mengusulkan, atau karyawan mengajukan dengan persetujuan Owner. Selalu terikat ke satu proyek.",
    },
    {
      icon: ScanLineIcon,
      title: "Nota dari HP",
      description: "Karyawan memotret nota dan mengunggahnya dari HP. Biaya kecil seperti parkir boleh tanpa nota, cukup diberi alasan.",
    },
    {
      icon: ClipboardCheckIcon,
      title: "Verifikasi nota",
      description: "Finance atau Owner menyetujui atau menolak tiap nota, atau mengembalikan laporan untuk diperbaiki. Hanya nota yang disetujui dihitung sebagai pengeluaran.",
    },
    {
      icon: ChartColumnIcon,
      title: "Keuntungan & margin per proyek",
      description: "Nilai kontrak, pengeluaran per kategori dan per bulan, keuntungan, margin, serta dana uang muka yang masih beredar.",
    },
    {
      icon: FileTextIcon,
      title: "Laporan PDF per proyek",
      description:
        "Ringkasan keuangan, rincian per kategori dan karyawan, serta daftar nota yang disetujui dalam satu dokumen. Daftar nota juga bisa diunduh sebagai Excel untuk diolah akuntan.",
    },
    {
      icon: BellRingIcon,
      title: "Pengingat WhatsApp",
      description: "Karyawan diingatkan sebelum batas unggah nota dan batas pengembalian sisa dana. Karyawan yang masih menunggak tidak bisa menerima uang muka baru.",
    },
    {
      icon: WalletIcon,
      title: "Saldo & potong gaji",
      description: "Sisa dana dan kekurangan dihitung otomatis. Setiap perpindahan dana tercatat sebagai baris baru di riwayat saldo dan tidak pernah diubah. Sisa yang tidak dikembalikan tepat waktu bisa diekspor ke Excel untuk potong gaji.",
    },
    {
      icon: UserLockIcon,
      title: "Hak akses per peran",
      description: "Nilai kontrak dan keuntungan hanya terlihat oleh Owner. Finance dan karyawan hanya melihat bagiannya.",
    },
    {
      icon: FileClockIcon,
      title: "Audit log",
      description: "Riwayat siapa melakukan apa dan kapan, lengkap dengan data sebelum dan sesudah perubahan.",
    },
  ],
  report: {
    eyebrow: "Untuk arsip & rapat",
    title: "Laporan PDF per proyek, kapan saja",
    description:
      "Unduh kapan saja dengan data terbaru, tanpa rekap manual. Cocok untuk evaluasi proyek, arsip, dan rapat dengan tim.",
    contents: [
      {
        title: "Ringkasan keuangan",
        description: "Nilai kontrak, pengeluaran disetujui, keuntungan dan margin, sisa nilai kontrak, serta dana yang masih beredar.",
      },
      {
        title: "Per kategori & per bulan",
        description: "Ke mana uang paling banyak keluar, dan bagaimana laju pengeluaran dari bulan ke bulan.",
      },
      {
        title: "Per karyawan",
        description: "Uang muka yang dicairkan, pengeluaran yang disetujui, dan sisa dana tiap karyawan.",
      },
      {
        title: "Daftar nota yang disetujui",
        description: "Tanggal, nomor laporan, karyawan, kategori, keterangan, dan jumlah. Biaya tanpa nota ditandai.",
      },
    ],
  },
  addons: {
    title: "Perlu absensi dan penggajian juga? Aktifkan sebagai add-on",
    description:
      "Fitur utama ArchiPay adalah kontrol uang muka dan pertanggungjawaban per proyek. Absensi dan Penggajian bersifat opsional, jadi Anda hanya membayar yang dipakai. Keduanya ikut aktif selama masa coba gratis.",
    items: [
      {
        name: "Absensi",
        description: "Kehadiran tim lapangan tercatat dengan bukti foto dan lokasi.",
        points: ["Absen masuk dan pulang dengan selfie + GPS", "Cuti dan izin dengan persetujuan Owner", "Denda keterlambatan masuk ke daftar potong gaji"],
      },
      {
        name: "Penggajian",
        description: "Gaji bulanan dihitung dari data yang sudah ada di ArchiPay.",
        points: ["Data gaji per karyawan", "Penggajian bulanan dengan potongan uang muka dan denda", "Slip Gaji dalam bentuk PDF"],
      },
    ],
  },
  steps: [
    { title: "Owner memberi uang muka", description: "Dicairkan langsung atau lewat persetujuan. Karyawan menerima WhatsApp dan mengonfirmasi dana yang diterima." },
    { title: "Karyawan memotret nota", description: "Setiap belanja difoto dari HP dan dikirim sebelum batas waktu." },
    { title: "Nota diverifikasi", description: "Finance atau Owner menyetujui tiap nota. Sisa dana ditagih, kekurangan diganti." },
    { title: "Lihat untung proyek", description: "Pengeluaran yang disetujui langsung terlihat di keuntungan proyek." },
    { title: "Unduh laporan PDF", description: "Untuk arsip atau rapat, kapan saja dengan data terbaru." },
  ],
  pricing: ARCHIPAY_PRICING,
  useCasesIntro: {
    title: "Usaha apa saja yang memberi uang muka ke tim?",
    description: "Syaratnya satu: ada karyawan yang memegang uang kantor lebih dulu, lalu melaporkan notanya, biasanya per proyek atau per acara.",
  },
  useCases: [
    {
      title: "Kontraktor & renovasi",
      description: "Mandor dan pelaksana memegang uang muka untuk material, upah, dan sewa alat. Setiap nota masuk ke proyeknya, jadi untung tiap proyek terlihat.",
      examples: ["Material", "Upah harian", "Sewa alat", "Transportasi"],
    },
    {
      title: "Developer & properti",
      description: "Banyak proyek berjalan bersamaan. Biaya lapangan, perizinan, dan operasional tiap proyek tercatat terpisah, lengkap dengan bukti notanya.",
      examples: ["Perizinan", "Materai", "Survei lokasi", "Operasional lapangan"],
    },
    {
      title: "Event & wedding organizer",
      description: "Crew membawa uang muka untuk vendor, konsumsi, dan sewa perlengkapan. Selesai acara, nota dan sisa uang langsung terhitung.",
      examples: ["Konsumsi", "Sewa perlengkapan", "Transportasi crew", "Parkir & tol"],
    },
    {
      title: "Konsultan, arsitek & interior",
      description: "Survei, cetak gambar, dan belanja sampel dibayar dulu oleh tim. Pengeluaran terikat ke proyek klien, tidak bercampur dengan biaya kantor.",
      examples: ["Survei", "Cetak gambar", "Fotokopi", "Sampel material"],
    },
  ],
  // Masalah uang muka dulu, lalu cocok untuk siapa, lalu fitur. Laporan PDF setelah fitur agar tidak mendominasi.
  sectionOrder: ["problems", "usecases", "features", "report", "steps", "pricing", "faq"],
  planBenefits: ["Proyek aktif tanpa batas"],
  plans: [
    { months: 1, price: archipayPlanPrice(1), normalPrice: archipayPlanPrice(1, ARCHIPAY_PRICING.normalBasePrice) },
    { months: 6, price: archipayPlanPrice(6), normalPrice: archipayPlanPrice(6, ARCHIPAY_PRICING.normalBasePrice) },
    { months: 12, price: archipayPlanPrice(12), normalPrice: archipayPlanPrice(12, ARCHIPAY_PRICING.normalBasePrice) },
  ],
  trialDays: 30,
  faq: [
    {
      question: "Apakah ArchiPay memegang atau memindahkan uang kami?",
      answer:
        "Tidak. ArchiPay hanya mencatat. Uang muka tetap diserahkan tunai atau lewat transfer bank seperti biasa, lalu dicatat di aplikasi.",
    },
    {
      question: "Apakah karyawan harus memasang aplikasi?",
      answer:
        "Tidak harus lewat Play Store atau App Store. ArchiPay berbentuk PWA: bisa dipasang di layar utama HP dan tampil layar penuh seperti aplikasi biasa, atau cukup dibuka lewat browser. Login dengan email dan password. Setiap pengguna perlu memiliki nomor WhatsApp aktif, karena nomornya diverifikasi dengan kode OTP.",
    },
    {
      question: "Apakah ArchiPay pengganti software akuntansi? Bisa dipakai untuk akuntan?",
      answer:
        "Bukan pengganti. ArchiPay mengurus uang proyek harian: uang muka, nota, pertanggungjawaban, dan keuntungan per proyek. Daftar nota yang disetujui bisa diunduh sebagai file Excel (lengkap dengan rekap per kategori) untuk diolah akuntan atau dimasukkan ke software akuntansi Anda. Belum ada sambungan otomatis ke software akuntansi.",
    },
    {
      question: "Siapa yang bisa melihat nilai kontrak, keuntungan, dan laporan PDF?",
      answer: "Hanya Owner. Finance dan karyawan hanya melihat data uang muka sesuai perannya.",
    },
    {
      question: "Perusahaan kami kecil dan tidak punya bagian keuangan. Apakah tetap bisa?",
      answer:
        "Bisa. Tanpa Finance, Owner memegang semua langkah, dan setiap langkah tetap tercatat di audit log.",
    },
    {
      question: "Bagaimana jika karyawan tidak menyimpan nota untuk biaya kecil?",
      answer: "Biaya kecil seperti parkir atau ojek boleh dicatat tanpa nota dengan alasan, sampai batas nominal yang Anda atur.",
    },
    {
      question: "Berapa lama foto nota disimpan?",
      answer:
        "Umumnya 6 bulan setelah uang muka selesai. Setelah itu file foto atau PDF-nya dihapus otomatis, sedangkan nominal, keterangan, dan hasil verifikasi nota tetap tersimpan sehingga laporan PDF tetap lengkap.",
    },
    {
      question: "Apa yang saya dapat selama masa coba 30 hari?",
      answer:
        "Semua fitur, termasuk add-on Absensi dan Penggajian. Setelah masa coba, Absensi dan Penggajian tetap aktif hanya bila Anda memilihnya saat memilih paket.",
    },
    {
      question: "Apakah data lama bisa dipindahkan?",
      answer:
        "Daftar pengguna bisa diimpor sekaligus lewat Excel (nama, email, jabatan, rekening bank, dan role), jadi tidak perlu menambah karyawan satu per satu. Belum ada impor untuk proyek atau nota lama: kami bantu membuat akun dan proyek pertama sebelum mulai dipakai, lalu ArchiPay mencatat dari uang muka berikutnya. Nota dan pengeluaran sebelum memakai ArchiPay tidak ikut dihitung di keuntungan proyek. Impor Excel juga tersedia untuk daftar lokasi absensi (add-on Absensi).",
    },
  ],
};

// Harga SakuDagang, sama dengan aplikasi (docs/BUSINESS-FLOW.md bagian 14.1, pengaturan platform):
//   paket N bulan = harga per bulan x N x (100 - diskon N bulan) / 100
// Diatur 24 Nov 2026: Rp99.000 per bulan, diskon 7% (6 bulan) dan 15% (1 tahun), tanpa batas pengguna.
const SAKUDAGANG_MONTHLY = 99_000;
const SAKUDAGANG_DISCOUNT: Record<6 | 12, number> = { 6: 7, 12: 15 };

function sakudagangPlanPrice(months: PlanMonths) {
  const discount = months === 1 ? 0 : SAKUDAGANG_DISCOUNT[months];
  return Math.round((SAKUDAGANG_MONTHLY * months * (100 - discount)) / 100);
}

const SAKUDAGANG_TRIAL_DAYS = 30;

export const SAKUDAGANG: Product = {
  slug: "sakudagang",
  name: "SakuDagang",
  logo: "/brand/sakudagang-icon.png",
  tagline: "Kasir, stok & laba toko di HP",
  summary: "Jualan dicatat dari HP, stok berkurang sendiri, bon tidak lupa ditagih, dan laba toko terlihat jelas.",
  appUrl: "https://sakudagang.realitech.id",
  seo: {
    title: "SakuDagang: Aplikasi Kasir dan Stok Toko",
    description:
      "Aplikasi kasir dan stok toko di HP: catat penjualan, bon, dan belanja stok, lalu lihat laba toko yang sebenarnya. Coba gratis 30 hari.",
  },
  audiences: ["Warung sembako & kelontong", "Toko bangunan & pertanian", "Konter HP & aksesoris", "Toko ritel kecil"],
  hero: {
    title: "Tahu untung toko Anda yang sebenarnya, langsung dari HP",
    description:
      "SakuDagang mencatat penjualan, belanja stok, bon, dan pengeluaran, lalu menghitung sendiri berapa uang modal yang harus diputar, berapa laba yang boleh Anda ambil, dan siapa yang belum bayar.",
  },
  problems: [
    {
      problem: "Toko ramai, tetapi uang terasa habis dan tidak tahu ke mana.",
      solution: "Beranda memisahkan uang modal (untuk belanja lagi), uang laba (boleh Anda ambil), dan piutang. Laba tidak lagi terpakai jadi modal tanpa disadari.",
    },
    {
      problem: "Laba hanya ditebak karena harga modal naik-turun setiap belanja.",
      solution: "Harga modal rata-rata dihitung otomatis dari setiap pembelian, dan setiap penjualan langsung menyimpan labanya.",
    },
    {
      problem: "Stok sering selisih, atau baru ketahuan habis saat pembeli sudah datang.",
      solution: "Stok berkurang otomatis saat terjual dan bertambah saat belanja. Barang yang hampir habis masuk daftar perlu restock.",
    },
    {
      problem: "Bon pelanggan lupa ditagih, uang tertahan di luar.",
      solution: "Bon tercatat per pelanggan lengkap dengan sisanya. Tagih lewat WhatsApp dengan satu ketukan, dan bon yang lewat 30 hari ditandai di beranda.",
    },
    {
      problem: "Karyawan kasir tahu semua angka toko, atau salah catat tanpa jejak.",
      solution: "Kasir hanya melihat harga jual. Harga modal dan laba hanya untuk pemilik, setiap transaksi mencatat siapa yang menginput, dan salah input dibatalkan dengan alasan.",
    },
    {
      problem: "Rekap akhir bulan memakan waktu dan catatan berserakan.",
      solution: "Laporan harian, bulanan, dan tahunan tersusun sendiri dari transaksi. Laporan bulanan dan tahunan bisa diunduh ke Excel.",
    },
  ],
  features: [
    {
      icon: ShoppingCartIcon,
      title: "Kasir di HP",
      description: "Cari barang, atur jumlah, lalu bayar tunai (kembalian dihitung otomatis), QRIS, atau bon. Satu transaksi selesai dalam beberapa ketukan.",
    },
    {
      icon: BoxesIcon,
      title: "Stok otomatis",
      description: "Stok berkurang saat terjual dan bertambah saat belanja, dengan riwayat keluar-masuk per barang. Stok kosong tidak menghalangi penjualan.",
    },
    {
      icon: TruckIcon,
      title: "Pembelian & harga modal",
      description: "Catat belanja dari grosir, harga modal rata-rata diperbarui sendiri. Harga jual baru bisa langsung diisi saat belanja.",
    },
    {
      icon: NotebookPenIcon,
      title: "Bon pelanggan",
      description: "Piutang per pelanggan, pelunasan sebagian atau penuh, dan tagih lewat WhatsApp dengan pesan yang sudah terisi.",
    },
    {
      icon: ReceiptIcon,
      title: "Pengeluaran operasional",
      description: "Listrik, plastik, bensin, gaji kasir, dan biaya lain ikut mengurangi laba bersih, jadi angka laba yang Anda lihat apa adanya.",
    },
    {
      icon: ClipboardCheckIcon,
      title: "Stok opname",
      description: "Cocokkan stok fisik dan sistem di akhir bulan. Barang rusak, kedaluwarsa, atau hilang dihitung sebagai penyusutan beserta alasannya, dan toko tetap bisa berjualan.",
    },
    {
      icon: PiggyBankIcon,
      title: "Pemisahan dana",
      description: "Uang modal, uang laba, dan piutang tampil terpisah di beranda pemilik, lengkap dengan grafik omset dan laba per hari.",
    },
    {
      icon: SheetIcon,
      title: "Laporan & Excel",
      description: "Laporan harian, bulanan, dan tahunan beserta barang terlaris. Laporan bulanan dan tahunan bisa diunduh ke Excel.",
    },
    {
      icon: UserLockIcon,
      title: "Akun kasir",
      description: "Kasir mencatat penjualan tanpa melihat harga modal dan laba, dan tidak bisa menjual di bawah modal. Karyawan baru cukup dibuatkan akun.",
    },
    {
      icon: SmartphoneIcon,
      title: "Pasang di HP, tanpa Play Store",
      description: "Berbentuk PWA: dipasang di layar utama HP dan tampil layar penuh seperti aplikasi biasa, atau cukup dibuka lewat browser.",
    },
    {
      icon: KeyRoundIcon,
      title: "Masuk dengan email atau WhatsApp",
      description: "Tidak punya email? Cukup nomor WhatsApp untuk masuk. Password sementara akun baru dikirim otomatis lewat WhatsApp.",
    },
    {
      icon: Undo2Icon,
      title: "Salah input? Batalkan",
      description: "Penjualan atau pembelian yang salah dibatalkan dengan alasan dan stok kembali sendiri. Tidak ada data yang hilang diam-diam.",
    },
  ],
  useCasesIntro: {
    title: "Usaha apa saja yang menjual per barang",
    description: "Syaratnya satu: barang dijual per item, dengan harga modal dan harga jual.",
  },
  useCases: [
    {
      title: "Warung sembako & kelontong",
      description: "Banyak barang kecil dan banyak bon langganan. Modal, laba, dan piutang tercatat rapi tanpa buku bon.",
      examples: ["Beras", "Minyak goreng", "Gula", "Rokok", "Galon"],
    },
    {
      title: "Toko bangunan & pertanian",
      description: "Harga grosir naik-turun. Harga modal rata-rata menjaga laba per barang tetap akurat.",
      examples: ["Semen", "Cat", "Pipa", "Pupuk", "Bibit"],
    },
    {
      title: "Konter HP & aksesoris",
      description: "HP, casing, charger, tempered glass, dan headset dicatat per item beserta modal dan labanya. Pulsa dan paket data bisa dicatat sebagai barang per nominal.",
      examples: ["HP", "Charger", "Casing", "Tempered glass", "Headset"],
    },
    {
      title: "Toko ritel lainnya",
      description: "Kosmetik, alat tulis, perlengkapan bayi, oleh-oleh, dan toko lain yang menjual per item. Ukuran atau warna berbeda dicatat sebagai barang terpisah.",
      examples: ["Kosmetik", "Alat tulis", "Perlengkapan bayi", "Oleh-oleh"],
    },
  ],
  steps: [
    { title: "Kami siapkan akun toko", description: `Hubungi kami lewat WhatsApp. Akun pemilik dibuat dan dikirim lewat WhatsApp, dan masa coba ${SAKUDAGANG_TRIAL_DAYS} hari mulai berjalan.` },
    { title: "Masukkan barang", description: "Nama, satuan, harga jual, serta stok dan modal awal setiap barang." },
    { title: "Jualan dan catat belanja", description: "Kasir mencatat penjualan tunai, QRIS, atau bon. Setiap belanja stok memperbarui stok dan harga modal." },
    { title: "Lihat laba", description: "Beranda menunjukkan uang modal, uang laba, dan piutang. Laporan siap kapan saja." },
  ],
  sectionOrder: ["problems", "features", "usecases", "steps", "pricing", "faq"],
  pricingIntro: `Gratis ${SAKUDAGANG_TRIAL_DAYS} hari dengan semua fitur. Setelah itu ${formatRupiah(SAKUDAGANG_MONTHLY)}/bulan, tanpa batas jumlah pengguna. Paket 6 bulan hemat ${SAKUDAGANG_DISCOUNT[6]}% dan paket 1 tahun hemat ${SAKUDAGANG_DISCOUNT[12]}%.`,
  planBenefits: ["Pengguna dan kasir tanpa batas"],
  plans: [
    { months: 1, price: sakudagangPlanPrice(1) },
    { months: 6, price: sakudagangPlanPrice(6) },
    { months: 12, price: sakudagangPlanPrice(12) },
  ],
  trialDays: SAKUDAGANG_TRIAL_DAYS,
  faq: [
    {
      question: `Apakah saya bisa mencoba dulu?`,
      answer: `Bisa. Setiap toko baru mendapat masa gratis ${SAKUDAGANG_TRIAL_DAYS} hari (1 bulan) dengan semua fitur, tanpa bayar di muka. Kami bantu membuat akun toko dan akun pemilik, lalu Anda bisa langsung memasukkan barang dan berjualan.`,
    },
    {
      question: "Berapa biayanya setelah masa coba?",
      answer: `${formatRupiah(SAKUDAGANG_MONTHLY)} per bulan, tanpa batas jumlah pengguna dan kasir, dan semua fitur sudah termasuk. Paket 6 bulan diskon ${SAKUDAGANG_DISCOUNT[6]}% (${formatRupiah(sakudagangPlanPrice(6))}), paket 1 tahun diskon ${SAKUDAGANG_DISCOUNT[12]}% (${formatRupiah(sakudagangPlanPrice(12))}).`,
    },
    {
      question: "Apakah perlu komputer atau mesin kasir khusus?",
      answer:
        "Tidak. SakuDagang dirancang untuk HP dan berbentuk PWA: bisa dipasang di layar utama seperti aplikasi biasa, tanpa Play Store atau App Store, atau dibuka lewat browser.",
    },
    {
      question: "Barangnya ada di toko, tetapi stok di sistem masih 0. Apakah tetap bisa dijual?",
      answer:
        "Bisa. Itu biasa terjadi bila barang sudah ada di rak tetapi belum dicatat di sistem. Kasir hanya mendapat peringatan \"Stok sistem: 0\", penjualan tetap tersimpan, dan stok boleh minus. Angkanya diluruskan saat Anda mencatat belanja berikutnya atau saat stok opname.",
    },
    {
      question: "Apakah kasir bisa melihat keuntungan toko?",
      answer: "Tidak. Kasir hanya melihat harga jual dan transaksinya sendiri. Harga modal dan laba hanya untuk pemilik.",
    },
    {
      question: "Bagaimana kalau kasir salah input?",
      answer:
        "Transaksi yang sudah tersimpan tidak diedit, tetapi dibatalkan dengan alasan dan stoknya kembali otomatis. Kasir hanya bisa membatalkan transaksinya sendiri di hari yang sama, pemilik bisa membatalkan semua. Transaksi yang dibatalkan tetap tampil di riwayat.",
    },
    {
      question: "Bagaimana cara membayar langganan?",
      answer:
        "Transfer bank atau QRIS, lalu unggah bukti bayar di menu Langganan. Setelah dicek, masa aktif toko diperpanjang dan pemilik mendapat pemberitahuan lewat WhatsApp. Pengingat juga dikirim sebelum masa aktif habis.",
    },
    {
      question: "Apakah data toko saya terlihat oleh toko lain?",
      answer: "Tidak. Setiap toko hanya bisa melihat datanya sendiri, dan setiap transaksi mencatat siapa yang menginputnya.",
    },
    {
      question: "Bagaimana kalau saya punya lebih dari satu toko?",
      answer: "Satu akun untuk satu toko, jadi pemilik dua toko memakai dua akun. Laporan gabungan antar cabang belum tersedia.",
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
