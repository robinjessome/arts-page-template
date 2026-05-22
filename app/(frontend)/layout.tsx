import type { Metadata } from 'next'
import { cn } from '@/lib/helpers'
import { Header, Footer } from '@/components'
import { AudioProvider } from '@/context/AudioContext'

import { generateHsl } from '@/lib/helpers'
import { DEFAULT_COLORS, CUSTOM_RADIUS, REVALIDATE } from '@/lib/constants'
import {
  Caveat,
  Doto,
  Inconsolata,
  Merriweather,
  Noto_Sans,
  Playfair_Display,
  Quicksand,
  Raleway,
  Roboto,
  Saira,
  Stack_Sans_Text,
  Stack_Sans_Notch,
} from 'next/font/google'

import './globals.css'

import { urlFor } from '@/sanity/lib/image'
import { client } from '@/sanity/lib/client'
import { SITE_SETTINGS_QUERY } from '@/sanity/lib/queries'

const FETCH_OPTIONS = { next: { revalidate: REVALIDATE } }

export const inconsolata = Inconsolata({
  subsets: ['latin'],
  variable: '--font-headline',
})

export const merriweather = Merriweather({
  subsets: ['latin'],
  variable: '--font-headline',
})

export const notoSans = Noto_Sans({
  subsets: ['latin'],
  variable: '--font-headline',
})

export const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-headline',
})

export const quicksand = Quicksand({
  subsets: ['latin'],
  variable: '--font-headline',
})

export const raleway = Raleway({
  subsets: ['latin'],
  variable: '--font-headline',
})

export const roboto = Roboto({
  subsets: ['latin'],
  variable: '--font-headline',
})

export const saira = Saira({
  subsets: ['latin'],
  variable: '--font-headline',
})

export const stackSansText = Stack_Sans_Text({
  subsets: ['latin'],
  variable: '--font-headline',
})

// Headline

export const caveat = Caveat({
  subsets: ['latin'],
  variable: '--font-headline',
})

export const doto = Doto({
  subsets: ['latin'],
  variable: '--font-headline',
})

export const stackSansNotch = Stack_Sans_Notch({
  subsets: ['latin'],
  variable: '--font-headline',
})

const FONTS_MAP = {
  Inconsolata: inconsolata,
  Merriweather: merriweather,
  'Noto Sans': notoSans,
  'Playfair Display': playfairDisplay,
  Quicksand: quicksand,
  Raleway: raleway,
  Roboto: roboto,
  Saira: saira,
  'Stack Sans Text': stackSansText,
} as const

const HEADLINE_FONTS_MAP = {
  Caveat: caveat,
  Doto: doto,
  'Stack Sans Notch': stackSansNotch,
} as const

export async function generateMetadata(): Promise<Metadata> {
  const siteSettings = await client.fetch(SITE_SETTINGS_QUERY, {}, FETCH_OPTIONS)
  const primaryColor = siteSettings?.primaryColor || DEFAULT_COLORS.primary

  const colorHex = (primaryColor as { hex: string }).hex

  let faviconUrl = siteSettings?.favicon ? urlFor(siteSettings.favicon).url() : undefined
  if (!faviconUrl) {
    const siteTitle = siteSettings?.title ?? 'Default'
    faviconUrl = `/api/fallback-favicon?text=${encodeURIComponent(siteTitle)}&color=${encodeURIComponent(colorHex)}`
  }

  const hasTagline = siteSettings?.tagline && ` | ${siteSettings.tagline}`
  return {
    title: `${siteSettings?.title ?? 'Default'}${hasTagline}`,
    description: siteSettings?.longDescription,
    ...(faviconUrl && { icons: { icon: faviconUrl } }),
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const siteSettings = await client.fetch(SITE_SETTINGS_QUERY, {}, FETCH_OPTIONS)

  const { colorScheme } = siteSettings || {}

  const chosenFontKey = siteSettings?.siteFont as keyof typeof FONTS_MAP
  const chosenHeadlineFontKey = siteSettings?.headlineFont as keyof typeof HEADLINE_FONTS_MAP
  const siteFont = FONTS_MAP[chosenFontKey] || notoSans
  const headlineFont = HEADLINE_FONTS_MAP[chosenHeadlineFontKey] || siteFont || notoSans

  const primaryColor = siteSettings?.primaryColor || DEFAULT_COLORS.primary
  const secondaryColor = siteSettings?.secondaryColor || DEFAULT_COLORS.secondary
  const accentColor = siteSettings?.accentColor || DEFAULT_COLORS.accent
  const customRadius = siteSettings?.customRadius || 'none'

  const cssVars = {
    '--primary': `hsl(${generateHsl(primaryColor)})`,
    '--primary-light': `hsl(${generateHsl(primaryColor, 'set', 95)})`,
    '--primary-dark': `hsl(${generateHsl(primaryColor, 'set', 6)})`,
    '--secondary': `hsl(${generateHsl(secondaryColor)})`,
    '--accent': `hsl(${generateHsl(accentColor)})`,
    '--radius': CUSTOM_RADIUS[customRadius],
  }

  return (
    <html
      lang="en"
      className={cn(
        `${siteFont.className} ${headlineFont.variable} h-full antialiased`,
        colorScheme === 'dark' && 'dark'
      )}
      style={cssVars as React.CSSProperties}
    >
      <body className={cn('min-h-screen w-full font-light')}>
        <div className={cn('mx-auto max-w-7xl px-8 py-4')}>
          <AudioProvider>
            <Header siteSettings={siteSettings} />
            <main>{children}</main>
            <Footer siteSettings={siteSettings} />
          </AudioProvider>
        </div>
      </body>
    </html>
  )
}
