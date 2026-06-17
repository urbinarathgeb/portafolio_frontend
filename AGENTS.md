# AGENTS.md — Frontend (Nuxt 4)

Este proyecto frontend debe ser desarrollado bajo los siguientes estándares estrictos.

## Stack y Configuración

* **Framework:** Nuxt 4 (Vue 3 + auto-imports + file-based routing).
* **UI:** @nuxt/ui v4 — solo para componentes funcionales (UButton, UModal, UDropdown, UContainer, UToast, etc.).
* **Estilos:** Tailwind CSS v4 (via `@import 'tailwindcss'` en `main.css`) + @nuxt/ui design tokens. Los componentes visuales/branding son **fully custom** con CSS y Tailwind directo. **Tailwind-first**: usar clases Tailwind en el template para todo lo posible; CSS scoped solo para lo que Tailwind no puede hacer.
* **Lenguaje:** TypeScript. Todo archivo nuevo usa `<script setup lang="ts">`.
* **Estado:** Composables Nuxt (`useState`) para estado simple. Pinia solo si se necesita store complejo.
* **HTTP:** `$fetch` nativo de Nuxt (useFetch / useAsyncData). No instalar Axios.
* **Gestor de paquetes:** pnpm.
* **Puerto de desarrollo:** Nuxt default (3000), configurable via `nuxt.config.ts`.
* **Variables de entorno:** Prefijo `NUXT_PUBLIC_` obligatorio (ej: `NUXT_PUBLIC_API_BASE`).

### Nota sobre Skills
Los archivos en `.agents/skills/` son material de referencia. En caso de conflicto, **AGENTS.md tiene prioridad**. Advertencias específicas:
* Los ejemplos de skills pueden usar JavaScript puro — **adaptar siempre a TypeScript**.
* Los ejemplos pueden usar PrimeVue — **adaptar siempre a @nuxt/ui**.
* Los ejemplos pueden usar Options API — **adaptar siempre a `<script setup lang="ts">`**.
* Los ejemplos pueden usar Axios — **adaptar siempre a `$fetch` / `useFetch`**.
* Las convenciones de naming en skills pueden diferir — **seguir las convenciones de este documento**.

---

## Reglas de Ejecución (CRÍTICO)

### 1. Política de Desarrollo Atómico (Nivel Máximo)

Para facilitar las revisiones, todo trabajo debe ser atómico:

* **Granularidad:** Nunca implementes múltiples tareas en un solo bloque. Si una feature tiene varios pasos, **ejecuta solo uno a la vez**.
* **Proceso:**
    1. Divide la tarea en pasos mínimos.
    2. Presenta el plan completo.
    3. Implementa **un solo paso**.
    4. Espera revisión antes de continuar.
* **Nota de Control:** Al finalizar cada paso atómico, siempre responder con:
  `[PASO COMPLETADO] - ¿Procedemos con el siguiente: [Nombre del siguiente paso]?`

### 2. Normas Generales

* **Zero-Install Policy:** Prohibido instalar dependencias (`pnpm add`) sin notificarlo primero y recibir confirmación explícita.
* **No Server Management:** Prohibido ejecutar `pnpm dev`, `pnpm preview`, matar procesos de puertos, o levantar/detener servidores. Solo leer y escribir archivos. El usuario maneja los servidores.
* **Skill Awareness:** Revisar `app/`, este archivo y las skills en `.agents/skills/` antes de cada cambio.
* **Skill First:** Antes de implementar una feature nueva (composables, layouts, vistas, etc.), revisar las skills disponibles para seguir los patrones recomendados.
* **Context Search:** Priorizar consistencia con archivos existentes. Si ya existe un patrón en el proyecto, seguirlo.
* **Trackeo Inmediato:** Cada vez que se crea un archivo nuevo, ejecutar `git add <archivo>` inmediatamente.
* **Documentación Viva:** Cada feature o cambio significativo debe reflejarse inmediatamente en `README.md`.
* **Language Bridge:**
    * Código (variables, funciones, rutas, nombres de archivo): **Inglés**.
    * Textos visibles en UI (labels, mensajes, placeholders): **Español**.
    * Mensajes de error y console logs: **Español**.

