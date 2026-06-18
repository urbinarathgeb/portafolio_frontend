# Portfolio Frontend

Portfolio personal desarrollado con Nuxt 4, @nuxt/ui v4 y Tailwind CSS v4. Incluye panel admin protegido con JWT. Consume una API REST construida con Express + Sequelize + PostgreSQL (ver `back/`).

## Stack Tecnológico

- **Framework:** Nuxt 4 (Vue 3 + auto-imports + file-based routing)
- **UI:** @nuxt/ui v4
- **Estilos:** Tailwind CSS v4 con `@theme static` (emisión forzada de tokens para SSR)
- **Estado:** Composables Nuxt (`useState`) — sin Pinia
- **Imágenes:** @nuxt/image (optimización automática)
- **SEO:** `useSeoMeta` (dinámico por página)
- **Lenguaje:** TypeScript
- **HTTP:** `useFetch` / `$fetch` (nativo Nuxt)
- **Auth:** JWT via cookie
- **Gestor de paquetes:** pnpm

## Prerequisitos

- Node.js 18+
- pnpm 9+
- Backend API corriendo (ver `back/README.md`)

## Instalación

```bash
pnpm install
```

## Configuración

Copiar `.env.example` a `.env` y ajustar las variables:

```bash
cp .env.example .env
```

Variables de entorno disponibles:

| Variable | Descripción | Default |
|---|---|---|
| `NUXT_PUBLIC_API_BASE` | URL base de la API backend | `http://localhost:3001` |

## Desarrollo

```bash
pnpm dev
```

Servidor disponible en `http://localhost:3000`. El backend debe estar corriendo en `http://localhost:3001`.

## Build

```bash
pnpm build       # Build de producción
pnpm generate    # Generar sitio estático (SSG)
pnpm preview     # Preview del build
```

## API — Endpoints Públicos

| Método | Endpoint | Uso | Composable |
|---|---|---|---|
| `GET` | `/profile` | Perfil (Hero + About) | `useProfile` |
| `GET` | `/projects` | Lista de proyectos | `useProjects` |
| `GET` | `/projects/:id` | Detalle de proyecto | `useProject` |
| `GET` | `/technologies?stack=true` | Tecnologías del stack | `useTechnologies` |
| `GET` | `/experiences` | Línea de tiempo | `useExperience` |
| `POST` | `/contacts` | Formulario de contacto | `useContact` |

Todas las rutas públicas no requieren autenticación.

## Panel Admin

Rutas protegidas bajo `/admin/*` con autenticación JWT. Middleware en `app/middleware/auth.ts` redirige a `/admin/login` si no hay token válido.

### Login

`/admin/login` — formulario de autenticación. El token JWT se almacena en una cookie (`auth-token`) y se envía como `Authorization: Bearer <token>` en cada request.

### Dashboard

`/admin` — resumen con cards de métricas via `useAdminStats`.

### CRUDs

| Sección | Rutas | Composable |
|---|---|---|
| Proyectos | `/admin/projects`, `/admin/projects/create`, `/admin/projects/[id]` | `useAdminProjects` |
| Experiencias | `/admin/experiences`, `/admin/experiences/create`, `/admin/experiences/[id]` | `useAdminExperiences` |
| Tecnologías | `/admin/technologies`, `/admin/technologies/create`, `/admin/technologies/[id]` | `useAdminTechnologies` |
| Servicios | `/admin/services`, `/admin/services/create`, `/admin/services/[id]` | `useAdminServices` |
| Contactos | `/admin/contacts`, `/admin/contacts/[id]` | `useAdminContacts` |
| Perfil | `/admin/profile` | `useAdminProfile` |
| Imágenes | `/admin/images` | `useAdminImages` |

Cada CRUD incluye listado, creación y edición con formularios. Las imágenes se agrupan por proyecto y permiten establecer/quitar preview.

### Layout Admin

`app/layouts/admin.vue` — sidebar fijo con navegación, header con breadcrumb y menú de usuario, overlay en mobile.

## Estructura del Proyecto

