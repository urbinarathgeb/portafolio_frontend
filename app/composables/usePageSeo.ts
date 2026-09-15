const SITE_NAME = 'Javier Urbina'
// 1200×630, se regenera desde app/assets/og/og-image.html
const DEFAULT_OG_IMAGE = '/images/og-image.png'

interface PageSeoOptions {
  title: MaybeRefOrGetter<string>
  description: MaybeRefOrGetter<string>
  image?: string
}

/**
 * Metadatos de página consistentes: "<título> — Javier Urbina" en el
 * <title> y en Open Graph, con la misma descripción para ambos.
 */
export const usePageSeo = ({ title, description, image = DEFAULT_OG_IMAGE }: PageSeoOptions) => {
  const fullTitle = () => `${toValue(title)} — ${SITE_NAME}`
  const desc = () => toValue(description)
  // LinkedIn, WhatsApp, etc. solo leen og:image con URL absoluta
  const imageUrl = new URL(image, useSiteConfig().url).href

  useSeoMeta({
    title: fullTitle,
    ogTitle: fullTitle,
    description: desc,
    ogDescription: desc,
    ogImage: imageUrl,
    ogImageWidth: 1200,
    ogImageHeight: 630,
    ogImageAlt: `${SITE_NAME} — Desarrollador Full Stack`,
    twitterCard: 'summary_large_image',
  })
}
