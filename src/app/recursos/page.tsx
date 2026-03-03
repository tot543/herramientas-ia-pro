import Link from "next/link";
import { getAllTools, getAllComparisons } from "@/lib/data";

// eslint-disable-next-line @typescript-eslint/no-require-imports
const siteConfig = require("../../../site.config.js");

export const metadata = {
    title: `Recursos de IA — ${siteConfig.siteName}`,
    description: "Explora nuestra selección curada de herramientas de IA para Operaciones y RRHH. Comparativas detalladas y análisis de utilidad.",
};

export default function RecursosIndex() {
    const tools = getAllTools().filter(t => t.slug);
    const comparisons = getAllComparisons().filter(c => c.slug);

    return (
        <div className="max-w-6xl mx-auto px-4 py-16">
            <header className="mb-12 text-center">
                <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
                    Recursos y Herramientas IA
                </h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                    Análisis profundos y comparativas de las mejores herramientas de IA
                    para mejorar tu arquitectura operativa y procesos de RRHH.
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Comparativas Section */}
                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                        📊 Comparativas Directas
                    </h2>
                    <div className="space-y-4">
                        {comparisons.slice(0, 10).map((comp) => (
                            <Link
                                key={comp.slug}
                                href={`/recursos/${comp.slug}/`}
                                className="block bg-white border border-gray-200 p-5 rounded-2xl hover:border-indigo-400 hover:shadow-md transition-all group"
                            >
                                <p className="font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                                    {comp.keyword_objetivo || comp.slug.replace("-vs-", " vs ")}
                                </p>
                                <div className="mt-2 text-xs text-gray-400 uppercase tracking-wider font-semibold">
                                    Versus · {comp.categoria}
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>

                {/* Herramientas Section */}
                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                        🛠️ Directorio de Herramientas
                    </h2>
                    <div className="grid grid-cols-1 gap-4">
                        {tools.length > 0 ? (
                            tools.map((tool) => (
                                <Link
                                    key={tool.slug}
                                    href={`/recursos/${tool.slug}/`}
                                    className="block bg-white border border-gray-200 p-5 rounded-2xl hover:border-indigo-400 hover:shadow-md transition-all group"
                                >
                                    <h3 className="font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                                        {tool.nombre}
                                    </h3>
                                    <p className="text-xs text-gray-500 line-clamp-2 mt-1">
                                        {tool.descripcion}
                                    </p>
                                </Link>
                            ))
                        ) : (
                            <p className="text-gray-400 italic">Próximamente más herramientas...</p>
                        )}
                    </div>
                </section>
            </div>

            <div className="mt-16 bg-indigo-50 rounded-3xl p-8 text-center border border-indigo-100">
                <h3 className="text-xl font-bold text-indigo-900 mb-2">
                    ¿Buscas cómo implementar estas herramientas?
                </h3>
                <p className="text-indigo-600 mb-6">
                    Nuestros Blueprints te enseñan flujos de trabajo reales paso a paso.
                </p>
                <Link
                    href="/blog/"
                    className="bg-indigo-600 text-white font-bold px-8 py-3 rounded-xl hover:bg-indigo-700 transition-all shadow-md inline-block"
                >
                    Ir a Blueprints →
                </Link>
            </div>
        </div>
    );
}
