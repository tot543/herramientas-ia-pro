import Link from "next/link";
import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";

// eslint-disable-next-line @typescript-eslint/no-require-imports
const siteConfig = require("../../../site.config.js");

export const metadata: Metadata = {
    title: `Blueprints — Guías Prácticas de IA para Operaciones | ${siteConfig.siteName}`,
    description:
        "Blueprints paso a paso para automatizar operaciones y RRHH con inteligencia artificial. Flujos reales, prompts probados y resultados medibles.",
    alternates: { canonical: "/blog/" },
    openGraph: {
        title: `Blueprints — Guías Prácticas de IA | ${siteConfig.siteName}`,
        description:
            "Blueprints paso a paso para automatizar operaciones y RRHH con IA.",
        type: "website",
    },
};

const categoryColors: Record<string, string> = {
    rrhh: "bg-violet-100 text-violet-700",
    operaciones: "bg-emerald-100 text-emerald-700",
    productividad: "bg-amber-100 text-amber-700",
    marketing: "bg-cyan-100 text-cyan-700",
};

export default function BlogIndexPage() {
    const posts = getAllPosts();

    return (
        <>
            {/* Hero */}
            <section className="bg-gradient-to-br from-gray-900 via-indigo-950 to-gray-900 text-white py-20 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <span className="inline-block bg-indigo-500/30 text-indigo-300 text-xs font-semibold px-3 py-1 rounded-full mb-6 uppercase tracking-widest">
                        Blueprints
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
                        Guías <span className="text-cyan-400">paso a paso</span> para
                        automatizar con IA
                    </h1>
                    <p className="text-lg text-indigo-200 max-w-2xl mx-auto leading-relaxed">
                        Cada Blueprint es un flujo completo que puedes implementar hoy.
                        Prompts reales, herramientas probadas, resultados medibles.
                    </p>
                </div>
            </section>

            {/* Filter chips */}
            <section className="py-8 px-4 border-b border-gray-200 bg-white">
                <div className="max-w-5xl mx-auto flex flex-wrap gap-3 justify-center">
                    <Link
                        href="/blog/"
                        className="px-4 py-2 rounded-full text-sm font-semibold bg-indigo-600 text-white"
                    >
                        Todos
                    </Link>
                    {siteConfig.blogCategories.map(
                        (cat: { slug: string; nombre: string; icon: string }) => (
                            <span
                                key={cat.slug}
                                className="px-4 py-2 rounded-full text-sm font-medium bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors cursor-default"
                            >
                                {cat.icon} {cat.nombre}
                            </span>
                        )
                    )}
                </div>
            </section>

            {/* Posts grid */}
            <section className="py-16 px-4">
                <div className="max-w-6xl mx-auto">
                    {posts.length === 0 ? (
                        <div className="text-center py-20">
                            <span className="text-5xl block mb-4">📝</span>
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                Próximamente
                            </h2>
                            <p className="text-gray-500">
                                Estamos preparando los primeros Blueprints. ¡Vuelve pronto!
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {posts.map((post) => (
                                <Link
                                    key={post.slug}
                                    href={`/blog/${post.slug}/`}
                                    className="group bg-white rounded-3xl border border-gray-200 overflow-hidden hover:border-indigo-300 hover:shadow-xl transition-all duration-300"
                                >
                                    {/* Barra de color superior */}
                                    <div className="h-2 bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-500" />

                                    <div className="p-8">
                                        {/* Meta */}
                                        <div className="flex items-center gap-3 mb-4">
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
                                            {post.featured && (
                                                <span className="text-xs text-amber-600 font-semibold">
                                                    ⭐ Destacado
                                                </span>
                                            )}
                                        </div>

                                        {/* Title */}
                                        <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors leading-snug">
                                            {post.title}
                                        </h2>

                                        {/* Description */}
                                        <p className="text-sm text-gray-500 leading-relaxed mb-4 line-clamp-3">
                                            {post.description}
                                        </p>

                                        {/* Tags */}
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {post.tags.slice(0, 4).map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded-md"
                                                >
                                                    #{tag}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Footer */}
                                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                            <span className="text-xs text-gray-400">
                                                {new Date(post.date).toLocaleDateString("es-ES", {
                                                    year: "numeric",
                                                    month: "long",
                                                    day: "numeric",
                                                })}
                                            </span>
                                            <span className="text-sm font-semibold text-indigo-600 group-hover:translate-x-1 transition-transform">
                                                Leer blueprint →
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}
