import type { ProjectData } from './schemas'

// Orden = orden de aparición en la landing. El destacado (isFeatured)
// ocupa el ancho completo de la grilla.
// Los ids no se cambian: forman parte de la URL (/projects/:id).
export const projects: ProjectData[] = [
  {
    id: 2,
    slug: 'protocolos-cerveceros',
    kind: 'client',
    title: 'Protocolos',
    subtitle: 'Cerveceros',
    description: 'MVP para generar y gestionar protocolos de sanitización en plantas cerveceras, hecho para un cliente real.',
    role: 'Full Stack',
    year: 2026,
    status: 'En pausa',
    imagePreview: '/images/projects/protocolos-cerveceros/preview.webp',
    links: {
      repo: 'https://github.com/urbinarathgeb/mvp-protocolos-cervecerias-front',
      repoBackend: 'https://github.com/urbinarathgeb/mvp-protocolos-cervecerias-back',
    },
    isFeatured: true,
    techStack: ['React', 'TypeScript', 'Mantine', 'Firebase Auth', 'Node.js', 'Express', 'PostgreSQL'],
    caseStudy: {
      context: 'Los procedimientos de limpieza de una cervecería dependen del equipo, del material y de si se limpia con CIP (limpieza sin desarmar) o a mano. Estaban en documentos que el personal consultaba y adaptaba a mano, con el riesgo de aplicar un paso equivocado u omitir alguno.',
      built: 'Una aplicación web donde la planta registra sus equipos y obtiene el protocolo exacto para cada uno, con los pasos en orden, listo para imprimir. Un panel de administración gestiona usuarios y tickets de soporte.',
      decisions: [
        {
          title: 'Los protocolos como datos, no como código',
          body: 'Modelé los +400 pasos técnicos en PostgreSQL por equipo, material y método de limpieza. Cambiar un procedimiento es editar datos, no programar ni volver a desplegar.',
        },
        {
          title: 'Identidad delegada en Firebase, permisos en mi API',
          body: 'Firebase maneja el login y la API verifica cada token con Firebase Admin. El rol (admin o usuario) vive en mi base de datos, y un middleware protege las rutas de administración. No escribí autenticación desde cero, pero los permisos siguen bajo mi control.',
        },
        {
          title: 'Un protocolo impreso por equipo',
          body: 'Lo definimos con el cliente: cada protocolo se genera como PDF, lleva un verificador único y corresponde a un solo equipo. Así queda visible junto al equipo en la planta y sirve de respaldo físico.',
        },
      ],
      result: [
        'API REST con rutas para equipos, protocolos, tickets y usuarios, con autenticación y rol de administrador.',
        'Estuvo desplegado en Railway (backend) y Vercel (frontend). Hoy el proyecto está en pausa por decisión del cliente y el servidor no está corriendo.',
      ],
      learnings: 'Al ser un MVP, hoy lo haría con un framework full stack, con backend y frontend en un mismo proyecto: menos infraestructura y un solo despliegue. Separarlos fue una decisión consciente, porque este proyecto también fue mi forma de aprender backend a fondo.',
    },
  },
  {
    id: 3,
    slug: 'great-place-to-apply',
    kind: 'own',
    title: 'Great Place',
    subtitle: 'To Apply',
    description: 'Plataforma de reseñas anónimas sobre procesos de selección: cómo trata cada empresa a sus candidatos.',
    role: 'Full Stack',
    year: 2026,
    status: 'En producción',
    imagePreview: '/images/projects/great-place-to-apply/preview.png',
    links: {
      repo: 'https://github.com/urbinarathgeb/great-place-to-apply',
      demo: 'https://greatplacetoapply.vercel.app',
    },
    isFeatured: false,
    techStack: ['Astro', 'Vue', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'Drizzle ORM', 'Zod'],
    caseStudy: {
      context: 'El ghosting y la falta de feedback en los procesos de selección son frecuentes, pero cada experiencia queda como anécdota aislada. No hay dónde consultar, antes de postular, qué tan rápido responde una empresa o cómo trata a quienes entrevista.',
      built: 'Un directorio de empresas donde cualquier persona deja una reseña anónima de cada etapa del proceso (postulación, entrevistas, etc.), con notas por aspecto: rapidez, feedback, trato y transparencia. Cada empresa muestra sus promedios y la distribución de etapas.',
      decisions: [
        {
          title: 'Astro SSR con acceso directo a la base',
          body: 'El contenido tenía que ser indexable, y una SPA consumiendo una API agregaba una capa de red sin aportar nada. Las páginas consultan PostgreSQL con Drizzle al renderizar; la API REST quedó solo como herramienta de desarrollo y testing.',
        },
        {
          title: 'Una reseña es un árbol, guardado en una transacción',
          body: 'Reseña → etapas → notas por aspecto: 3 niveles sobre 6 tablas. Se inserta en una transacción atómica: si algo falla, no queda una reseña a medias ni registros huérfanos.',
        },
        {
          title: 'Anti-spam sin romper el anonimato',
          body: 'Guardo solo un hash de la IP, nunca la IP. Alcanza para limitar abusos (una reseña cada 5 minutos por IP y 30 días de espera por empresa) sin poder rastrear a quién escribió: rastrearlo habría anulado la premisa de la plataforma.',
        },
      ],
      result: [
        'En producción, con reseñas reales de personas que no conozco (todavía pocas).',
        '55 empresas cargadas de base y 2 agregadas por usuarios.',
        'Búsqueda de empresas sin importar tildes (extensión unaccent de PostgreSQL), filtros por categoría y orden por reseñas o por nota.',
        'Validación con Zod en la API y en los formularios.',
      ],
    },
  },
  {
    id: 4,
    slug: 'the-verb-project',
    kind: 'own',
    title: 'The Verb',
    subtitle: 'Project',
    description: 'Juego web para aprender los verbos irregulares en inglés emparejando sus tres formas.',
    role: 'Frontend',
    year: 2026,
    status: 'En producción · prototipo en ajustes',
    imagePreview: '/images/projects/the-verb-project/preview.png',
    links: {
      repo: 'https://github.com/urbinarathgeb/the-verb-project',
      demo: 'https://theverbproject.vercel.app',
    },
    isFeatured: false,
    techStack: ['Vue', 'TypeScript', 'Pinia', 'Tailwind CSS', 'Supabase', 'Vitest'],
    caseStudy: {
      context: 'Los verbos irregulares se estudian memorizando tablas, y eso no se retiene. Quería algo que se practicara jugando, con progreso visible y sin exigir una cuenta para empezar.',
      built: 'Un tablero donde se emparejan presente, pasado y participio de cada verbo. Tiene tres modos (contrarreloj, supervivencia y uno de práctica sin reloj) y tres niveles. Hay login opcional con Google, clasificación pública y progreso por verbo que se sincroniza entre dispositivos.',
      decisions: [
        {
          title: 'Progreso sincronizado por incrementos, no por totales',
          body: 'Se envía "suma un acierto al verbo 7", agrupado cada pocos segundos y al salir de la pantalla. Así, practicar en el móvil y en el portátil no se pisa, y si falla la red, lo pendiente se reintenta.',
        },
        {
          title: 'Accesible de verdad',
          body: 'El tablero se juega entero con teclado, cada jugada se anuncia a lectores de pantalla (el acierto y el error no dependen solo del color), los colores cumplen AAA de WCAG y las animaciones se desactivan con reducir movimiento.',
        },
        {
          title: 'Seguridad en la base, no en el cliente',
          body: 'Todo el código corre en el navegador, así que la clave pública de Supabase no protege nada. El control de acceso lo aplica RLS en Postgres, y la clave service_role no se usa nunca.',
        },
      ],
      result: [
        'En producción, con usuarios reales y partidas en la clasificación.',
        'Se juega con o sin cuenta.',
        'Tests con Vitest sobre la lógica del juego, el tablero, el progreso y la clasificación (15 archivos de tests).',
      ],
    },
  },
  {
    id: 1,
    slug: 'cutlog',
    kind: 'own',
    title: 'CutLog',
    subtitle: 'API',
    description: 'API REST para gestionar la producción de un aserradero: pedidos, medidas y trazabilidad de cada paquete.',
    role: 'Backend',
    year: 2026,
    imagePreview: '/images/projects/cutlog/preview.png',
    links: {
      repo: 'https://github.com/urbinarathgeb/cutlog_api',
    },
    isFeatured: false,
    techStack: ['Node.js', 'Express', 'PostgreSQL', 'Sequelize'],
    caseStudy: {
      context: 'El problema es real: lo planteó un familiar que tiene un emprendimiento con un aserradero. Ahí el operario lleva en la cabeza varias variables: qué medidas faltan para cada pedido y cómo se apila cada paquete (piezas a lo ancho, a lo alto, separadores). Olvidar una genera errores de despacho y desperdicio. Lo desarrollé como proyecto final del módulo 7 del bootcamp, pero la idea no vino del curso.',
      built: 'Una API centrada en los pedidos: el sistema no gestiona un inventario infinito, solo lo que falta producir para cumplir cada orden. El operario registra cada paquete producido y el sistema calcula las piezas y el volumen.',
      decisions: [
        {
          title: '5 entidades, pensadas para pedidos mixtos',
          body: 'Dimensiones, configuraciones de apilado, órdenes, ítems de orden y paquetes. La configuración de apilado es independiente de la medida, así que se reutiliza, y cada paquete "congela" la configuración real que se usó, aunque difiera de la sugerida.',
        },
        {
          title: 'Reglas de negocio en el servicio, no en el cliente',
          body: 'Los ítems de una orden solo se pueden modificar mientras la orden está pendiente o en producción; si no, la API responde con un error de conflicto. La regla vive en un solo lugar y ningún cliente se la puede saltar.',
        },
        {
          title: 'Historial que no se pierde',
          body: 'Todos los modelos usan soft delete con restauración: un borrado por error se recupera y la trazabilidad de lo producido se mantiene.',
        },
      ],
      result: [
        'Proyecto final evaluado del módulo 7 del bootcamp.',
        '6 grupos de endpoints documentados y probados a mano con archivos .http: casos de éxito, de error y de validación de estados.',
        'No está desplegado ni se usa todavía en el aserradero.',
      ],
    },
  },
]
