import Link from 'next/link'
import { SITE_SETTINGS_QUERY_RESULT } from '@/sanity.types'

export default async function Header({
  siteSettings,
}: {
  siteSettings: SITE_SETTINGS_QUERY_RESULT
}) {
  if (!siteSettings) return null

  const { title } = siteSettings
  return (
    <header className="mb-2 flex items-end justify-between">
      <div>
        <Link href="/" className="hover:text-primary focus-visible::outline-1">
          <h1 className="text-5xl font-bold">{title}</h1>
        </Link>
      </div>
      <div>right</div>
    </header>
  )
}
