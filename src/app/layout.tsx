import type { Metadata } from "next";
import { Inter, Source_Serif_4 } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  display: "swap",
});

// eslint-disable-next-line @typescript-eslint/no-require-imports
const siteConfig = require("../../site.config.js");

export const metadata: Metadata = {
  title: "Mejores Herramientas de IA para Profesionales | 2026",
  description: "Descubre el mejor directorio de herramientas de Inteligencia Artificial. Automatiza tu trabajo, genera contenido y aumenta tu productividad con las mejores IAs del mercado.",
  keywords: ["herramientas IA", "inteligencia artificial", "automatización", "productividad", "software IA"],
  metadataBase: new URL("https://midirectorioia.com"),
  openGraph: {
    type: "website",
    locale: siteConfig.siteLocale,
    siteName: siteConfig.siteName,
    title: "Mejores Herramientas de IA para Profesionales | 2026",
    description: "Descubre el mejor directorio de herramientas de Inteligencia Artificial. Automatiza tu trabajo, genera contenido y aumenta tu productividad con las mejores IAs del mercado.",
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "ZC13geA6C0ignM30NLkcATpK7rDqjSW8rR15JCmzzhc",
    other: {
      "impact-site-verification": "f3b766a0-88f1-4808-a9c6-bcef961d3e49",
    },
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${inter.variable} ${sourceSerif.variable} font-sans antialiased bg-gray-50 text-gray-900 min-h-screen flex flex-col`}
      >
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
