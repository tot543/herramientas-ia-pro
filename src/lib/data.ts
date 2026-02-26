import fs from "fs";
import path from "path";
import { parse } from "csv-parse/sync";

const DATA_DIR = path.join(process.cwd(), "data");

import { Tool, Comparison } from "@/types";

// ─────────────────────────────────────────────────
// Parsers
// ─────────────────────────────────────────────────
function parseCSV<T>(filename: string): T[] {
    const filePath = path.join(DATA_DIR, filename);
    const content = fs.readFileSync(filePath, "utf-8");
    return parse(content, {
        columns: true,
        skip_empty_lines: true,
        trim: true,
        relax_column_count: true,
    }) as T[];
}

// ─────────────────────────────────────────────────
// Herramientas
// ─────────────────────────────────────────────────
function normalizeTool(raw: Record<string, string>): Tool {
    return {
        ...raw,
        pros: raw.pros ? raw.pros.split(";").map((s) => s.trim()).filter(Boolean) : [],
        contras: raw.contras ? raw.contras.split(";").map((s) => s.trim()).filter(Boolean) : [],
        criterios_eleccion: raw.criterios_eleccion ? raw.criterios_eleccion.split(";").map((s) => s.trim()).filter(Boolean) : [],
    } as Tool;
}

export function getAllTools(): Tool[] {
    const raw = parseCSV<Record<string, string>>("tools.csv");
    return raw.map(normalizeTool);
}

export function getToolBySlug(slug: string): Tool | undefined {
    return getAllTools().find((t) => t.slug === slug);
}

export function getToolById(id: string): Tool | undefined {
    return getAllTools().find((t) => t.tool_id === id);
}

export function getToolsByCategory(categoria: string): Tool[] {
    return getAllTools().filter((t) => t.categoria === categoria);
}

// ─────────────────────────────────────────────────
// Comparaciones
// ─────────────────────────────────────────────────
export function getAllComparisons(): Comparison[] {
    return parseCSV<Comparison>("comparisons.csv");
}

export function getComparisonBySlug(slug: string): Comparison | undefined {
    return getAllComparisons().find((c) => c.slug === slug);
}

export function getComparisonsByType(
    tipo: "vs" | "alternativa" | "mejores"
): Comparison[] {
    return getAllComparisons().filter((c) => c.tipo_pagina === tipo);
}

export function getRelatedComparisons(
    currentSlug: string,
    categoria: string,
    limit = 3
): Comparison[] {
    return getAllComparisons()
        .filter((c) => c.slug !== currentSlug && c.categoria === categoria)
        .slice(0, limit);
}

// ─────────────────────────────────────────────────
// Helpers de URL
// ─────────────────────────────────────────────────
export function getCategoryUrl(slug: string) {
    return `/categoria/${slug}`;
}

export function getVsUrl(slug: string) {
    return `/comparativas/${slug}`;
}

export function getAlternativaUrl(slug: string) {
    return `/alternativas/${slug}`;
}

export function getMejoresUrl(slug: string) {
    return `/mejores/${slug}`;
}
