import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  images: {
    // Con el runtime de Node.js en Vercel, next/image optimiza automáticamente
    // Descomentar si se necesitan dominios externos:
    // remotePatterns: [{ protocol: 'https', hostname: '**.example.com' }],
  },

  // Redirecciones 301 para la migración de URLs
  async redirects() {
    return [
      // Comparativas → Blog
      {
        source: "/comparativas/:slug/",
        destination: "/blog/:slug/",
        permanent: true,
      },
      {
        source: "/comparativas/:slug",
        destination: "/blog/:slug/",
        permanent: true,
      },
      // Alternativas → Recursos
      {
        source: "/alternativas/:slug/",
        destination: "/recursos/:slug/",
        permanent: true,
      },
      {
        source: "/alternativas/:slug",
        destination: "/recursos/:slug/",
        permanent: true,
      },
      // Mejores → Recursos
      {
        source: "/mejores/:slug/",
        destination: "/recursos/:slug/",
        permanent: true,
      },
      {
        source: "/mejores/:slug",
        destination: "/recursos/:slug/",
        permanent: true,
      },
      // Categorías → Recursos (categoría)
      {
        source: "/categoria/:slug/",
        destination: "/recursos/:slug/",
        permanent: true,
      },
      {
        source: "/categoria/:slug",
        destination: "/recursos/:slug/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
