import type { Metadata } from 'next'
import { generateHsl } from '@/sanity/lib/helpers'
import { DEFAULT_COLORS } from '@/lib/constants'
import {
  Inconsolata,
  Josefin_Sans,
  Merriweather,
  Open_Sans,
  Playfair_Display,
  Quicksand,
  Raleway,
  Saira,
} from 'next/font/google'

import './globals.css'

import { urlFor } from '@/sanity/lib/image'
import { client } from '@/sanity/lib/client'
import { SITE_SETTINGS_QUERY } from '@/sanity/lib/queries'

const FETCH_OPTIONS = { next: { revalidate: 30 } }

export const inconsolata = Inconsolata({
  subsets: ['latin'],
})

export const josefinSans = Josefin_Sans({
  subsets: ['latin'],
})

export const merriweather = Merriweather({
  subsets: ['latin'],
})

export const openSans = Open_Sans({
  subsets: ['latin'],
})

export const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
})

export const quicksand = Quicksand({
  subsets: ['latin'],
})

export const raleway = Raleway({
  subsets: ['latin'],
})

export const saira = Saira({
  subsets: ['latin'],
})

const FONTS_MAP = {
  inconsolata: inconsolata,
  josefinSans: josefinSans,
  merriweather: merriweather,
  openSans: openSans,
  playfairDisplay: playfairDisplay,
  quicksand: quicksand,
  raleway: raleway,
  saira: saira,
} as const

export async function generateMetadata(): Promise<Metadata> {
  const [siteSettings] = await client.fetch(SITE_SETTINGS_QUERY, {}, FETCH_OPTIONS)
  const primaryColor = siteSettings?.primaryColor || DEFAULT_COLORS.primary

  let faviconUrl = siteSettings?.favicon ? urlFor(siteSettings.favicon).url() : undefined

  console.log('primaryColor', primaryColor)

  const colorHex = (primaryColor as { hex: string }).hex

  if (!faviconUrl) {
    const siteTitle = siteSettings?.title ?? 'Default'
    // This creates /api/fallback-favicon?text=Default
    faviconUrl = `/api/fallback-favicon?text=${encodeURIComponent(siteTitle)}&color=${encodeURIComponent(colorHex)}`
  }

  return {
    title: `${siteSettings?.title ?? 'Default'} | ${siteSettings?.shortDescription ?? ''}`,
    description: siteSettings?.longDescription,
    ...(faviconUrl && { icons: { icon: faviconUrl } }),
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // Fetching the data again here is completely fine; Next.js automatically dedupes
  // duplicate fetch calls so it won't hit Sanity twice.
  const [siteSettings] = await client.fetch(SITE_SETTINGS_QUERY, {}, FETCH_OPTIONS)

  const chosenFontKey = siteSettings?.siteFont as keyof typeof FONTS_MAP
  const siteFont = FONTS_MAP[chosenFontKey] || openSans

  const primaryColor = siteSettings?.primaryColor || DEFAULT_COLORS.primary
  const secondaryColor = siteSettings?.secondaryColor || DEFAULT_COLORS.secondary
  const accentColor = siteSettings?.accentColor || DEFAULT_COLORS.accent

  const cssVars = {
    '--primary': `hsl(${generateHsl(primaryColor)})`,
    '--primary-light': `hsl(${generateHsl(primaryColor, 'lighten', 60)})`,
    '--primary-lightest': `hsl(${generateHsl(primaryColor, 'set', 98)})`,
    '--primary-dark': `hsl(${generateHsl(primaryColor, 'set', 4)})`,
    '--secondary': `hsl(${generateHsl(secondaryColor)})`,
    '--accent': `hsl(${generateHsl(accentColor)})`,
  }

  return (
    <html
      lang="en"
      className={`${siteFont.className} text-primary-dark h-full antialiased`}
      style={cssVars as React.CSSProperties}
    >
      <body className="flex min-h-full flex-col">
        <header>Header!</header>
        <hr className="my-12" />
        {children}
        <hr className="my-12" />
        <footer>Footer!</footer>
        <pre className="text-xs">{JSON.stringify(siteSettings, null, 2)}</pre>
      </body>
    </html>
  )
}