---

## Arquitectura en Capas (OBLIGATORIO)

Flujo de dependencias:

```
Page (Nuxt pages/) → Component → Composable (lógica reutilizable) → useFetch / $fetch
```

* **Pages** (`app/pages/**/*.vue`): Orquestan la UI. Usan `useFetch`/`useAsyncData` para datos del servidor. Nuxt genera las rutas automáticamente según la estructura de carpetas.
* **Components** (`app/components/**/*.vue`): Piezas reutilizables de UI. Reciben datos via props, emiten eventos. Nuxt los auto-importa por nombre. La mayoría son **fully custom** para el diseño del portfolio.
* **Composables** (`app/composables/use*.ts`): Lógica reutilizable con estado reactivo. Nuxt los auto-importa.
* **Layouts** (`app/layouts/*.vue`): Wrappers de página (navbar, footer, etc.). Se asignan via `definePageMeta({ layout: 'name' })`.
* **Server API** (`server/api/`): Si se necesita un proxy o endpoint propio, usar Nuxt server routes.

**Prohibido:** Un Component que use `useFetch` directamente para datos de dominio — esa lógica pertenece a un composable.
**Prohibido:** Construir URLs del backend API inline en componentes — centralizar en composables.

---

## @nuxt/ui vs Custom Components (Enfoque Híbrido Pragmático)

Este es un **portfolio a medida** con diseño propio (ver Figma). La regla es:

| Caso de uso |Qué usar | Ejemplo |
|---|---|---|
| Botones funcionales, inputs, modales, toasts, dropdowns | **@nuxt/ui** | `UButton`, `UModal`, `UDropdown`, `UNotification` |
| Layout wrappers | **@nuxt/ui** | `UApp`, `UContainer` |
| Hero sections, cards animadas, tipografía custom, gradientes | **Custom CSS + Tailwind** | `ProjectsNav`, `ProjectCard`, headings estilizados |
| Chips/badges con diseño propio | **Custom CSS + Tailwind** | Tech stack chips, status badges |
| Navegación a medida | **Custom CSS + Tailwind** | `ProjectsNav`, navbar personalizado |

**Regla de oro:** Si el diseño Figma muestra un componente que no coincide con el look de @nuxt/ui, es custom. Si es funcional y genérico (confirm, toast, input), es @nuxt/ui.

---

## Convenciones de Componentes

### Estructura obligatoria de un `.vue`

```vue
<script setup lang="ts">
// 1. imports (solo los que Nuxt NO auto-importa)
// 2. props / emits (con tipado TypeScript)
// 3. composables
// 4. estado local (ref, computed)
// 5. funciones y handlers
// 6. lifecycle hooks
</script>

<template>
  <!-- Una sola raíz o fragment -->
</template>

<style scoped>
/* Solo para efectos que Tailwind NO puede hacer:
   -webkit-text-stroke, gradientes complejos, @keyframes custom,
   color-mix(), backdrop-filter, pseudo-elementos complejos */
</style>
```

### Naming

| Elemento | Convención | Ejemplo |
|---|---|---|
| Archivos de componente | PascalCase | `ProjectCard.vue` |
| Archivos de página | kebab-case o index | `projects/index.vue`, `about.vue` |
| Archivos de layout | kebab-case | `default.vue`, `auth.vue` |
| Archivos de composable | camelCase + prefijo `use` | `useProjects.ts` |
| Directorios de componente | kebab-case (auto-nested) | `projects/nav/` → `<ProjectsNav>` |
| Props | camelCase en TS, kebab-case en template | `projectId` / `:project-id` |
| Emits | kebab-case | `@update:active-id` |

### Props y Emits (TypeScript)

```vue
<script setup lang="ts">
interface Props {
  projectId: number
  label?: string
}

const props = defineProps<Props>()
const emit = defineEmits<{
  select: [id: string]
  close: []
}>()
</script>
```

---

## Nuxt — Convenciones Específicas

### Auto-imports

Nuxt auto-importa componentes, composables y utilidades. **No importar manualmente lo que Nuxt ya resuelve:**

