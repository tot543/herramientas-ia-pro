interface ArticleJsonLdProps {
    title: string;
    description: string;
    datePublished: string;
    dateModified?: string;
    authorName?: string;
    imageUrl?: string;
    url: string;
}

interface HowToStep {
    name: string;
    text: string;
    url?: string;
}

interface HowToJsonLdProps {
    name: string;
    description: string;
    steps: HowToStep[];
    totalTime?: string; // ISO 8601 duration, e.g. "PT30M"
    estimatedCost?: string;
    imageUrl?: string;
    url: string;
}

export function ArticleJsonLd({
    title,
    description,
    datePublished,
    dateModified,
    authorName = "Blueprint Ops",
    imageUrl,
    url,
}: ArticleJsonLdProps) {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: title,
        description: description,
        datePublished: datePublished,
        dateModified: dateModified || datePublished,
        author: {
            "@type": "Organization",
            name: authorName,
        },
        publisher: {
            "@type": "Organization",
            name: "Blueprint Ops",
            url: "https://midirectorioia.com",
        },
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `https://midirectorioia.com${url}`,
        },
        ...(imageUrl && {
            image: {
                "@type": "ImageObject",
                url: imageUrl,
            },
        }),
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
}

export function HowToJsonLd({
    name,
    description,
    steps,
    totalTime,
    estimatedCost,
    imageUrl,
    url,
}: HowToJsonLdProps) {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "HowTo",
        name: name,
        description: description,
        ...(totalTime && { totalTime }),
        ...(estimatedCost && {
            estimatedCost: {
                "@type": "MonetaryAmount",
                currency: "USD",
                value: estimatedCost.split(" ")[0],
            },
        }),
        ...(imageUrl && {
            image: {
                "@type": "ImageObject",
                url: imageUrl,
            },
        }),
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `https://midirectorioia.com${url}`,
        },
        step: steps.map((step, index) => ({
            "@type": "HowToStep",
            position: index + 1,
            name: step.name,
            text: step.text,
            ...(step.url && { url: step.url }),
        })),
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
}
