import fs from "fs";
import path from "path";

const BLOG_DIR = path.join(process.cwd(), "data", "blog");

export interface BlogPost {
    slug: string;
    title: string;
    description: string;
    date: string;
    lastModified?: string;
    category: string;
    tags: string[];
    author: string;
    readingTime: string;
    ogImage?: string;
    featured?: boolean;
    // Content sections
    intro: string;
    steps: {
        title: string;
        content: string;
        tip?: string;
        prompt?: string;
        promptLabel?: string;
    }[];
    flow?: {
        title?: string;
        nodes: {
            name: string;
            icon?: string;
            color?: string;
        }[];
    };
    conclusion: string;
    cta?: string;
    // New strategic fields
    problem?: string;
    solution?: string;
    tools_used?: {
        id: string; // tool_id from tools.csv
        name: string;
        reason: string;
    }[];
}

/**
 * Lee todos los posts del blog desde data/blog/*.json
 */
export function getAllPosts(): BlogPost[] {
    if (!fs.existsSync(BLOG_DIR)) return [];

    const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".json"));

    return files
        .map((file) => {
            const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf-8");
            const post = JSON.parse(raw) as BlogPost;
            post.slug = file.replace(".json", "");
            return post;
        })
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/**
 * Obtiene un post por su slug
 */
export function getPostBySlug(slug: string): BlogPost | undefined {
    const filePath = path.join(BLOG_DIR, `${slug}.json`);
    if (!fs.existsSync(filePath)) return undefined;

    const raw = fs.readFileSync(filePath, "utf-8");
    const post = JSON.parse(raw) as BlogPost;
    post.slug = slug;
    return post;
}

/**
 * Obtiene posts por categoría
 */
export function getPostsByCategory(category: string): BlogPost[] {
    return getAllPosts().filter((p) => p.category === category);
}

/**
 * Obtiene posts destacados
 */
export function getFeaturedPosts(limit = 3): BlogPost[] {
    const all = getAllPosts();
    const featured = all.filter((p) => p.featured);
    return featured.length > 0 ? featured.slice(0, limit) : all.slice(0, limit);
}

/**
 * Obtiene posts relacionados (misma categoría, excluyendo el actual)
 */
export function getRelatedPosts(
    currentSlug: string,
    category: string,
    limit = 3
): BlogPost[] {
    return getAllPosts()
        .filter((p) => p.slug !== currentSlug && p.category === category)
        .slice(0, limit);
}
