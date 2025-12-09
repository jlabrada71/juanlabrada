import { defineContentConfig, defineCollection } from '@nuxt/content'
import { z } from 'zod'

export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: 'page',
      source: '**/*.md'
    }),
    blog: defineCollection({
      type: 'page',
      source: 'blog/*.md',
      schema: z.object({
        tags: z.array(z.string()),
        image: z.string(),
        slug: z.string(),
        date: z.date()
      })
    })
  }
})