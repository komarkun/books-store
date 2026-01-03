import { createRoute } from '@hono/zod-openapi'
import { z } from '@hono/zod-openapi'
import { BookSchema, ParamsSchema } from "../schemas/book.schema"


// svc Get all books

export const getAllBooks = createRoute({
  method: 'get',
  path: '/',
  responses: {
    200: {
      content: {
        'application/json': {
          schema: z.object({
            books: z.array(BookSchema)
          }),
        },
      },
      description: 'Retrieve the list of expenses',
    },
  },
})

// svc Get a book by id
export const getBookById = createRoute({
  method: 'get',
  path: '/{id}',
  request: {
    params: ParamsSchema,
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: z.object({
            book: BookSchema
          }),
        },
      },
      description: 'Retrieve a single book',
    },
    404: {
      description: 'Book not found',
    },
  },
})

// svc Post a book
// svc Put a book --> modify full by id
// svc Patch a book --> modify partial id
// svc Delete a book --> by id


