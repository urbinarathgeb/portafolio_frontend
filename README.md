# Portfolio Frontend

Portfolio personal desarrollado con Nuxt 4, @nuxt/ui v4 y Tailwind CSS v4. El contenido vive en el repo (`app/data`), está validado con Zod y el sitio se genera como HTML estático (SSG) en el build.

## Stack Tecnológico

- **Framework:** Nuxt 4 (Vue 3 + auto-imports + file-based routing)
- **UI:** @nuxt/ui v4
- **Estilos:** Tailwind CSS v4 con `@theme static` (emisión forzada de tokens para SSR)
- **Contenido:** archivos TypeScript en `app/data`, validados con Zod en cada build
- **Render:** SSG (prerender de todas las rutas públicas)
- **Imágenes:** @nuxt/image, con los archivos en `public/images`
- **SEO:** `useSeoMeta` (por página) + `@nuxtjs/sitemap` v8
- **Calidad:** ESLint (`@nuxt/eslint`) + `nuxt typecheck` (vue-tsc) + CI en GitHub Actions
- **Lenguaje:** TypeScript
- **Gestor de paquetes:** pnpm
- **Node:** 22 (fijado en `.nvmrc`)

## Prerequisitos

- Node.js 22+
- pnpm 9+

## Instalación

```bash
pnpm install
```

## Desarrollo

```bash
pnpm dev
```

Servidor disponible en `http://localhost:3000`. No necesita ningún backend: todo el contenido sale de `app/data`.

## Scripts

```bash
pnpm dev         # Servidor de desarrollo
pnpm build       # Build de producción (valida el contenido y prerenderiza)
pnpm lint        # ESLint
pnpm lint:fix    # ESLint con autofix
pnpm typecheck   # Chequeo de tipos (vue-tsc)
pnpm analyze     # Build + bundle analyzer
```

## Contenido

Todo el contenido del sitio está en `app/data`:

| Archivo | Contenido |
|---|---|
| `profile.ts` | Perfil: nombre, título, bio, disponibilidad |
| `projects.ts` | Proyectos, con su caso de estudio |
| `experience.ts` | Experiencia |
| `technologies.ts` | Tecnologías del stack |
| `schemas.ts` | Schemas Zod de cada tipo (los tipos se derivan con `z.infer`) |
| `validate.ts` | Validación de todo el contenido |

**Para editar el sitio**, se modifica el archivo correspondiente y se hace deploy. `validateContent()` corre en el hook `build:before` de `nuxt.config.ts`: si un dato no cumple su schema (por ejemplo, una URL inválida) o hay un id o slug repetido, el build falla y dice exactamente qué campo está mal. Zod solo se usa en el build y no llega al bundle del cliente.

Las imágenes de los proyectos van en `public/images/projects/<slug>/`.

Los composables (`useProfile`, `useProjects` / `useProject`, `useExperience`, `useTechnologies`) leen de `app/data`.

## Rutas

| Ruta | Sección |
|---|---|
| `/` | Hero |
| `/about` | Sobre mí |
| `/projects` | Proyectos (navegación lateral y spotlight) |
| `/projects/:id` | Detalle de proyecto + caso de estudio |
| `/experience` | Experiencia |
| `/technologies` | Stack |
| `/contact` | Formulario de contacto |

Todas se prerenderizan en el build. Las rutas `/projects/:id` se generan a partir de `app/data/projects.ts`.

## Estructura del Proyecto

```
server/
└── api/
    └── contacts.post.ts     # Formulario de contacto (temporal: reenvía al backend)
app/
├── assets/css/              # Tailwind + tema + gradientes + utilities + keyframes
├── components/              # Componentes Vue (auto-importados)
│   ├── ProjectCard.vue      # Card spotlight de proyecto
│   ├── ProjectsNav.vue      # Navegación lateral con números
│   ├── SectionLabel.vue     # Label fijo bottom-left de sección actual
│   ├── SiteFooter.vue       # Footer fijo con navegación principal
│   ├── SocialLinks.vue      # Íconos flotantes GitHub + LinkedIn
│   ├── StrokeText.vue       # Texto decorativo stroke (fondo de sección)
│   ├── ThemeToggle.vue      # Toggle de tema light/dark
│   ├── experience/          # ExperienceTimeline, ExperienceCard
│   └── technologies/        # TechnologyCard
├── composables/             # Acceso al contenido + formulario de contacto
├── data/                    # Contenido del sitio + schemas + validación
├── layouts/
│   └── default.vue          # Slot + footer + socials + theme toggle + section label
├── pages/                   # Rutas públicas
├── plugins/
│   └── error-handler.ts     # Captura global de errores
├── app.config.ts            # Configuración de tema @nuxt/ui
├── app.vue                  # Raíz (UApp + NuxtLayout + NuxtPage)
└── error.vue                # Página de error global (404/500)
```

## Sistema de Diseño

### Tipografía

- **Unbounded:** Headings y títulos decorativos
- **DM Sans:** Body, labels, UI text
- **Space Grotesk:** Stroke text decorativo (weight 700)

### Paleta de Colores

- **Primary (#E8366D):** Magenta-pink — acentos principales
- **Secondary (#F07575):** Coral — transiciones y hover
- **Accent (#FFAF02):** Ámbar-dorado — CTAs y highlights

### `@theme static`

El proyecto usa `@theme static` en `main.css` en lugar de `@theme`. Esto fuerza la emisión de todos los tokens de color en el CSS, necesario porque @nuxt/ui resuelve las clases (`text-primary`, `bg-default`) en runtime. Sin `@theme static`, Tailwind purga los tokens que no detecta estáticamente, causando flicker en SSR.

### Modo Oscuro/Claro

Light mode por defecto. Toggle disponible en todas las páginas vía `ThemeToggle.vue`. Los overrides de tema se definen en `main.css` con selectores `.dark` y `.light`.

## Despliegue

### Vercel

- **Build:** `nuxt build` con el preset `vercel`. Las páginas públicas salen como HTML estático; la única función propia es `/api/contacts`.
- **`vercel.json`:** security headers (CSP, HSTS, X-Frame-Options, etc.) + cache control para imágenes.
- **Variables de entorno:** no hace falta ninguna. `NUXT_PUBLIC_API_BASE` usa por defecto `/api`.

### CI

`.github/workflows/ci.yml` corre `lint` → `typecheck` → `build` en cada PR y en cada push a `main`. El deploy lo hace Vercel mediante su integración con GitHub.

## Licencia

Privado
