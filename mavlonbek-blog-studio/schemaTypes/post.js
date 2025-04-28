import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    defineField({
      name: 'uzTitle',
      title: 'Title (Uzbek)',
      type: 'string',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
    }),
    defineField({
      name: 'views',
      title: 'Views',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'likes',
      title: 'Likes',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'ruTitle',
      title: 'Title (Russian)',
      type: 'string',
    }),
    defineField({
      name: 'enTitle',
      title: 'Title (English)',
      type: 'string',
    }),

    // 🔥 Yangi qism: Excerpt (short description)
    defineField({
      name: 'uzExcerpt',
      title: 'Excerpt (Uzbek)',
      type: 'text',
      description: 'Qisqacha tavsif (Uzbek).',
      validation: (Rule) => Rule.max(160).warning('160 ta belgi faqat.') // SEO uchun optimal
    }),
    defineField({
      name: 'ruExcerpt',
      title: 'Excerpt (Russian)',
      type: 'text',
      description: 'Qisqacha tavsif (Russian).',
      validation: (Rule) => Rule.max(160).warning('160 ta belgidan oshmaydi.')
    }),
    defineField({
      name: 'enExcerpt',
      title: 'Excerpt (English)',
      type: 'text',
      description: 'Qisqacha tavsif (English).',
      validation: (Rule) => Rule.max(160).warning('160 ta belgidan oshmaydi.')
    }),
    // 🔥 Tugadi

    
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'category' } }],
    }),
    defineField({
      name: 'uzContent',
      title: 'Content (Uzbek)',
      type: 'blockContent',
    }),
    defineField({
      name: 'ruContent',
      title: 'Content (Russian)',
      type: 'blockContent',
    }),
    defineField({
      name: 'enContent',
      title: 'Content (English)',
      type: 'blockContent',
    }),

    defineField({
      name: 'uzSlug',
      title: 'Slug (Uzbek)',
      type: 'slug',
      options: {
        source: 'uzTitle',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'ruSlug',
      title: 'Slug (Russian)',
      type: 'slug',
      options: {
        source: 'ruTitle',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'enSlug',
      title: 'Slug (English)',
      type: 'slug',
      options: {
        source: 'enTitle',
        maxLength: 96,
      },
    }),
  ],
})