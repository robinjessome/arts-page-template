// list: [
//               { title: 'Instagram', value: 'instagram' },
//               { title: 'YouTube', value: 'youtube' },
//               { title: 'Facebook', value: 'facebook' },
//               { title: 'X (formerly Twitter)', value: 'x' },
//               { title: 'TikTok', value: 'tiktok' },
//               { title: 'LinkedIn', value: 'linkedin' },
//               { title: 'Bandcamp', value: 'bandcamp' },
//               { title: 'Spotify', value: 'spotify' },
//               { title: 'Apple Music', value: 'appleMusic' },
//               { title: 'Tidal', value: 'tidal' },
//             ],

import {
  IconBrandAppleFilled,
  IconBrandBandcamp,
  IconBrandFacebookFilled,
  IconBrandInstagram,
  IconBrandLinkedinFilled,
  IconBrandPinterestFilled,
  IconBrandSoundcloud,
  IconBrandSpotifyFilled,
  IconBrandTidal,
  IconBrandTiktokFilled,
  IconBrandX,
  IconBrandYoutubeFilled,
} from '@tabler/icons-react'

const iconOptions = {
  size: 20,
}

const socialPlatforms = {
  apple: {
    name: 'Apple Music',
    icon: <IconBrandAppleFilled {...iconOptions} />,
  },
  bandcamp: {
    name: 'Bandcamp',
    icon: <IconBrandBandcamp {...iconOptions} />,
  },
  facebook: {
    name: 'Facebook',
    icon: <IconBrandFacebookFilled {...iconOptions} />,
  },
  instagram: {
    name: 'Instagram',
    icon: <IconBrandInstagram {...iconOptions} />,
  },
  linkedin: {
    name: 'LinkedIn',
    icon: <IconBrandLinkedinFilled {...iconOptions} />,
  },
  pinterest: {
    name: 'Pinterest',
    icon: <IconBrandPinterestFilled {...iconOptions} />,
  },
  soundcloud: {
    name: 'SoundCloud',
    icon: <IconBrandSoundcloud {...iconOptions} />,
  },
  spotify: {
    name: 'Spotify',
    icon: <IconBrandSpotifyFilled {...iconOptions} />,
  },
  tidal: {
    name: 'Tidal',
    icon: <IconBrandTidal {...iconOptions} />,
  },
  tiktok: {
    name: 'TikTok',
    icon: <IconBrandTiktokFilled {...iconOptions} />,
  },
  x: {
    name: 'X (Twitter)',
    icon: <IconBrandX {...iconOptions} />,
  },
  youtube: {
    name: 'YouTube',
    icon: <IconBrandYoutubeFilled {...iconOptions} />,
  },
} as const

export type AllowedPlatforms = keyof typeof socialPlatforms

export interface SocialLinkItem<
  Platform extends string = AllowedPlatforms,
  MetaType extends string = string,
> {
  _key: string
  _type: MetaType
  handle?: string
  platform?: Platform
  url?: string
}

export interface SocialLinksProps {
  label?: string
  links: SocialLinkItem[]
}

export default function SocialLinksList({ label, links }: SocialLinksProps) {
  if (!links) return null

  return (
    <div className="flex items-center gap-4">
      {label && <span className="text-sm">{label}</span>}
      <ul className="flex gap-2">
        {links.map((link) => {
          if (!link.platform) return null

          const platformConfig = socialPlatforms[link.platform]

          if (!platformConfig) {
            console.warn(`Missing UI configuration for platform: ${link.platform}`)
            return null
          }

          const { _key, url, handle } = link
          const { name, icon } = platformConfig

          return (
            <li key={_key}>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Link to: ${handle} on ${name}`}
                className="hover:text-primary dark:hover:text-accent focus-visible:text-primary dasrk:focus-visible:text-accent"
              >
                {icon}
                <span className="sr-only">{`${handle} on ${name}`}</span>
              </a>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
