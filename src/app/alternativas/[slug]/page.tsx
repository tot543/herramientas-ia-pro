import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import {
    getAllComparisons,
    getComparisonsByType,
    getToolById,
    getAllTools,
    getRelatedComparisons,
    getCategoryUrl,
    getMejoresUrl,
} from "@/lib/data";
import ProsConsList from "@/components/ProsConsList";
import AffiliateButton from "@/components/AffiliateButton";
import InternalLinks from "@/components/InternalLinks";

// eslint-disable-next-line @typescript-eslint/no-require-imports
const siteConfig = require("../../../../site.config.js");

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    return getComparisonsByType("alternativa").map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const comparison = getAllComparisons().find(
        (c) => c.slug === slug && c.tipo_pagina === "alternativa"
    );
    if (!comparison) return {};

    const toolMain = getToolById(comparison.tool_a_id);
    if (!toolMain) return {};

    const title = `Las ${5} mejores alternativas a ${toolMain.nombre} en ${new Date().getFullYear()}`;
    const description = `¿Buscas una alternativa a ${toolMain.nombre}? Aquí encontrarás las mejores opciones para ${comparison.caso_uso}, con pros, contras y precios comparados.`;

    return {
        title,
        description,
        alternates: { canonical: `/alternativas/${slug}/` },
        openGraph: { title, description },
    };
}

