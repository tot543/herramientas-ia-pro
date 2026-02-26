/** @type {import('next-sitemap').IConfig} */
const siteConfig = require("./site.config.js");

module.exports = {
    siteUrl: "https://midirectorioia.com",
    generateRobotsTxt: true,
    trailingSlash: true,
    outDir: "out",
    changefreq: "weekly",
    priority: 0.7,
    sitemapSize: 5000,

    // Excluir páginas de sistema
    exclude: ["/404", "/500"],

    // Prioridades personalizadas por ruta
    transform: async (config, path) => {
        // Páginas de dinero: máxima prioridad
        if (path.startsWith("/mejores/") || path.startsWith("/comparativas/")) {
            return {
                loc: path,
                changefreq: "weekly",
                priority: 0.9,
                lastmod: new Date().toISOString(),
            };
        }

        // Alternativas: alta prioridad
        if (path.startsWith("/alternativas/")) {
            return {
                loc: path,
                changefreq: "weekly",
                priority: 0.8,
                lastmod: new Date().toISOString(),
            };
        }

        // Categorías: prioridad media-alta
        if (path.startsWith("/categoria/")) {
            return {
                loc: path,
                changefreq: "monthly",
                priority: 0.75,
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
