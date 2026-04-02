import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

export const client = createClient({
  projectId: 'ttf5z41g',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
})

const builder = imageUrlBuilder(client)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

// Bild-URL: Sanity-Asset wenn vorhanden, sonst lokaler Pfad
export function imageUrl(asset: any, fallbackPath?: string): string {
  if (asset?.asset?._ref) {
    return urlFor(asset).auto('format').url()
  }
  return fallbackPath || ''
}
