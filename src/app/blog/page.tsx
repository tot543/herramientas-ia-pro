"use client";

import { Suspense, useState, useMemo } from "react";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";

// eslint-disable-next-line @typescript-eslint/no-require-imports
const siteConfig = require("../../site.config.js");

const categoryColors: Record<string, string> = {
    rrhh: "bg-violet-100 text-violet-700",
    operaciones: "bg-emerald-100 text-emerald-700",
    productividad: "bg-amber-100 text-amber-700",
    marketing: "bg-cyan-100 text-cyan-700",
    ventas: "bg-blue-100 text-blue-700",
};

interface BlogIndexProps {
    searchParams: { cat?: string };
}

function BlogContent({ searchParams }: BlogIndexProps) {
    const activeCategory = searchParams.cat;
    const allPosts = getAllPosts();
    const [searchQuery, setSearchQuery] = useState("");

    const filteredPosts = useMemo(() => {
        return allPosts.filter((post) => {
            const matchesCategory = !activeCategory || post.category.toLowerCase() === activeCategory.toLowerCase();
            const matchesSearch = !searchQuery ||
                post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                post.description.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [allPosts, activeCategory, searchQuery]);

    return (
        <div className="min-h-screen bg-gray-50/50">
            {/* Hero */}
            <section className="bg-gradient-to-br from-gray-900 via-indigo-950 to-gray-900 text-white py-20 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <span className="inline-block bg-indigo-500/30 text-indigo-300 text-xs font-semibold px-3 py-1 rounded-full mb-6 uppercase tracking-widest">
                        Blueprints de IA
                    </span>
                    <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6">
                        Arquitectura Operativa <span className="text-cyan-400">Escalable</span>
                    </h1>
                    <p className="text-lg text-indigo-100 max-w-2xl mx-auto leading-relaxed font-light">
                        No son simples tutoriales. Son esquemas técnicos para que tu infraestructura empresarial no dependa de tareas manuales.
                    </p>
                </div>
            </section>

            {/* Sticky Filter & Search Bar */}
            <section className="py-6 px-4 border-b border-gray-200 bg-white sticky top-16 z-40 shadow-sm">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-6 items-center justify-between">
                    {/* Filter chips */}
                    <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                        <Link
                            href="/blog/"
                            className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${!activeCategory
                                ? "bg-indigo-600 text-white shadow-md shadow-indigo-200 scale-105"
                                : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                                }`}
                        >
                            Todos
                        </Link>
                        {siteConfig.blogCategories.map(
                            (category: { slug: string; nombre: string; icon: string }) => (
                                <Link
                                    key={category.slug}
                                    href={`/blog/?cat=${category.slug}`}
                                    className={`px-5 py-2 rounded-full text-sm font-bold transition-all flex items-center gap-2 ${activeCategory === category.slug
                                        ? "bg-indigo-600 text-white shadow-md shadow-indigo-200 scale-105"
                                        : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                                        }`}
                                >
                                    <span>{category.icon}</span>
                                    <span>{category.nombre}</span>
                                </Link>
                            )
                        )}
                    </div>

                    {/* Search Field */}
                    <div className="relative w-full md:w-80 group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <svg className="h-4 w-4 text-gray-400 group-focus-within:text-indigo-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            placeholder="Buscar por título o herramienta..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="block w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-xs placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-bold"
                        />
                    </div>
                </div>
            </section>

            {/* Posts grid */}
            <section className="py-16 px-4">
                <div className="max-w-6xl mx-auto">
                    {filteredPosts.length === 0 ? (
                        <div className="text-center py-24 bg-white rounded-[2.5rem] border-2 border-dashed border-gray-200 max-w-2xl mx-auto">
                            <div className="w-20 h-20 bg-gray-50 rounded-3xl flex items-center justify-center mx-auto mb-6">
                                <span className="text-4xl text-gray-300">🔍</span>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                No se encontraron Blueprints
                            </h2>
                            <p className="text-gray-500 mb-8 max-w-sm mx-auto font-medium">
                                Prueba con otros términos de búsqueda o selecciona otra categoría operativa.
                            </p>
                            <button
                                onClick={() => setSearchQuery("")}
                                className="text-indigo-600 font-bold hover:text-indigo-700 transition-colors uppercase tracking-widest text-[10px] border-b-2 border-indigo-100 pb-1"
                            >
                                Limpiar búsqueda
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 lg:gap-12">
                            {filteredPosts.map((post) => (
                                <Link
                                    key={post.slug}
                                    href={`/blog/${post.slug}/`}
                                    className="group bg-white rounded-[2.5rem] border border-gray-200/60 overflow-hidden hover:border-indigo-400 hover:shadow-2xl hover:shadow-indigo-100 transition-all duration-500 flex flex-col h-full"
                                >
                                    <div className="h-1.5 bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-500 opacity-80" />

                                    <div className="p-8 md:p-10 flex flex-col flex-1">
                                        <div className="flex items-center gap-3 mb-6">
                                            <span
                                                className={`text-[10px] uppercase tracking-widest font-extrabold px-3 py-1.5 rounded-xl ${categoryColors[post.category] ||
                                                    "bg-gray-100 text-gray-600"
                                                    }`}
                                            >
                                                {post.category}
                                            </span>
                                            <span className="text-[11px] text-gray-400 font-medium">
                                                ⏱️ {post.readingTime}
                                            </span>
                                            {post.featured && (
                                                <span className="text-[10px] text-amber-600 font-extrabold bg-amber-50 px-2.5 py-1 rounded-xl border border-amber-100">
                                                    ⭐ ESSENTIAL
                                                </span>
                                            )}
                                        </div>

                                        <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-4 group-hover:text-indigo-600 transition-colors leading-[1.1]">
                                            {post.title}
                                        </h2>

                                        <p className="text-gray-500 leading-relaxed mb-8 text-[15px] font-medium opacity-80">
                                            {post.description}
                                        </p>

                                        <div className="flex flex-wrap gap-2 mb-10 mt-auto">
                                            {post.tags.slice(0, 3).map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="text-[10px] text-gray-400 font-bold bg-gray-50/50 border border-gray-100 px-3 py-1.5 rounded-xl"
                                                >
                                                    #{tag.toUpperCase()}
                                                </span>
                                            ))}
                                        </div>

                                        <div className="flex items-center justify-between pt-6 border-t border-gray-50 mt-auto">
                                            <div className="flex flex-col">
                                                <span className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mb-1">Actualizado</span>
                                                <span className="text-xs text-gray-700 font-bold">
                                                    {new Date(post.date).toLocaleDateString("es-ES", {
                                                        year: "numeric",
                                                        month: "long",
                                                    })}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2 text-xs font-black text-indigo-600 uppercase tracking-widest group-hover:gap-3 transition-all">
                                                <span>Ver más</span>
                                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}

export default function BlogIndex({ searchParams }: BlogIndexProps) {
    return (
        <Suspense fallback={
            <div className="max-w-6xl mx-auto px-4 py-32 text-center">
                <div className="animate-spin w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full mx-auto" />
                <p className="mt-4 text-gray-500 font-medium tracking-wide">Cargando biblioteca...</p>
            </div>
        }>
            <BlogContent searchParams={searchParams} />
        </Suspense>
    );
}
