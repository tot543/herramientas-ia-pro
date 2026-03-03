import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Contacto | Blueprint Ops",
    description: "¿Tienes dudas sobre un Blueprint o necesitas ayuda con tu arquitectura IA? Contacta con nosotros.",
    alternates: { canonical: "/contacto/" },
    robots: { index: false, follow: true },
};

export default function ContactoPage() {
    return (
        <div className="max-w-3xl mx-auto px-4 py-12">
            {/* Breadcrumb */}
            <nav className="text-sm text-gray-500 mb-8 flex gap-2">
                <Link href="/" className="hover:text-indigo-600">Inicio</Link>
                <span>/</span>
                <span className="text-gray-800 font-medium">Contacto</span>
            </nav>

            <h1 className="text-3xl font-bold text-gray-900 mb-6 tracking-tight">
                Contacto
            </h1>

            <div className="prose prose-gray max-w-none space-y-8 text-gray-700 leading-relaxed">
                <p className="text-lg">
                    ¿Tienes dudas sobre cómo implementar un Blueprint, quieres proponer una colaboración o simplemente saludar? Estamos aquí para ayudarte a escalar tu negocio con Inteligencia Artificial.
                </p>

                <div className="bg-indigo-50 border border-indigo-100 rounded-3xl p-10 text-center">
                    <h2 className="text-xl font-bold text-indigo-900 mb-4 mt-0">Escríbenos por email</h2>
                    <p className="mb-8 text-indigo-800/80">
                        Respondemos a todas las consultas en menos de 48 horas laborables.
                    </p>
                    <a
                        href="mailto:onboarding@midirectorioia.com"
                        className="inline-flex items-center gap-2 bg-indigo-600 text-white font-bold px-8 py-4 rounded-2xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 active:scale-[0.98]"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        onboarding@midirectorioia.com
                    </a>
                </div>

                <div className="text-sm text-gray-500 mt-12 bg-gray-50 p-6 rounded-2xl border border-gray-100">
                    <p className="m-0 italic">
                        Nota: Si eres un proveedor de herramientas de IA y quieres que analicemos tu software, por favor incluye acceso a una cuenta de prueba en tu primer mensaje.
                    </p>
                </div>
            </div>
        </div>
    );
}
