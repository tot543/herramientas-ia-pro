/**
 * Configuración global del sitio
 * Edita este archivo para personalizar el sitio.
 */
const siteConfig = {
    // Información básica del sitio
    siteName: "HerramientasIA Pro",
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://midirectorioia.com",
    siteDescription:
        "Comparativas y reseñas de herramientas de IA para creadores de contenido. Encuentra la mejor herramienta para tu flujo de trabajo.",
    siteKeywords:
        "herramientas IA, inteligencia artificial, creadores de contenido, comparativas IA, reseñas SaaS",
    siteLocale: "es_ES",
    siteLanguage: "es",

    // Redes sociales
    twitterHandle: "@herramientasIApro",

    // Afiliados
    affiliateDisclaimer:
        "Este sitio contiene enlaces de afiliado. Si compras a través de ellos, podemos recibir una comisión sin costo adicional para ti. Esto nos ayuda a mantener el sitio actualizado con contenido gratuito.",
    affiliateDisclaimerShort:
        "Contiene enlaces de afiliado. Ver aviso completo.",

    // Categorías del sitio
    categorias: [
        {
            slug: "ia-para-escritura",
            nombre: "IA para Escritura y Copywriting",
            descripcion:
                "Las mejores herramientas de inteligencia artificial para crear textos, artículos, copys publicitarios y contenido escrito de alta calidad.",
            icon: "✍️",
        },
        {
            slug: "ia-para-imagenes",
            nombre: "IA para Generación de Imágenes",
            descripcion:
                "Herramientas de IA para crear imágenes, ilustraciones, diseños gráficos y arte digital de forma automática.",
            icon: "🎨",
        },
        {
            slug: "ia-para-video",
            nombre: "IA para Creación de Vídeo",
            descripcion:
                "Plataformas y herramientas de inteligencia artificial para generar, editar y mejorar vídeos automáticamente.",
            icon: "🎬",
        },
        {
            slug: "ia-para-seo",
            nombre: "IA para SEO y Marketing",
            descripcion:
                "Herramientas de IA que automatizan la investigación de palabras clave, generación de contenido SEO y estrategias de marketing digital.",
            icon: "📈",
        },
        {
            slug: "ia-para-productividad",
            nombre: "IA para Productividad",
            descripcion:
                "Optimiza tu flujo de trabajo con asistentes de código, editores inteligentes y herramientas de gestión de tareas potenciadas por IA.",
            icon: "⚡",
        },
        {
            slug: "ia-para-audio",
            nombre: "IA para Audio y Voz",
            descripcion:
                "Generación de voces ultra realistas, clonación de voz, creación de música y edición de audio profesional con IA.",
            icon: "🎙️",
        },
        {
            slug: "ia-para-automatizacion",
            nombre: "IA para Automatización",
            descripcion:
                "Conecta tus herramientas favoritas y crea flujos de trabajo inteligentes que funcionan en piloto automático.",
            icon: "🤖",
        },
    ],

    // Páginas de dinero destacadas (money pages)
    mejoresPaginas: [
        {
            slug: "mejores-ia-escritura-bloggers",
            titulo: "Mejores IA para Escritura",
        },
        {
            slug: "mejores-ia-generacion-imagenes",
            titulo: "Mejores IA para Imágenes",
        },
        {
            slug: "mejores-ia-generacion-video",
            titulo: "Mejores IA para Video",
        },
        {
            slug: "mejores-ia-herramientas-seo",
            titulo: "Mejores Herramientas SEO",
        },
    ],

    // Colores de marca (para referencia en componentes)
    brand: {
        primary: "#6366f1", // indigo-500
        secondary: "#8b5cf6", // violet-500
        accent: "#06b6d4", // cyan-500
    },
};

module.exports = siteConfig;
