import { PortableText, type SanityDocument } from 'next-sanity'

import { client } from '@/sanity/lib/client'
import { REVALIDATE } from '@/lib/constants'

const POST_QUERY = `*[_type == "page" && slug.current == $slug][0]`

const options = { next: { revalidate: REVALIDATE } }

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const page = await client.fetch<SanityDocument>(POST_QUERY, await params, options)

  return (
    <div>
      <p className="text-xl font-light">{page.title}</p>
    </div>
  )
}
