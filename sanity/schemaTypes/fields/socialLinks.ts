import { defineField, defineArrayMember } from 'sanity'

export const socialLinksSchema = defineField({
  name: 'socialLinks',
  title: 'Social Media Links',
  type: 'array',
  group: 'socialLinks',
  description: 'Add your social media profiles here.',
  of: [
    defineArrayMember({
      type: 'object',
      name: 'socialLink',
      title: 'Social Link',
      fields: [
        defineField({
          name: 'platform',
          title: 'Platform',
          type: 'string',
          validation: (Rule) => Rule.required(),
          options: {
            // This turns the field into a dropdown/select component
            list: [
              { title: 'Apple Music', value: 'apple' },
              { title: 'Bandcamp', value: 'bandcamp' },
              { title: 'Facebook', value: 'facebook' },
              { title: 'Instagram', value: 'instagram' },
              { title: 'LinkedIn', value: 'linkedin' },
              { title: 'Pinterest', value: 'pinterest' },
              { title: 'SoundCloud', value: 'soundcloud' },
              { title: 'Spotify', value: 'spotify' },
              { title: 'TikTok', value: 'tiktok' },
              { title: 'Tidal', value: 'tidal' },
              { title: 'X (formerly Twitter)', value: 'x' },
              { title: 'YouTube', value: 'youtube' },
            ],
            // Optional: 'dropdown' is default, but 'radio' layout can be used for short lists
            layout: 'dropdown',
          },
        }),
        defineField({
          name: 'handle',
          title: 'Handle',
          type: 'string',
          description: 'Your username (e.g., jazzinhalifax)',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'url',
          title: 'URL',
          type: 'url',
          description: 'The full link to your profile',
          validation: (Rule) =>
            Rule.required().uri({
              scheme: ['http', 'https'],
            }),
        }),
      ],
      // This styles the card preview within the Sanity Studio list view
      preview: {
        select: {
          title: 'platform',
          subtitle: 'handle',
        },
        prepare({ title, subtitle }) {
          return {
            title: title ? title.charAt(0).toUpperCase() + title.slice(1) : 'Select a platform...',
            subtitle: subtitle ? `@${subtitle}` : '',
          }
        },
      },
    }),
  ],
})
