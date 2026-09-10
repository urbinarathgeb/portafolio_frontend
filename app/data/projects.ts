import type { ProjectData } from './schemas'

// Orden = orden de aparición en la landing. El destacado (isFeatured)
// ocupa el ancho completo de la grilla.
export const projects: ProjectData[] = [
  {
    id: 2,
    slug: 'protocolos-cerveceros',
    kind: 'client',
    title: 'Protocolos',
    subtitle: 'Cerveceros',
    description: 'Digitalización y automatización de estándares de higiene para garantizar la inocuidad en la industria cervecera artesanal.',
    imagePreview: '/images/projects/protocolos-cerveceros/preview.webp',
    githubURLFront: 'https://github.com/urbinarathgeb/mvp-protocolos-cervecerias-front',
    githubURLBack: 'https://github.com/urbinarathgeb/mvp-protocolos-cervecerias-back',
    deployURL: 'https://mvp-protocolos-cervecerias-front-j82x0vlch-jotaurbinas-projects.vercel.app/',
    isFeatured: true,
    isFrontend: true,
    isBackend: true,
    techStack: [
      'Tailwind CSS',
      'Node.js',
      'PostgreSQL',
      'React',
      'Express',
    ],
    caseStudy: {
      title: 'Automatización e Inocuidad en la Producción Cervecera',
      challenge: 'La gestión de los Procedimientos Operativos Estándar (SOP) en las cervecerías era un proceso manual, lento y propenso a errores críticos. La falta de una guía estandarizada que considere las variaciones de limpieza según el material del equipo (acero inoxidable vs. otros) o el método (CIP o manual) incrementaba el riesgo de contaminaciones de lotes y fallos en auditorías sanitarias.',
      solution: 'Diseñé una solución Full-Stack centrada en la eficiencia operativa que permite a los maestros cerveceros generar protocolos de limpieza técnicos y personalizados de forma instantánea. El sistema centraliza la lógica de sanitización, eliminando la ambigüedad y asegurando que cada equipo reciba el tratamiento químico y mecánico exacto que requiere.',
      highlights: [
        {
          title: 'Asignación Dinámica de Protocolos',
          description: 'Implementación de lógica de negocio en el backend que filtra y asigna procedimientos específicos basados en el material del equipo y el sistema de limpieza (CIP/Manual).',
        },
        {
          title: 'Motor de Reportes PDF',
          description: 'Integración de @react-pdf/renderer en el frontend para la generación automatizada de documentos oficiales descargables, personalizados por equipo y operario.',
        },
        {
          title: 'Seguridad y Autenticación Robusta',
          description: 'Gestión de usuarios e identidad mediante Firebase Auth y Firebase Admin SDK, garantizando un acceso seguro y protegido a la gestión de protocolos.',
        },
        {
          title: 'Interfaz Orientada a la Experiencia de Usuario (UX)',
          description: 'Desarrollo de una UI moderna y responsiva utilizando Mantine UI, optimizada para el entorno de trabajo en planta.',
        },
        {
          title: 'Persistencia de Datos Relacional',
          description: 'Diseño de una base de datos en PostgreSQL para manejar la integridad y trazabilidad de los protocolos de limpieza.',
        },
      ],
      impact: [
        {
          stat: '95%',
          subtitle: 'Precisión en protocolos sanitarios',
          description: 'Garantizada mediante la lógica de asignación automática basada en el material del equipo y el método de limpieza (CIP/Manual).',
        },
        {
          stat: '15h/mes',
          subtitle: 'Ahorro en gestión administrativa',
          description: 'Al automatizar la creación de reportes PDF personalizados, eliminando la redacción y formato manual de SOPs.',
        },
        {
          stat: '100%',
          subtitle: 'Disponibilidad de estándares (SOP)',
          description: 'Acceso digital centralizado y dinámico a los procedimientos operativos para todo el personal de planta.',
        },
        {
          stat: '<3 seg',
          subtitle: 'Generación de reportes técnicos',
          description: 'Creación instantánea de documentación lista para auditoría mediante la integración de @react-pdf/renderer.',
        },
      ],
    },
    createdAt: '2026-06-22T16:14:35.607Z',
  },
  {
    id: 1,
    slug: 'cutlog',
    kind: 'academic',
    title: 'CutLog',
    subtitle: 'API',
    description: 'Sistema inteligente para eliminar la carga mental en la producción de madera y garantizar el cumplimiento de pedidos.',
    imagePreview: '/images/projects/cutlog/preview.webp',
    githubURLFront: null,
    githubURLBack: 'https://github.com/urbinarathgeb/cutlog_api',
    deployURL: null,
    isFeatured: false,
    isFrontend: false,
    isBackend: true,
    techStack: [
      'Node.js',
      'PostgreSQL',
      'Express',
    ],
    caseStudy: {
      title: 'Eficiencia Just-in-Time para la Industria Maderera',
      challenge: 'En un aserradero, la producción no solo depende de la maquinaria, sino de la precisión en el apilado y el cumplimiento de pedidos. Tradicionalmente, los operarios deben gestionar mentalmente múltiples variables: dimensiones de escuadría, configuraciones de apilado y cantidades pendientes. Este modelo manual es propenso a errores, genera desperdicio de material y dificulta enormemente la trazabilidad total, creando cuellos de botella y errores de despacho que afectan directamente la rentabilidad.',
      solution: 'Desarrollé CutLog API, un asistente de producción diseñado bajo la filosofía Just-in-Time. Este sistema no intenta digitalizar un inventario infinito, sino que se centra exclusivamente en el flujo de pedidos reales. La plataforma permite que los operarios registren su producción en tiempo real con una interfaz simplificada, delegando el cálculo técnico de volúmenes y configuraciones al motor del sistema.',
      highlights: [
        {
          title: 'Arquitectura Orientada a la Trazabilidad',
          description: 'Implementación de Soft Deletes (Paranoid) en todos los modelos para garantizar que el historial de producción sea inmutable y recuperable ante errores.',
        },
        {
          title: 'Gestión de Configuración Flexible',
          description: 'El sistema permite el uso de configuraciones de apilado predefinidas, con la capacidad de realizar Overrides inmediatos en planta sin comprometer la integridad de la base de datos.',
        },
        {
          title: 'Cálculos Automáticos de Precisión',
          description: 'Automatización del cálculo de piezas totales y volumen (m³) basado en las dimensiones específicas de cada pieza, eliminando el error humano.',
        },
        {
          title: 'Stock Global Inteligente',
          description: 'Un dashboard que agrupa pedidos por dimensión, permitiendo a los gerentes de planta visualizar el estado de cada orden (pendiente, en producción, completada) de un solo vistazo.',
        },
      ],
      impact: [
        {
          stat: '90%',
          subtitle: 'Reducción de tiempo administrativo',
          description: 'Al automatizar la sugerencia de configuraciones de apilado según la escuadría.',
        },
        {
          stat: '10h/semana',
          subtitle: 'Ahorro en gestión administrativa',
          description: 'Eliminando reportes manuales y conciliación de datos.',
        },
        {
          stat: '100%',
          subtitle: 'Trazabilidad total',
          description: 'Cada pieza registrada desde su origen hasta el despacho.',
        },
        {
          stat: '<5 seg',
          subtitle: 'Registro por paquete de producción',
          description: 'Sin interrumpir el flujo de trabajo del operario.',
        },
      ],
    },
    createdAt: '2026-06-22T16:14:34.839Z',
  },
]
