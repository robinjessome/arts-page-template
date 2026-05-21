import Link from 'next/link'
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
      <audio controls>
        <source src="http://www.sousound.com/music/healing/healing_01.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      <Link href="/kitchen-sink">Kitchen Sink...</Link>
      <p>
        &copy; {new Date().getFullYear()} {copyrightText}
      </p>
    </footer>
  )
}
