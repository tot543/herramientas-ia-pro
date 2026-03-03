"use client";

import { useState } from "react";

interface Step {
    title: string;
    content: string;
    tip?: string;
}

interface StepByStepProps {
    steps: Step[];
    title?: string;
}

export default function StepByStep({ steps, title }: StepByStepProps) {
    const [activeStep, setActiveStep] = useState<number | null>(null);

    return (
        <div className="my-10">
            {title && (
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <span className="inline-flex items-center justify-center w-8 h-8 bg-indigo-100 text-indigo-600 rounded-lg text-sm">
                        📋
                    </span>
                    {title}
                </h3>
            )}
            <div className="relative">
                {/* Línea conectora vertical */}
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-400 via-violet-400 to-cyan-400 rounded-full" />

                <div className="space-y-6">
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className="relative pl-16 group"
                            onMouseEnter={() => setActiveStep(index)}
                            onMouseLeave={() => setActiveStep(null)}
                        >
                            {/* Número del paso */}
                            <div
                                className={`absolute left-0 top-0 w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-lg transition-all duration-300 shadow-md ${activeStep === index
                                        ? "bg-gradient-to-br from-indigo-600 to-violet-600 text-white scale-110 shadow-indigo-200"
                                        : "bg-white text-indigo-600 border-2 border-indigo-200"
                                    }`}
                            >
                                {index + 1}
                            </div>

                            {/* Contenido */}
                            <div
                                className={`bg-white rounded-2xl border p-6 transition-all duration-300 ${activeStep === index
                                        ? "border-indigo-300 shadow-lg shadow-indigo-50"
                                        : "border-gray-200 shadow-sm"
                                    }`}
                            >
                                <h4 className="font-bold text-gray-900 text-lg mb-2 group-hover:text-indigo-700 transition-colors">
                                    {step.title}
                                </h4>
                                <p className="text-gray-600 leading-relaxed text-sm">
                                    {step.content}
                                </p>
                                {step.tip && (
                                    <div className="mt-3 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-sm text-amber-800 flex items-start gap-2">
                                        <span className="text-amber-500 mt-0.5">💡</span>
                                        <span>{step.tip}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
