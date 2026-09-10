const SITE_NAME = 'Javier Urbina'

interface PageSeoOptions {
  title: MaybeRefOrGetter<string>
  description: MaybeRefOrGetter<string>
  image?: string
}

/**
 * Metadatos de página consistentes: "<título> — Javier Urbina" en el
 * <title> y en Open Graph, con la misma descripción para ambos.
 */
export const usePageSeo = ({ title, description, image }: PageSeoOptions) => {
  const fullTitle = () => `${toValue(title)} — ${SITE_NAME}`
  const desc = () => toValue(description)

  useSeoMeta({
    title: fullTitle,
    ogTitle: fullTitle,
    description: desc,
    ogDescription: desc,
    ...(image ? { ogImage: image, twitterCard: 'summary_large_image' as const } : {}),
  })
}
