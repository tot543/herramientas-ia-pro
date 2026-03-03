import { Suspense } from "react";
import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import BlogSearch from "@/components/BlogSearch";

// eslint-disable-next-line @typescript-eslint/no-require-imports
const siteConfig = require("../../../site.config.js");

export async function generateMetadata({
    searchParams,
}: BlogIndexProps): Promise<Metadata> {
    const { cat } = await searchParams;
    const categoryName = siteConfig.blogCategories.find((c: any) => c.slug === cat)?.nombre;

    const title = categoryName
        ? `Blueprints de ${categoryName} — Guía de IA | ${siteConfig.siteName}`
        : `Blueprints — Guías Prácticas de IA para Operaciones | ${siteConfig.siteName}`;

    const description = categoryName
        ? `Explora blueprints paso a paso sobre ${categoryName} con IA. Automatiza flujos reales y mejora tu arquitectura operativa.`
        : "Blueprints paso a paso para automatizar operaciones y RRHH con inteligencia artificial. Flujos reales, prompts probados y resultados medibles.";

    const canonical = cat ? `/blog/?cat=${cat}` : "/blog/";

    return {
        title,
        description,
        alternates: { canonical },
        openGraph: {
            title,
            description,
            type: "website",
        },
    };
}

interface BlogIndexProps {
    searchParams: Promise<{ cat?: string }>;
}

export default async function BlogIndex({ searchParams }: BlogIndexProps) {
    const { cat } = await searchParams;
    const allPosts = getAllPosts();

    return (
        <div className="min-h-screen bg-gray-50/50">
            {/* Hero */}
            <section className="bg-gradient-to-br from-gray-900 via-indigo-950 to-gray-900 text-white py-20 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <span className="inline-block bg-indigo-500/30 text-indigo-300 text-xs font-semibold px-3 py-1 rounded-full mb-6 uppercase tracking-widest">
                        Blueprints de IA
                    </span>
                    <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6">
                        Arquitectura Operativa <span className="text-cyan-400">Escalable</span>
                    </h1>
                    <p className="text-lg text-indigo-100 max-w-2xl mx-auto leading-relaxed font-light">
                        No son simples tutoriales. Son esquemas técnicos para que tu infraestructura empresarial no dependa de tareas manuales.
                    </p>
                </div>
            </section>

            <Suspense fallback={
                <div className="max-w-6xl mx-auto px-4 py-32 text-center">
                    <div className="animate-spin w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full mx-auto" />
                    <p className="mt-4 text-gray-500 font-medium tracking-wide">Cargando biblioteca...</p>
                </div>
            }>
                <BlogSearch
                    allPosts={allPosts}
                    activeCategory={cat}
                    siteCategories={siteConfig.blogCategories}
                />
            </Suspense>
        </div>
    );
}
