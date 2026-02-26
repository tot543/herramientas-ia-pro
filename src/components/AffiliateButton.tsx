import { Tool } from "@/types";

interface AffiliateButtonProps {
    tool: Tool;
    text?: string;
    size?: "sm" | "md" | "lg";
    variant?: "primary" | "secondary" | "outline";
    className?: string;
}

export default function AffiliateButton({
    tool,
    text,
    size = "md",
    variant = "primary",
    className = "",
}: AffiliateButtonProps) {
    const url = tool.url_afiliado || tool.url_oficial;
    const label = text || `Probar ${tool.nombre} →`;

    const sizeClasses = {
        sm: "px-4 py-2 text-sm",
        md: "px-6 py-3 text-base",
        lg: "px-8 py-4 text-lg",
    };

    const variantClasses = {
        primary:
            "bg-indigo-600 text-white hover:bg-indigo-700 shadow-md hover:shadow-lg",
        secondary:
            "bg-violet-600 text-white hover:bg-violet-700 shadow-md hover:shadow-lg",
        outline:
            "border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50",
    };

    return (
        <a
            href={url}
            target="_blank"
            rel="sponsored nofollow noopener noreferrer"
            className={`
        inline-flex items-center justify-center gap-2 font-semibold rounded-xl
        transition-all duration-200 cursor-pointer
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${className}
      `}
            aria-label={`Ir al sitio oficial de ${tool.nombre}`}
        >
            {label}
        </a>
    );
}

// Variante de texto (inline link de afiliado)
export function AffiliateTextLink({
    tool,
    text,
}: {
    tool: Tool;
    text?: string;
}) {
    const url = tool.url_afiliado || tool.url_oficial;
    const label = text || tool.nombre;

    return (
        <a
            href={url}
            target="_blank"
            rel="sponsored nofollow noopener noreferrer"
            className="text-indigo-600 hover:text-indigo-800 underline font-medium"
            aria-label={`Ir al sitio oficial de ${tool.nombre}`}
        >
            {label}
        </a>
    );
}
