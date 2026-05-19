import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

import { urlFor } from '@/sanity/lib/image'

import { client } from '@/sanity/lib/client'
import { SiteSettings } from '@/sanity.types'

import { SITE_SETTINGS_QUERY } from '@/sanity/lib/queries'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

const options = { next: { revalidate: 30 } } // 3600
const [siteSettings] = await client.fetch<SiteSettings[]>(SITE_SETTINGS_QUERY, {}, options)
const faviconUrl = siteSettings.favicon && urlFor(siteSettings.favicon).url()

export const metadata: Metadata = {
  title: `${siteSettings.title} | ${siteSettings.shortDescription}`,
  description: siteSettings.longDescription,
  icons: {
    icon: faviconUrl, // Standard favicon
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
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
