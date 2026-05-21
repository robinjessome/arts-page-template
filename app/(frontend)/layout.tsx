import type { Metadata } from 'next'
import { cn } from '@/lib/helpers'
import { Header, Footer } from '@/components'
import { generateHsl } from '@/lib/helpers'
import { DEFAULT_COLORS } from '@/lib/constants'
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

const FETCH_OPTIONS = { next: { revalidate: 30 } }

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
      className={cn(
        `${siteFont.className} ${headlineFont.variable} h-full antialiased`,
        colorScheme === 'dark' && 'dark'
        // 'dark:bg-primary-dark bg-primary-light border'

        //   ? 'text-primary-light bg-primary-dark'
        //   : 'text-primary-dark bg-primary-light'
      )}
      style={cssVars as React.CSSProperties}
    >
      <body className={cn('min-h-screen w-full font-light')}>
        <div className={cn('p-8')}>
          <Header siteSettings={siteSettings} />
          <main className="">{children}</main>
          <pre className="bg-slate-100 p-6 text-xs wrap-anywhere text-slate-900">
            {JSON.stringify(siteSettings, null, 2)}
          </pre>
          <Footer siteSettings={siteSettings} />
        </div>
      </body>
    </html>

    // <html
    //   lang="en"
    //   className={cn(`${siteFont.className} ${headlineFont.variable} dark h-full antialiased`)}
    //   style={cssVars as React.CSSProperties}
    // >
    //   <body
    //     className={cn(
    //       'flex min-h-screen flex-col bg-fixed antialiased p-8',
    //       'bg-primary-light dark:from-primary-dark dark:to-primary dark:bg-linear-to-b'
    //     )}
    //   >
    //     <header className="border-b border-white/10 p-6">
    //       <div className="mx-auto max-w-7xl">
    //         <h1 className="text-xl font-bold tracking-tight">MyApp</h1>
    //       </div>
    //     </header>

    //     <main className="mx-auto w-full max-w-7xl flex-1 bg-slate-200 p-6">
    //       <div className="h-[2000px] bg-red-200 text-slate-900">MAIN!</div>
    //     </main>

    //     <footer className="border-t border-white/10 p-6 text-center text-sm text-slate-500">
    //       © {new Date().getFullYear()} MyApp. All rights reserved.
    //     </footer>
    //   </body>
    // </html>
  )
}
