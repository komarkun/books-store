import { z } from '@hono/zod-openapi'

export const BookSchema = z.object({
  id: z.number().int().openapi({
    example: 1,
  }),
  title: z.string().min(3).max(50).openapi({
    example: 'Happines inside',
  }),
  price: z.number().int().positive().openapi({
    example: 50000,
  }),
  summary: z.string().min(10).max(200).openapi({
    example: 'Lorem ipsum dolor sit amet consectetur adipiscing elit quisque faucibus ex sapien vitae pellentesque sem placerat in id cursus mi pretium tellus duis convallis tempus leo eu aenean sed diam urna tempor pulvinar vivamus fringilla lacus nec metus bibendum egestas iaculis massa nisl malesuada lacinia integer nunc posuere ut hendrerit.'
  })
}).openapi('Book')

export const CreateBookSchema = z.object({
  title: z.string().min(3).max(50).openapi({
    example: 'Happines inside',
  }),
  price: z.number().int().positive().openapi({
    example: 50000,
  }),
  summary: z.string().min(10).max(200).openapi({
    example: 'Lorem ipsum dolor sit amet consectetur adipiscing elit quisque faucibus ex sapien vitae pellentesque sem placerat in id cursus mi pretium tellus duis convallis tempus leo eu aenean sed diam urna tempor pulvinar vivamus fringilla lacus nec metus bibendum egestas iaculis massa nisl malesuada lacinia integer nunc posuere ut hendrerit.'
  })
}).openapi('CreateBook')

export const ParamsSchema = z.object({
  id: z.string().openapi({
    param: {
      name: 'id',
      in: 'path',
    },
    example: '1',
  }),
})

export const UpdateBookSchema = CreateBookSchema.partial().openapi('UpdateBook')
