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
                url={`/blog/${slug}/`}
            />

            <article className="max-w-4xl mx-auto px-4 py-12">
                {/* Breadcrumb */}
                <nav className="text-sm text-gray-500 mb-8 flex gap-2 flex-wrap">
                    <Link href="/" className="hover:text-indigo-600 transition-colors">
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
                    </div>

                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
                        {post.title}
                    </h1>

                    <p className="text-xl text-gray-600 leading-relaxed max-w-3xl">
                        {post.description}
                    </p>

                    <div className="flex items-center gap-4 mt-6 pt-6 border-t border-gray-100">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-white font-bold text-sm">
                            BP
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-gray-900">
                                {post.author}
                            </p>
                            <p className="text-xs text-gray-400">
                                {new Date(post.date).toLocaleDateString("es-ES", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}
                                {post.lastModified &&
                                    post.lastModified !== post.date &&
                                    ` · Actualizado ${new Date(
                                        post.lastModified
                                    ).toLocaleDateString("es-ES", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    })}`}
                            </p>
                        </div>
                    </div>
                </header>

                {/* Intro */}
                <div className="prose-section mb-12">
                    <p className="text-lg text-gray-700 leading-relaxed font-serif">
                        {post.intro}
                    </p>
                </div>

                {/* Problem & Solution Cards */}
                {(post.problem || post.solution) && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
                        {post.problem && (
                            <div className="bg-red-50/50 border border-red-100 rounded-3xl p-8 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-4 text-red-200 group-hover:text-red-300 transition-colors">
                                    <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                    </svg>
                                </div>
                                <h2 className="text-xl font-bold text-red-900 mb-4 flex items-center gap-2">
                                    <span>⚠️</span> El Problema
                                </h2>
                                <p className="text-red-800/80 leading-relaxed text-sm">
                                    {post.problem}
                                </p>
                            </div>
                        )}
                        {post.solution && (
                            <div className="bg-emerald-50/50 border border-emerald-100 rounded-3xl p-8 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-4 text-emerald-200 group-hover:text-emerald-300 transition-colors">
                                    <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.952 11.952 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                </div>
                                <h2 className="text-xl font-bold text-emerald-900 mb-4 flex items-center gap-2">
                                    <span>✅</span> La Solución
                                </h2>
                                <p className="text-emerald-800/80 leading-relaxed text-sm">
                                    {post.solution}
                                </p>
                            </div>
                        )}
                    </div>
                )}

                {/* Tools Used / Tech Stack */}
                {post.tools_used && post.tools_used.length > 0 && (
                    <div className="mb-16">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                            🛠️ Stack Tecnológico
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {post.tools_used.map((tool) => (
                                <div key={tool.id} className="bg-white border border-gray-100 rounded-2xl p-5 hover:border-indigo-200 hover:shadow-sm transition-all flex gap-4 items-start">
                                    <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center shrink-0 border border-gray-100">
                                        <span className="text-xl font-bold text-indigo-400">
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
                    <FlowDiagram
                        nodes={post.flow.nodes}
                        title={post.flow.title}
                    />
                )}

                {/* Steps */}
                <StepByStep
                    steps={post.steps.map((s) => ({
                        title: s.title,
                        content: s.content,
                        tip: s.tip,
                    }))}
                    title="Paso a Paso"
                />

                {/* Prompts / Code blocks */}
                {post.steps
                    .filter((s) => s.prompt)
                    .map((step, i) => (
                        <div key={i}>
                            <h3 className="text-lg font-bold text-gray-900 mb-2 mt-10">
                                📝 {step.promptLabel || `Prompt — ${step.title}`}
                            </h3>
                            <CodeBlock
                                code={step.prompt!}
                                language="text"
                                label={step.promptLabel || "Prompt"}
                            />
                        </div>
                    ))}

                {/* Conclusion */}
                <div className="my-12 bg-gradient-to-br from-gray-50 to-indigo-50/30 rounded-3xl border border-gray-200 p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                        🎯 Resultado
                    </h2>
                    <p className="text-gray-700 leading-relaxed text-lg font-serif">
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
