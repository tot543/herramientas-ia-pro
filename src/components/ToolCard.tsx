import Link from "next/link";
import { Tool } from "@/types";
import AffiliateButton from "./AffiliateButton";

interface ToolCardProps {
    tool: Tool;
    rank?: number;
    showCategory?: boolean;
}

export default function ToolCard({ tool, rank, showCategory = false }: ToolCardProps) {
    const precioLabel =
        tool.modelo_pagos === "freemium" || tool.modelo_pagos === "gratis"
            ? "Gratis"
            : tool.modelo_pagos === "gratis-y-mensual"
                ? "Gratis + Premium"
                : tool.modelo_pagos === "por-creditos"
                    ? `${tool.precio_desde}€ / créditos`
                    : tool.modelo_pagos === "unico"
                        ? `${tool.precio_desde}€ pago único`
                        : tool.modelo_pagos === "incluido"
                            ? "Incluido en plan"
                            : `Desde ${tool.precio_desde}€/mes`;

    const nivelColor: Record<string, string> = {
        Principiante: "bg-green-100 text-green-800",
        basico: "bg-green-100 text-green-800",
        intermedio: "bg-yellow-100 text-yellow-800",
        Intermedio: "bg-yellow-100 text-yellow-800",
        avanzado: "bg-red-100 text-red-800",
        Avanzado: "bg-red-100 text-red-800",
    };

    return (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col gap-4">
            {/* Cabecera */}
            <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                    {rank && (
                        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 font-bold text-sm flex items-center justify-center">
                            {rank}
                        </span>
                    )}
                    <div>
                        <h3 className="font-bold text-gray-900 text-lg leading-tight">
                            {tool.nombre}
                        </h3>
                        {showCategory && (
                            <Link
                                href={`/categoria/${tool.categoria}/`}
                                className="text-xs text-indigo-500 hover:underline"
                            >
                                {tool.categoria.replace(/-/g, " ")}
                            </Link>
                        )}
                    </div>
                </div>
                <span
                    className={`text-xs font-medium px-2 py-1 rounded-full flex-shrink-0 ${nivelColor[tool.nivel_usuario] || "bg-gray-100 text-gray-700"
                        }`}
                >
                    {tool.nivel_usuario}
                </span>
            </div>

            {/* Descripción */}
            <p className="text-sm text-gray-600 leading-relaxed">
                {tool.descripcion}
            </p>

            {/* Ideal para / No recomendado para */}
            <div className="grid grid-cols-1 gap-2">
                <div className="bg-indigo-50 rounded-xl px-3 py-2">
                    <p className="text-xs font-semibold text-indigo-700 uppercase tracking-wide mb-0.5">
                        ✅ Ideal para
                    </p>
                    <p className="text-sm text-indigo-900">{tool.ideal_para || tool.mejor_para}</p>
                </div>
                {tool.no_es_para && (
                    <div className="bg-red-50 rounded-xl px-3 py-2">
                        <p className="text-xs font-semibold text-red-600 uppercase tracking-wide mb-0.5">
                            ⛔ No recomendado para
                        </p>
                        <p className="text-sm text-red-900">{tool.no_es_para}</p>
                    </div>
                )}
            </div>

            {/* Pros y Contras como bullet points */}
            <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                    <p className="font-semibold text-green-700 mb-1">✔ Pros</p>
                    <ul className="space-y-1 list-disc list-inside">
                        {tool.pros.slice(0, 3).map((pro, i) => (
                            <li key={i} className="text-gray-600 text-xs leading-snug">
                                {pro}
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <p className="font-semibold text-red-700 mb-1">✗ Contras</p>
                    <ul className="space-y-1 list-disc list-inside">
                        {tool.contras.slice(0, 2).map((contra, i) => (
                            <li key={i} className="text-gray-600 text-xs leading-snug">
                                {contra}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Precio + CTA */}
            <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
                <div>
                    <span className="text-xs text-gray-500">{tool.modelo_pagos}</span>
                    <p className="font-bold text-gray-900">{precioLabel}</p>
                </div>
                <AffiliateButton tool={tool} size="sm" />
            </div>
        </div>
    );
}
