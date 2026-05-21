import { ALL_FIELDS_GROUP, defineField, defineArrayMember, defineType } from 'sanity'
import { CharacterCount } from '@/sanity/components/charcterCount'
import { FontSelectPreview } from '@/sanity/components/fontSelect'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  groups: [
    { name: 'seo', title: 'SEO' },
    { name: 'social', title: 'Social Media' },
    { name: 'streaming', title: 'Streaming Platforms' },
    { name: 'fontColour', title: 'Fonts & Colours' },
    { name: 'images', title: 'Images' },
    { name: 'headerFooter', title: 'Header & Footer' },
    { ...ALL_FIELDS_GROUP, hidden: true },
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

    // SOCIAL

    defineField({
      name: 'socialMedia',
      title: 'Social Media',
      type: 'object',
      group: 'social',
      // fieldsets: [
      //   { name: 'social', title: 'Social media' },
      //   { name: 'streaming', title: 'Streaming platforms' },
      // ],
      fields: [
        {
          title: 'YouTube',
          name: 'youtube',
          type: 'object',
          options: { columns: 2 },
          fields: [
            { name: 'handle', type: 'string' },
            { name: 'url', type: 'url' },
          ],
        },
        {
          title: 'Twitter',
          name: 'twitter',
          type: 'object',
          options: { columns: 2 },
          fields: [
            { name: 'handle', type: 'string' },
            { name: 'url', type: 'url' },
          ],
        },
        {
          title: 'Instagram',
          name: 'instagram',
          type: 'object',
          options: { columns: 2 },
          fields: [
            { name: 'handle', type: 'string' },
            { name: 'url', type: 'url' },
          ],
        },
        {
          title: 'Facebook',
          name: 'facebook',
          type: 'object',
          options: { columns: 2 },
          fields: [
            { name: 'handle', type: 'string' },
            { name: 'url', type: 'url' },
          ],
        },
      ],
    }),

    // STREAMING
    defineField({
      name: 'streaming',
      title: 'Streaming Platforms',
      type: 'object',
      group: 'streaming',
      fields: [
        {
          title: 'Bandcamp',
          name: 'bandcamp',
          type: 'object',
          options: { columns: 2 },
          fields: [
            { name: 'handle', type: 'string' },
            { name: 'url', type: 'url' },
          ],
        },
        {
          title: 'Spotify',
          name: 'spotify',
          type: 'object',
          options: { columns: 2 },
          fields: [
            { name: 'handle', type: 'string' },
            { name: 'url', type: 'url' },
          ],
        },
      ],
    }),

    // defineField({
    //   title: 'Example object list',
    //   type: 'array',
    //   name: 'example',
    //   group: 'social',
    //   of: [
    //     defineArrayMember({
    //       type: 'object',
    //       name: 'linkItem',
    //       title: 'Link Item',
    //       fields: [
    //         { name: 'name', type: 'string', title: 'Name' },
    //         {
    //           name: 'url',
    //           type: 'string',
    //           title: 'URL',
    //           validation: (Rule) =>
    //             Rule.uri({
    //               scheme: ['http', 'https'], // Enforces a valid web URL format
    //             }),
    //         },
    //       ],
    //     }),
    //   ],
    // }),
    // FONTS & COLOURS
    defineField({
      name: 'siteFont',
      title: 'Select Font',
      type: 'string',
      group: 'fontColour',
      components: {
        input: FontSelectPreview,
      },
    }),
    defineField({
      title: 'Header/Footer colour',
      name: 'headerFooterColour',
      description: 'Use this to set the font colour for header / footer text',
      type: 'string',
      group: 'fontColour',
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
      name: 'copyrightText',
      title: 'Copyright Text',
      type: 'string',
      group: 'headerFooter',
    }),
  ],
})
