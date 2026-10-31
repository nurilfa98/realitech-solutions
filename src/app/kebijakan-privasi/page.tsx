// DRAF: periksa ulang isinya (sebaiknya bersama konsultan hukum) sebelum
// dipublikasikan. Mengacu pada UU No. 27 Tahun 2022 tentang Pelindungan Data Pribadi.

import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Kebijakan Privasi",
  description: `Cara ${SITE.name} mengumpulkan, memakai, dan melindungi data pada layanan ArchiPay dan SakuDagang.`,
  alternates: { canonical: "/kebijakan-privasi" },
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Kebijakan Privasi" updated="31 Oktober 2026">
      <p>
        Kebijakan ini menjelaskan bagaimana {SITE.name} (&quot;kami&quot;) mengumpulkan, memakai, menyimpan, dan
        melindungi data saat Anda memakai situs {SITE.url} serta layanan ArchiPay dan SakuDagang
        (&quot;Layanan&quot;).
      </p>

      <section>
        <h2>1. Data yang kami kumpulkan</h2>
        <ul>
          <li>Data akun: nama, email, nomor WhatsApp, dan peran pengguna.</li>
          <li>Data rekening bank yang Anda isi sendiri untuk keperluan pencairan dana (ArchiPay).</li>
          <li>
            Data usaha yang Anda masukkan ke Layanan, misalnya transaksi, uang muka, nota, barang, stok, dan laporan.
          </li>
          <li>File yang Anda unggah, seperti foto nota dan bukti transfer.</li>
          <li>Data teknis: alamat IP, jenis perangkat/browser, dan catatan aktivitas untuk keamanan.</li>
        </ul>
      </section>

      <section>
        <h2>2. Untuk apa data dipakai</h2>
        <ul>
          <li>Menjalankan Layanan sesuai fungsinya, termasuk mengirim notifikasi dan pengingat lewat WhatsApp dan email.</li>
          <li>Mengelola langganan dan pembayaran.</li>
          <li>Menjaga keamanan akun, misalnya membatasi percobaan login dan mencatat jejak aktivitas.</li>
          <li>Memberikan dukungan teknis saat Anda meminta bantuan.</li>
        </ul>
        <p>Kami tidak menjual data Anda dan tidak memakai data usaha Anda untuk iklan.</p>
      </section>

      <section>
        <h2>3. Pihak ketiga</h2>
        <p>
          Untuk menjalankan Layanan, kami memakai penyedia infrastruktur tepercaya, misalnya penyedia hosting,
          database, penyimpanan file, pengiriman email, dan pengiriman pesan WhatsApp. Mereka hanya memproses data
          sejauh diperlukan untuk layanan tersebut.
        </p>
      </section>

      <section>
        <h2>4. Penyimpanan & keamanan</h2>
        <ul>
          <li>Koneksi ke Layanan dienkripsi (HTTPS).</li>
          <li>Password disimpan dalam bentuk hash, sehingga tidak bisa dibaca siapa pun termasuk kami.</li>
          <li>Akses data dibatasi sesuai peran pengguna di perusahaan atau toko Anda.</li>
          <li>Data disimpan selama Anda berlangganan, dan dapat dihapus atas permintaan setelah langganan berakhir.</li>
        </ul>
      </section>

      <section>
        <h2>5. Hak Anda</h2>
        <p>
          Anda berhak meminta akses, perbaikan, atau penghapusan data pribadi Anda, serta menarik persetujuan sesuai
          ketentuan peraturan perundang-undangan. Kirim permintaan ke {SITE.email}.
        </p>
      </section>

      <section>
        <h2>6. Perubahan kebijakan</h2>
        <p>
          Kebijakan ini dapat diperbarui sewaktu-waktu. Perubahan penting akan kami umumkan melalui situs ini atau
          email.
        </p>
      </section>

      <section>
        <h2>7. Kontak</h2>
        <p>Pertanyaan tentang kebijakan ini dapat dikirim ke {SITE.email}.</p>
      </section>
    </LegalPage>
  );
}
