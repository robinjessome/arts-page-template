import { urlFor } from '@/sanity/lib/image'
import { cn } from '@/lib/helpers'
import { HeaderLogo } from '@/components'

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
          <HeaderLogo title={title} logo={logoUrl} tagline={showTagline ? tagline : ''} />
        </div>
        <div className="text-lg font-semibold tracking-wider">RIGHT</div>
      </div>
    </header>
  )
}
