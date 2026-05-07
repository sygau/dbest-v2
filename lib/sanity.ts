import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

type SanityImageSource = any

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.NEXT_PUBLIC_SANITY_READ_TOKEN,
  useCdn: true,
  perspective: 'published',
})

const builder = imageUrlBuilder(sanityClient)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

export function imageUrl(
  source: SanityImageSource | undefined | null,
  opts?: { w?: number; h?: number }
): string | null {
  if (!source) return null
  let b = builder.image(source).format('webp').auto('format')
  if (opts?.w) b = b.width(opts.w)
  if (opts?.h) b = b.height(opts.h)
  return b.url()
}
