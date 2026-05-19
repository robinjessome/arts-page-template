import { type SchemaTypeDefinition } from 'sanity'
import postType from './postType'
import siteSettings from './siteSettings'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [siteSettings, postType],
}
