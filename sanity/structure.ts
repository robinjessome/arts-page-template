import type { StructureResolver } from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Base')
    .items([
      // Singleton item for Site Settings
      S.listItem()
        .title('Site Settings')
        .child(S.document().schemaType('siteSettings').documentId('siteSettings')),

      S.listItem()
        .title('Home Page')
        .id('homePage')
        .child(S.document().schemaType('homePage').documentId('homePage')),

      ...S.documentTypeListItems().filter((listItem) => {
        const id = listItem.getId()
        return id ? !['siteSettings', 'homePage'].includes(id) : false
      }),
    ])
