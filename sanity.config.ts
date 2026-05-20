'use client'

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/admin/[[...tool]]/page.tsx` route
 */

import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { customColorPicker } from 'sanity-plugin-color-input'
import { colorInput } from '@sanity/color-input'

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { apiVersion, dataset, projectId } from './sanity/env'
import { schema } from './sanity/schemaTypes'
// import { structure } from './sanity/structure'
import { myStructure } from './structure'

export default defineConfig({
  basePath: '/admin',
  title: 'Arts Page Demo',
  projectId,
  dataset,
  // Add and edit the content schema in the './sanity/schemaTypes' folder
  schema,
  plugins: [
    colorInput(),
    // customColorPicker({
    //   colors: [
    //     // Solid colors
    //     '#6bd7ec',
    //     '#fd3663',
    //     '#ffe300',
    //     '#96f184',
    //     // // Gradient colors
    //     { hex: '#FF007F', hex2: '#7F00FF', angle: 45 },
    //     { hex: '#00F2FE', hex2: '#4FACFE', angle: 180 },
    //   ],
    // }),
    structureTool({
      structure: myStructure,
    }),
    // Vision is for querying with GROQ from inside the Studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({ defaultApiVersion: apiVersion }),
  ],
})
