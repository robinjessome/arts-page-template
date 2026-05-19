import { defineQuery } from 'next-sanity'

export const SITE_SETTINGS_QUERY = defineQuery(`*[_type == "siteSettings"]`)

export const POST_QUERY = defineQuery(
  `*[_type == "post" && slug.current == $slug][0]{
    title, body, mainImage
  }`
)
