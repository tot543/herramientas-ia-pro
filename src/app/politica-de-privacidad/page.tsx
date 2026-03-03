import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Política de Privacidad | Blueprint Ops",
    description: "Información sobre cómo tratamos tus datos personales, finalidad y derechos del usuario.",
    alternates: { canonical: "/politica-de-privacidad/" },
    robots: { index: false, follow: true },
};

export default function PoliticaPrivacidadPage() {
    return (
        <div className="max-w-3xl mx-auto px-4 py-12">
            {/* Breadcrumb */}
            <nav className="text-sm text-gray-500 mb-8 flex gap-2">
                <Link href="/" className="hover:text-indigo-600">Inicio</Link>
                <span>/</span>
                <span className="text-gray-800 font-medium">Política de Privacidad</span>
            </nav>

            <h1 className="text-3xl font-bold text-gray-900 mb-6 tracking-tight">
                Política de Privacidad
            </h1>

            <div className="prose prose-gray max-w-none space-y-8 text-gray-700 leading-relaxed">
                <section>
                    <h2 className="text-xl font-bold text-gray-900 mb-4">1. Responsable del Tratamiento</h2>
                    <p>
                        Carlos Torrez es el responsable de la gestión de los datos personales recopilados a través de midirectorioia.com.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-gray-900 mb-4">2. Finalidad de los Datos</h2>
                    <p>
                        Los datos de correo electrónico se recopilan exclusivamente para el envío de la newsletter periódica, actualizaciones de &quot;Blueprints&quot; y promociones de herramientas de IA.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-gray-900 mb-4">3. Base Legal y Almacenamiento</h2>
                    <p>
                        La base legal para el tratamiento de los datos es el consentimiento explícito del usuario al suscribirse.
                    </p>
                    <p>
                        Los datos son gestionados de forma segura a través de la plataforma <strong>Resend</strong> (proveedor de servicios de correo) y alojados en la infraestructura de <strong>Vercel</strong>.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-gray-900 mb-4">4. Derechos del Usuario</h2>
                    <p>
                        El usuario tiene derecho a acceder, rectificar o cancelar sus datos en cualquier momento.
                    </p>
                    <p>
                        Cada correo enviado incluye un enlace directo de &quot;Unsubscribe&quot; para la baja inmediata de la lista de contactos.
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
