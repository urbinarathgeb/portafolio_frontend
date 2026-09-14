import type { ExperienceData } from './schemas'

// Orden de aparición: "order" ascendente (lo más reciente primero)
export const experiences: ExperienceData[] = [
  {
    id: 2,
    year: 2026,
    kind: 'project',
    role: 'Protocolos Cerveceros — cliente real',
    company: 'Freelance',
    location: 'Santiago, CL',
    description: 'Desarrollé el MVP completo para una planta cervecera: modelo de datos, API REST con roles y frontend que genera un protocolo imprimible por equipo. Hoy está en pausa por decisión del cliente.',
    order: 0,
  },
  {
    id: 1,
    year: 2026,
    kind: 'education',
    role: 'Especialización Full-Stack JavaScript',
    company: 'Talento Digital / Kibernum',
    location: 'Santiago, CL',
    description: 'Programa intensivo: arquitectura de aplicaciones escalables, APIs RESTful, bases de datos relacionales y trabajo con metodologías ágiles.',
    order: 1,
    technologies: ['JavaScript', 'Node.js', 'Express', 'PostgreSQL'],
  },
  {
    id: 3,
    year: 2026,
    kind: 'project',
    role: 'CutLog API',
    company: 'Proyecto propio',
    description: 'API REST para la producción de un aserradero (pedidos, medidas y trazabilidad), a partir de un problema real. La desarrollé como proyecto final del bootcamp.',
    order: 2,
  },
  {
    id: 4,
    year: 2024,
    kind: 'start',
    role: 'Reconversión a desarrollo de software',
    company: 'Autodidacta',
    description: 'Salto desde otra industria hacia el desarrollo web: fundamentos de JavaScript, Git y HTTP construyendo proyectos propios.',
    order: 3,
  },
]
