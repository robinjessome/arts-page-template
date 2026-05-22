'use client'

import Link from 'next/link'
import { SITE_SETTINGS_QUERY_RESULT } from '@/sanity.types'
import { SocialLinks, AudioPlayer } from '@/components'
export default function Footer({ siteSettings }: { siteSettings: SITE_SETTINGS_QUERY_RESULT }) {
  if (!siteSettings) return null

  const { copyrightText, socialLinksLabel, socialLinks = [] } = siteSettings

  return (
    <footer className="border-primary/15 pt-4">
      <div className="flex justify-between text-sm">
        <div>
          <p>
            &copy; {new Date().getFullYear()} {copyrightText}{' '}
            <Link href="/kitchen-sink">Kitchen Sink...</Link>
          </p>
          {/* <audio controls>
            <source src="http://www.sousound.com/music/healing/healing_01.mp3" type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio> */}
        </div>
        <SocialLinks label={socialLinksLabel} links={socialLinks} />
      </div>
      <hr className="my-12" />
      <AudioPlayer />
    </footer>
  )
}
