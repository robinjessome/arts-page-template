import { SITE_SETTINGS_QUERY_RESULT } from '@/sanity.types'
export default function Template({ siteSettings }: { siteSettings: SITE_SETTINGS_QUERY_RESULT }) {
  if (!siteSettings) return null

  return <div>Hello!</div>
}
