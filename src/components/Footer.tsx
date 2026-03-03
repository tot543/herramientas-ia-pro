import Link from "next/link";

// eslint-disable-next-line @typescript-eslint/no-require-imports
const siteConfig = require("../../site.config.js");

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-900 text-gray-400 mt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Columna 1: Marca */}
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center gap-2 mb-3">
                            <span className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-violet-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                                B
                            </span>
                            <span className="font-bold text-lg text-white">
                                {siteConfig.siteName}
                            </span>
                        </div>
                        <p className="text-sm leading-relaxed mb-4">
                            Blueprints y guías prácticas de arquitectura IA para
                            Operaciones y RRHH. Flujos reales que puedes implementar hoy.
                        </p>
                        <p className="text-xs text-gray-500">
                            {siteConfig.affiliateDisclaimerShort}{" "}
                            <Link
                                href="/aviso-afiliados/"
                                className="text-indigo-400 hover:underline"
                            >
                                Ver aviso completo
                            </Link>
                        </p>
                    </div>

                    {/* Columna 2: Blueprints */}
                    <div>
                        <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
                            Temas
                        </h3>
                        <ul className="space-y-2 text-sm">
                            {siteConfig.blogCategories.map(
                                (cat: { slug: string; nombre: string; icon: string }) => (
                                    <li key={cat.slug}>
                                        <span className="hover:text-indigo-400 transition-colors cursor-default">
                                            {cat.icon} {cat.nombre}
                                        </span>
                                    </li>
                                )
                            )}
                        </ul>
                    </div>

                    {/* Columna 3: Legal & Links */}
                    <div>
                        <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
                            Legal
                        </h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link
                                    href="/aviso-afiliados/"
                                    className="hover:text-indigo-400 transition-colors"
                                >
                                    Aviso de Afiliados
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/politica-de-privacidad/"
                                    className="hover:text-indigo-400 transition-colors"
                                >
                                    Política de Privacidad
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/aviso-legal/"
                                    className="hover:text-indigo-400 transition-colors"
                                >
                                    Aviso Legal
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/contacto/"
                                    className="hover:text-indigo-400 transition-colors"
                                >
                                    Contacto
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-10 pt-6 text-xs text-gray-600 text-center">
                    © {currentYear} {siteConfig.siteName}. Todos los derechos reservados.
                </div>
            </div>
        </footer>
    );
}