* Componentes en `app/components/` → se usan directamente en template sin import.
* Composables en `app/composables/` → se usan directamente sin import.
* Vue APIs (`ref`, `computed`, `watch`, etc.) → auto-importadas por Nuxt.
* Nuxt composables (`useFetch`, `useAsyncData`, `navigateTo`, etc.) → auto-importadas.

### Pages — File-based Routing

```
app/pages/
├── index.vue              → /        (Hero)
├── about.vue              → /about   (Sobre mí)
├── experience.vue          → /experience (Experiencia)
├── projects/
│   ├── index.vue          → /projects (Proyectos)
│   └── [slug].vue         → /projects/:slug (Detalle)
├── contact.vue             → /contact (Contacto)
└── error.vue              → /error   (Error)
```

* Usar `definePageMeta()` para asignar layout, middleware, etc.
* Navegar siempre con `navigateTo()` o `<NuxtLink>`, no con paths hardcodeados en`window.location`.

### Layouts

```vue
<!-- app/layouts/default.vue -->
<template>
  <div>
    <slot />
  </div>
</template>
```

Asignar en una page:
```vue
<script setup lang="ts">
definePageMeta({ layout: 'default' })
</script>
```

### Fetch de Datos

Usar los composables de Nuxt, nunca `fetch` directo en componentes:

```typescript
// app/composables/useProjects.ts
export const useProjects = () => {
  return useFetch<Project[]>('/api/projects', {
    lazy: false,
  })
}
```

* **`useFetch`**: Para datos que se necesitan al montar la página (SSR-friendly).
* **`useAsyncData`**: Cuando se necesita transformar datos o combinar múltiples fuentes.
* **`$fetch`**: Para mutaciones (POST, PUT, DELETE) dentro de handlers/eventos. No usar para datos iniciales.
* La URL base del backend se configura en `nuxt.config.ts` via `runtimeConfig.public.apiBase`.

### Loading States (SPA feel)

* **Sin spinners:** Las transiciones de página (`page` con `out-in` en `nuxt.config.ts`) "tapan" el tiempo de carga de `useFetch`. No agregar spinners ni loaders globales — la transición animada entre rutas es suficiente.
* **`lazy`:** Usar `lazy: true` para datos que no son críticos en SSR (la transición oculta la carga). Usar `lazy: false` solo cuando el contenido debe estar presente en el HTML inicial para SEO.
* **Estados visibles:** Solo `error` (toast + mensaje inline) y `empty` (contenido vacío, texto informativo). El `pending` se maneja implícitamente via transición de página.

---

## @nuxt/ui + Tailwind — Convivencia

* **@nuxt/ui:** Para componentes interactivos funcionales (botones, inputs, modales, toasts, dropdowns).
* **Tailwind:** Para layout, espaciado, grid, tipografía, y **todo el diseño visual del portfolio** (gradientes, animaciones, tipografía decorativa, cards a medida).
* Los colores del tema se definen en `app/assets/css/main.css` con `@theme static` y se mapean en `app/app.config.ts`.
* **Importante:** Las paletas de colores (primary, secondary, accent) DEBEN usar `@theme static` (no `@theme` solo) para que @nuxt/ui las resuelva correctamente en SSR.
* Los overrides de tema dark/light se hacen en `main.css` con selectores `.dark` y `.light` sobreescribiendo los tokens `--ui-*`.
* Usar las clases CSS de @nuxt/ui (`text-primary`, `bg-default`, `text-muted`, `text-highlighted`, `bg-elevated`, etc.) antes que colores hardcoded.
* Para customizar componentes @nuxt/ui, preferir el sistema de `ui` prop o app.config tokens antes que CSS externo.
* Para iconos, usar `<UIcon name="i-lucide-xxx" />` (incluido en @nuxt/ui). No usar SVGs inline salvo que el icono no exista en Lucide.

---

## Estilos: Tailwind-First (OBLIGATORIO)

### Regla principal
**Tailwind en el template, CSS scoped solo lo que Tailwind no puede.**

