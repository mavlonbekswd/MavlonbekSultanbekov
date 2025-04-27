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
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'uzTitle',
        maxLength: 96,
      },
    }),
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
  ],
})
