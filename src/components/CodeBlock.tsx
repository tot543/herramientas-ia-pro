"use client";

import { useState, useCallback } from "react";

interface CodeBlockProps {
    code: string;
    language?: string;
    label?: string;
}

export default function CodeBlock({
    code,
    language = "text",
    label,
}: CodeBlockProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = useCallback(async () => {
        try {
            await navigator.clipboard.writeText(code);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            // Fallback para navegadores sin API clipboard
            const textarea = document.createElement("textarea");
            textarea.value = code;
            textarea.style.position = "fixed";
            textarea.style.opacity = "0";
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand("copy");
            document.body.removeChild(textarea);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    }, [code]);

    return (
        <div className="my-6 rounded-2xl overflow-hidden border border-gray-200 shadow-sm group">
            {/* Header */}
            <div className="flex items-center justify-between bg-gray-900 px-4 py-3">
                <div className="flex items-center gap-3">
                    {/* Dots decorativos */}
                    <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-400/80" />
                        <div className="w-3 h-3 rounded-full bg-amber-400/80" />
                        <div className="w-3 h-3 rounded-full bg-green-400/80" />
                    </div>
                    {label && (
                        <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">
                            {label}
                        </span>
                    )}
                    {!label && language !== "text" && (
                        <span className="text-xs text-gray-500 font-mono">
                            {language}
                        </span>
                    )}
                </div>

                {/* Botón copiar */}
                <button
                    onClick={handleCopy}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 ${copied
                            ? "bg-green-500/20 text-green-400"
                            : "bg-white/10 text-gray-400 hover:bg-white/20 hover:text-white"
                        }`}
                    aria-label="Copiar al portapapeles"
                >
                    {copied ? (
                        <>
                            <svg
                                className="w-3.5 h-3.5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 13l4 4L19 7"
                                />
                            </svg>
                            ¡Copiado!
                        </>
                    ) : (
                        <>
                            <svg
                                className="w-3.5 h-3.5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                                />
                            </svg>
                            Copiar
                        </>
                    )}
                </button>
            </div>

            {/* Código */}
            <div className="bg-gray-950 p-5 overflow-x-auto">
                <pre className="text-sm leading-relaxed">
                    <code className="text-gray-200 font-mono whitespace-pre-wrap break-words">
                        {code}
                    </code>
                </pre>
            </div>
        </div>
    );
}
