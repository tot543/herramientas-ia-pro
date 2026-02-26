import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Permite leer archivos CSV desde el directorio data/ en tiempo de build
  experimental: {
    // serverComponentsExternalPackages removido → ya es default en Next 14
  },
};

export default nextConfig;
