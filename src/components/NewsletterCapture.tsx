"use client";

import { useState, FormEvent } from "react";

interface NewsletterCaptureProps {
    variant?: "inline" | "sidebar";
    title?: string;
    description?: string;
}

export default function NewsletterCapture({
    variant = "inline",
    title = "Recibe blueprints exclusivos",
    description = "Un blueprint operativo nuevo cada semana en tu bandeja. Sin spam, sin fluff — solo flujos de IA que puedes implementar hoy.",
}: NewsletterCaptureProps) {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [errorMsg, setErrorMsg] = useState("");

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        // Validación básica client-side
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setStatus("error");
            setErrorMsg("Por favor, introduce un email válido.");
            return;
        }

        setStatus("loading");

        try {
            const res = await fetch("/api/subscribe", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();

            if (!res.ok) {
                setStatus("error");
                setErrorMsg(data.error || "Hubo un error. Intenta de nuevo.");
                return;
            }

            setStatus("success");
            setEmail("");
        } catch {
            setStatus("error");
            setErrorMsg("Error de conexión. Intenta de nuevo.");
        }
    };

    if (variant === "sidebar") {
        return (
            <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-2xl p-6 text-white shadow-lg">
                <div className="text-2xl mb-3">📬</div>
                <h3 className="font-bold text-lg mb-2 leading-tight">{title}</h3>
                <p className="text-indigo-200 text-sm leading-relaxed mb-4">
                    {description}
                </p>

                {status === "success" ? (
                    <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
                        <span className="text-2xl block mb-2">🎉</span>
                        <p className="font-semibold text-sm">¡Bienvenido a bordo!</p>
                        <p className="text-indigo-200 text-xs mt-1">
                            Revisa tu bandeja para confirmar.
                        </p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-3">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                if (status === "error") setStatus("idle");
                            }}
                            placeholder="tu@email.com"
                            className="w-full px-4 py-3 rounded-xl bg-white/15 backdrop-blur-sm border border-white/20 text-white placeholder-indigo-300 text-sm focus:outline-none focus:ring-2 focus:ring-white/40 transition-all"
                            disabled={status === "loading"}
                        />
                        {status === "error" && (
                            <p className="text-red-300 text-xs">{errorMsg}</p>
                        )}
                        <button
                            type="submit"
                            disabled={status === "loading"}
                            className="w-full bg-white text-indigo-700 font-bold py-3 rounded-xl text-sm hover:bg-indigo-50 transition-all disabled:opacity-60 active:scale-[0.98]"
                        >
                            {status === "loading" ? (
                                <span className="inline-flex items-center gap-2">
                                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24">
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                            fill="none"
                                        />
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                                        />
                                    </svg>
                                    Enviando...
                                </span>
                            ) : (
                                "Suscribirme gratis →"
                            )}
                        </button>
                        <p className="text-indigo-300/70 text-[10px] text-center">
                            Puedes darte de baja en cualquier momento.
                        </p>
                    </form>
                )}
            </div>
        );
    }

    // Variant: inline (al final de artículos)
    return (
        <div className="my-12 bg-gradient-to-br from-indigo-50 via-violet-50 to-cyan-50 rounded-3xl border border-indigo-100 p-8 md:p-10 shadow-sm">
            <div className="max-w-2xl mx-auto text-center">
                <span className="text-4xl block mb-4">📬</span>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{title}</h3>
                <p className="text-gray-600 leading-relaxed mb-6 text-sm">
                    {description}
                </p>

                {status === "success" ? (
                    <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
                        <span className="text-3xl block mb-2">🎉</span>
                        <p className="font-bold text-green-800">
                            ¡Te has suscrito correctamente!
                        </p>
                        <p className="text-green-600 text-sm mt-1">
                            Revisa tu bandeja de entrada para confirmar tu suscripción.
                        </p>
                    </div>
                ) : (
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
                    >
                        <div className="flex-1">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    if (status === "error") setStatus("idle");
                                }}
                                placeholder="tu@email.com"
                                className="w-full px-5 py-3.5 rounded-xl border border-gray-300 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all"
                                disabled={status === "loading"}
                            />
                            {status === "error" && (
                                <p className="text-red-500 text-xs mt-1 text-left">
                                    {errorMsg}
                                </p>
                            )}
                        </div>
                        <button
                            type="submit"
                            disabled={status === "loading"}
                            className="bg-indigo-600 text-white font-bold px-6 py-3.5 rounded-xl text-sm hover:bg-indigo-700 transition-all disabled:opacity-60 active:scale-[0.98] whitespace-nowrap shadow-md shadow-indigo-200"
                        >
                            {status === "loading" ? "Enviando..." : "Suscribirme →"}
                        </button>
                    </form>
                )}

                <p className="text-gray-400 text-[10px] mt-4">
                    Sin spam. Puedes darte de baja cuando quieras.
                </p>
            </div>
        </div>
    );
}
