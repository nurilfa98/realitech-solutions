// DRAF: periksa ulang isinya (sebaiknya bersama konsultan hukum) sebelum
// dipublikasikan. Mengacu pada UU No. 27 Tahun 2022 tentang Pelindungan Data Pribadi.
//
// Isi bagian add-on Absensi & Penggajian harus SESUAI dengan aplikasi
// (archipay/docs/BUSINESS-FLOW.md bagian 18, 19, 20). Bila cara kerja fitur
// berubah (mis. selfie absen mulai disimpan), perbarui halaman ini juga.

import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Kebijakan Privasi",
  description: `Cara ${SITE.name} mengumpulkan, memakai, dan melindungi data pada layanan ArchiPay (termasuk add-on Absensi dan Penggajian) dan SakuDagang.`,
  alternates: { canonical: "/kebijakan-privasi" },
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Kebijakan Privasi" updated="10 November 2026">
      <p>
        Kebijakan ini menjelaskan bagaimana {SITE.name} (&quot;kami&quot;) mengumpulkan, memakai, menyimpan, dan
        melindungi data saat Anda memakai situs {SITE.url} serta layanan ArchiPay dan SakuDagang
        (&quot;Layanan&quot;). ArchiPay memiliki dua add-on opsional, Absensi dan Penggajian, yang memproses data
        pribadi karyawan dan dijelaskan secara khusus pada bagian 3 dan 4.
      </p>

      <section>
        <h2>1. Peran kami dan peran perusahaan Anda</h2>
        <ul>
          <li>
            Data karyawan di ArchiPay (uang muka, absensi, gaji, dan lainnya) dimasukkan dan dipakai oleh perusahaan
            tempat Anda bekerja. Perusahaan itulah yang menentukan tujuan dan cara pemakaian datanya.
          </li>
          <li>
            Kami memproses data tersebut atas nama perusahaan, hanya untuk menjalankan Layanan, dan tidak memakainya
            untuk tujuan lain.
          </li>
          <li>
            Perusahaan bertanggung jawab memberi tahu karyawannya tentang pemakaian data ini dan memastikan dasar
            hukumnya, misalnya perjanjian kerja atau peraturan perusahaan untuk denda dan potongan gaji.
          </li>
          <li>
            Sebagai karyawan, permintaan akses, perbaikan, atau penghapusan data sebaiknya diajukan lebih dulu ke
            perusahaan Anda. Kami membantu perusahaan menindaklanjutinya.
          </li>
        </ul>
      </section>

      <section>
        <h2>2. Data yang kami kumpulkan</h2>
        <p>Untuk semua pengguna Layanan:</p>
        <ul>
          <li>Data akun: nama, email, nomor WhatsApp, jabatan, dan peran pengguna.</li>
          <li>Data rekening bank yang diisi untuk keperluan pencairan dana atau pembayaran (ArchiPay).</li>
          <li>
            Data usaha yang dimasukkan ke Layanan, misalnya transaksi, uang muka, nota, proyek, barang, stok, dan
            laporan.
          </li>
          <li>File yang diunggah, seperti foto nota dan bukti transfer.</li>
          <li>
            Data teknis: alamat IP, jenis perangkat dan browser, perkiraan kota dari alamat IP (untuk daftar perangkat
            yang sedang login), dan catatan aktivitas untuk keamanan.
          </li>
        </ul>
        <p>Hanya bila perusahaan Anda mengaktifkan add-on Absensi:</p>
        <ul>
          <li>Foto acuan wajah dan data pengenal wajah yang dihitung darinya (representasi numerik, bukan foto).</li>
          <li>
            Catatan absen: jam masuk dan pulang, lokasi (titik koordinat) saat absen, jarak ke lokasi kerja, skor
            kecocokan wajah, status (misalnya terlambat), dan alasan yang Anda isi.
          </li>
          <li>Pengajuan cuti dan izin beserta alasannya, serta denda keterlambatan bila perusahaan memakainya.</li>
          <li>Teks persetujuan pengolahan data wajah dan lokasi yang Anda setujui, beserta waktu dan alamat IP-nya.</li>
        </ul>
        <p>Hanya bila perusahaan Anda mengaktifkan add-on Penggajian:</p>
        <ul>
          <li>
            Data gaji: gaji pokok, tunjangan, potongan tetap (misalnya BPJS, PPh 21, atau cicilan koperasi),
            tanggal mulai dan berhenti kerja, serta tarif lembur bila dipakai.
          </li>
          <li>
            Slip gaji dan ringkasan kehadiran di dalamnya (hari kerja, hadir, tidak hadir, cuti tidak dibayar), serta
            potongan dari uang muka, denda, dan ketidakhadiran.
          </li>
        </ul>
      </section>

      <section>
        <h2>3. Add-on Absensi: data wajah dan lokasi</h2>
        <p>
          Data wajah termasuk data pribadi yang sensitif (biometrik). Karena itu pemakaiannya dibatasi seperti berikut.
        </p>
        <ul>
          <li>
            <strong>Persetujuan lebih dulu.</strong> Saat pertama kali membuka Absensi, Anda diminta menyetujui
            pengolahan data wajah dan lokasi. Sebelum Anda setuju, foto wajah dan absen tidak bisa dipakai. Teks yang
            Anda setujui, waktunya, dan alamat IP Anda disimpan sebagai bukti.
          </li>
          <li>
            <strong>Foto acuan.</strong> Anda mengambil selfie dari kamera dengan pemeriksaan kehidupan (liveness).
            Perhitungan data wajah dilakukan di HP Anda. Foto disimpan di penyimpanan file yang tidak terbuka untuk
            umum, dan data pengenal wajahnya di database. Foto itu dicocokkan dengan orangnya oleh Owner atau Admin HR
            perusahaan Anda sebelum bisa dipakai.
          </li>
          <li>
            <strong>Saat absen.</strong> Selfie diproses di HP Anda dan hanya data pengenal wajahnya yang dikirim ke
            server untuk dibandingkan dengan foto acuan. <strong>Foto selfie saat absen tidak dikirim dan tidak
            disimpan.</strong>
          </li>
          <li>
            <strong>Lokasi.</strong> Posisi GPS dibaca hanya saat halaman Absen dibuka untuk absen, lalu dibandingkan
            dengan lokasi kerja yang ditetapkan perusahaan. ArchiPay tidak melacak lokasi Anda di latar belakang.
          </li>
          <li>
            <strong>Penghapusan.</strong> Foto acuan lama dihapus setelah Anda menggantinya dan foto baru disetujui.
            Foto acuan dan data pengenal wajah dihapus saat akun Anda dinonaktifkan. Foto yang ditolak dihapus
            otomatis: setelah 3 hari bila Anda masih punya foto acuan yang disetujui, atau setelah 30 hari bila belum
            punya.
          </li>
          <li>
            <strong>Siapa yang bisa melihat.</strong> Foto acuan dan catatan absen dapat dilihat oleh Owner dan Admin
            HR perusahaan Anda. Admin platform kami dapat melihat data operasional perusahaan dalam aplikasi untuk
            keperluan dukungan, tetapi tidak dapat melihat data gaji.
          </li>
          <li>
            <strong>Keputusan otomatis.</strong> Bila wajah tidak cocok, absen ditolak oleh sistem. Anda dapat meminta
            Owner atau Admin HR perusahaan Anda untuk memeriksa dan mengoreksi catatan absen Anda.
          </li>
          <li>
            <strong>Menarik persetujuan.</strong> Anda dapat menarik persetujuan dengan menghubungi perusahaan Anda
            atau kami. Akibatnya, foto acuan dihapus dan Anda tidak dapat memakai absen berbasis wajah, sehingga
            perusahaan perlu mencatat absen Anda dengan cara lain.
          </li>
        </ul>
      </section>

      <section>
        <h2>4. Add-on Penggajian: data gaji</h2>
        <ul>
          <li>
            Data gaji bersifat rahasia. Yang dapat melihat dan menyiapkannya hanya Owner dan Finance perusahaan Anda.
            Pengesahan akhir penggajian hanya dilakukan Owner.
          </li>
          <li>Setiap karyawan hanya dapat melihat dan mengunduh slip gajinya sendiri, setelah penggajian diselesaikan.</li>
          <li>
            Dalam aplikasi, akun admin platform kami tidak dapat melihat data gaji. Catatan aktivitas (audit log) merekam
            siapa mengubah data gaji tanpa mencantumkan nominalnya.
          </li>
          <li>
            Kami tidak menghitung dan tidak memotong gaji Anda. ArchiPay hanya membantu menyusun perhitungan dan slip.
            Pembayaran gaji dilakukan perusahaan di luar ArchiPay.
          </li>
          <li>
            PPh 21 dan BPJS diisi manual oleh perusahaan sebagai potongan tetap. Kebenarannya menjadi tanggung jawab
            perusahaan.
          </li>
        </ul>
      </section>

      <section>
        <h2>5. Untuk apa data dipakai</h2>
        <ul>
          <li>Menjalankan Layanan sesuai fungsinya, termasuk mengirim notifikasi dan pengingat lewat WhatsApp dan email.</li>
          <li>Mengelola langganan dan pembayaran.</li>
          <li>Menjaga keamanan akun, misalnya membatasi percobaan login dan mencatat jejak aktivitas.</li>
          <li>Memberikan dukungan teknis saat Anda meminta bantuan.</li>
          <li>
            Untuk add-on Absensi: memastikan absen dilakukan oleh orangnya sendiri di lokasi kerja, serta menyusun
            rekap kehadiran dan denda. Untuk add-on Penggajian: menyusun gaji bersih dan slip gaji.
          </li>
        </ul>
        <p>
          Kami tidak menjual data Anda, tidak memakai data usaha atau data karyawan untuk iklan, dan tidak memakai data
          wajah untuk tujuan selain absensi.
        </p>
      </section>

      <section>
        <h2>6. Pihak ketiga</h2>
        <p>
          Untuk menjalankan Layanan, kami memakai penyedia infrastruktur tepercaya, misalnya penyedia hosting,
          database, penyimpanan file, pengiriman email, dan pengiriman pesan WhatsApp. Mereka hanya memproses data
          sejauh diperlukan untuk layanan tersebut.
        </p>
        <p>
          Khusus Absensi: model pengenalan wajah dimuat ke browser Anda dari jaringan pengiriman konten publik
          (jsDelivr), dan peta lokasi memakai OpenStreetMap, sehingga alamat IP Anda terlihat oleh penyedia tersebut
          saat halaman terkait dibuka. Foto Anda tidak dikirim ke mereka.
        </p>
      </section>

      <section>
        <h2>7. Penyimpanan, keamanan, dan penghapusan</h2>
        <ul>
          <li>Koneksi ke Layanan dienkripsi (HTTPS).</li>
          <li>Password disimpan dalam bentuk hash, sehingga tidak bisa dibaca siapa pun termasuk kami.</li>
          <li>Akses data dibatasi sesuai peran pengguna di perusahaan atau toko Anda, dan data tiap perusahaan dipisahkan.</li>
          <li>
            Foto dan PDF nota dihapus otomatis setelah masa simpan berakhir (umumnya 6 bulan setelah uang muka selesai).
            Nominal, keterangan, dan hasil verifikasinya tetap tersimpan.
          </li>
          <li>
            Catatan error teknis disimpan 60 hari dan tidak memuat isi formulir, password, atau data wajah.
          </li>
          <li>
            Data disimpan selama perusahaan Anda berlangganan. Bila add-on dinonaktifkan, datanya tetap tersimpan tetapi
            tidak bisa diakses sampai add-on diaktifkan lagi. Data dapat dihapus atas permintaan perusahaan setelah
            langganan berakhir, dan penghapusan akun perusahaan ikut menghapus data serta file absensinya.
          </li>
        </ul>
      </section>

      <section>
        <h2>8. Hak Anda</h2>
        <p>
          Anda berhak meminta akses, perbaikan, atau penghapusan data pribadi Anda, menarik persetujuan, dan
          mengajukan keberatan atas keputusan yang diambil secara otomatis, sesuai ketentuan peraturan
          perundang-undangan. Kirim permintaan ke {SITE.email}, atau ke perusahaan Anda (lihat bagian 1).
        </p>
      </section>

      <section>
        <h2>9. Perubahan kebijakan</h2>
        <p>
          Kebijakan ini dapat diperbarui sewaktu-waktu. Perubahan penting akan kami umumkan melalui situs ini atau
          email.
        </p>
      </section>

      <section>
        <h2>10. Kontak</h2>
        <p>Pertanyaan tentang kebijakan ini dapat dikirim ke {SITE.email}.</p>
      </section>
    </LegalPage>
  );
}