### Va en Tailwind (clases en el template)
- Layout: `flex`, `grid`, `items-*`, `justify-*`, `gap-*`
- Spacing: `p-*`, `m-*`, `w-*`, `h-*`, `max-w-*`
- Tipografía: `font-heading`, `text-*`, `font-*`, `tracking-*`, `uppercase`
- Colores: `text-primary`, `bg-default`, `text-muted`, `border-*`
- Responsive: `md:`, `lg:`, breakpoints
- Transiciones simples: `transition-all`, `duration-*`, `hover:*`, `group-hover:*`
- Display, position, overflow, z-index

### Va en CSS scoped (solo lo que Tailwind NO puede)
- `-webkit-text-stroke` (stroke text)
- Hover states complejos que cambian stroke + text-shadow + fill simultáneamente
- `color-mix()` para bordes con opacity variable
- Gradientes con paradas múltiples específicas (`.gradient-hero`, `.gradient-text`)
- `@keyframes` custom (animaciones de entrada, shimmer, pulse)
- `backdrop-filter`
- Filtros complejos (`filter: blur()`, `mix-blend-mode`)
- Pseudo-elementos complejos (`::before`, `::after` con content generado)
- Layouts con `clamp()` personalizados que requieren valores específicos por componente

### Ejemplo

```vue
<!-- ✅ Correcto: Tailwind en template, CSS solo para stroke text -->
<template>
  <div class="flex items-baseline justify-between py-12 border-b border-white/10 group">
    <span class="stroke-year-text">{{ year }}</span>
    <div class="flex flex-col gap-3">
      <h3 class="font-heading text-2xl font-bold uppercase tracking-tight text-highlighted">
        {{ role }}
      </h3>
    </div>
  </div>
</template>

<style scoped>
/* Solo stroke text — Tailwind no tiene utilidad para esto */
.stroke-year-text {
  -webkit-text-stroke: 1px var(--ui-text-muted);
  color: transparent;
}
</style>
```

```vue
<!-- ❌ Incorrecto: Todo en CSS scoped -->
<template>
  <div class="experience-row">
    <span class="year-text">{{ year }}</span>
  </div>
</template>

<style scoped>
.experience-row {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  padding: 3rem 0;
}
.year-text {
  font-family: var(--font-heading);
  font-size: 2.5rem;
  color: var(--ui-text-muted);
}
</style>
```

## Diseño — Tema y Paleta

### Tipografía

| Uso | Fuente | Variable CSS |
|---|---|---|
| Headings (H1-H6, títulos decorativos) | **Unbounded** | `var(--font-heading)` |
| Body, labels, chips, UI text | **DM Sans** | `var(--font-body)` |
| Labels técnicos y CTA | **DM Sans** (con tracking + uppercase) | `var(--font-mono)` |

Solo se usan **2 fuentes**: Unbounded y DM Sans. No agregar otras sin aprobación.

#### Escala tipográfica

| Uso | Tamaño | Kerning | Weight |
|---|---|---|---|
| Display Hero | `clamp(5rem, 18vw, 11rem)` | -0.04em | 900 |
| Headings (H1-H2) | `clamp(2.5rem, 8vw, 6rem)` | -0.02em | 700-800 |
| Body | 16-20px | normal | 400-500 |
| Labels mono | 12-14px | +0.1em a +0.3em | 500-700 |
| Stroke text decorativo | `clamp(5rem, 18vw, 11rem)` | -0.08em | 700, stroke only |

### Paleta de Colores

**Primary (magenta-pink `#E8366D`):** Acento principal del portfolio. Botones, links, highlights.
| Shade | Hex |
|---|---|
| 50 | `#FFF0F4` |
| 100 | `#FFE0EA` |
| 200 | `#FCC1D5` |
| 300 | `#F89BB8` |
| 400 | `#F26D95` |
| **500** | **`#E8366D`** |
| 600 | `#C42D5C` |
| 700 | `#A12248` |
| 800 | `#821A3B` |
| 900 | `#6B1430` |
| 950 | `#400A1C` |

**Secondary (coral `#F07575`):** Transiciones suaves, hover, estados intermedios.
| Shade | Hex |
|---|---|
| 50-400 | Degradados claros |
| **500** | **`#F07575`** |
| 600-950 | Degradados oscuros |

