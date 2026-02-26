#!/usr/bin/env node
/**
 * scripts/generate-pages.js
 *
 * Lee tools.csv y comparisons.csv y genera automáticamente
 * las entradas de datos en data/generated/ que el sitio
 * usará para crear nuevas páginas dinámicas.
 *
 * Uso:
 *   node scripts/generate-pages.js
 *
 * Después de ejecutar este script:
 *   npm run build   → construirá todas las páginas generadas
 */

const fs = require("fs");
const path = require("path");
const { parse } = require("csv-parse/sync");

const ROOT = path.join(__dirname, "..");
const DATA_DIR = path.join(ROOT, "data");
const GENERATED_DIR = path.join(DATA_DIR, "generated");

// ─────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────
function readCSV(filename) {
    const filePath = path.join(DATA_DIR, filename);
    if (!fs.existsSync(filePath)) {
        console.error(`❌ No se encontró el archivo: ${filePath}`);
        process.exit(1);
    }
    const content = fs.readFileSync(filePath, "utf-8");
    return parse(content, {
        columns: true,
        skip_empty_lines: true,
        trim: true,
    });
}

function normalizeTool(raw) {
    return {
        ...raw,
        pros: raw.pros ? raw.pros.split(";").map((s) => s.trim()).filter(Boolean) : [],
        contras: raw.contras ? raw.contras.split(";").map((s) => s.trim()).filter(Boolean) : [],
    };
}

function ensureDir(dir) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
}

function saveJSON(filepath, data) {
    fs.writeFileSync(filepath, JSON.stringify(data, null, 2), "utf-8");
}

// ─────────────────────────────────────────────────
// Main
// ─────────────────────────────────────────────────
function main() {
    console.log("🚀 Iniciando generación de páginas desde CSV...\n");

    ensureDir(GENERATED_DIR);

    // 1. Leer CSVs
    const rawTools = readCSV("tools.csv");
    const rawComparisons = readCSV("comparisons.csv");

    const tools = rawTools.map(normalizeTool);
    const comparisons = rawComparisons;

    console.log(`✅ ${tools.length} herramientas cargadas desde tools.csv`);
    console.log(`✅ ${comparisons.length} comparaciones cargadas desde comparisons.csv\n`);

    // 2. Guardar JSON normalizados (usados por lib/data.ts como fallback)
    saveJSON(path.join(DATA_DIR, "tools.json"), tools);
    saveJSON(path.join(DATA_DIR, "comparisons.json"), comparisons);
    console.log("📦 tools.json y comparisons.json actualizados");

    // 3. Generar resumen de páginas a crear
    const vsPages = comparisons.filter((c) => c.tipo_pagina === "vs");
    const alternativaPages = comparisons.filter((c) => c.tipo_pagina === "alternativa");
    const mejoresPages = comparisons.filter((c) => c.tipo_pagina === "mejores");

    console.log("\n📄 Páginas que se generarán en el próximo build:");
    console.log(`   ⚔️  ${vsPages.length} páginas X vs Y en /comparativas/`);
    for (const p of vsPages) {
        console.log(`      → /comparativas/${p.slug}/`);
    }

    console.log(`   🔄  ${alternativaPages.length} páginas de alternativas en /alternativas/`);
    for (const p of alternativaPages) {
        console.log(`      → /alternativas/${p.slug}/`);
    }

    console.log(`   🏆  ${mejoresPages.length} páginas de mejores en /mejores/`);
    for (const p of mejoresPages) {
        console.log(`      → /mejores/${p.slug}/`);
    }

    // 4. Validar que cada comparación tiene herramientas válidas
    console.log("\n🔍 Validando integridad de datos...");
    const toolIds = new Set(tools.map((t) => t.tool_id));
    let errors = 0;

    for (const comp of comparisons) {
        if (comp.tipo_pagina === "vs" || comp.tipo_pagina === "alternativa") {
            if (comp.tool_a_id && !toolIds.has(comp.tool_a_id)) {
                console.error(`   ❌ tool_a_id "${comp.tool_a_id}" en "${comp.slug}" no existe en tools.csv`);
                errors++;
            }
            if (comp.tipo_pagina === "vs" && comp.tool_b_id && !toolIds.has(comp.tool_b_id)) {
                console.error(`   ❌ tool_b_id "${comp.tool_b_id}" en "${comp.slug}" no existe en tools.csv`);
                errors++;
            }
        }
    }

    if (errors === 0) {
        console.log("   ✅ Todos los datos son válidos");
    } else {
        console.error(`\n   ⚠️  Se encontraron ${errors} error(es). Corrígelos antes de hacer el build.`);
    }

    // 5. Generar archivo de reporte
    const report = {
        generatedAt: new Date().toISOString(),
        totals: {
            tools: tools.length,
            comparisons: comparisons.length,
            vsPages: vsPages.length,
            alternativaPages: alternativaPages.length,
            mejoresPages: mejoresPages.length,
        },
        pages: {
            vs: vsPages.map((p) => `/comparativas/${p.slug}/`),
            alternativas: alternativaPages.map((p) => `/alternativas/${p.slug}/`),
            mejores: mejoresPages.map((p) => `/mejores/${p.slug}/`),
        },
        errors,
    };
    saveJSON(path.join(GENERATED_DIR, "report.json"), report);

    console.log(`\n✨ Listo. Ejecuta "npm run build" para construir el sitio completo.`);
    console.log(`   Reporte guardado en: data/generated/report.json\n`);
}

main();
