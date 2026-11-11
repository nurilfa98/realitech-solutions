// DRAF: periksa ulang isinya (sebaiknya bersama konsultan hukum) sebelum
// dipublikasikan, terutama bagian pembayaran & pengembalian dana.

import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Syarat Layanan",
  description: `Syarat dan ketentuan berlangganan layanan ArchiPay dan SakuDagang dari ${SITE.name}.`,
  alternates: { canonical: "/syarat-layanan" },
};

export default function TermsPage() {
  return (
    <LegalPage title="Syarat Layanan" updated="10 November 2026">
      <p>
        Dengan memakai ArchiPay atau SakuDagang (&quot;Layanan&quot;) dari {SITE.name} (&quot;kami&quot;), Anda
        menyetujui syarat berikut.
      </p>

      <section>
        <h2>1. Akun</h2>
        <ul>
          <li>Akun perusahaan/toko dan pengguna pertama dibuat oleh kami setelah konsultasi.</li>
          <li>Anda bertanggung jawab menjaga kerahasiaan password dan atas semua aktivitas di akun Anda.</li>
          <li>Anda bertanggung jawab atas kebenaran data yang dimasukkan ke Layanan.</li>
          <li>
            Bila memakai add-on Absensi atau Penggajian, perusahaan Anda bertanggung jawab memberi tahu karyawan
            tentang pengolahan data wajah, lokasi, dan gaji, memperoleh persetujuan yang diperlukan, serta memastikan
            denda dan potongan gaji sesuai perjanjian kerja atau peraturan perusahaan dan ketentuan yang berlaku.
          </li>
        </ul>
      </section>

      <section>
        <h2>2. Masa coba & langganan</h2>
        <ul>
          <li>Akun baru mendapat masa coba gratis sesuai yang tertera di halaman produk. Masa coba tidak punya masa tenggang: begitu habis, akses dikunci sampai paket dibayar.</li>
          <li>
            ArchiPay memiliki add-on opsional Absensi dan Penggajian yang dibayar terpisah per pengguna per bulan.
            Selama masa coba keduanya ikut aktif. Setelah itu, add-on aktif hanya bila dipilih saat memilih paket atau
            diaktifkan kemudian, dan berhenti begitu periodenya habis.
          </li>
          <li>Langganan tersedia dalam periode 1, 6, atau 12 bulan, dibayar di muka.</li>
          <li>Perpanjangan dihitung dari tanggal berakhirnya langganan yang sedang berjalan.</li>
          <li>
            Setelah langganan berakhir, tersedia masa tenggang singkat. Lewat dari itu, akses ke Layanan dikunci
            sementara sampai langganan diperpanjang. Data tetap tersimpan selama masa yang wajar.
          </li>
        </ul>
      </section>

      <section>
        <h2>3. Pembayaran & pengembalian dana</h2>
        <ul>
          <li>Pembayaran dilakukan melalui transfer bank atau QRIS ke rekening resmi {SITE.name}.</li>
          <li>Langganan aktif setelah pembayaran kami konfirmasi.</li>
          <li>
            Pembayaran yang sudah dikonfirmasi tidak dapat dikembalikan, kecuali terjadi kelebihan bayar atau
            gangguan Layanan yang disebabkan oleh kami.
          </li>
        </ul>
      </section>

      <section>
        <h2>4. Penggunaan yang dilarang</h2>
        <ul>
          <li>Memakai Layanan untuk kegiatan yang melanggar hukum.</li>
          <li>Mencoba membobol, mengganggu, atau membebani sistem secara tidak wajar.</li>
          <li>Menjual kembali atau menyewakan akses Layanan tanpa izin tertulis dari kami.</li>
        </ul>
      </section>

      <section>
        <h2>5. Ketersediaan Layanan</h2>
        <p>
          Kami berupaya menjaga Layanan tetap tersedia dan aman, namun tidak menjamin Layanan bebas gangguan. Kami
          dapat melakukan pemeliharaan atau pembaruan fitur sewaktu-waktu.
        </p>
      </section>

      <section>
        <h2>6. Batas tanggung jawab</h2>
        <p>
          Layanan adalah alat bantu pencatatan. Keputusan bisnis, perhitungan pajak, dan kecocokan dengan kas fisik
          tetap menjadi tanggung jawab Anda. Tanggung jawab kami terbatas pada nilai langganan yang Anda bayar untuk
          periode berjalan.
        </p>
      </section>

      <section>
        <h2>7. Perubahan syarat</h2>
        <p>Syarat ini dapat diperbarui. Perubahan penting akan kami umumkan melalui situs ini atau email.</p>
      </section>

      <section>
        <h2>8. Kontak</h2>
        <p>Pertanyaan tentang syarat ini dapat dikirim ke {SITE.email}.</p>
      </section>
    </LegalPage>
  );
}
