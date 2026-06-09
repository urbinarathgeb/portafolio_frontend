export interface Experience {
  id: string
  year: number
  role: string
  company: string
  location: string
  description: string
  technologies: string[]
}

export const useExperience = () => {
  const experiences = useState<Experience[]>('experiences', () => [
    {
      id: '1',
      year: 2024,
      role: 'Desarrollador Frontend Senior',
      company: 'Tech Company',
      location: 'Santiago, CL',
      description: 'Desarrollo de aplicaciones web modernas con Vue 3 y Nuxt, enfocadas en rendimiento y experiencia de usuario.',
      technologies: ['Vue.js', 'Nuxt', 'TypeScript', 'Tailwind CSS']
    },
    {
      id: '2',
      year: 2022,
      role: 'Desarrollador Frontend',
      company: 'Digital Agency',
      location: 'Remoto',
      description: 'Implementación de interfaces responsivas y componentes reutilizables para proyectos de e-commerce.',
      technologies: ['React', 'Next.js', 'JavaScript', 'SCSS']
    },
    {
      id: '3',
      year: 2020,
      role: 'Desarrollador Web Junior',
      company: 'Startup',
      location: 'Santiago, CL',
      description: 'Desarrollo full-stack de aplicaciones web con focus en frontend y APIs REST.',
      technologies: ['JavaScript', 'Node.js', 'Express', 'MongoDB']
    }
  ])

  return {
    experiences
  }
}