**Accent (ámbar-dorado `#FFAF02`):** CTAs, highlights, calidez.
| Shade | Hex |
|---|---|
| 50-400 | Degradados claros |
| **500** | **`#FFAF02`** |
| 600-950 | Degradados oscuros |

**Colores funcionales:** `success: emerald`, `warning: orange`, `error: red`, `info: sky`, `neutral: zinc` (base overrideada por tokens custom en ambos modos).

### Gradientes

| Utilidad | CSS | Uso |
|---|---|---|
| `.gradient-hero` | `radial-gradient(circle 921px at 94.2% 47.5%, #E8366D, #F07575, #F07575, #E8366D, #FFAF02)` | Background decorativo del hero |
| `.gradient-text` | `linear-gradient(164deg, primary-500 0%, primary-500 30%, secondary-500 60%, accent-500 100%)` | Texto con gradiente |
| `.gradient-text-shimmer` | Ídem + animación shimmer | Texto con efecto brillante |
| `.gradient-bg` | `linear-gradient(164deg, primary-500 0%, primary-500 30%, secondary-500 60%, accent-500 100%)` | Background con gradiente |
| `.gradient-divider` | `linear-gradient(177deg, primary-500 0%, secondary-500 60%, accent-500 100%)` | Línea divisora decorativa |
| `.stroke-text` | `color: transparent; -webkit-text-stroke: 1px var(--ui-text-muted)` | Texto decorativo outline de fondo |
| `.glow-shadow-primary` | `box-shadow: 0 0 40px rgba(232, 54, 109, 0.4)` | Glow shadow magenta para CTAs |
| `.glow-shadow-secondary` | `box-shadow: 0 0 30px rgba(240, 117, 117, 0.3)` | Glow shadow coral |
| `.glow-shadow-accent` | `box-shadow: 0 0 30px rgba(255, 175, 2, 0.3)` | Glow shadow ámbar |

### Modo Oscuro / Modo Claro

* **Light mode por defecto** — `colorMode.preference: 'light'`.
* Los tokens `--ui-*` se sobreescriben en `.dark` y `.light` en `main.css` con valores del diseño Figma.
* Dark: fondo `#0A0A0A`, texto destacado `#E5E2E1`, bordes `rgba(255,255,255,0.1)`.
* Light: fondo `#FAFAFA`, texto destacado `#0A0A0A`, bordes `#E5E5E5`.
* Usar clases semánticas de @nuxt/ui (`text-primary`, `bg-default`, `text-muted`, etc.) — los overrides de tema garantizan los colores correctos en ambos modos.
* Gradient utilities funcionan en ambos modos.
* Toggle de tema: componente `ThemeToggle.vue` ya implementado, usa `useColorMode()` de @nuxt/ui.

### Reglas de color

1. **Nunca** usar colores hardcoded en componentes — usar tokens (`text-primary`, `bg-default`) o clases CSS custom (`.gradient-text`).
2. El gradiente hero es decorativo y selectivo — no saturar la UI.
3. Primary para acentos principales, Secondary para transiciones, Accent para CTAs y highlights cálidos.

---

## Estructura de Proyecto

```
app/
├── assets/
│   └── css/
│       └── main.css          # Tailwind v4 + tema + keyframes + utilidades CSS
├── components/               # Auto-importados por Nuxt
│   ├── SiteFooter.vue        # Footer fijo con navegación principal
│   ├── SocialLinks.vue       # Íconos flotantes GITHUB + LINKEDIN
│   ├── ThemeToggle.vue       # Toggle de tema (light/dark)
│   └── [feature]/            # Agrupar por feature
├── composables/              # use*.ts — auto-importados
├── layouts/                  # default.vue, etc.
├── pages/                    # File-based routing
│   └── *.vue
├── app.config.ts             # Configuración de tema @nuxt/ui
├── app.vue                   # Raíz: UApp + NuxtPage
public/
├── images/                   # Imágenes estáticas (SVGs, PNGs)
server/                       # Server routes (si se necesita proxy)
├── api/
│   └── *.ts                  # Nuxt server API routes
nuxt.config.ts                # Configuración de Nuxt
```

---

## Configuración de Nuxt (`nuxt.config.ts`)

