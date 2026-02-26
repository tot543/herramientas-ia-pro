export interface Tool {
    tool_id: string;
    nombre: string;
    slug: string;
    categoria: string;
    caso_uso: string;
    precio_desde: string;
    modelo_pagos: string;
    idioma: string;
    nivel_usuario: string;
    url_oficial: string;
    url_afiliado: string;
    pros: string[];
    contras: string[];
    mejor_para: string;
    ideal_para: string;
    no_es_para: string;
    criterios_eleccion: string[];
    descripcion: string;
}

export interface Comparison {
    slug: string;
    tipo_pagina: "vs" | "alternativa" | "mejores";
    keyword_objetivo: string;
    tool_a_id: string;
    tool_b_id: string;
    categoria: string;
    caso_uso: string;
    ganador_general?: string;
    diferencia_principal?: string;
    mejor_para_tool_a?: string;
    mejor_para_tool_b?: string;
}

export interface SiteConfig {
    siteName: string;
    siteDescription: string;
    categorias: Array<{
        slug: string;
        nombre: string;
        descripcion: string;
        icon: string;
    }>;
    mejoresPaginas: Array<{
        slug: string;
        titulo: string;
    }>;
}
