import type { Metadata } from "next";
import Link from "next/link";

// eslint-disable-next-line @typescript-eslint/no-require-imports
const siteConfig = require("../../../site.config.js");

export const metadata: Metadata = {
    title: "Aviso de Afiliados",
    description:
        "Información sobre los enlaces de afiliado utilizados en este sitio y cómo monetizamos el contenido.",
    alternates: { canonical: "/aviso-afiliados/" },
    robots: { index: true, follow: true },
};

export default function AvisoAfiliadosPage() {
    return (
        <div className="max-w-3xl mx-auto px-4 py-12">
            {/* Breadcrumb */}
            <nav className="text-sm text-gray-500 mb-8 flex gap-2">
                <Link href="/" className="hover:text-indigo-600">Inicio</Link>
                <span>/</span>
                <span className="text-gray-800 font-medium">Aviso de Afiliados</span>
            </nav>

            <h1 className="text-3xl font-bold text-gray-900 mb-6">
                Aviso de Afiliados
            </h1>

            <div className="prose prose-gray max-w-none space-y-6 text-gray-700">
                <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-5">
                    <p className="text-sm font-semibold text-yellow-800 mb-2">
                        ⚠️ Transparencia ante todo
                    </p>
                    <p className="text-sm text-yellow-700">
                        {siteConfig.affiliateDisclaimer}
                    </p>
                </div>

                <h2 className="text-xl font-bold text-gray-900 mt-8">
                    ¿Qué es un enlace de afiliado?
                </h2>
                <p>
                    Un enlace de afiliado es una URL especial que incluye un identificador
                    único que permite a los programas de afiliados rastrear si un usuario
                    llegó a su sitio web a través de nuestra recomendación. Si realizas una
                    compra a través de uno de estos enlaces, podemos recibir una comisión,
                    sin ningún costo adicional para ti.
                </p>

                <h2 className="text-xl font-bold text-gray-900">
                    ¿Cómo afecta esto a nuestros análisis?
                </h2>
                <p>
                    Nuestra política editorial es clara: <strong>la existencia de
                        un programa de afiliados no influye en nuestras recomendaciones</strong>.
                    Analizamos cada herramienta de forma independiente, basándonos en su
                    calidad real, facilidad de uso, precio y resultados. Si una herramienta
                    tiene un programa de afiliados pero no cumple con nuestros criterios de
                    calidad, no la recomendamos.
                </p>
                <p>
                    Del mismo modo, si recomendamos una herramienta sin un enlace de
                    afiliado, es porque la consideramos una opción válida para nuestros
                    lectores.
                </p>

                <h2 className="text-xl font-bold text-gray-900">
                    Identificación de enlaces de afiliado
                </h2>
                <p>
                    En este sitio, los enlaces de afiliado se incluyen principalmente en
                    los botones de llamada a la acción (CTA) con texto como &quot;Probar
                    herramienta&quot;, &quot;Ver precio&quot; o &quot;Visitar sitio
                    oficial&quot;. Estos enlaces incluyen los atributos HTML{" "}
                    <code>rel=&quot;nofollow sponsored&quot;</code> en cumplimiento con
                    las directrices de Google y las buenas prácticas de transparencia.
                </p>

                <h2 className="text-xl font-bold text-gray-900">
                    Programas de afiliados que utilizamos
                </h2>
                <p>
                    Participamos en programas de afiliados de diversas plataformas de
                    herramientas SaaS e IA. Cada programa tiene sus propias condiciones,
                    pero en general recibimos una comisión por cada suscripción o compra
                    que se genere a través de nuestros enlaces.
                </p>

                <h2 className="text-xl font-bold text-gray-900">Contacto</h2>
                <p>
                    Si tienes alguna pregunta sobre nuestra política de afiliados o sobre
                    algún contenido publicado en este sitio, puedes contactarnos a través
                    de nuestra{" "}
                    <Link href="/contacto/" className="text-indigo-600 hover:underline">
                        página de contacto
                    </Link>
                    .
                </p>

                <div className="text-xs text-gray-400 mt-10 border-t border-gray-200 pt-6">
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
