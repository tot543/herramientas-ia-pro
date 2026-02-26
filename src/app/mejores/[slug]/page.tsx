import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import {
    getAllComparisons,
    getComparisonsByType,
    getToolsByCategory,
    getRelatedComparisons,
    getCategoryUrl,
} from "@/lib/data";
import ToolCard from "@/components/ToolCard";
import AffiliateButton from "@/components/AffiliateButton";
import InternalLinks from "@/components/InternalLinks";

// eslint-disable-next-line @typescript-eslint/no-require-imports
const siteConfig = require("../../../../site.config.js");

interface PageProps {
    params: Promise<{ slug: string }>;
}

// Rutas estáticas desde CSV
export async function generateStaticParams() {
    return getComparisonsByType("mejores").map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const comparison = getAllComparisons().find(
        (c) => c.slug === slug && c.tipo_pagina === "mejores"
    );
    if (!comparison) return {};

    const year = new Date().getFullYear();
    const title = `Las mejores herramientas de IA para ${comparison.caso_uso} (${year})`;
    const description = `Guía actualizada con las mejores herramientas de IA para ${comparison.caso_uso}. Comparativa completa con precios, pros, contras y recomendaciones según tu perfil.`;

    return {
        title,
        description,
        alternates: { canonical: `/mejores/${slug}/` },
        openGraph: { title, description },
    };
}

