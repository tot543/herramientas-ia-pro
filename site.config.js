/**
 * Configuración global del sitio — Blueprint Ops
 * Edita este archivo para personalizar el sitio.
 */
const siteConfig = {
    // Información básica del sitio
    siteName: "Blueprint Ops",
    siteUrl: "https://midirectorioia.com",
    siteDescription:
        "Blueprints y guías prácticas de arquitectura IA para Operaciones y RRHH. Automatiza procesos reales con flujos paso a paso.",
    siteKeywords:
        "blueprints IA, arquitectura operativa, automatización RRHH, flujos de trabajo IA, inteligencia artificial operaciones, guías IA",
    siteLocale: "es_ES",
    siteLanguage: "es",

    // Redes sociales
    twitterHandle: "@blueprintops",

    // Afiliados
    affiliateDisclaimer:
        "Este sitio contiene enlaces de afiliado. Si compras a través de ellos, podemos recibir una comisión sin costo adicional para ti. Esto nos ayuda a mantener el sitio actualizado con contenido gratuito.",
    affiliateDisclaimerShort:
        "Contiene enlaces de afiliado. Ver aviso completo.",

    // Temas / áreas del blog
    blogCategories: [
        {
            slug: "operaciones",
            nombre: "Operaciones",
            descripcion:
                "Automatiza flujos operativos con IA: desde gestión de inventarios hasta atención al cliente.",
            icon: "⚙️",
        },
        {
            slug: "rrhh",
            nombre: "Recursos Humanos",
            descripcion:
                "Blueprints para screening de CVs, onboarding automatizado y gestión de talento con IA.",
            icon: "👥",
        },
        {
            slug: "productividad",
            nombre: "Productividad",
            descripcion:
                "Flujos de trabajo inteligentes para equipos: reuniones, documentación y gestión de proyectos.",
            icon: "⚡",
        },
        {
            slug: "marketing",
            nombre: "Marketing & Ventas",
            descripcion:
                "Automatiza la generación de contenido, email marketing y análisis de datos de ventas.",
            icon: "📈",
        },
    ],

    // Categorías de recursos (herramientas) — legacy, se mantienen para redirects
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

    // Páginas de dinero destacadas (money pages) — legacy
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

    // Colores de marca
    brand: {
        primary: "#6366f1", // indigo-500
        secondary: "#8b5cf6", // violet-500
        accent: "#06b6d4", // cyan-500
    },
};

module.exports = siteConfig;
