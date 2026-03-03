interface FlowNode {
    name: string;
    icon?: string;
    color?: string;
}

interface FlowDiagramProps {
    nodes: FlowNode[];
    title?: string;
}

const defaultColors = [
    "from-indigo-500 to-indigo-600",
    "from-violet-500 to-violet-600",
    "from-cyan-500 to-cyan-600",
    "from-emerald-500 to-emerald-600",
    "from-amber-500 to-amber-600",
];

export default function FlowDiagram({ nodes, title }: FlowDiagramProps) {
    return (
        <div className="my-10">
            {title && (
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <span className="inline-flex items-center justify-center w-8 h-8 bg-cyan-100 text-cyan-600 rounded-lg text-sm">
                        🔗
                    </span>
                    {title}
                </h3>
            )}

            <div className="bg-gradient-to-br from-gray-50 to-indigo-50/30 rounded-3xl border border-gray-200 p-8 shadow-sm">
                {/* Desktop: horizontal */}
                <div className="hidden md:flex items-center justify-center gap-0">
                    {nodes.map((node, index) => (
                        <div key={index} className="flex items-center">
                            {/* Node */}
                            <div className="flex flex-col items-center group">
                                <div
                                    className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${node.color || defaultColors[index % defaultColors.length]
                                        } flex items-center justify-center text-3xl shadow-lg group-hover:scale-110 transition-transform duration-300 group-hover:shadow-xl`}
                                >
                                    {node.icon || "🔧"}
                                </div>
                                <span className="mt-3 text-sm font-semibold text-gray-700 text-center max-w-[100px] leading-tight">
                                    {node.name}
                                </span>
                            </div>

                            {/* Arrow */}
                            {index < nodes.length - 1 && (
                                <div className="flex items-center mx-3 mb-6">
                                    <div className="w-10 h-0.5 bg-gradient-to-r from-gray-300 to-gray-400 relative">
                                        {/* Animated dot */}
                                        <div className="absolute top-1/2 -translate-y-1/2 w-2 h-2 bg-indigo-500 rounded-full animate-flow-dot" />
                                    </div>
                                    <svg
                                        className="w-4 h-4 text-gray-400 -ml-0.5"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Mobile: vertical */}
                <div className="md:hidden flex flex-col items-center gap-0">
                    {nodes.map((node, index) => (
                        <div key={index} className="flex flex-col items-center">
                            {/* Node */}
                            <div className="flex items-center gap-4">
                                <div
                                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${node.color || defaultColors[index % defaultColors.length]
                                        } flex items-center justify-center text-2xl shadow-lg`}
                                >
                                    {node.icon || "🔧"}
                                </div>
                                <span className="text-sm font-semibold text-gray-700">
                                    {node.name}
                                </span>
                            </div>

                            {/* Arrow down */}
                            {index < nodes.length - 1 && (
                                <div className="flex flex-col items-center my-2">
                                    <div className="w-0.5 h-6 bg-gradient-to-b from-gray-300 to-gray-400" />
                                    <svg
                                        className="w-4 h-4 text-gray-400 -mt-0.5"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
