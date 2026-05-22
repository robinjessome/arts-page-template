import { PortableText, type SanityDocument } from 'next-sanity'

import { client } from '@/sanity/lib/client'
import { REVALIDATE } from '@/lib/constants'

import { HeroBanner } from '@/components'

const HOME_QUERY = `*[_type == "homePage"][0]`

const options = { next: { revalidate: REVALIDATE } }

export default async function HomePage({ params }: { params: Promise<{ slug: string }> }) {
  const page = await client.fetch<SanityDocument>(HOME_QUERY, await params, options)

  const { heroStyle, heroHeight, title, description } = page

  return (
    <>
      <HeroBanner layout={heroStyle} title={title} description={description} height={heroHeight} />
    </>
  )
}
