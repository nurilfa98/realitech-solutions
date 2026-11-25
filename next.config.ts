import type { NextConfig } from "next";

// Web pemasaran dan portal produk Realitech: semua halaman statis (tanpa database),
// jadi cukup konfigurasi Tailwind untuk Turbopack.
const nextConfig: NextConfig = {
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  // Demo prototype klien (berkas statis di public/demo). Tidak ditautkan di menu
  // dan sitemap, dan ditandai noindex agar tidak muncul di mesin pencari.
  async headers() {
    return [
      {
        source: "/demo/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
  async rewrites() {
    return [{ source: "/demo/klinik", destination: "/demo/klinik/index.html" }];
  },
};

export default nextConfig;
