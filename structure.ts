import { type StructureResolver } from 'sanity/structure'

export const myStructure: StructureResolver = (S) =>
  S.list()
    .title('Base')
    .items([
      // Singleton item for Site Settings
      S.listItem()
        .title('Site Settings')
        .child(S.document().schemaType('siteSettings').documentId('siteSettings')),

      ...S.documentTypeListItems().filter((listItem) => {
        const id = listItem.getId()
        return id ? !['siteSettings'].includes(id) : false
      }),
    ])
