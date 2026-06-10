export interface Technology {
  id: string
  name: string
  category: string
  description: string
  icon: string
  span: 4 | 5 | 7 | 8
}

export const useTechnologies = () => {
  const technologies = useState<Technology[]>('technologies', () => [
    {
      id: '1',
      name: 'Vue.js',
      category: 'Frontend Framework',
      description: 'Interfaces reactivas con arquitectura de componentes progresiva y rendimiento excepcional.',
      icon: 'i-lucide-code-2',
      span: 4
    },
    {
      id: '2',
      name: 'TypeScript',
      category: 'Language',
      description: 'Tipado estático para código escalable, mantenible y seguro en compilación.',
      icon: 'i-lucide-braces',
      span: 8
    },
    {
      id: '3',
      name: 'Tailwind CSS',
      category: 'Styling Engine',
      description: 'Desarrollo utility-first para interfaces rápidas, consistentes y personalizables.',
      icon: 'i-lucide-palette',
      span: 7
    },
    {
      id: '4',
      name: 'Nuxt',
      category: 'Full-Stack Framework',
      description: 'SSR, SSG y file-based routing para aplicaciones web de producción.',
      icon: 'i-lucide-layers',
      span: 5
    },
    {
      id: '5',
      name: 'Node.js',
      category: 'Runtime',
      description: 'Backend escalable con arquitectura event-driven y ecosistema npm.',
      icon: 'i-lucide-terminal',
      span: 5
    },
    {
      id: '6',
      name: 'PostgreSQL',
      category: 'Database',
      description: 'Base de datos relacional robusta con ACID compliance y queries complejas.',
      icon: 'i-lucide-database',
      span: 7
    }
  ])

  return {
    technologies
  }
}
