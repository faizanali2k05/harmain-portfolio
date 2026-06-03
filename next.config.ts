import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static HTML export -> outputs a plain `out/` folder for Cloudflare Pages.
  output: "export",

  // No Next.js image optimization server on static hosting.
  images: {
    unoptimized: true,
  },

  // Adds a trailing slash so routes resolve cleanly as static files.
  trailingSlash: true,
};

export default nextConfig;