export default async function MejoresPage({ params }: PageProps) {
    const { slug } = await params;
    const comparison = getAllComparisons().find(
        (c) => c.slug === slug && c.tipo_pagina === "mejores"
    );
    if (!comparison) notFound();

    const tools = getToolsByCategory(comparison.categoria);
    const relatedComparisons = getRelatedComparisons(slug, comparison.categoria, 4);
    const cat = siteConfig.categorias.find(
        (c: { slug: string }) => c.slug === comparison.categoria
    );

    const year = new Date().getFullYear();
    const criterios = [
        { nombre: "Facilidad de uso", descripcion: "¿Puedes usarla sin conocimientos técnicos avanzados?" },
        { nombre: "Calidad del output", descripcion: "¿Los resultados son útiles y de calidad profesional?" },
        { nombre: "Soporte en español", descripcion: "¿La interfaz y los resultados funcionan bien en español?" },
        { nombre: "Relación calidad-precio", descripcion: "¿El precio es razonable para lo que ofrece?" },
        { nombre: "Actualizaciones y soporte", descripcion: "¿La herramienta se actualiza frecuentemente?" },
    ];

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
                    Mejores herramientas para {comparison.caso_uso}
                </span>
            </nav>

            {/* Cabecera */}
            <div className="mb-10">
                <span className="inline-block bg-yellow-100 text-yellow-700 text-xs font-semibold px-3 py-1 rounded-full mb-4 uppercase tracking-widest">
                    Guía actualizada · {year}
                </span>
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    Las <span className="text-indigo-600">{tools.length} mejores herramientas de IA</span>{" "}
                    para {comparison.caso_uso} ({year})
                </h1>
                <p className="text-gray-600 text-lg max-w-3xl leading-relaxed">
                    Esta guía está dirigida a <strong>creadores de contenido hispanohablantes</strong>{" "}
                    que buscan las mejores herramientas de inteligencia artificial para{" "}
                    <strong>{comparison.caso_uso}</strong>. Hemos analizado{" "}
                    <strong>{tools.length} herramientas</strong> evaluando precio, facilidad
                    de uso, calidad del output en español y relación calidad-precio.
                </p>
            </div>

            {/* Tabla comparativa rápida */}
            <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    📊 Tabla comparativa rápida
                </h2>
                <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-sm">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-200">
                                <th className="px-4 py-3 text-left text-gray-600 font-semibold">#</th>
                                <th className="px-4 py-3 text-left text-gray-600 font-semibold">Herramienta</th>
                                <th className="px-4 py-3 text-center text-gray-600 font-semibold">Precio</th>
                                <th className="px-4 py-3 text-center text-gray-600 font-semibold">Nivel</th>
                                <th className="px-4 py-3 text-center text-gray-600 font-semibold">Ideal para</th>
                                <th className="px-4 py-3 text-center text-gray-600 font-semibold">CTA</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {tools.map((tool, i) => (
                                <tr key={tool.tool_id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-4 py-3 font-bold text-indigo-600">{i + 1}</td>
                                    <td className="px-4 py-3 font-semibold text-gray-900">{tool.nombre}</td>
                                    <td className="px-4 py-3 text-center text-gray-600">
                                        {tool.modelo_pagos === "freemium"
                                            ? "Gratis"
                                            : `${tool.precio_desde}€/mes`}
                                    </td>
                                    <td className="px-4 py-3 text-center">
                                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                                            {tool.nivel_usuario}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-center text-gray-500 text-xs">
                                        {tool.mejor_para.slice(0, 40)}…
                                    </td>
                                    <td className="px-4 py-3 text-center">
                                        <AffiliateButton tool={tool} text="Ver →" size="sm" />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Criterios de evaluación */}
            <section className="mb-12 bg-gray-50 rounded-2xl p-7 border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-5">
                    🔍 Criterios de evaluación
                </h2>
                <p className="text-gray-600 text-sm mb-5">
                    Para elaborar esta lista, evaluamos cada herramienta de forma
                    independiente con los siguientes criterios:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {criterios.map((c, i) => (
                        <div key={i} className="flex items-start gap-3">
                            <span className="w-6 h-6 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                                {i + 1}
                            </span>
                            <div>
                                <p className="font-semibold text-gray-800 text-sm">{c.nombre}</p>
                                <p className="text-gray-500 text-xs">{c.descripcion}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Análisis detallado */}
            <section className="mb-14">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    📝 Análisis detallado de cada herramienta
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {tools.map((tool, i) => (
                        <ToolCard key={tool.tool_id} tool={tool} rank={i + 1} />
                    ))}
                </div>
            </section>

            {/* Cuál elegir según perfil */}
            <section className="mb-12 bg-indigo-50 rounded-2xl p-8 border border-indigo-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    🎯 ¿Cuál elegir según tu perfil?
                </h2>
                <div className="space-y-4">
                    {tools.map((tool) => (
                        <div key={tool.tool_id} className="bg-white rounded-xl p-4 border border-indigo-100">
                            <p className="font-semibold text-gray-900 text-sm mb-1">
                                Elige <span className="text-indigo-600">{tool.nombre}</span> si…
                            </p>
                            <p className="text-gray-600 text-sm">
                                {tool.ideal_para || tool.mejor_para}. Nivel requerido: {tool.nivel_usuario.toLowerCase()}.
                                Precio: {tool.modelo_pagos === "freemium" || tool.modelo_pagos === "gratis" ? "Gratis con planes premium" : `Desde ${tool.precio_desde}€/mes`}.
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA final */}
            <section className="mb-12 bg-gradient-to-br from-indigo-600 to-violet-600 text-white rounded-2xl p-8 text-center">
                <h2 className="text-2xl font-bold mb-4">
                    🚀 ¿Listo para empezar?
                </h2>
                <p className="text-indigo-100 mb-6 max-w-xl mx-auto">
                    Prueba nuestra herramienta más recomendada sin tarjeta de crédito y
                    empieza a crear contenido de calidad hoy mismo.
                </p>
                {tools[0] && (
                    <AffiliateButton
                        tool={tools[0]}
                        text={`Probar ${tools[0].nombre} gratis →`}
                        size="lg"
                        className="bg-white !text-indigo-700 hover:bg-indigo-50"
                    />
                )}
            </section>

            {/* Aviso afiliado */}
            <p className="text-xs text-gray-400 mb-10 italic">
                {siteConfig.affiliateDisclaimerShort}{" "}
                <Link href="/aviso-afiliados/" className="text-indigo-400 hover:underline">
                    Ver aviso completo
                </Link>
            </p>

            {/* Links internos */}
            <InternalLinks comparisons={relatedComparisons} title="Comparativas relacionadas" />
        </div>
    );
}
