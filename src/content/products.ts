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
  ReceiptTextIcon,
  ScanLineIcon,
  ShoppingCartIcon,
  SheetIcon,
  StoreIcon,
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
  // Ikon di menu Produk dan kartu produk.
  icon: LucideIcon;
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
  icon: ReceiptTextIcon,
  tagline: "Pengeluaran & keuntungan per project",
  summary:
    "Catat uang muka dan nota karyawan per project, lihat keuntungan dan margin secara langsung, lalu unduh laporan PDF per project dalam satu klik.",
  appUrl: "https://archipay.realitech.id",
  audiences: ["Kontraktor & developer", "Konsultan arsitek & interior", "Event organizer", "Bisnis berbasis project"],
  hero: {
    title: "Tahu untung-rugi setiap project, dari nota lapangan sampai laporan PDF",
    description:
      "ArchiPay mencatat setiap uang muka dan nota karyawan per project. Pengeluaran yang sudah diverifikasi langsung masuk ke perhitungan keuntungan, dan laporan PDF per project siap diunduh kapan saja.",
  },
  problems: [
    {
      problem: "Pengeluaran project tersebar di chat WhatsApp, buku catatan, dan tumpukan nota.",
      solution: "Setiap uang muka dan nota tercatat per project: siapa yang memegang, untuk apa, berapa, lengkap dengan foto bukti.",
    },
    {
      problem: "Untung atau rugi project baru ketahuan setelah project selesai.",
      solution: "Beranda Owner menampilkan nilai kontrak, pengeluaran, keuntungan, dan margin tiap project, dengan tanda peringatan saat pengeluaran mencapai 80% nilai kontrak.",
    },
    {
      problem: "Nota terlambat dikumpulkan, sisa uang muka tidak kembali, kekurangan karyawan tidak terganti.",
      solution: "Ada batas waktu dan pengingat WhatsApp otomatis. Selisih dihitung sistem, dan sisa yang lewat batas masuk daftar potong gaji.",
    },
    {
      problem: "Laporan pengeluaran per project disusun manual di Excel setiap akhir project.",
      solution: "Laporan PDF per project dibuat otomatis dari data nota yang sudah diverifikasi.",
    },
  ],
  features: [
    {
      icon: FolderKanbanIcon,
      title: "Uang muka per project",
      description: "Owner mencairkan langsung, Finance mengusulkan, atau karyawan mengajukan dengan persetujuan Owner. Selalu terikat ke satu project.",
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
      title: "Keuntungan & margin per project",
      description: "Nilai kontrak, pengeluaran per kategori dan per bulan, keuntungan, margin, serta dana uang muka yang masih beredar.",
    },
    {
      icon: FileTextIcon,
      title: "Laporan PDF per project",
      description: "Ringkasan keuangan, rincian per kategori dan karyawan, serta daftar nota yang disetujui dalam satu dokumen.",
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
    eyebrow: "Hasil akhirnya",
    title: "Laporan PDF per project, siap dalam satu klik",
    description:
      "Unduh kapan saja dengan data terbaru, tanpa rekap manual. Cocok untuk evaluasi project, arsip, dan rapat dengan tim.",
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
      "Keuntungan berlabel sementara selama project aktif, dan final setelah project ditandai selesai.",
      "Foto nota tidak ikut dicetak di PDF.",
    ],
  },
  addons: {
    title: "Perlu absensi dan penggajian juga? Aktifkan sebagai add-on",
    description:
      "Fitur utama ArchiPay tetap pengeluaran dan margin project. Absensi dan Penggajian bersifat opsional, jadi Anda hanya membayar yang dipakai. Keduanya ikut aktif selama masa coba gratis.",
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
    { title: "Uang muka dicairkan", description: "Owner atau Finance mencatat pencairan untuk karyawan di sebuah project." },
    { title: "Karyawan konfirmasi", description: "Karyawan menerima WhatsApp dan mengonfirmasi dana yang diterima." },
    { title: "Nota diunggah", description: "Setiap belanja difoto dari HP, lalu laporan dikirim sebelum batas waktu." },
    { title: "Nota diverifikasi", description: "Nota yang disetujui masuk ke pengeluaran project. Sisa dana dikembalikan atau kekurangan diganti." },
    { title: "Unduh laporan PDF", description: "Keuntungan project terlihat, dan laporannya bisa diunduh kapan saja." },
  ],
  pricing: ARCHIPAY_PRICING,
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
      answer: "Bisa dibicarakan saat konsultasi. Kami bantu menyiapkan akun, project, dan pengguna sebelum mulai dipakai.",
    },
  ],
};

export const SAKUDAGANG: Product = {
  slug: "sakudagang",
  name: "SakuDagang",
  icon: StoreIcon,
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
