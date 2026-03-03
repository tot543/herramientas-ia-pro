---
description: Revisa la calidad técnica, SEO y operativa de un Blueprint o sección del sitio.
---

# Auditor de Blueprint Ops

Este flujo debe ejecutarse antes de cada deploy importante o semanalmente como mantenimiento.

## Checklist de Auditoría

### 1. Validación Técnica y SEO
- [ ] **JSON-LD**: Pasar la URL por el validador de Schema.org. Debe detectar `Article` y `HowTo`.
- [ ] **Metadatos**: `title` < 60 chars, `description` < 160 chars.
- [ ] **Canonical**: Verificar que la URL canónica es correcta.
- [ ] **Alt Tags**: Todas las imágenes generadas deben tener descriptores `alt`.

### 2. Calidad del Contenido (Blueprint)
- [ ] **El Problema**: ¿Es un dolor real de Operaciones/RRHH?
- [ ] **La Solución**: ¿El flujo propuesto resuelve el problema de forma lógica?
- [ ] **Pasos**: ¿Son reproducibles? ¿Falta algún detalle técnico?
- [ ] **Prompts**: ¿Tienen el formato `CodeBlock` y son fáciles de copiar?

### 3. Monetización y Enlaces
- [ ] **Etiqeutado de Afiliados**: Todos los enlaces externos a herramientas deben tener `rel="sponsored nofollow"`.
- [ ] **Newsletter CTA**: ¿La descripción de la caja de suscripción está personalizada para el post?

## Instrucciones para el Agente
Cuando se activa este workflow, el agente debe:
1. Leer el archivo JSON del blueprint.
2. Simular/Verificar la renderización en el componente `[slug]/page.tsx`.
3. Reportar hallazgos en un nuevo archivo `audit_report_[fecha].md`.
