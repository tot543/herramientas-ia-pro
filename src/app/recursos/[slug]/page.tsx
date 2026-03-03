import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import {
    getAllComparisons,
    getToolById,
    getRelatedComparisons,
    getAllTools,
} from "@/lib/data";
import ComparisonTable from "@/components/ComparisonTable";
import AffiliateButton from "@/components/AffiliateButton";
import InternalLinks from "@/components/InternalLinks";

// eslint-disable-next-line @typescript-eslint/no-require-imports
const siteConfig = require("../../../../site.config.js");

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    // Generar rutas para todos los tipos de comparaciones + herramientas
    const comparisons = getAllComparisons();
    const tools = getAllTools();

    const compSlugs = comparisons
        .filter((c) => c.slug && typeof c.slug === "string")
        .map((c) => ({ slug: c.slug }));
    const toolSlugs = tools
        .filter((t) => t.slug && typeof t.slug === "string")
        .map((t) => ({ slug: t.slug }));

    // Deduplicate slugs
    const seen = new Set<string>();
    const allSlugs = [...compSlugs, ...toolSlugs].filter(({ slug }) => {
        if (seen.has(slug)) return false;
        seen.add(slug);
        return true;
    });

    return allSlugs;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;

    // Buscar en comparaciones
    const comparison = getAllComparisons().find((c) => c.slug === slug);
    if (comparison) {
        const toolA = getToolById(comparison.tool_a_id);
        const toolB = getToolById(comparison.tool_b_id);
        const title = toolA && toolB
            ? `${toolA.nombre} vs ${toolB.nombre} — Recurso | ${siteConfig.siteName}`
            : `${comparison.keyword_objetivo || slug} | ${siteConfig.siteName}`;

        return {
            title,
            description: comparison.diferencia_principal || `Recurso detallado: ${slug}`,
            alternates: { canonical: `/recursos/${slug}/` },
        };
    }

    // Buscar en herramientas
    const tool = getAllTools().find((t) => t.slug === slug);
    if (tool) {
        return {
            title: `${tool.nombre} — Recurso | ${siteConfig.siteName}`,
            description: tool.descripcion || `Todo sobre ${tool.nombre}`,
            alternates: { canonical: `/recursos/${slug}/` },
        };
    }

    return {};
}

export default async function RecursosPage({ params }: PageProps) {
    const { slug } = await params;

    // Intentar cargar como comparación
    const comparison = getAllComparisons().find((c) => c.slug === slug);

    if (comparison) {
        const toolA = getToolById(comparison.tool_a_id);
        const toolB = getToolById(comparison.tool_b_id);
        if (!toolA || !toolB) notFound();

        const relatedComparisons = getRelatedComparisons(slug, comparison.categoria, 4);
        const cat = siteConfig.categorias.find(
            (c: { slug: string }) => c.slug === comparison.categoria
        );

        return (
            <div className="max-w-4xl mx-auto px-4 py-12">
                {/* Breadcrumb */}
                <nav className="text-sm text-gray-500 mb-8 flex gap-2 flex-wrap">
                    <Link href="/" className="hover:text-indigo-600">Inicio</Link>
                    <span>/</span>
                    <span className="text-gray-400">Recursos</span>
                    <span>/</span>
                    <span className="text-gray-800 font-medium">
                        {toolA.nombre} vs {toolB.nombre}
                    </span>
                </nav>

                {/* Header */}
                <div className="text-center mb-12">
                    <span className="inline-block bg-indigo-100 text-indigo-700 text-xs font-semibold px-3 py-1 rounded-full mb-4 uppercase tracking-widest">
                        Recurso · Comparativa
                    </span>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
                        {toolA.nombre} vs {toolB.nombre}
                    </h1>

                    {comparison.diferencia_principal && (
                        <div className="bg-white rounded-3xl border-2 border-indigo-50 shadow-xl p-8 mb-10 max-w-3xl mx-auto">
                            <p className="text-xl text-gray-700 font-medium leading-relaxed mb-4">
                                &ldquo;{comparison.diferencia_principal}&rdquo;
                            </p>
                            {comparison.ganador_general && (
                                <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-6 py-2 rounded-full font-bold text-sm">
                                    <span>🏆</span> Ganador general: {comparison.ganador_general}
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Tabla */}
                <section className="mb-14">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                        📊 Análisis Lado a Lado
                    </h2>
                    <ComparisonTable toolA={toolA} toolB={toolB} />
                </section>

                {/* CTAs */}
                <section className="mb-14 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-indigo-50 rounded-2xl p-8 border border-indigo-100">
                        <h3 className="text-xl font-bold text-indigo-900 mb-4">
                            Elige {toolA.nombre} si...
                        </h3>
                        <p className="text-gray-700 leading-relaxed mb-6">
                            {comparison.mejor_para_tool_a || toolA.ideal_para || toolA.mejor_para}
                        </p>
                        <AffiliateButton tool={toolA} text={`Probar ${toolA.nombre} →`} size="lg" className="w-full" />
                    </div>
                    <div className="bg-violet-50 rounded-2xl p-8 border border-violet-100">
                        <h3 className="text-xl font-bold text-violet-900 mb-4">
                            Elige {toolB.nombre} si...
                        </h3>
                        <p className="text-gray-700 leading-relaxed mb-6">
                            {comparison.mejor_para_tool_b || toolB.ideal_para || toolB.mejor_para}
                        </p>
                        <AffiliateButton tool={toolB} text={`Probar ${toolB.nombre} →`} size="lg" variant="secondary" className="w-full" />
                    </div>
                </section>

                {/* Affiliate disclaimer */}
                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 mb-12">
                    <p className="text-xs text-gray-500 italic text-center">
                        {siteConfig.affiliateDisclaimer}
                    </p>
                </div>

                {/* Related */}
                {relatedComparisons.length > 0 && (
                    <InternalLinks comparisons={relatedComparisons} title="Más recursos relacionados" />
                )}

                {/* CTA a blog */}
                <div className="mt-12 bg-gradient-to-br from-indigo-50 to-violet-50 rounded-3xl border border-indigo-100 p-8 text-center">
                    <span className="text-3xl block mb-3">📋</span>
                    <h3 className="font-bold text-gray-900 mb-2">
                        ¿Quieres ver cómo usar estas herramientas en un flujo real?
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                        Nuestros Blueprints te muestran paso a paso cómo integrar herramientas de IA en tu operación.
                    </p>
                    <Link
                        href="/blog/"
                        className="inline-block bg-indigo-600 text-white font-bold px-6 py-3 rounded-xl hover:bg-indigo-700 transition-all text-sm"
                    >
                        Ver Blueprints →
                    </Link>
                </div>
            </div>
        );
    }

    // Si no es comparación, mostrar 404
    notFound();
}
