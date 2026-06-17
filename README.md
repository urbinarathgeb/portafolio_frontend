# Portfolio Frontend

Portfolio personal desarrollado con Nuxt 4, @nuxt/ui v4 y Tailwind CSS v4. Consume una API REST construida con Express + Sequelize + PostgreSQL (ver `back/`).

## Stack Tecnológico

- **Framework:** Nuxt 4 (Vue 3 + auto-imports + file-based routing)
- **UI:** @nuxt/ui v4
- **Estilos:** Tailwind CSS v4
- **Lenguaje:** TypeScript
- **HTTP:** `useFetch` / `$fetch` (nativo Nuxt)
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

## API — Endpoints Consumidos

| Método | Endpoint | Uso | Composable |
|---|---|---|---|
| `GET` | `/profile` | Perfil (Hero + About) | `useProfile` |
| `GET` | `/projects` | Lista de proyectos | `useProjects` |
| `GET` | `/projects/:id` | Detalle de proyecto | `useProject` |
| `GET` | `/technologies?stack=true` | Tecnologías del stack | `useTechnologies` |
| `GET` | `/experiences` | Línea de tiempo | `useExperience` |
| `POST` | `/contacts` | Formulario de contacto | `useContact` |

Todas las rutas son públicas (sin autenticación).

## Loading States

El proyecto usa transiciones de página (`out-in`) para "tapar" el tiempo de carga de datos. No hay spinners ni loaders. Solo se muestran estados `error` (toast + mensaje inline) y `empty` (contenido vacío). Ver `AGENTS.md` para más detalle.

## Estructura del Proyecto

```
app/
├── assets/css/         # Tailwind + tema + gradientes + keyframes
├── components/         # Componentes Vue (auto-importados por Nuxt)
│   ├── experience/     # ExperienceTimeline, ExperienceCard
│   └── technologies/   # TechnologyCard
├── composables/        # Lógica reutilizable (use*.ts, auto-importados)
├── layouts/            # default.vue (slot + footer + socials + theme toggle)
├── pages/              # Rutas (file-based routing)
│   ├── index.vue       # Hero
│   ├── about.vue       # Sobre mí
│   ├── experience.vue  # Experiencia
│   ├── contact.vue     # Contacto
│   ├── projects/
│   │   ├── index.vue   # Lista de proyectos
│   │   └── [slug].vue  # Detalle de proyecto
│   └── technologies/   # Stack tecnológico
├── types/              # Interfaces TypeScript por entidad
├── app.config.ts       # Configuración de tema @nuxt/ui
└── app.vue             # Componente raíz (UApp + NuxtPage)
public/
└── images/             # Imágenes estáticas
```

## Secciones del Portfolio

| Ruta | Sección | Datos |
|---|---|---|
| `/` | Hero | Perfil (nombre, badge disponibilidad, descripción) |
| `/about` | Sobre mí | Perfil (título, tagline, bio) — stats y chips hardcodeados |
| `/projects` | Proyectos | Lista con navegación lateral y spotlight |
| `/projects/:id` | Proyecto detalle | Info completa + tech stack + links |
| `/experience` | Experiencia | Timeline con años, roles, tecnologías |
| `/technologies` | Stack | Grid de tecnologías filtradas por `showInStack` |
| `/contact` | Contacto | Formulario + redes sociales |

## Sistema de Diseño

### Tipografía

- **Unbounded:** Headings y títulos decorativos
- **DM Sans:** Body, labels, UI text

### Paleta de Colores

- **Primary (#E8366D):** Magenta-pink — acentos principales
- **Secondary (#F07575):** Coral — transiciones y hover
- **Accent (#FFAF02):** Ámbar-dorado — CTAs y highlights

### Modo Oscuro/Claro

Light mode por defecto. Toggle disponible en todas las páginas via `ThemeToggle.vue`.

## Convenciones

Ver `AGENTS.md` para convenciones de desarrollo, arquitectura y reglas del proyecto.

## Licencia

Privado
