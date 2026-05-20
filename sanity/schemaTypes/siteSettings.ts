import { ALL_FIELDS_GROUP, defineField, defineType } from 'sanity'
import { CharacterCount } from '@/sanity/components/charcterCount'
import { FontSelectPreview } from '@/sanity/components/fontSelect'

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
      name: 'fontColour',
      title: 'Fonts & Colours',
    },
    {
      name: 'images',
      title: 'Images',
    },
    {
      ...ALL_FIELDS_GROUP,
      hidden: true,
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
      description: 'Used for the browser meta-description, previews, and SEO things.',
      type: 'text',
      validation: (rule) => rule.max(160).error('Max 160 characters is required'),
      group: 'seo',
      components: {
        input: CharacterCount,
      },
    }),
    // FONTS
    defineField({
      name: 'siteFont',
      title: 'Select Font',
      type: 'string',
      group: 'fontColour',
      components: {
        input: FontSelectPreview,
      },
    }),
    // IMAGE
    defineField({
      name: 'favicon',
      title: 'Favicon',
      description: '(Optional) Displays in the browser tab',
      type: 'image',
      group: 'images',
      // options: {
      //   hotspot: true,
      // },
    }),
    defineField({
      name: 'primaryColor',
      title: 'Primary color',
      type: 'color',
      options: {
        disableAlpha: true,
      },
      group: 'fontColour',
    }),
    defineField({
      name: 'secondaryColor',
      title: 'Secondary color',
      type: 'color',
      options: {
        disableAlpha: true,
      },
      group: 'fontColour',
    }),
    defineField({
      name: 'accentColor',
      title: 'Accent color',
      type: 'color',
      options: {
        disableAlpha: true,
      },
      group: 'fontColour',
    }),
    // defineField({
    //   name: 'accentColor',
    //   title: 'Accent Color',
    //   type: 'color',
    //   group: 'fontColour',
    // }),
  ],
})
