# AGENTS.md — Frontend (Nuxt 4)

Este proyecto frontend debe ser desarrollado bajo los siguientes estándares estrictos.

## Stack y Configuración

* **Framework:** Nuxt 4 (Vue 3 + auto-imports + file-based routing).
* **UI:** @nuxt/ui v4 — solo para componentes funcionales (UButton, UModal, UDropdown, UContainer, UToast, etc.).
* **Estilos:** Tailwind CSS v4 (via `@import 'tailwindcss'` en `main.css`) + @nuxt/ui design tokens. Los componentes visuales/branding son **fully custom** con CSS y Tailwind directo.
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
/* Solo si no alcanza con Tailwind + @nuxt/ui */
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
├── index.vue              → /
├── about.vue              → /about
└── projects/
    ├── index.vue          → /projects
    └── [slug].vue         → /projects/:slug
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

## Diseño — Tema y Paleta

### Tipografía

| Uso | Fuente | Variable CSS |
|---|---|---|
| Headings (H1-H6, títulos decorativos) | **Unbounded** | `var(--font-heading)` |
| Body, labels, chips, UI text | **DM Sans** | `var(--font-body)` |
| Labels técnicos y CTA | **DM Sans** (con tracking + uppercase) | `var(--font-mono)` |

Solo se usan **2 fuentes**: Unbounded y DM Sans. No agregar otras sin aprobación.

### Paleta de Colores

**Primary (magenta-pink `#F31F73`):** Acento principal del portfolio. Botones, links, highlights.
| Shade | Hex |
|---|---|
| 50 | `#FFF0F7` |
| 100 | `#FFE2EE` |
| 200 | `#FCC5DA` |
| 300 | `#F89AB8` |
| 400 | `#F26094` |
| **500** | **`#F31F73`** |
| 600 | `#CF1560` |
| 700 | `#AB0F4F` |
| 800 | `#8A0B40` |
| 900 | `#6E0733` |
| 950 | `#400319` |

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
| `.gradient-hero` | `radial-gradient(circle 921px at 94.2% 47.5%, #F31F73, #F07575, #F07575, #F31F73, #FFAF02)` | Background decorativo del hero |
| `.gradient-text` | `linear-gradient(164deg, primary-500, accent-500)` | Texto con gradiente |
| `.gradient-text-shimmer` | Ídem + animación shimmer | Texto con efecto brillante |
| `.gradient-bg` | `linear-gradient(164deg, primary-500, accent-500)` | Background con gradiente |
| `.gradient-divider` | `linear-gradient(177deg, primary-500, accent-500)` | Línea divisora decorativa |

### Modo Oscuro / Modo Claro

* **Dark mode por defecto** — `colorMode.preference: 'dark'`.
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
    preference: 'dark',
    fallback: 'dark',
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

* **Temática:** Portfolio personal estilo editorial/brutalista, fondo oscuro con acento magenta/rosado.
* **Navegación:** Sin navbar sticky. Sitio non-scroll con secciones full-screen y transiciones animadas entre ellas.
* **Hero:** Tipografía grande ("Hola, soy **Kako.**"), badge de disponibilidad, tech chips, CTAs.
* **About:** Card geométrica decorativa, stats (3+ años, 15+ proyectos, Open to work), personality chips.
* **Projects:** Cards detalladas con tech stack, descripciones, links (Código/Demo), badges de categoría.
* **Animaciones:** Transiciones suaves, hover effects, fade-ups.
* **Tipografía:** Unbounded (headings), DM Sans (body + labels).
* **Colores custom:** Primary (#F31F73 magenta), Secondary (#F07575 coral), Accent (#FFAF02 ámbar).

Al implementar componentes visuales, priorizar fidelidad al diseño Figma. La mayoría de componentes serán **fully custom**.

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