```typescript
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/ui'],
  css: ['~/assets/css/main.css'],
  ui: {
    theme: {
      colors: ['primary', 'secondary', 'accent', 'success', 'info', 'warning', 'error'],
    },
  },
  colorMode: {
    preference: 'light',
    fallback: 'light',
  },
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:3001',
    },
  },
})
```

* Variables de entorno públicas: prefijo `NUXT_PUBLIC_` (ej: `NUXT_PUBLIC_API_BASE`).
* Acceder en código via `useRuntimeConfig().public.apiBase`.

---

## Variables de Entorno

| Variable | Descripción | Ejemplo |
|---|---|---|
| `NUXT_PUBLIC_API_BASE` | URL base de la API backend | `http://localhost:3001` |

* Acceder siempre via `useRuntimeConfig().public.*`. Nunca `process.env` directo en componentes.
* El backend corre en puerto `3001` (Express + Sequelize + PostgreSQL).
* Documentar toda variable nueva en `.env.example` y en `README.md`.

---

## Manejo de Errores

### En composables con useFetch

```typescript
const { data, error, status } = await useFetch('/api/projects')
// error.value contiene el error si falla
// status.value: 'idle' | 'pending' | 'error' | 'success'
```

### En componentes

* Mostrar feedback visual usando `error` del composable + componentes @nuxt/ui (`UNotification`, `UAlert`, etc.).
* Para errores globales, usar `useToast()` de @nuxt/ui.

### Clase de error custom (si se necesita)

```typescript
// app/utils/errors.ts
export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public data: Record<string, unknown> = {},
  ) {
    super(message)
    this.name = 'ApiError'
  }
}
```

---

## Diseño — Referencia Figma

El diseño del portfolio está en Figma. Características principales del diseño:

