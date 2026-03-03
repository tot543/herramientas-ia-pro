import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Aviso Legal | Blueprint Ops",
    description: "Información legal sobre el responsable del sitio, propiedad intelectual y exclusión de responsabilidad.",
    alternates: { canonical: "/aviso-legal/" },
    robots: { index: false, follow: true },
};

export default function AvisoLegalPage() {
    return (
        <div className="max-w-3xl mx-auto px-4 py-12">
            {/* Breadcrumb */}
            <nav className="text-sm text-gray-500 mb-8 flex gap-2">
                <Link href="/" className="hover:text-indigo-600">Inicio</Link>
                <span>/</span>
                <span className="text-gray-800 font-medium">Aviso Legal</span>
            </nav>

            <h1 className="text-3xl font-bold text-gray-900 mb-6 tracking-tight">
                Aviso Legal
            </h1>

            <div className="prose prose-gray max-w-none space-y-8 text-gray-700 leading-relaxed">
                <section>
                    <h2 className="text-xl font-bold text-gray-900 mb-4">1. Responsable del Sitio Web</h2>
                    <ul className="list-none space-y-2">
                        <li><strong>Titular:</strong> Carlos Torrez (en adelante, &quot;Blueprint Ops&quot;).</li>
                        <li><strong>Sitio Web:</strong> midirectorioia.com.</li>
                        <li><strong>Correo de contacto:</strong> onboarding@midirectorioia.com.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-gray-900 mb-4">2. Propiedad Intelectual</h2>
                    <p>
                        Todo el contenido publicado, incluyendo los &quot;Blueprints&quot;, guías paso a paso, metodologías y prompts de Inteligencia Artificial, son propiedad intelectual de Blueprint Ops.
                    </p>
                    <p>
                        Se otorga una licencia de uso personal y profesional para implementar las automatizaciones en negocios propios, pero queda estrictamente prohibida su reventa o distribución masiva sin autorización previa.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-gray-900 mb-4">3. Exclusión de Responsabilidad</h2>
                    <p>
                        Blueprint Ops ofrece guías basadas en herramientas de terceros como OpenAI, Make.com, Zapier o Resend.
                    </p>
                    <p>
                        No nos hacemos responsables de errores técnicos, pérdida de datos o costes derivados del mal uso de estas herramientas o de cambios en las políticas de dichas plataformas externas.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-gray-900 mb-4">4. Enlaces de Afiliados</h2>
                    <p>
                        Este sitio web utiliza enlaces de afiliados para recomendar herramientas de software.
                    </p>
                    <p>
                        El uso de estos enlaces no supone un coste adicional para el usuario y nos ayuda a mantener el contenido gratuito y actualizado. Para más información, consulta nuestro <Link href="/aviso-afiliados/" className="text-indigo-600 hover:underline">Aviso de Afiliados</Link>.
                    </p>
                </section>

                <div className="text-xs text-gray-400 mt-12 border-t border-gray-100 pt-6">
                    Última actualización: {new Date().toLocaleDateString("es-ES", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    })}
                </div>
            </div>
        </div>
    );
}
