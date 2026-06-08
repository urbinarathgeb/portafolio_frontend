# Portfolio Frontend

Portfolio personal desarrollado con Nuxt 4, @nuxt/ui v4 y Tailwind CSS v4.

## Stack Tecnológico

- **Framework:** Nuxt 4 (Vue 3 + auto-imports + file-based routing)
- **UI:** @nuxt/ui v4
- **Estilos:** Tailwind CSS v4
- **Lenguaje:** TypeScript
- **Gestor de paquetes:** pnpm

## Prerequisitos

- Node.js 18+ 
- pnpm 9+

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

Servidor disponible en `http://localhost:3000`

## Build

```bash
pnpm build       # Build de producción
pnpm generate    # Generar sitio estático (SSG)
pnpm preview     # Preview del build
```

## Estructura del Proyecto

```
app/
├── assets/css/         # Tailwind + tema + gradientes
├── components/         # Componentes Vue (auto-importados)
├── composables/        # Lógica reutilizable (use*.ts)
├── layouts/            # Layouts de página
├── pages/              # Rutas (file-based routing)
├── types/              # Tipos TypeScript
├── app.config.ts       # Configuración de tema @nuxt/ui
└── app.vue             # Componente raíz
public/
└── images/             # Imágenes estáticas
```

## Sistema de Diseño

### Tipografía

- **Unbounded:** Headings y títulos decorativos
- **DM Sans:** Body, labels, UI text

### Paleta de Colores

- **Primary (#F31F73):** Magenta-pink — acentos principales
- **Secondary (#F07575):** Coral — transiciones y hover
- **Accent (#FFAF02):** Ámbar-dorado — CTAs y highlights

### Modo Oscuro/Claro

Dark mode por defecto. Toggle disponible en todas las páginas.

## Convenciones

Ver `AGENTS.md` para convenciones de desarrollo, arquitectura y reglas del proyecto.

## Licencia

Privado
