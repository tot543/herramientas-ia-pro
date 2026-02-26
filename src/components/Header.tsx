import Link from "next/link";

const siteConfig = require("../../site.config.js");

export default function Header() {
    return (
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <span className="text-2xl">🤖</span>
                        <span className="font-bold text-lg text-gray-900 group-hover:text-indigo-600 transition-colors">
                            {siteConfig.siteName}
                        </span>
                    </Link>

                    {/* Navegación principal */}
                    <nav className="hidden md:flex items-center gap-6">
                        <Link
                            href="/categoria/ia-para-escritura/"
                            className="text-sm text-gray-600 hover:text-indigo-600 font-medium transition-colors"
                        >
                            Escritura IA
                        </Link>
                        <Link
                            href="/categoria/ia-para-imagenes/"
                            className="text-sm text-gray-600 hover:text-indigo-600 font-medium transition-colors"
                        >
                            Imágenes IA
                        </Link>
                        <Link
                            href="/categoria/ia-para-video/"
                            className="text-sm text-gray-600 hover:text-indigo-600 font-medium transition-colors"
                        >
                            Vídeo IA
                        </Link>
                        <Link
                            href="/categoria/ia-para-seo/"
                            className="text-sm text-gray-600 hover:text-indigo-600 font-medium transition-colors"
                        >
                            SEO IA
                        </Link>
                        <Link
                            href="/categoria/ia-para-productividad/"
                            className="text-sm text-gray-600 hover:text-indigo-600 font-medium transition-colors"
                        >
                            Productividad
                        </Link>
                        <Link
                            href="/categoria/ia-para-audio/"
                            className="text-sm text-gray-600 hover:text-indigo-600 font-medium transition-colors"
                        >
                            Audio
                        </Link>
                        <Link
                            href="/categoria/ia-para-automatizacion/"
                            className="text-sm text-gray-600 hover:text-indigo-600 font-medium transition-colors"
                        >
                            Automática
                        </Link>
                        <Link
                            href="/mejores/mejores-ia-escritura-bloggers/"
                            className="bg-indigo-600 text-white text-sm px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
                        >
                            Mejores Herramientas
                        </Link>
                    </nav>

                    {/* Menú móvil (simplificado) */}
                    <div className="md:hidden">
                        <Link
                            href="/mejores/mejores-ia-escritura-bloggers/"
                            className="bg-indigo-600 text-white text-sm px-3 py-2 rounded-lg font-semibold"
                        >
                            Ver Ranking
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
}
