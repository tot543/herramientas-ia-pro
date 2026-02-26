interface ProsConsListProps {
    pros: string[];
    contras: string[];
    toolName?: string;
}

export default function ProsConsList({ pros, contras, toolName }: ProsConsListProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Pros */}
            <div className="bg-green-50 rounded-2xl p-5 border border-green-100">
                <h4 className="font-bold text-green-800 mb-4 flex items-center gap-2">
                    <span className="text-xl">✅</span>
                    Ventajas{toolName ? ` de ${toolName}` : ""}
                </h4>
                <ul className="space-y-2">
                    {pros.map((pro, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                            <span className="text-green-500 font-bold mt-0.5 flex-shrink-0">✓</span>
                            <span>{pro}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Contras */}
            <div className="bg-red-50 rounded-2xl p-5 border border-red-100">
                <h4 className="font-bold text-red-800 mb-4 flex items-center gap-2">
                    <span className="text-xl">❌</span>
                    Desventajas{toolName ? ` de ${toolName}` : ""}
                </h4>
                <ul className="space-y-2">
                    {contras.map((contra, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                            <span className="text-red-500 font-bold mt-0.5 flex-shrink-0">✗</span>
                            <span>{contra}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
