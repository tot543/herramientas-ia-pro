import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import {
    getAllTools,
    getAllComparisons,
    getToolsByCategory,
    getRelatedComparisons,
} from "@/lib/data";
import ToolCard from "@/components/ToolCard";
import InternalLinks from "@/components/InternalLinks";

// eslint-disable-next-line @typescript-eslint/no-require-imports
const siteConfig = require("../../../../site.config.js");

interface PageProps {
    params: Promise<{ slug: string }>;
}

// Genera las rutas estáticas desde el CSV
export async function generateStaticParams() {
    return siteConfig.categorias.map((cat: { slug: string }) => ({
        slug: cat.slug,
    }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const cat = siteConfig.categorias.find(
        (c: { slug: string }) => c.slug === slug
    );
    if (!cat) return {};

    return {
        title: `${cat.nombre} — Comparativas y Reseñas`,
        description: cat.descripcion,
        alternates: { canonical: `/categoria/${slug}/` },
        openGraph: {
            title: `${cat.nombre} | ${siteConfig.siteName}`,
            description: cat.descripcion,
        },
    };
}

export default async function CategoryPage({ params }: PageProps) {
    const { slug } = await params;
    const cat = siteConfig.categorias.find(
        (c: { slug: string }) => c.slug === slug
    );

    if (!cat) notFound();

    const tools = getToolsByCategory(slug);
    const allComparisons = getAllComparisons();
    const categoryComparisons = allComparisons.filter(
        (c) => c.categoria === slug
    );
    const relatedComparisons = getRelatedComparisons("", slug, 6);

    const vsPages = categoryComparisons.filter((c) => c.tipo_pagina === "vs");
    const alternativaPages = categoryComparisons.filter(
        (c) => c.tipo_pagina === "alternativa"
    );
    const mejoresPages = categoryComparisons.filter(
        (c) => c.tipo_pagina === "mejores"
    );

    return (
        <div className="max-w-6xl mx-auto px-4 py-12">
            {/* Breadcrumb */}
            <nav aria-label="breadcrumb" className="text-sm text-gray-500 mb-8 flex gap-2">
                <Link href="/" className="hover:text-indigo-600">Inicio</Link>
                <span>/</span>
                <span className="text-gray-800 font-medium">{cat.nombre}</span>
            </nav>

            {/* Cabecera de categoría */}
            <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-10">
                <div className="flex items-start gap-4">
                    <span className="text-5xl">{cat.icon}</span>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-3">
                            {cat.nombre}
                        </h1>
                        <p className="text-gray-600 leading-relaxed max-w-3xl">
                            {cat.descripcion}
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-10">
                {/* Contenido principal */}
                <div className="flex-1">
                    {/* Lista de herramientas */}
                    {tools.length > 0 ? (
                        <>
                            <h2 className="text-xl font-bold text-gray-900 mb-6">
                                Herramientas de {cat.nombre.toLowerCase()} ({tools.length})
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                                {tools.map((tool, i) => (
                                    <ToolCard key={tool.tool_id} tool={tool} rank={i + 1} />
                                ))}
                            </div>
                        </>
                    ) : (
                        <div className="bg-indigo-50 rounded-2xl p-8 text-center mb-12">
                            <p className="text-gray-600">
                                Próximamente añadiremos herramientas en esta categoría.
                            </p>
                        </div>
                    )}

                    {/* Comparativas disponibles */}
                    {(vsPages.length > 0 || alternativaPages.length > 0 || mejoresPages.length > 0) && (
                        <div className="space-y-8">
                            {vsPages.length > 0 && (
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900 mb-4">
                                        ⚔️ Comparativas X vs Y en {cat.nombre}
                                    </h2>
                                    <ul className="space-y-2">
                                        {vsPages.map((c) => (
                                            <li key={c.slug}>
                                                <Link
                                                    href={`/comparativas/${c.slug}/`}
                                                    className="flex items-center gap-2 text-indigo-600 hover:underline font-medium"
                                                >
                                                    → {c.keyword_objetivo || c.slug.replace(/-/g, " ")}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {alternativaPages.length > 0 && (
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900 mb-4">
                                        🔄 Alternativas en {cat.nombre}
                                    </h2>
                                    <ul className="space-y-2">
                                        {alternativaPages.map((c) => (
                                            <li key={c.slug}>
                                                <Link
                                                    href={`/alternativas/${c.slug}/`}
                                                    className="flex items-center gap-2 text-indigo-600 hover:underline font-medium"
                                                >
                                                    → {c.keyword_objetivo || c.slug.replace(/-/g, " ")}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {mejoresPages.length > 0 && (
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900 mb-4">
                                        🏆 Guías de mejores herramientas
                                    </h2>
                                    <ul className="space-y-2">
                                        {mejoresPages.map((c) => (
                                            <li key={c.slug}>
                                                <Link
                                                    href={`/mejores/${c.slug}/`}
                                                    className="flex items-center gap-2 text-indigo-600 hover:underline font-medium"
                                                >
                                                    → {c.keyword_objetivo || c.slug.replace(/-/g, " ")}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Conclusión */}
                    <div className="mt-12 bg-gray-50 rounded-2xl p-6 border border-gray-200">
                        <h2 className="text-lg font-bold text-gray-900 mb-3">
                            ¿Cómo elegimos estas herramientas?
                        </h2>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            Analizamos cada herramienta basándonos en criterios objetivos:
                            facilidad de uso, relación calidad-precio, resultados reales,
                            soporte en español y adecuación para creadores de contenido
                            hispanohablantes. Actualizamos esta página regularmente para
                            reflejar los últimos cambios en precios y funcionalidades.
                        </p>
                    </div>
                </div>

                {/* Sidebar */}
                <aside className="lg:w-72 space-y-6">
                    <InternalLinks
                        comparisons={relatedComparisons}
                        title="Comparativas relacionadas"
                    />
                    <div className="bg-indigo-50 rounded-2xl p-5 border border-indigo-100">
                        <h3 className="font-bold text-indigo-900 mb-3 text-sm">
                            🏆 Guía completa
                        </h3>
                        <p className="text-xs text-indigo-700 mb-4">
                            ¿No sabes cuál elegir? Lee nuestra guía detallada con
                            recomendaciones según tu perfil.
                        </p>
                        <Link
                            href="/mejores/mejores-ia-escritura-bloggers/"
                            className="block text-center bg-indigo-600 text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                        >
                            Ver guía completa
                        </Link>
                    </div>
                </aside>
            </div>
        </div>
    );
}
