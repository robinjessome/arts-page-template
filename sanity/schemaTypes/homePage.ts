import { ALL_FIELDS_GROUP, defineField, defineType } from 'sanity'
// import { CharacterCount } from '@/sanity/components/charcterCount'
// import { FontSelectPreview } from '@/sanity/components/fontSelect'

export default defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  groups: [
    // { name: 'hero', title: 'SEO' },
    // { ...ALL_FIELDS_GROUP, hidden: true },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      // group: 'seo',
    }),
  ],
})
