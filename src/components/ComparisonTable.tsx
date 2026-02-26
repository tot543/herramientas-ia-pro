import { Tool } from "@/types";
import AffiliateButton, { AffiliateTextLink } from "./AffiliateButton";

interface ComparisonTableProps {
    toolA: Tool;
    toolB: Tool;
}

export default function ComparisonTable({ toolA, toolB }: ComparisonTableProps) {
    const mainRows: { label: string; valueA: string; valueB: string }[] = [
        { label: "Precio desde", valueA: `${toolA.precio_desde}€`, valueB: `${toolB.precio_desde}€` },
        { label: "Modelo de pago", valueA: toolA.modelo_pagos, valueB: toolB.modelo_pagos },
        { label: "Nivel usuario", valueA: toolA.nivel_usuario, valueB: toolB.nivel_usuario },
        { label: "Idioma", valueA: toolA.idioma, valueB: toolB.idioma },
    ];

    return (
        <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-sm mb-8">
            <table className="w-full text-sm">
                <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                        <th className="px-4 py-4 text-left text-gray-500 font-medium w-1/4">
                            Característica
                        </th>
                        <th className="px-4 py-4 text-center font-bold text-indigo-700 w-3/8">
                            {toolA.nombre}
                        </th>
                        <th className="px-4 py-4 text-center font-bold text-violet-700 w-3/8">
                            {toolB.nombre}
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {/* Filas principales */}
                    {mainRows.map((row) => (
                        <tr key={row.label} className="hover:bg-gray-50 transition-colors">
                            <td className="px-4 py-3 text-gray-600 font-medium">{row.label}</td>
                            <td className="px-4 py-3 text-center text-gray-800">{row.valueA}</td>
                            <td className="px-4 py-3 text-center text-gray-800">{row.valueB}</td>
                        </tr>
                    ))}

                    {/* Criterios de Elección */}
                    <tr className="bg-gray-50/50">
                        <td className="px-4 py-3 text-gray-600 font-bold uppercase text-[10px] tracking-wider">Criterios clave</td>
                        <td className="px-4 py-3">
                            <ul className="text-xs space-y-1 text-gray-700">
                                {toolA.criterios_eleccion.map((c, i) => (
                                    <li key={i} className="flex gap-2"><span>•</span> {c}</li>
                                ))}
                            </ul>
                        </td>
                        <td className="px-4 py-3">
                            <ul className="text-xs space-y-1 text-gray-700">
                                {toolB.criterios_eleccion.map((c, i) => (
                                    <li key={i} className="flex gap-2"><span>•</span> {c}</li>
                                ))}
                            </ul>
                        </td>
                    </tr>

                    {/* Pros */}
                    <tr>
                        <td className="px-4 py-3 text-green-700 font-bold uppercase text-[10px] tracking-wider">Ventajas (Pros)</td>
                        <td className="px-4 py-3">
                            <ul className="text-xs space-y-1 text-green-800 font-medium">
                                {toolA.pros.slice(0, 3).map((p, i) => (
                                    <li key={i} className="flex gap-2 text-left"><span>✓</span> {p}</li>
                                ))}
                            </ul>
                        </td>
                        <td className="px-4 py-3">
                            <ul className="text-xs space-y-1 text-green-800 font-medium">
                                {toolB.pros.slice(0, 3).map((p, i) => (
                                    <li key={i} className="flex gap-2 text-left"><span>✓</span> {p}</li>
                                ))}
                            </ul>
                        </td>
                    </tr>

                    {/* Contras */}
                    <tr>
                        <td className="px-4 py-3 text-red-700 font-bold uppercase text-[10px] tracking-wider">Desventajas</td>
                        <td className="px-4 py-3">
                            <ul className="text-xs space-y-1 text-red-800">
                                {toolA.contras.slice(0, 2).map((c, i) => (
                                    <li key={i} className="flex gap-2 text-left"><span>✕</span> {c}</li>
                                ))}
                            </ul>
                        </td>
                        <td className="px-4 py-3">
                            <ul className="text-xs space-y-1 text-red-800">
                                {toolB.contras.slice(0, 2).map((c, i) => (
                                    <li key={i} className="flex gap-2 text-left"><span>✕</span> {c}</li>
                                ))}
                            </ul>
                        </td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr className="bg-gray-50 border-t border-gray-200">
                        <td className="px-4 py-4 text-gray-500 font-medium text-xs">Sitio oficial</td>
                        <td className="px-4 py-4 text-center"><AffiliateTextLink tool={toolA} /></td>
                        <td className="px-4 py-4 text-center"><AffiliateTextLink tool={toolB} /></td>
                    </tr>
                    <tr className="bg-indigo-50/50">
                        <td className="px-4 py-4"></td>
                        <td className="px-4 py-4 text-center">
                            <AffiliateButton tool={toolA} text={`Probar ${toolA.nombre}`} size="sm" variant="primary" />
                        </td>
                        <td className="px-4 py-4 text-center">
                            <AffiliateButton tool={toolB} text={`Probar ${toolB.nombre}`} size="sm" variant="secondary" />
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
}
