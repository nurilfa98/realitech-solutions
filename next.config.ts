import type { NextConfig } from "next";

// Web profil Realitech Solutions: semua halaman statis (tanpa database),
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
};

export default nextConfig;
