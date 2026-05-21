import { SITE_SETTINGS_QUERY_RESULT } from '@/sanity.types'

export default async function Footer({
  siteSettings,
}: {
  siteSettings: SITE_SETTINGS_QUERY_RESULT
}) {
  if (!siteSettings) return null

  const { copyrightText } = siteSettings

  return (
    <footer>
      <hr className="my-8" />
      <p>
        &copy; {new Date().getFullYear()} {copyrightText}
      </p>
    </footer>
  )
}
