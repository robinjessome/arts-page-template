import type { Metadata } from 'next'
import { Header, Footer } from '@/components'
import { generateHsl } from '@/sanity/lib/helpers'
import { DEFAULT_COLORS } from '@/lib/constants'
import {
  Inconsolata,
  // Josefin_Sans,
  Merriweather,
  Open_Sans,
  Playfair_Display,
  Quicksand,
  Raleway,
  Roboto,
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

// export const josefinSans = Josefin_Sans({
//   subsets: ['latin'],
// })

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

export const roboto = Roboto({
  subsets: ['latin'],
})

export const saira = Saira({
  subsets: ['latin'],
})

const FONTS_MAP = {
  inconsolata: inconsolata,
  // josefinSans: josefinSans,
  merriweather: merriweather,
  openSans: openSans,
  playfairDisplay: playfairDisplay,
  quicksand: quicksand,
  raleway: raleway,
  roboto: roboto,
  saira: saira,
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
  const siteSettings = await client.fetch(SITE_SETTINGS_QUERY, {}, FETCH_OPTIONS)

  const chosenFontKey = siteSettings?.siteFont as keyof typeof FONTS_MAP
  const siteFont = FONTS_MAP[chosenFontKey] || openSans

  const primaryColor = siteSettings?.primaryColor || DEFAULT_COLORS.primary
  const secondaryColor = siteSettings?.secondaryColor || DEFAULT_COLORS.secondary
  const accentColor = siteSettings?.accentColor || DEFAULT_COLORS.accent

  const cssVars = {
    '--primary': `hsl(${generateHsl(primaryColor)})`,
    '--primary-light': `hsl(${generateHsl(primaryColor, 'set', 95)})`,
    '--primary-dark': `hsl(${generateHsl(primaryColor, 'set', 10)})`,
    '--secondary': `hsl(${generateHsl(secondaryColor)})`,
    '--accent': `hsl(${generateHsl(accentColor)})`,
  }

  return (
    <html
      lang="en"
      className={`${siteFont.className} h-full antialiased`}
      style={cssVars as React.CSSProperties}
    >
      <body className="flex min-h-full flex-col">
        <div className="p-4">
          <Header siteSettings={siteSettings} />
          <main className="">{children}</main>
          <pre className="my-6 bg-slate-100 p-6 text-xs wrap-anywhere">
            {JSON.stringify(siteSettings, null, 2)}
          </pre>
          <Footer siteSettings={siteSettings} />
        </div>
      </body>
    </html>
  )
}
