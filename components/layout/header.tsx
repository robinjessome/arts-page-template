import Link from 'next/link'
import { SITE_SETTINGS_QUERY_RESULT } from '@/sanity.types'

export default async function Header({
  siteSettings,
}: {
  siteSettings: SITE_SETTINGS_QUERY_RESULT
}) {
  if (!siteSettings) return null

  const { title, shortDescription } = siteSettings
  return (
    <header className="mb-2">
      <div className="flex items-end justify-between">
        <div className="flex items-end gap-4">
          <Link href="/" className="hover:text-primary focus-visible::outline-1">
            <h1 className="text-5xl font-bold">{title}</h1>
          </Link>
          {shortDescription && <p className="text-primary-dark/66 text-lg">{shortDescription}</p>}
        </div>
        <div className="text-lg font-semibold tracking-wider">RIGHT</div>
      </div>
    </header>
  )
}
