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
  NotebookPenIcon,
  PiggyBankIcon,
  ReceiptIcon,
  ScanLineIcon,
  ShoppingCartIcon,
  SheetIcon,
  TruckIcon,
  UserLockIcon,
  WalletIcon,
  type LucideIcon,
} from "lucide-react";

export type ProductSlug = "archipay" | "sakudagang";

// Seksi yang bisa diatur urutannya per produk (lihat `sectionOrder`).
export type ProductSectionKey = "problems" | "report" | "features" | "steps" | "pricing" | "faq";

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
  // Untuk siapa produk ini cocok.
  audiences: string[];
  hero: { title: string; description: string };
  // Pasangan masalah → jawaban produk.
  problems: { problem: string; solution: string }[];
  features: { icon: LucideIcon; title: string; description: string }[];
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
    notes: string[];
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
    notes: [
      "Hanya Owner yang dapat mengunduh laporan.",
      "Keuntungan berlabel sementara selama proyek aktif, dan final setelah proyek ditandai selesai.",
      "Foto nota tidak ikut dicetak di PDF.",
      "Daftar nota juga bisa diunduh sebagai Excel beserta rekap per kategori dan ringkasan, siap diolah akuntan.",
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
  // Masalah uang muka dulu, lalu fitur. Laporan PDF diletakkan setelah fitur agar tidak mendominasi.
  sectionOrder: ["problems", "features", "report", "steps", "pricing", "faq"],
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

export const SAKUDAGANG: Product = {
  slug: "sakudagang",
  name: "SakuDagang",
  logo: "/brand/sakudagang-icon.png",
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
      answer:
        "Tidak. SakuDagang dirancang untuk HP dan berbentuk PWA: bisa dipasang di layar utama seperti aplikasi biasa, tanpa Play Store atau App Store, atau dibuka lewat browser.",
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
