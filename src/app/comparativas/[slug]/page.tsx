import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import {
    getAllComparisons,
    getComparisonsByType,
    getToolById,
    getRelatedComparisons,
    getCategoryUrl,
    getMejoresUrl,
} from "@/lib/data";
import ComparisonTable from "@/components/ComparisonTable";
import ProsConsList from "@/components/ProsConsList";
import AffiliateButton from "@/components/AffiliateButton";
import InternalLinks from "@/components/InternalLinks";

// eslint-disable-next-line @typescript-eslint/no-require-imports
const siteConfig = require("../../../../site.config.js");

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    const vsComparisons = getComparisonsByType("vs");
    return vsComparisons.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const comparison = getAllComparisons().find((c) => c.slug === slug && c.tipo_pagina === "vs");
    if (!comparison) return {};

    const toolA = getToolById(comparison.tool_a_id);
    const toolB = getToolById(comparison.tool_b_id);
    if (!toolA || !toolB) return {};

    const title = `${toolA.nombre} vs ${toolB.nombre} — ¿Cuál es mejor en ${new Date().getFullYear()}?`;
    const description = `${comparison.diferencia_principal || `Comparativa completa entre ${toolA.nombre} y ${toolB.nombre}.`} Descubre cuál se adapta mejor a tu flujo de trabajo.`;

    return {
        title,
        description,
        alternates: { canonical: `/comparativas/${slug}/` },
        openGraph: { title, description },
    };
}

export default async function VsPage({ params }: PageProps) {
    const { slug } = await params;
    const comparison = getAllComparisons().find((c) => c.slug === slug && c.tipo_pagina === "vs");
    if (!comparison) notFound();

    const toolA = getToolById(comparison.tool_a_id);
    const toolB = getToolById(comparison.tool_b_id);
    if (!toolA || !toolB) notFound();

    const relatedComparisons = getRelatedComparisons(slug, comparison.categoria, 4);
    const cat = siteConfig.categorias.find(
        (c: { slug: string }) => c.slug === comparison.categoria
    );
    const year = new Date().getFullYear();

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            {/* Breadcrumb */}
            <nav className="text-sm text-gray-500 mb-8 flex gap-2 flex-wrap">
                <Link href="/" className="hover:text-indigo-600">Inicio</Link>
                <span>/</span>
                {cat && (
                    <>
                        <Link href={getCategoryUrl(cat.slug) + "/"} className="hover:text-indigo-600">
                            {cat.nombre}
                        </Link>
                        <span>/</span>
                    </>
                )}
                <span className="text-gray-800 font-medium">
                    {toolA.nombre} vs {toolB.nombre}
                </span>
            </nav>

            {/* Cabecera / Hero */}
            <div className="text-center mb-12">
                <span className="inline-block bg-indigo-100 text-indigo-700 text-xs font-semibold px-3 py-1 rounded-full mb-4 uppercase tracking-widest">
                    Comparativa directa · {year}
                </span>
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
                    {toolA.nombre} vs {toolB.nombre}: <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
                        ¿Cuál es mejor generador?
                    </span>
                </h1>

                {comparison.diferencia_principal && (
                    <div className="bg-white rounded-3xl border-2 border-indigo-50 shadow-xl p-8 mb-10 max-w-3xl mx-auto relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <span className="text-6xl font-black">VS</span>
                        </div>
                        <p className="text-xl text-gray-700 font-medium leading-relaxed mb-6">
                            "{comparison.diferencia_principal}"
                        </p>
                        {comparison.ganador_general && (
                            <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-6 py-2 rounded-full font-bold text-sm">
                                <span className="text-lg">🏆</span> Ganador general: {comparison.ganador_general}
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Tabla comparativa consolidada */}
            <section className="mb-14">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    📊 Análisis Lado a Lado
                </h2>
                <ComparisonTable toolA={toolA} toolB={toolB} />
            </section>

            {/* Cajas de Conclusión / Elección según perfil */}
            <section className="mb-14 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-indigo-50 rounded-2xl p-8 border border-indigo-100 relative shadow-sm">
                    <div className="absolute top-0 right-0 -mt-3 -mr-3 bg-indigo-600 text-white p-2 rounded-xl shadow-lg">
                        <span className="text-xs font-bold uppercase tracking-tighter">Opción A</span>
                    </div>
                    <h3 className="text-2xl font-bold text-indigo-900 mb-4">
                        Elige {toolA.nombre} si...
                    </h3>
                    <p className="text-gray-700 leading-relaxed mb-6">
                        {comparison.mejor_para_tool_a || toolA.ideal_para || toolA.mejor_para}
                    </p>
                    <ul className="space-y-3 mb-8">
                        {toolA.pros.slice(0, 3).map((p, i) => (
                            <li key={i} className="flex gap-2 text-sm text-indigo-800 font-medium italic">
                                <span>✓</span> {p}
                            </li>
                        ))}
                    </ul>
                    <AffiliateButton tool={toolA} text={`Empezar con ${toolA.nombre} →`} size="lg" className="w-full" />
                </div>

                <div className="bg-violet-50 rounded-2xl p-8 border border-violet-100 relative shadow-sm">
                    <div className="absolute top-0 right-0 -mt-3 -mr-3 bg-violet-600 text-white p-2 rounded-xl shadow-lg">
                        <span className="text-xs font-bold uppercase tracking-tighter">Opción B</span>
                    </div>
                    <h3 className="text-2xl font-bold text-violet-900 mb-4">
                        Elige {toolB.nombre} si...
                    </h3>
                    <p className="text-gray-700 leading-relaxed mb-6">
                        {comparison.mejor_para_tool_b || toolB.ideal_para || toolB.mejor_para}
                    </p>
                    <ul className="space-y-3 mb-8">
                        {toolB.pros.slice(0, 3).map((p, i) => (
                            <li key={i} className="flex gap-2 text-sm text-violet-800 font-medium italic">
                                <span>✓</span> {p}
                            </li>
                        ))}
                    </ul>
                    <AffiliateButton tool={toolB} text={`Empezar con ${toolB.nombre} →`} size="lg" variant="secondary" className="w-full" />
                </div>
            </section>

            {/* Aviso de afiliado */}
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 mb-12">
                <p className="text-xs text-gray-500 italic text-center">
                    {siteConfig.affiliateDisclaimer}{" "}
                    <Link href="/aviso-afiliados/" className="text-indigo-400 font-semibold hover:underline">
                        Ver aviso completo
                    </Link>
                </p>
            </div>

            {/* Links internos */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                    <InternalLinks comparisons={relatedComparisons} title="Más comparativas interesantes" />
                </div>
                <div className="bg-gradient-to-br from-indigo-50 to-violet-50 rounded-3xl p-6 border border-indigo-100 shadow-sm flex flex-col items-center text-center justify-center">
                    <span className="text-3xl mb-4">✨</span>
                    <h3 className="font-bold text-gray-900 mb-2 leading-tight">
                        ¿Buscas lo mejor <br /> en {cat?.nombre || 'IA'}?
                    </h3>
                    <p className="text-xs text-gray-600 mb-6">
                        Hemos rankeado las herramientas más potentes del mercado.
                    </p>
                    <Link
                        href={getMejoresUrl(`mejores-ia-${comparison.categoria.replace('ia-para-', '')}`) + "/"}
                        className="inline-block bg-indigo-600 text-white text-xs font-bold px-6 py-3 rounded-full hover:bg-indigo-700 transition-all shadow-md active:scale-95"
                    >
                        Ver TOP Ranking →
                    </Link>
                </div>
            </div>
        </div>
    );
}
