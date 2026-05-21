import { ALL_FIELDS_GROUP, defineField, defineType } from 'sanity'
import { CharacterCount } from '@/sanity/components/charcterCount'
import { FontSelectPreview } from '@/sanity/components/fontSelect'
import { socialLinksSchema } from '@/sanity/schemaTypes/fields/socialLinks'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  groups: [
    { name: 'general', title: 'General' },
    { name: 'headerFooter', title: 'Header & Footer' },
    { name: 'socialLinks', title: 'Social Links' },
    { name: 'fonts', title: 'Fonts' },
    { name: 'colors', title: 'Colours' },
    { name: 'images', title: 'Images' },
    { ...ALL_FIELDS_GROUP, hidden: true },
  ],
  fields: [
    // SEO
    defineField({
      name: 'title',
      title: 'Site Title',
      type: 'string',
      group: 'general',
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      description: 'Used for the browser title, site header.',
      type: 'string',
      group: 'general',
    }),
    defineField({
      name: 'longDescription',
      title: 'Long Description',
      description: 'Used for the browser meta-description, previews, and SEO things.',
      type: 'text',
      validation: (rule) => rule.max(160).error('Max 160 characters is required'),
      group: 'general',
      components: {
        input: CharacterCount,
      },
    }),
    defineField({
      name: 'favicon',
      title: 'Favicon',
      description: '(Optional) Displays in the browser tab',
      type: 'image',
      group: 'general',
    }),
    defineField({
      title: 'Colour scheme: Light or Dark? ',
      name: 'colorScheme',
      // description: '',
      type: 'string',
      group: 'general',
      initialValue: 'light',
      options: {
        list: [
          { title: 'Light', value: 'light' },
          { title: 'Dark', value: 'dark' },
        ],
        layout: 'radio',
      },
    }),

    // SOCIAL

    defineField({
      name: 'socialLinksLabel',
      title: 'Social Links: Label',
      type: 'string',
      group: 'socialLinks',
    }),
    socialLinksSchema,

    // FONTS & COLOURS
    defineField({
      name: 'siteFont',
      title: 'Main Font',
      type: 'string',
      group: 'fonts',
      components: {
        input: FontSelectPreview,
      },
    }),
    defineField({
      name: 'headlineFont',
      title: 'Headline Font',
      type: 'string',
      group: 'fonts',
      components: {
        input: FontSelectPreview,
      },
    }),
    defineField({
      title: 'Header/Footer colour',
      name: 'headerFooterColour',
      description: 'Use this to set the font colour for header / footer text',
      type: 'string',
      group: 'colors',
      initialValue: 'light',
      options: {
        list: [
          { title: 'Light', value: 'light' },
          { title: 'Dark', value: 'dark' },
        ],
        layout: 'radio', // <-- defaults to 'dropdown'
      },
    }),
    defineField({
      name: 'primaryColor',
      title: 'Primary color',
      type: 'color',
      options: {
        disableAlpha: true,
      },
      group: 'colors',
    }),
    defineField({
      name: 'secondaryColor',
      title: 'Secondary color',
      type: 'color',
      options: {
        disableAlpha: true,
      },
      group: 'colors',
    }),
    defineField({
      name: 'accentColor',
      title: 'Accent color',
      type: 'color',
      options: {
        disableAlpha: true,
      },
      group: 'colors',
    }),

    // HEADER
    defineField({
      name: 'showTagline',
      title: 'Show logo tagline?',
      description: 'Show or hide the tagline beside the title/logo.',
      type: 'boolean',
      group: 'headerFooter',
    }),
    defineField({
      name: 'headerVerticalAlignment',
      title: 'Header Vertical Alignment',
      description: 'Use this to adjust the vertical alignement of the header logo / menu',
      type: 'string',
      group: 'headerFooter',
      initialValue: 'bottom',
      options: {
        list: [
          { title: 'Top', value: 'top' },
          { title: 'Middle', value: 'middle' },
          { title: 'Bottom', value: 'bottom' },
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'logo',
      type: 'image',
      group: 'headerFooter',
      // options: {
      //   hotspot: false
      // },
    }),

    // FOOTER
    defineField({
      name: 'copyrightText',
      title: 'Copyright Text',
      type: 'string',
      group: 'headerFooter',
    }),
  ],
})
