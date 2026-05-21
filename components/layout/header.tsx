import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import { cn } from '@/lib/helpers'

import { SITE_SETTINGS_QUERY_RESULT } from '@/sanity.types'

export default async function Header({
  siteSettings,
}: {
  siteSettings: SITE_SETTINGS_QUERY_RESULT
}) {
  if (!siteSettings) return null

  const {
    title = '',
    logo,
    tagline,
    showTagline,
    headerVerticalAlignment = 'bottom',
  } = siteSettings
  const logoUrl = logo && urlFor(logo).url()

  const verticalAlignment = {
    top: 'items-start',
    middle: 'items-center',
    bottom: 'items-end',
  }
  const headerVerticalAlignmentClass = verticalAlignment[headerVerticalAlignment]

  return (
    <header className="border-primary/15 mb-4 border-b pb-4">
      <div className={cn('flex justify-between', headerVerticalAlignmentClass)}>
        <div className={cn('flex gap-4', headerVerticalAlignmentClass)}>
          <Link href="/" className="hover:text-primary focus-visible::outline-1">
            {logoUrl ? (
              <div className="h-16 w-auto">
                <Image
                  alt={title}
                  src={logoUrl}
                  height={64}
                  width={400}
                  className="h-full w-auto object-contain"
                  priority={true}
                />
              </div>
            ) : (
              title && <h1 className="text-5xl font-bold">{title}</h1>
            )}
          </Link>
          {tagline && showTagline && (
            <p className="text-primary-dark/66 dark:text-primary-light/66 text-lg">{tagline}</p>
          )}
        </div>
        <div className="text-lg font-semibold tracking-wider">RIGHT</div>
      </div>
    </header>
  )
}
