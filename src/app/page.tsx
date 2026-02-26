import Link from "next/link";
import type { Metadata } from "next";
import { getAllTools, getAllComparisons, getCategoryUrl, getVsUrl, getAlternativaUrl, getMejoresUrl } from "@/lib/data";
import AffiliateButton from "@/components/AffiliateButton";
import ToolCard from "@/components/ToolCard";

// eslint-disable-next-line @typescript-eslint/no-require-imports
const siteConfig = require("../../site.config.js");

export const metadata: Metadata = {
  title: `${siteConfig.siteName} — Comparativas y Reseñas de Herramientas de IA en Español`,
  description:
    "Comparativas honestas y reseñas detalladas de herramientas de IA para creadores de contenido. Encuentra la mejor herramienta para escritura, imágenes, vídeo y SEO.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  const tools = getAllTools();
  const comparisons = getAllComparisons();
  const vsPages = comparisons.filter((c) => c.tipo_pagina === "vs");
  const alternativaPages = comparisons.filter(
    (c) => c.tipo_pagina === "alternativa"
  );
  const mejoresPages = comparisons.filter((c) => c.tipo_pagina === "mejores");
  const featuredTools = tools.slice(0, 3);

  return (
    <>
      {/* HERO */}
      <section className="bg-gradient-to-br from-indigo-900 via-indigo-800 to-violet-900 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block bg-indigo-500/30 text-indigo-200 text-xs font-semibold px-3 py-1 rounded-full mb-6 uppercase tracking-widest">
            Para creadores de contenido hispanohablantes
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Encuentra la <span className="text-cyan-300">herramienta de IA</span>{" "}
            perfecta para tu negocio
          </h1>
          <p className="text-lg md:text-xl text-indigo-200 max-w-2xl mx-auto mb-10 leading-relaxed">
            Comparativas honestas, reseñas detalladas y guías actualizadas de las
            mejores herramientas de inteligencia artificial para creadores de
            contenido, marketers y emprendedores.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/mejores/mejores-ia-escritura-bloggers/"
              className="bg-cyan-400 text-indigo-900 font-bold px-8 py-4 rounded-xl hover:bg-cyan-300 transition-colors text-base"
            >
              Ver las mejores herramientas →
            </Link>
            <Link
              href="/categoria/ia-para-escritura/"
              className="border-2 border-white/40 text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/10 transition-colors text-base"
            >
              Explorar por categoría
            </Link>
          </div>
        </div>
      </section>

      {/* ESTADÍSTICAS */}
      <section className="py-10 border-b border-gray-200 bg-white">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { label: "Herramientas analizadas", value: `${tools.length}+` },
            { label: "Comparativas publicadas", value: `${comparisons.length}+` },
            { label: "Categorías cubiertas", value: `${siteConfig.categorias.length}` },
            { label: "Actualizado", value: "2026" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-3xl font-extrabold text-indigo-600">
                {stat.value}
              </p>
              <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CATEGORÍAS */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-3 text-center">
            Explora por categoría
          </h2>
          <p className="text-gray-500 text-center mb-10">
            Selecciona la categoría que más se adapta a tu flujo de trabajo.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {siteConfig.categorias.map(
              (cat: { slug: string; nombre: string; descripcion: string; icon: string }) => (
                <Link
                  key={cat.slug}
                  href={getCategoryUrl(cat.slug) + "/"}
                  className="bg-white rounded-2xl border border-gray-200 p-6 hover:border-indigo-400 hover:shadow-md transition-all group"
                >
                  <span className="text-4xl block mb-3">{cat.icon}</span>
                  <h3 className="font-bold text-gray-900 group-hover:text-indigo-600 transition-colors text-sm leading-snug mb-2">
                    {cat.nombre}
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    {cat.descripcion.slice(0, 80)}…
                  </p>
                </Link>
              )
            )}
          </div>
        </div>
      </section>

      {/* HERRAMIENTAS DESTACADAS */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-3 text-center">
            Herramientas más valoradas
          </h2>
          <p className="text-gray-500 text-center mb-10">
            Selección basada en precio, facilidad de uso y resultados reales.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredTools.map((tool, i) => (
              <ToolCard key={tool.tool_id} tool={tool} rank={i + 1} showCategory />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/mejores/mejores-ia-escritura-bloggers/"
              className="inline-flex items-center gap-2 text-indigo-600 font-semibold hover:text-indigo-800 underline"
            >
              Ver todas las comparativas →
            </Link>
          </div>
        </div>
      </section>

      {/* PÁGINAS DE DINERO: VS y ALTERNATIVAS */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Comparativas VS */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-5 flex items-center gap-2">
                <span className="text-2xl">⚔️</span> Comparativas X vs Y
              </h2>
              <ul className="space-y-3">
                {vsPages.map((c) => (
                  <li key={c.slug}>
                    <Link
                      href={getVsUrl(c.slug) + "/"}
                      className="flex items-center gap-2 text-indigo-600 hover:text-indigo-900 font-medium text-sm hover:underline"
                    >
                      → {c.keyword_objetivo || c.slug.replace(/-/g, " ")}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Alternativas */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-5 flex items-center gap-2">
                <span className="text-2xl">🔄</span> Alternativas a…
              </h2>
              <ul className="space-y-3">
                {alternativaPages.map((c) => (
                  <li key={c.slug}>
                    <Link
                      href={getAlternativaUrl(c.slug) + "/"}
                      className="flex items-center gap-2 text-indigo-600 hover:text-indigo-900 font-medium text-sm hover:underline"
                    >
                      → {c.keyword_objetivo || c.slug.replace(/-/g, " ")}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Mejores */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-5 flex items-center gap-2">
                <span className="text-2xl">🏆</span> Mejores herramientas para…
              </h2>
              <ul className="space-y-3">
                {mejoresPages.map((c) => (
                  <li key={c.slug}>
                    <Link
                      href={getMejoresUrl(c.slug) + "/"}
                      className="flex items-center gap-2 text-indigo-600 hover:text-indigo-900 font-medium text-sm hover:underline"
                    >
                      → {c.keyword_objetivo || c.slug.replace(/-/g, " ")}
                    </Link>
                  </li>
                ))}
                {siteConfig.mejoresPaginas.map(
                  (p: { slug: string; titulo: string }) => (
                    <li key={p.slug}>
                      <Link
                        href={getMejoresUrl(p.slug) + "/"}
                        className="flex items-center gap-2 text-indigo-600 hover:text-indigo-900 font-medium text-sm hover:underline"
                      >
                        → {p.titulo}
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-16 px-4 bg-gradient-to-br from-indigo-600 to-violet-600 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            ¿No sabes por dónde empezar?
          </h2>
          <p className="text-indigo-100 text-lg mb-8">
            Lee nuestra guía completa de las mejores herramientas de IA para
            escritura y descubre cuál es la ideal para ti.
          </p>
          <Link
            href="/mejores/mejores-ia-escritura-bloggers/"
            className="bg-white text-indigo-700 font-bold px-8 py-4 rounded-xl hover:bg-indigo-50 transition-colors inline-block"
          >
            Leer la guía completa →
          </Link>
        </div>
      </section>
    </>
  );
}
