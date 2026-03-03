import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getAllPosts, getPostBySlug, getRelatedPosts } from "@/lib/blog";
import StepByStep from "@/components/StepByStep";
import CodeBlock from "@/components/CodeBlock";
import FlowDiagram from "@/components/FlowDiagram";
import NewsletterCapture from "@/components/NewsletterCapture";
import { ArticleJsonLd, HowToJsonLd } from "@/components/JsonLd";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    const posts = getAllPosts();
    return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
    params,
}: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const post = getPostBySlug(slug);
    if (!post) return {};

    return {
        title: `${post.title} | Blueprint Ops`,
        description: post.description,
        alternates: { canonical: `/blog/${slug}/` },
        openGraph: {
            type: "article",
            title: post.title,
            description: post.description,
            publishedTime: post.date,
            modifiedTime: post.lastModified || post.date,
            authors: [post.author],
            tags: post.tags,
            ...(post.ogImage && {
                images: [{ url: post.ogImage, width: 1200, height: 630 }],
            }),
        },
        twitter: {
            card: "summary_large_image",
            title: post.title,
            description: post.description,
        },
    };
}

export default async function BlogPostPage({ params }: PageProps) {
    const { slug } = await params;
    const post = getPostBySlug(slug);
    if (!post) notFound();

    const relatedPosts = getRelatedPosts(slug, post.category, 3);

    // Build data for JSON-LD
    const howToSteps = post.steps.map((step) => ({
        name: step.title,
        text: step.content,
    }));

    const categoryLabel =
        post.category.charAt(0).toUpperCase() + post.category.slice(1);

    return (
        <>
            {/* JSON-LD Structured Data */}
            <ArticleJsonLd
                title={post.title}
                description={post.description}
                datePublished={post.date}
                dateModified={post.lastModified || post.date}
                authorName={post.author}
                imageUrl={post.ogImage}
                url={`/blog/${slug}/`}
            />
            <HowToJsonLd
                name={post.title}
                description={post.description}
                steps={howToSteps}
                totalTime="PT30M"
                estimatedCost="0 USD"
                url={`/blog/${slug}/`}
            />

            <article className="max-w-4xl mx-auto px-4 py-12">
                {/* Breadcrumb */}
                <nav className="text-sm text-gray-500 mb-8 flex gap-2 flex-wrap items-center">
                    <Link href="/" className="hover:text-indigo-600 transition-colors flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        Inicio
                    </Link>
                    <span>/</span>
                    <Link
                        href="/blog/"
                        className="hover:text-indigo-600 transition-colors"
                    >
                        Blueprints
                    </Link>
                    <span>/</span>
                    <span className="text-gray-800 font-medium truncate max-w-[200px]">
                        {post.title}
                    </span>
                </nav>

                {/* Header */}
                <header className="mb-12">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="bg-indigo-100 text-indigo-700 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                            {categoryLabel}
                        </span>
                        <span className="text-sm text-gray-400">{post.readingTime}</span>
                        <span className="text-emerald-600 text-xs font-bold border border-emerald-100 bg-emerald-50 px-2 py-0.5 rounded-md">Coste: $0</span>
                    </div>

                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight mb-6 tracking-tight">
                        {post.title}
                    </h1>

                    <p className="text-xl text-gray-600 leading-relaxed max-w-3xl">
                        {post.description}
                    </p>

                    <div className="flex items-center gap-4 mt-6 pt-6 border-t border-gray-100">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-indigo-200">
                            BP
                        </div>
                        <div>
                            <p className="text-sm font-bold text-gray-900">
                                {post.author}
                            </p>
                            <div className="flex items-center gap-2 text-xs text-gray-400">
                                <span>
                                    {new Date(post.date).toLocaleDateString("es-ES", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    })}
                                </span>
                                {post.lastModified && post.lastModified !== post.date && (
                                    <>
                                        <span>·</span>
                                        <span className="text-indigo-500 font-medium">
                                            Actualizado {new Date(post.lastModified).toLocaleDateString("es-ES", {
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric",
                                            })}
                                        </span>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </header>

                {/* Intro */}
                <div className="prose-section mb-12">
                    <p className="text-lg text-gray-700 leading-relaxed font-serif italic border-l-4 border-indigo-200 pl-6 py-2">
                        {post.intro}
                    </p>
                </div>

                {/* Problem & Solution Cards */}
                {(post.problem || post.solution) && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
                        {post.problem && (
                            <div className="bg-white border border-red-100 rounded-3xl p-8 relative overflow-hidden group shadow-sm hover:shadow-md transition-shadow">
                                <div className="absolute top-0 right-0 p-4 text-red-100 group-hover:text-red-200 transition-colors">
                                    <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                    </svg>
                                </div>
                                <h2 className="text-lg font-bold text-red-900 mb-4 flex items-center gap-2">
                                    <span className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center text-sm">⚠️</span>
                                    El Problema
                                </h2>
                                <p className="text-red-800/80 leading-relaxed text-sm relative z-10">
                                    {post.problem}
                                </p>
                            </div>
                        )}
                        {post.solution && (
                            <div className="bg-white border border-emerald-100 rounded-3xl p-8 relative overflow-hidden group shadow-sm hover:shadow-md transition-shadow">
                                <div className="absolute top-0 right-0 p-4 text-emerald-100 group-hover:text-emerald-200 transition-colors">
                                    <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.952 11.952 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                </div>
                                <h2 className="text-lg font-bold text-emerald-900 mb-4 flex items-center gap-2">
                                    <span className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-sm">✅</span>
                                    La Solución
                                </h2>
                                <p className="text-emerald-800/80 leading-relaxed text-sm relative z-10">
                                    {post.solution}
                                </p>
                            </div>
                        )}
                    </div>
                )}

                {/* Tools Used / Tech Stack */}
                {post.tools_used && post.tools_used.length > 0 && (
                    <div className="mb-16">
                        <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                            <span className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white text-base">🛠️</span>
                            Stack Tecnológico Sugerido
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {post.tools_used.map((tool) => (
                                <div key={tool.id} className="bg-white border border-gray-100 rounded-2xl p-5 hover:border-indigo-200 hover:shadow-sm transition-all flex gap-4 items-start group">
                                    <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center shrink-0 border border-gray-100 group-hover:bg-indigo-50 group-hover:border-indigo-100 transition-colors">
                                        <span className="text-xl font-bold text-gray-400 group-hover:text-indigo-500 transition-colors">
                                            {tool.name.charAt(0)}
                                        </span>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900 text-sm mb-1">{tool.name}</h3>
                                        <p className="text-xs text-gray-500 leading-normal">{tool.reason}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Flow diagram (if present) */}
                {post.flow && (
                    <div className="mb-16">
                        <FlowDiagram
                            nodes={post.flow.nodes}
                            title={post.flow.title || "Arquitectura del Flujo"}
                        />
                    </div>
                )}

                {/* Steps */}
                <StepByStep
                    steps={post.steps.map((s) => ({
                        title: s.title,
                        content: s.content,
                        tip: s.tip,
                    }))}
                    title="Guía de Implementación"
                />

                {/* Prompts / Code blocks */}
                {post.steps
                    .filter((s) => s.prompt)
                    .map((step, i) => (
                        <div key={i} className="group">
                            <div className="flex items-center gap-2 mb-3 mt-12">
                                <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-xs">
                                    PR
                                </div>
                                <h3 className="text-lg font-bold text-gray-900">
                                    {step.promptLabel || `Prompt — ${step.title}`}
                                </h3>
                            </div>
                            <CodeBlock
                                code={step.prompt!}
                                language="text"
                                label={step.promptLabel || "Copia este prompt"}
                            />
                        </div>
                    ))}

                {/* Conclusion */}
                <div className="my-16 bg-gradient-to-br from-indigo-600 to-violet-700 rounded-3xl p-10 text-white shadow-xl shadow-indigo-100 relative overflow-hidden">
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                        <span>🎯</span> Conclusión y Resultado
                    </h2>
                    <p className="text-indigo-50 leading-relaxed text-xl font-medium">
                        {post.conclusion}
                    </p>
                </div>


                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-12">
                    {post.tags.map((tag) => (
                        <span
                            key={tag}
                            className="text-xs text-gray-500 bg-gray-100 px-3 py-1.5 rounded-full"
                        >
                            #{tag}
                        </span>
                    ))}
                </div>

                {/* Newsletter CTA */}
                <NewsletterCapture
                    title="¿Te ha sido útil este Blueprint?"
                    description={
                        post.cta ||
                        "Recibe un blueprint operativo nuevo cada semana en tu bandeja. Sin spam, solo flujos de IA implementables."
                    }
                />

                {/* Related posts */}
                {relatedPosts.length > 0 && (
                    <section className="mt-16">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">
                            Más Blueprints de {categoryLabel}
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {relatedPosts.map((rp) => (
                                <Link
                                    key={rp.slug}
                                    href={`/blog/${rp.slug}/`}
                                    className="group bg-white rounded-2xl border border-gray-200 p-6 hover:border-indigo-300 hover:shadow-md transition-all"
                                >
                                    <h3 className="font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors text-sm leading-snug">
                                        {rp.title}
                                    </h3>
                                    <p className="text-xs text-gray-500 line-clamp-2">
                                        {rp.description}
                                    </p>
                                    <span className="mt-3 inline-block text-xs font-semibold text-indigo-600">
                                        Leer →
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}
            </article>
        </>
    );
}
