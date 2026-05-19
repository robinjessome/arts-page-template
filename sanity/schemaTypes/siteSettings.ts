import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  groups: [
    {
      name: 'seo',
      title: 'SEO',
    },
    {
      name: 'images',
      title: 'Images',
    },
  ],
  fields: [
    // SEO
    defineField({
      name: 'title',
      title: 'Site Title',
      type: 'string',
      group: 'seo',
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      description: 'Used for the browser title, and other SEO things',
      type: 'string',
      group: 'seo',
    }),
    defineField({
      name: 'longDescription',
      title: 'Long Description',
      description: 'Used for the browser meta-description, previews, and SEO things',
      type: 'text',
      validation: (rule) => rule.max(160).error('Max 160 characters is required'),
      group: 'seo',
    }),
    // IMAGE
    defineField({
      name: 'favicon',
      title: 'Favicon',
      description: '(Optional) Displays in the browser tab',
      type: 'image',
      // options: {
      //   hotspot: true,
      // },
    }),
  ],
})
