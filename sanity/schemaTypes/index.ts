import { type SchemaTypeDefinition } from 'sanity'
import postType from './postType'
import pageType from './pageType'
import homePage from './homePage'
import siteSettings from './siteSettings'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [siteSettings, homePage, pageType, postType],
}
