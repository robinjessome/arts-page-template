import { ALL_FIELDS_GROUP, defineField, defineType } from 'sanity'

export default defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  groups: [
    { name: 'hero', title: 'hero' },
    // { ...ALL_FIELDS_GROUP, hidden: true },
  ],

  //  layout?: 'gradientPrimary' | 'gradientAccent' | 'imageFull' | 'imageHalf'

  fields: [
    defineField({
      title: 'Hero Style',
      name: 'heroStyle',
      // description: '',
      type: 'string',
      group: 'hero',
      initialValue: 'gradientPrimary',
      options: {
        list: [
          { title: 'Gradient (Primary)', value: 'gradientPrimary' },
          { title: 'Gradient (Accent)', value: 'gradientAccent' },
          { title: 'Image (Duplex)', value: 'imageHalf' },
          { title: 'Image (Full Width)', value: 'imageFull' },
        ],
        layout: 'radio',
      },
    }),
    defineField({
      title: 'Hero Height',
      name: 'heroHeight',
      description: 'Short will show only the title. Medium / Tall inslude also the description',
      type: 'string',
      group: 'hero',
      initialValue: 'md',
      options: {
        list: [
          { title: 'Short (title only)', value: 'short' },
          { title: 'Medium', value: 'md' },
          { title: 'Tall', value: 'tall' },
        ],
        layout: 'radio',
      },
    }),
    defineField({
      title: 'Hero Image',
      name: 'heroImage',
      type: 'image',
      group: 'hero',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'title',
      title: 'Hero Title',
      type: 'string',
      group: 'hero',
    }),
    defineField({
      name: 'description',
      title: 'Hero Description',
      type: 'text',
      group: 'hero',
    }),
  ],
})
