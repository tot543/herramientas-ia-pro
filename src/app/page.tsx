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
      <section className="bg-slate-950 text-white py-32 px-4 relative overflow-hidden">
        {/* Advanced Background pattern */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(99,102,241,0.15),transparent_50%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
          <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-indigo-500/10 text-indigo-300 text-xs font-bold px-4 py-2 rounded-full mb-8 uppercase tracking-widest border border-indigo-500/20 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            Arquitectura IA para Operaciones y RRHH
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.1] mb-8 tracking-tight">
            Escala tu equipo con <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-400 to-emerald-400 animate-gradient-x">
              Blueprints de IA
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto mb-12 leading-relaxed font-medium">
            No más teoría. Implementa flujos reales, prompts probados
            y arquitecturas conectadas que ahorran cientos de horas a tu equipo.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link
              href="/blog/"
              className="group bg-white text-slate-950 font-bold px-10 py-5 rounded-2xl hover:bg-indigo-50 transition-all text-lg shadow-2xl shadow-white/10 active:scale-[0.98] flex items-center gap-2"
            >
              Ver Catálogo de Blueprints
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link
              href="#featured"
              className="text-slate-400 font-semibold px-8 py-4 rounded-xl hover:text-white transition-all text-lg flex items-center gap-2"
            >
              Casos de Éxito
              <span className="text-xs bg-slate-800 px-2 py-1 rounded text-slate-500">40+</span>
            </Link>
          </div>
        </div>
      </section>

      {/* STATS / TRUST */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            {[
              { label: "Guías Implementables", value: posts.length, suffix: "+", icon: "📋" },
              { label: "Prompts de IA", value: posts.reduce((acc, p) => acc + p.steps.filter(s => s.prompt).length, 0), suffix: "+", icon: "🤖" },
              { label: "Áreas de Negocio", value: siteConfig.blogCategories.length, suffix: "", icon: "🎯" },
              { label: "Coste de Acceso", value: "Gratis", suffix: "", icon: "✨" },
            ].map((stat) => (
              <div key={stat.label} className="group cursor-default">
                <span className="text-3xl block mb-4 group-hover:scale-110 transition-transform">{stat.icon}</span>
                <p className="text-4xl font-black text-slate-900 tracking-tight">
                  {stat.value}{stat.suffix}
                </p>
                <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mt-2 group-hover:text-indigo-600 transition-colors">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIES GRID */}
      <section className="py-24 px-4 bg-slate-50/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">
              Especialidades de Automatización
            </h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">
              Selecciona un área para descubrir blueprints específicos diseñados para
              resolver fricciones operativas reales.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {siteConfig.blogCategories.map(
              (cat: {
                slug: string;
                nombre: string;
                descripcion: string;
                icon: string;
              }) => (
                <Link
                  href={`/blog?cat=${cat.slug}`}
                  key={cat.slug}
                  className="bg-white rounded-3xl border border-gray-200 p-8 hover:border-indigo-500 hover:shadow-xl hover:shadow-indigo-500/5 transition-all group flex flex-col items-center text-center"
                >
                  <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center text-4xl mb-6 group-hover:bg-indigo-50 transition-colors">
                    {cat.icon}
                  </div>
                  <h3 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors text-lg mb-3">
                    {cat.nombre}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed font-medium">
                    {cat.descripcion}
                  </p>
                </Link>
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
