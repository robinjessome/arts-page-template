import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

import { urlFor } from '@/sanity/lib/image'
import { client } from '@/sanity/lib/client'
import { SITE_SETTINGS_QUERY } from '@/sanity/lib/queries'

// 1. Move configuration options to the top level
const FETCH_OPTIONS = { next: { revalidate: 30 } }

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

// 2. Use generateMetadata to handle the fetch safely and dynamically
export async function generateMetadata(): Promise<Metadata> {
  // Notice we removed the brackets [] because the query returns a single object
  const [siteSettings] = await client.fetch(SITE_SETTINGS_QUERY, {}, FETCH_OPTIONS)
  const faviconUrl = siteSettings?.favicon ? urlFor(siteSettings.favicon).url() : undefined

  return {
    title: `${siteSettings?.title ?? 'Default'} | ${siteSettings?.shortDescription ?? ''}`,
    description: siteSettings?.longDescription,
    icons: {
      icon: faviconUrl,
    },
  }
}

// 3. Keep your Layout Component clean
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // Fetching the data again here is completely fine; Next.js automatically dedupes
  // duplicate fetch calls so it won't hit Sanity twice.
  const [siteSettings] = await client.fetch(SITE_SETTINGS_QUERY, {}, FETCH_OPTIONS)

  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        {children}
        <hr className="my-12" />
        <pre className="text-xs">{JSON.stringify(siteSettings, null, 2)}</pre>
      </body>
    </html>
  )
}
