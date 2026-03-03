import Link from "next/link";
import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";

// eslint-disable-next-line @typescript-eslint/no-require-imports
const siteConfig = require("../../site.config.js");

export const metadata: Metadata = {
  title: `${siteConfig.siteName} — Arquitectura de IA para Operaciones y RRHH`,
  description:
    "Blueprints paso a paso para automatizar operaciones y RRHH con inteligencia artificial. Flujos reales, prompts probados y resultados medibles.",
  alternates: { canonical: "/" },
};

const categoryColors: Record<string, string> = {
  rrhh: "bg-violet-100 text-violet-700 border-violet-200",
  operaciones: "bg-emerald-100 text-emerald-700 border-emerald-200",
  productividad: "bg-amber-100 text-amber-700 border-amber-200",
  marketing: "bg-cyan-100 text-cyan-700 border-cyan-200",
};

export default function HomePage() {
  const posts = getAllPosts();
  const featuredPosts = posts.filter((p) => p.featured).slice(0, 3);
  const latestPosts =
    featuredPosts.length > 0 ? featuredPosts : posts.slice(0, 3);

  return (
    <>
      {/* HERO */}
      <section className="bg-gradient-to-br from-gray-950 via-indigo-950 to-gray-950 text-white py-24 px-4 relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="inline-block bg-indigo-500/20 text-indigo-300 text-xs font-semibold px-4 py-1.5 rounded-full mb-8 uppercase tracking-widest border border-indigo-500/30">
            Para equipos de Operaciones y RRHH
          </span>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-400 to-violet-400">
              Blueprint Ops
            </span>
            <br />
            <span className="text-white">
              Arquitectura de IA para
              <br className="hidden md:block" /> Operaciones y RRHH
            </span>
          </h1>

          <p className="text-lg md:text-xl text-indigo-200/80 max-w-2xl mx-auto mb-10 leading-relaxed">
            Blueprints paso a paso para automatizar procesos reales.
            Flujos completos con prompts probados, herramientas conectadas
            y resultados medibles.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/blog/"
              className="bg-gradient-to-r from-cyan-400 to-indigo-400 text-gray-950 font-bold px-8 py-4 rounded-xl hover:from-cyan-300 hover:to-indigo-300 transition-all text-base shadow-lg shadow-cyan-500/20 active:scale-[0.98]"
            >
              Explorar Blueprints →
            </Link>
            <Link
              href="#featured"
              className="border-2 border-white/20 text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/10 hover:border-white/40 transition-all text-base"
            >
              Ver el más reciente
            </Link>
          </div>
        </div>
      </section>

      {/* PILARES */}
      <section className="py-12 border-b border-gray-200 bg-white">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { label: "Blueprints publicados", value: `${posts.length}`, icon: "📋" },
            { label: "Prompts incluidos", value: `${posts.reduce((acc, p) => acc + p.steps.filter(s => s.prompt).length, 0)}+`, icon: "🤖" },
            { label: "Áreas cubiertas", value: `${siteConfig.blogCategories.length}`, icon: "🎯" },
            { label: "100% Gratis", value: "Siempre", icon: "✨" },
          ].map((stat) => (
            <div key={stat.label}>
              <span className="text-2xl block mb-1">{stat.icon}</span>
              <p className="text-2xl font-extrabold text-indigo-600">
                {stat.value}
              </p>
              <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ÁREAS DE EXPERTISE */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-3 text-center">
            Áreas de Expertise
          </h2>
          <p className="text-gray-500 text-center mb-10">
            Blueprints organizados por el problema que resuelven.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {siteConfig.blogCategories.map(
              (cat: {
                slug: string;
                nombre: string;
                descripcion: string;
                icon: string;
              }) => (
                <div
                  key={cat.slug}
                  className="bg-white rounded-2xl border border-gray-200 p-6 hover:border-indigo-400 hover:shadow-md transition-all group"
                >
                  <span className="text-4xl block mb-3">{cat.icon}</span>
                  <h3 className="font-bold text-gray-900 group-hover:text-indigo-600 transition-colors text-sm leading-snug mb-2">
                    {cat.nombre}
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    {cat.descripcion}
                  </p>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* BLUEPRINTS DESTACADOS */}
      <section id="featured" className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-3 text-center">
            Blueprints Destacados
          </h2>
          <p className="text-gray-500 text-center mb-10">
            Los flujos más populares, listos para implementar.
          </p>

          {latestPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {latestPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}/`}
                  className="group bg-white rounded-3xl border border-gray-200 overflow-hidden hover:border-indigo-300 hover:shadow-xl transition-all duration-300"
                >
                  <div className="h-2 bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-500" />
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span
                        className={`text-xs font-semibold px-2.5 py-1 rounded-full ${categoryColors[post.category] ||
                          "bg-gray-100 text-gray-600"
                          }`}
                      >
                        {post.category.toUpperCase()}
                      </span>
                      <span className="text-xs text-gray-400">
                        {post.readingTime}
                      </span>
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors leading-snug">
                      {post.title}
                    </h3>
                    <p className="text-xs text-gray-500 leading-relaxed line-clamp-2 mb-4">
                      {post.description}
                    </p>
                    <span className="text-sm font-semibold text-indigo-600 group-hover:translate-x-1 transition-transform inline-block">
                      Leer blueprint →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-500">
                Próximamente — los primeros Blueprints están en camino.
              </p>
            </div>
          )}

          <div className="text-center mt-10">
            <Link
              href="/blog/"
              className="inline-flex items-center gap-2 text-indigo-600 font-semibold hover:text-indigo-800 underline"
            >
              Ver todos los Blueprints →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-16 px-4 bg-gradient-to-br from-indigo-600 to-violet-700 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            ¿Listo para automatizar tu operación?
          </h2>
          <p className="text-indigo-100 text-lg mb-8">
            Explora nuestros Blueprints y encuentra el flujo de IA perfecto para
            tu equipo. Cada guía incluye prompts reales y herramientas probadas.
          </p>
          <Link
            href="/blog/"
            className="bg-white text-indigo-700 font-bold px-8 py-4 rounded-xl hover:bg-indigo-50 transition-colors inline-block shadow-lg active:scale-[0.98]"
          >
            Explorar Blueprints →
          </Link>
        </div>
      </section>
    </>
  );
}