export default async function AlternativaPage({ params }: PageProps) {
    const { slug } = await params;
    const comparison = getAllComparisons().find(
        (c) => c.slug === slug && c.tipo_pagina === "alternativa"
    );
    if (!comparison) notFound();

    const toolMain = getToolById(comparison.tool_a_id);
    if (!toolMain) notFound();

    // Alternativas: todas las herramientas de la misma categoría excepto la principal
    const alternativas = getAllTools()
        .filter(
            (t) =>
                t.categoria === comparison.categoria &&
                t.tool_id !== toolMain.tool_id
        )
        .slice(0, 5);

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
                {cat && (
                    <>
                        <Link href={getCategoryUrl(cat.slug) + "/"} className="hover:text-indigo-600">
                            {cat.nombre}
                        </Link>
                        <span>/</span>
                    </>
                )}
                <span className="text-gray-800 font-medium">
                    Alternativas a {toolMain.nombre}
                </span>
            </nav>

            {/* Cabecera */}
            <div className="mb-10">
                <span className="inline-block bg-orange-100 text-orange-700 text-xs font-semibold px-3 py-1 rounded-full mb-4 uppercase tracking-widest">
                    Alternativas · {comparison.caso_uso}
                </span>
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    Las mejores alternativas a{" "}
                    <span className="text-indigo-600">{toolMain.nombre}</span>
                </h1>
                <p className="text-gray-600 text-lg max-w-2xl leading-relaxed">
                    Si {toolMain.nombre} no se ajusta a tus necesidades —ya sea por precio,
                    idioma o funcionalidades— estas son las mejores alternativas para{" "}
                    <strong>{comparison.caso_uso}</strong> en el mercado hispanohablante.
                </p>
            </div>

            {/* ¿Por qué buscar alternativas? */}
            <section className="mb-12 bg-orange-50 border border-orange-100 rounded-2xl p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-3">
                    ¿Por qué considerar alternativas a {toolMain.nombre}?
                </h2>
                <p className="text-gray-700 text-sm leading-relaxed mb-4">
                    {toolMain.nombre} es una herramienta sólida para {toolMain.caso_uso},
                    pero tiene algunas limitaciones que pueden no adaptarse a todos los
                    usuarios:
                </p>
                <ul className="space-y-2">
                    {toolMain.contras.map((contra, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                            <span className="text-orange-500 font-bold flex-shrink-0">•</span>
                            <span>{contra}</span>
                        </li>
                    ))}
                </ul>
                <p className="text-gray-600 text-sm mt-4">
                    A continuación, te presentamos{" "}
                    <strong>{alternativas.length} alternativas</strong> que pueden
                    ofrecerte lo que {toolMain.nombre} no tiene.
                </p>
            </section>

            {/* Lista de alternativas */}
            <section className="mb-14 space-y-10">
                <h2 className="text-2xl font-bold text-gray-900">
                    🔄 Las {alternativas.length} mejores alternativas a {toolMain.nombre}
                </h2>

                {alternativas.length > 0 ? (
                    alternativas.map((alt, i) => (
                        <div
                            key={alt.tool_id}
                            className="bg-white rounded-2xl border border-gray-200 shadow-sm p-7"
                        >
                            <div className="flex items-start justify-between gap-4 mb-4">
                                <div>
                                    <span className="text-xs bg-indigo-100 text-indigo-600 font-semibold px-2 py-0.5 rounded-full mr-2">
                                        #{i + 1}
                                    </span>
                                    <h3 className="inline text-xl font-bold text-gray-900">
                                        {alt.nombre}
                                    </h3>
                                </div>
                                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full flex-shrink-0">
                                    {alt.nivel_usuario}
                                </span>
                            </div>

                            <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                {alt.descripcion}
                            </p>

                            {/* Por qué es buena alternativa */}
                            <div className="bg-indigo-50 rounded-xl p-4 mb-5">
                                <p className="text-xs font-semibold text-indigo-700 uppercase mb-1">
                                    ¿Por qué es buena alternativa a {toolMain.nombre}?
                                </p>
                                <p className="text-sm text-indigo-900">
                                    {alt.mejor_para}. Precio:{" "}
                                    {alt.modelo_pagos === "freemium"
                                        ? "Gratis + Premium"
                                        : `Desde ${alt.precio_desde}€/mes`}.
                                </p>
                            </div>

                            <ProsConsList
                                pros={alt.pros}
                                contras={alt.contras}
                                toolName={alt.nombre}
                            />

                            <div className="mt-5 flex gap-3">
                                <AffiliateButton tool={alt} text={`Probar ${alt.nombre} →`} size="sm" />
                                {i === 0 && (
                                    <span className="text-xs bg-green-100 text-green-700 px-3 py-2 rounded-lg font-medium self-center">
                                        ⭐ Mejor valorada
                                    </span>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">
                        Próximamente añadiremos alternativas a {toolMain.nombre}.
                    </p>
                )}
            </section>

            {/* Conclusión */}
            <section className="mb-12 bg-gradient-to-br from-indigo-600 to-violet-600 text-white rounded-2xl p-8">
                <h2 className="text-2xl font-bold mb-4">
                    💡 ¿Cuál alternativa elegir?
                </h2>
                <p className="text-indigo-100 mb-4 leading-relaxed">
                    La mejor alternativa a {toolMain.nombre} depende de tus necesidades.
                    Si priorizas el precio, busca opciones con modelo freemium. Si lo que
                    más importa es el soporte en español, comprueba la columna{" "}
                    <strong>Idioma</strong> en nuestra tabla comparativa.
                </p>
                <p className="text-indigo-200 text-sm">
                    ¿Quieres comparar dos alternativas entre sí?{" "}
                    <Link
                        href="/comparativas/"
                        className="text-white underline hover:text-cyan-200"
                    >
                        Ver todas las comparativas X vs Y →
                    </Link>
                </p>
            </section>

            {/* Aviso de afiliado */}
            <p className="text-xs text-gray-400 mb-10 italic">
                {siteConfig.affiliateDisclaimerShort}{" "}
                <Link href="/aviso-afiliados/" className="text-indigo-400 hover:underline">
                    Ver aviso completo
                </Link>
            </p>

            {/* Links internos */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InternalLinks comparisons={relatedComparisons} title="Comparativas relacionadas" />
                <div className="bg-indigo-50 rounded-2xl p-5 border border-indigo-100">
                    <h3 className="font-bold text-indigo-900 mb-3 text-sm">🏆 Guía completa</h3>
                    <p className="text-xs text-indigo-700 mb-4">
                        Lee nuestra comparativa completa de las mejores herramientas para {comparison.caso_uso}.
                    </p>
                    <Link
                        href={getMejoresUrl("mejores-ia-escritura-bloggers") + "/"}
                        className="block text-center bg-indigo-600 text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                        Ver guía completa →
                    </Link>
                </div>
            </div>
        </div>
    );
}
