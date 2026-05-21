import { type SchemaTypeDefinition } from 'sanity'
import postType from './postType'
import homePage from './homePage'
import siteSettings from './siteSettings'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [siteSettings, homePage, postType],
}
