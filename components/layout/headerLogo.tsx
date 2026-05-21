// 'use client'
import Link from 'next/link'
import Image from 'next/image'
// import { usePathname } from 'next/navigation'

export default function HeaderLogo({
  logo,
  title,
  tagline,
}: {
  logo?: string
  title: string
  tagline?: string
}) {
  //   const pathname = usePathname()
  //   const isHomepage = pathname === '/'

  //   if (isHomepage) return null

  return (
    <>
      <Link href="/" className="hover:text-primary focus-visible::outline-1">
        {logo ? (
          <div className="h-16 w-auto">
            <Image
              alt={title || ''}
              src={logo}
              height={64}
              width={400}
              className="h-full w-auto object-contain"
              priority={true}
            />
          </div>
        ) : (
          title && <h1 className="font-headline text-5xl font-bold">{title}</h1>
        )}
      </Link>
      {tagline && (
        <p className="text-primary-dark/66 dark:text-primary-light/66 text-lg">{tagline}</p>
      )}
    </>
  )
}