* **Temática:** Portfolio personal estilo editorial/brutalista con toques atmosféricos.
* **Navegación:** Footer fijo bottom-right con links de navegación (INICIO · SOBRE MÍ · PROYECTOS · EXPERIENCIA · CONTACTO). SocialLinks flotantes verticales a la derecha (GITHUB + LINKEDIN). Sin navbar sticky.
* **Hero:** Layout asimétrico con contenido alineado a la izquierda. Stroke text decorativo de fondo ("DEVELOPER") en opacity 5%. Glow radial atmosférico top-right. H1 display agresivo (`clamp(5rem, 18vw, 11rem)`) con kerning `-0.04em`. Badge minimalista: dot animado + "DISPONIBLE" uppercase tracking. CTA primario con glow shadow en hover. CTA secundario tipo link con flecha animada. Descripción corta en esquina inferior derecha.
* **About:** Card geométrica decorativa, stats (3+ años, 15+ proyectos, Open to work), personality chips.
* **Projects:** Cards detalladas con tech stack, descripciones, links (Código/Demo), badges de categoría. Navigation lateral izquierda con números (ProjectsNav).
* **Experience:** Timeline vertical con años en stroke text gigante (opacity 5% de fondo). Cada fila: año (stroke text) + cargo (uppercase) + empresa/ubicación (mono, primary) + descripción breve + tech chips (hover-only en desktop).
* **Technologies:** Sección con categorías de tecnologías.
* **Contact:** Formulario + redes sociales + ubicación.
* **Animaciones:** 3-4 stagger entries máximo por sección. Transiciones suaves, hover effects, fade-ups.
* **Efectos interactivos:** Stroke text decorativo en el fondo del hero (nombre del rol o categoría). Opacidad 5-10%. No interferir con lectura.
* **Tipografía:** Unbounded (headings), DM Sans (body + labels).
* **Colores custom:** Primary (#E8366D magenta), Secondary (#F07575 coral), Accent (#FFAF02 ámbar).

Al implementar componentes visuales, priorizar fidelidad al diseño Figma. La mayoría de componentes serán **fully custom**.

### Navegación

* **SiteFooter.vue:** Footer fijo bottom-right con links de navegación principal (INICIO · SOBRE MÍ · PROYECTOS · EXPERIENCIA · CONTACTO). Estilo editorial: uppercase, tracking amplio, hover con underline animado. Sin copyright, sin redes sociales.
* **SocialLinks.vue:** Íconos flotantes verticales (GITHUB + LINKEDIN) posicionados a la derecha de pantalla (`right: 5vw; top: 50%; transform: translateY(-50%)`). Líneas decorativas arriba y abajo. Hover con translateY y color primary.
* **ThemeToggle.vue:** Botón circular fijo bottom-right para toggle de tema.
* **SectionLabel.vue:** Label fijo bottom-left que muestra el nombre de la sección actual según la ruta. Monospace, uppercase, tracking wide, muted. Oculto en Hero (`/`). Mapeo: `/about` → "SOBRE MÍ", `/projects` → "PROYECTOS", `/projects/[slug]` → "PROYECTO", `/experience` → "EXPERIENCIA", `/technologies` → "STACK", `/contact` → "CONTACTO".
* **Sin navbar sticky:** El sitio usa scroll normal con páginas separadas. La navegación principal está en el footer fijo.

### Stroke Text Pattern

Cada sección (excepto Hero) tiene su palabra repetida **3 veces verticalmente** con opacidad descendente, posicionada en el lado derecho:
- 1ª: `opacity-[0.05]`
- 2ª: `opacity-[0.025]`
- 3ª: `opacity-[0.01]`

Las 3 instancias están ligeramente desplazadas verticalmente (`-mt-[0.3em]`), creando un efecto de cascada diagonal sutil. `pointer-events-none`, `select-none`.

**Palabras por sección:**
- Experience → "EXPERIENCIA"
- Technologies → "STACK"
- About → "SOBRE MÍ"
- Projects → "PROYECTOS"
- Contact → "CONTACTO"

### Eliminación de H1 Headers

Las secciones ya no tienen H1 headers grandes con label + gradient title + divider. En su lugar:
- **SectionLabel** (fijo bottom-left) identifica la sección
- **Stroke text pattern** (lado derecho) proporciona identidad visual
- El contenido principal comienza inmediatamente, ganando ~200px de espacio vertical

### Hero

* **Layout:** Full-screen (`min-h-screen`) con contenido alineado a la izquierda (`padding: 0 5vw`).
* **Stroke text de fondo:** Texto decorativo ("DEVELOPER") posicionado absolute center, font-heading, `clamp(5rem, 18vw, 11rem)`, kerning `-0.08em`, opacity 5%. No interferir con lectura.
* **Glow radial:** Div decorativo con gradiente radial atmosférico top-right. Colores: primary → secondary → accent. `filter: blur(60px)`.
* **H1:** `"HOLA,\nSOY KAKO"` en font-heading, `clamp(5rem, 18vw, 11rem)`, weight 900, kerning `-0.04em`, line-height 0.85. "KAKO" con `.gradient-text`.
* **Badge:** Dot animado (pulse) + "DISPONIBLE" uppercase tracking 0.2em. Sin pill background excesivo.
* **CTA primario:** Botón custom con bg-primary, uppercase tracking, hover con `.glow-shadow-primary` + translateY(-2px).
* **CTA secundario:** Link estilizado "CONOCER MÁS →" con flecha animada (translateX en hover).
* **Descripción:** Texto corto absoluto bottom-right (`bottom: 6rem; right: 5vw`), max-width 320px, text-align right. Oculto en mobile.
* **Animaciones:** 4 stagger entries (badge 0.1s, title 0.25s, actions 0.45s, description 0.65s).
* **Sin tech chips:** Las tecnologías van en la sección About, no en el Hero.

---

## Convenciones de Git

* **Commits y push: solo cuando el usuario lo solicite explícitamente.**
* Formato: `<tipo>: <descripción en español>`. Tipos: `feat`, `fix`, `chore`, `docs`, `refactor`, `style`.
* Trackear archivos nuevos con `git add <archivo>` inmediatamente al crearlos.
* Para commits agrupados, usar el comando `/autocommit` cuando el usuario lo indique.

---

## Comandos Útiles

* `pnpm dev`: Servidor de desarrollo con HMR.
* `pnpm build`: Build de producción.
* `pnpm generate`: Generar sitio estático (SSG).
* `pnpm preview`: Preview del build de producción.
