import { SITE_SETTINGS_QUERY_RESULT } from '@/sanity.types'
export default function Template({ siteSettings }: { siteSettings: SITE_SETTINGS_QUERY_RESULT }) {
  if (!siteSettings) return null

  const { copyrightText } = siteSettings

  return <div>Hello!</div>
}
