/** @type {import('next-sitemap').IConfig} */

module.exports = {
    siteUrl: "https://midirectorioia.com",
    generateRobotsTxt: true,
    trailingSlash: true,
    changefreq: "weekly",
    priority: 0.7,
    sitemapSize: 5000,

    // Excluir páginas de sistema y rutas legacy (ya redirigidas)
    exclude: [
        "/404",
        "/500",
        "/comparativas/*",
        "/alternativas/*",
        "/mejores/*",
        "/categoria/*",
    ],

    // Prioridades personalizadas por ruta
    transform: async (config, path) => {
        // Blueprints / Blog: máxima prioridad
        if (path.startsWith("/blog/") && path !== "/blog/") {
            return {
                loc: path,
                changefreq: "weekly",
                priority: 1.0,
                lastmod: new Date().toISOString(),
            };
        }

        // Página índice del blog
        if (path === "/blog/" || path === "/blog") {
            return {
                loc: path,
                changefreq: "daily",
                priority: 0.9,
                lastmod: new Date().toISOString(),
            };
        }

        // Recursos (herramientas): prioridad media
        if (path.startsWith("/recursos/")) {
            return {
                loc: path,
                changefreq: "monthly",
                priority: 0.6,
                lastmod: new Date().toISOString(),
            };
        }

        // Home: máxima prioridad
        if (path === "/") {
            return {
                loc: path,
                changefreq: "daily",
                priority: 1.0,
                lastmod: new Date().toISOString(),
            };
        }

        // Default
        return {
            loc: path,
            changefreq: config.changefreq,
            priority: config.priority,
            lastmod: new Date().toISOString(),
        };
    },
};
