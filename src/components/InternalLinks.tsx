import Link from "next/link";
import { Comparison } from "@/types";

interface InternalLinksProps {
    comparisons: Comparison[];
    title?: string;
}

function typeLabel(tipo: string) {
    switch (tipo) {
        case "vs":
            return "Comparativa";
        case "alternativa":
            return "Alternativas";
        case "mejores":
            return "Mejores";
        default:
            return tipo;
    }
}

function pageUrl(c: Comparison) {
    switch (c.tipo_pagina) {
        case "vs":
            return `/comparativas/${c.slug}/`;
        case "alternativa":
            return `/alternativas/${c.slug}/`;
        case "mejores":
            return `/mejores/${c.slug}/`;
        default:
            return `/${c.slug}/`;
    }
}

export default function InternalLinks({
    comparisons,
    title = "Páginas relacionadas",
}: InternalLinksProps) {
    if (!comparisons.length) return null;

    return (
        <aside className="bg-gray-50 rounded-2xl p-5 border border-gray-200">
            <h3 className="font-bold text-gray-800 mb-4 text-sm uppercase tracking-wide">
                🔗 {title}
            </h3>
            <ul className="space-y-2">
                {comparisons.map((c) => (
                    <li key={c.slug}>
                        <Link
                            href={pageUrl(c)}
                            className="flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-800 hover:underline"
                        >
                            <span className="text-xs bg-indigo-100 text-indigo-700 px-1.5 py-0.5 rounded-md font-medium">
                                {typeLabel(c.tipo_pagina)}
                            </span>
                            {c.keyword_objetivo || c.slug.replace(/-/g, " ")}
                        </Link>
                    </li>
                ))}
            </ul>
        </aside>
    );
}
