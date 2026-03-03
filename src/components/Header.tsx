import Link from "next/link";

// eslint-disable-next-line @typescript-eslint/no-require-imports
const siteConfig = require("../../site.config.js");

export default function Header() {
    return (
        <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <span className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-sm">
                            B
                        </span>
                        <span className="font-bold text-lg text-gray-900 group-hover:text-indigo-600 transition-colors">
                            {siteConfig.siteName}
                        </span>
                    </Link>

                    {/* Navegación principal */}
                    <nav className="hidden md:flex items-center gap-6">
                        <Link
                            href="/blog/"
                            className="text-sm text-gray-600 hover:text-indigo-600 font-medium transition-colors"
                        >
                            Blueprints
                        </Link>
                        <Link
                            href="/recursos/"
                            className="text-sm text-gray-600 hover:text-indigo-600 font-medium transition-colors"
                        >
                            Recursos
                        </Link>
                        <Link
                            href="/aviso-afiliados/"
                            className="text-sm text-gray-600 hover:text-indigo-600 font-medium transition-colors"
                        >
                            Sobre Nosotros
                        </Link>
                        <Link
                            href="/blog/"
                            className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-sm px-5 py-2.5 rounded-xl font-semibold hover:from-indigo-700 hover:to-violet-700 transition-all shadow-sm shadow-indigo-200 active:scale-[0.98]"
                        >
                            Ver Blueprints →
                        </Link>
                    </nav>

                    {/* Menú móvil */}
                    <div className="md:hidden">
                        <Link
                            href="/blog/"
                            className="bg-indigo-600 text-white text-sm px-4 py-2 rounded-xl font-semibold"
                        >
                            Blueprints
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
}
