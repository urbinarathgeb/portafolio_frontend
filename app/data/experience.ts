import type { ExperienceData } from './schemas'

// Igual que en el CV. Orden de aparición: "order" ascendente.
export const experiences: ExperienceData[] = [
  {
    id: 1,
    kind: 'work',
    role: 'Desarrollo Full Stack',
    company: 'Independiente',
    period: 'nov. 2025 – Actualidad',
    yearFrom: 2025,
    yearTo: null,
    location: 'Santiago, CL',
    description: 'Desarrollé un MVP de gestión de protocolos de sanitización industrial para un cliente del rubro cervecero: API REST con autenticación por roles y +400 pasos técnicos modelados como datos, desplegado en Railway y Vercel. Construí dos productos propios en producción (Great Place To Apply y The Verb Project) de punta a punta.',
    order: 0,
  },
  {
    id: 2,
    kind: 'education',
    role: 'Bootcamp Desarrollo Full Stack JavaScript',
    company: 'Sence / Talento Digital',
    period: '2026',
    yearFrom: 2026,
    yearTo: 2026,
    description: 'Programa intensivo: arquitectura de aplicaciones escalables, APIs RESTful, bases de datos relacionales y trabajo con metodologías ágiles.',
    order: 1,
  },
  {
    id: 3,
    kind: 'work',
    role: 'Freelance Copywriter',
    company: 'Alapar',
    period: '2022 – 2026',
    yearFrom: 2022,
    yearTo: 2026,
    description: 'Estrategia y contenido digital para marcas B2C y B2B. En paralelo, una reconversión profesional planificada a desarrollo: estudio autodidacta y bootcamp Full Stack JavaScript.',
    order: 2,
  },
]
