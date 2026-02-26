# HerramientasIA Pro — Sitio Comparativo de IA

Sitio web estático en español para comparar herramientas de IA y SaaS dirigido a creadores de contenido hispanohablantes. Construido con **Next.js 14**, **Tailwind CSS** y exportación estática para despliegue en Netlify o Vercel.

---

## 🗂 Estructura del proyecto

```text
├── data/               # Archivos CSV con los datos de herramientas y comparativas
│   ├── tools.csv          ← Herramientas (fuente de verdad)
│   ├── comparisons.csv    ← Pares de comparación y tipos de página
│   ├── tools.json         ← Generado por el script (no editar)
│   ├── comparisons.json   ← Generado por el script (no editar)
│   └── generated/         ← Reportes del script de generación
├── public/             # Archivos estáticos
│   └── robots.txt
├── scripts/            # Scripts de utilidad (generación de páginas, etc.)
│   └── generate-pages.js  ← Script de generación programática
├── site.config.js          ← Configuración global del sitio
├── next-sitemap.config.js  ← Config del sitemap.xml
└── src/
    ├── app/
    │   ├── page.tsx                       → /  (Home)
    │   ├── layout.tsx                     → Layout raíz
    │   ├── categoria/[slug]/page.tsx      → /categoria/:slug/
    │   ├── comparativas/[slug]/page.tsx   → /comparativas/:slug/  (X vs Y)
    │   ├── alternativas/[slug]/page.tsx   → /alternativas/:slug/
    │   ├── mejores/[slug]/page.tsx        → /mejores/:slug/
    │   └── aviso-afiliados/page.tsx       → /aviso-afiliados/
    ├── components/
    │   ├── Header.tsx
    │   ├── Footer.tsx
    │   ├── AffiliateButton.tsx  ← CTA con rel="nofollow sponsored"
    │   ├── ToolCard.tsx
    │   ├── ComparisonTable.tsx
    │   ├── ProsConsList.tsx
    │   └── InternalLinks.tsx
    └── lib/
        └── data.ts              ← Utilidades para leer CSV
```

---

## ⚡ Instalación y uso local

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar servidor de desarrollo
npm run dev
# → Abre http://localhost:3000
```

---

## 📊 Cómo añadir nuevas herramientas y comparaciones

### 1. Editar `data/tools.csv`

Añade una fila por cada nueva herramienta. Los campos separados por `;` son:

| Campo | Descripción | Separador |
|---|---|---|
| `tool_id` | ID único en minúsculas con guiones | — |
| `nombre` | Nombre de la herramienta | — |
| `slug` | URL-friendly del nombre | — |
| `categoria` | Slug de categoría definida en `site.config.js` | — |
| `caso_uso` | Texto descriptivo del uso principal | — |
| `precio_desde` | Número (en €) | — |
| `modelo_pagos` | `mensual`, `anual`, `freemium`, `único` | — |
| `idioma` | Idiomas soportados | — |
| `nivel_usuario` | `Principiante`, `Intermedio`, `Avanzado` | — |
| `url_oficial` | URL sin afiliado | — |
| `url_afiliado` | URL con tu código de afiliado | — |
| `pros` | Lista de ventajas | `;` |
| `contras` | Lista de desventajas | `;` |
| `mejor_para` | Descripción del perfil ideal | — |
| `descripcion` | Texto resumen (1-2 frases) | — |

### 2. Editar `data/comparisons.csv`

Añade una fila por cada página de comparación:

| Campo | Descripción | Valores posibles |
|---|---|---|
| `slug` | URL de la página (en español) | `herramienta-a-vs-herramienta-b` |
| `tipo_pagina` | Tipo de landing page | `vs`, `alternativa`, `mejores` |
| `keyword_objetivo` | Keyword principal en español | — |
| `tool_a_id` | ID de la herramienta A | Debe existir en tools.csv |
| `tool_b_id` | ID de la herramienta B (solo en `vs`) | Debe existir en tools.csv |
| `categoria` | Slug de categoría | Debe existir en site.config.js |
| `caso_uso` | Texto del caso de uso | — |

### 3. Ejecutar el script de generación

```bash
node scripts/generate-pages.js
# → Valida datos, genera tools.json y comparisons.json
# → Muestra un reporte de las páginas que se crearán
```

---

## 🔨 Build y despliegue estático

```bash
# Generar + construir + sitemap en un solo comando
npm run generate:build

# O separado:
npm run generate    # Lee CSVs y valida datos
npm run build       # Next.js build + sitemap.xml
```

El directorio de salida es `/out`. Sube su contenido a Netlify o Vercel.

---

## 🚀 Despliegue en Netlify

1. Conecta el repositorio en [Netlify](https://app.netlify.com).
2. Configura:
   - **Build command**: `npm run generate:build`
   - **Publish directory**: `out`
3. Añade la variable de entorno:
   - `NEXT_PUBLIC_SITE_URL` = `https://tu-dominio.com`
4. Activa deploys automáticos al hacer push a `main`.

## 🚀 Despliegue en Vercel

1. Importa el repositorio en [Vercel](https://vercel.com).
2. Framework preset: **Next.js**
3. Build command: `npm run generate:build`
4. Output directory: `out`
5. Variable de entorno: `NEXT_PUBLIC_SITE_URL`

---

## ⚙️ Configuración del sitio

Edita `site.config.js` para personalizar:
- Nombre y URL del sitio
- Categorías disponibles
- Texto del aviso de afiliados
- URL de las páginas de dinero destacadas

---

## 📋 Estructura de URLs (slugs en español)

| Tipo | URL |
|---|---|
| Home | `/` |
| Categoría | `/categoria/ia-para-escritura/` |
| X vs Y | `/comparativas/herramienta-a-vs-herramienta-b/` |
| Alternativa | `/alternativas/alternativa-a-herramienta-x/` |
| Mejores | `/mejores/mejores-ia-escritura-bloggers/` |
| Aviso afiliados | `/aviso-afiliados/` |
