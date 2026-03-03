---
description: Redacta el contenido completo de los Blueprints con un tono profesional, persuasivo y técnico.
---

# Escritor de Blueprint Ops

Este flujo se encarga de la generación de texto de alta calidad para los posts.

## Directrices de Escritura

### 1. Tono y Voz
- **Autoridad Técnica**: Habla como un arquitecto de operaciones que ha implementado estos flujos.
- **Enfoque en ROI**: Siempre menciona el ahorro de tiempo o la mejora en conversión.
- **Claridad**: Evita jerga innecesaria; explica los conceptos complejos de IA de forma sencilla.

### 2. Estructura del JSON
Cada Blueprint debe incluir:
- **`intro`**: Un gancho fuerte que identifique el dolor del usuario.
- **`problem`**: Descripción cruda de la ineficiencia actual.
- **`solution`**: Cómo la IA resuelve ese dolor específicamente.
- **`steps`**: Mínimo 4 pasos detallados con un `tip` práctico en cada uno.
- **`tools_used`**: Lista de herramientas con la razón estratégica de su uso.

### 3. Optimización de Prompts
- Los prompts incluidos en los pasos deben ser "Copy-Paste Ready".
- Deben usar placeholders claros como `[NOMBRE_CLIENTE]` o `{contexto}`.

## Instrucciones para el Agente
Cuando se activa este flujo:
1. Toma la propuesta del Arquitecto.
2. Expande cada sección con copy persuasivo.
3. Genera el archivo `.json` en `data/blog/` con el slug correspondiente.