```
app/
├── assets/css/              # Tailwind + tema + gradientes + utilities + keyframes
├── components/              # Componentes Vue (auto-importados por Nuxt)
│   ├── ProjectCard.vue      # Card spotlight de proyecto
│   ├── ProjectsNav.vue      # Navegación lateral con números
│   ├── SectionLabel.vue     # Label fijo bottom-left de sección actual
│   ├── SiteFooter.vue       # Footer fijo con navegación principal
│   ├── SocialLinks.vue      # Íconos flotantes GitHub + LinkedIn
│   ├── StrokeText.vue       # Texto decorativo stroke (fondo de sección)
│   ├── ThemeToggle.vue      # Toggle de tema light/dark
│   ├── experience/          # ExperienceTimeline, ExperienceCard
│   └── technologies/        # TechnologyCard
├── composables/             # Lógica reutilizable (use*.ts, auto-importados)
│   ├── useAuth.ts           # Auth JWT (login, logout, token)
│   ├── useContact.ts        # Formulario de contacto público
│   ├── useExperience.ts     # Timeline público
│   ├── useProfile.ts        # Perfil público (SSR con useFetch)
│   ├── useProjects.ts       # Proyectos públicos (con case study)
│   ├── useTechnologies.ts   # Tecnologías públicas
│   ├── useAdmin*.ts         # 7 composables CRUD para admin
├── layouts/
│   ├── default.vue          # Slot + footer + socials + theme toggle + section label
│   └── admin.vue            # Sidebar + header fijo (protegido)
├── middleware/
│   └── auth.ts              # Protege rutas /admin/*
├── pages/
│   ├── admin/               # Panel admin protegido
│   │   ├── login.vue
│   │   ├── index.vue        # Dashboard
│   │   ├── contacts/
│   │   ├── experiences/
│   │   ├── images.vue
│   │   ├── profile.vue
│   │   ├── projects/
│   │   ├── services/
│   │   └── technologies/
│   ├── index.vue            # Hero
│   ├── about.vue            # Sobre mí
│   ├── error.vue            # Error 404/500
│   ├── experience.vue       # Experiencia
│   ├── contact.vue          # Contacto
│   ├── projects/
│   │   ├── index.vue        # Lista de proyectos con navegación
│   │   └── [slug].vue       # Detalle de proyecto + caso de estudio
│   └── technologies/        # Stack tecnológico
├── types/                   # Interfaces TypeScript por entidad
│   ├── project.ts           # Project, CaseStudy, ApiResponse
│   ├── technology.ts        # Technology
│   └── experience.ts        # Experience
├── app.config.ts            # Configuración de tema @nuxt/ui
├── app.vue                  # Raíz (UApp + NuxtLayout + NuxtPage)
└── AGENTS.md                # Reglas detalladas del proyecto
```

## Secciones del Portfolio

| Ruta | Sección | Datos |
|---|---|---|
| `/` | Hero | Perfil (nombre, badge disponibilidad, descripción) |
| `/about` | Sobre mí | Perfil (título, tagline, bio) — stats y chips |
| `/projects` | Proyectos | Lista con navegación lateral y spotlight |
| `/projects/:id` | Proyecto detalle | Info completa + tech stack + links + caso de estudio |
| `/experience` | Experiencia | Timeline con años, roles, tecnologías |
| `/technologies` | Stack | Grid de tecnologías |
| `/contact` | Contacto | Formulario + redes sociales |

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

Light mode por defecto. Toggle disponible en todas las páginas via `ThemeToggle.vue`. Los overrides de tema se definen en `main.css` con selectores `.dark` y `.light`.

## Loading States

El proyecto usa transiciones de página (`out-in`) para "tapar" el tiempo de carga de datos. No hay spinners ni loaders globales. Estados manejados:
- **`pending`**: Texto "Cargando..." con clase `animate-pulse`
- **`error`**: Toast + mensaje inline
- **`empty`**: Contenido vacío con texto informativo

Ver `AGENTS.md` para más detalle.

## Convenciones

Ver `AGENTS.md` para convenciones de desarrollo, arquitectura y reglas del proyecto.

## Licencia

Privado
