import { createRoute } from '@hono/zod-openapi'
import { z } from '@hono/zod-openapi'
import { BookSchema, ParamsSchema, CreateBookSchema } from "../schemas/book.schema"


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
export const createBook = createRoute({
  method: 'post',
  path: '/',
  request: {
    body: {
      content: {
        'application/json': {
          schema: CreateBookSchema,
        },
      },
    },
  },
  responses: {
    201: {
      content: {
        'application/json': {
          schema: BookSchema,
        },
      },
      description: 'The created book',
    },
  },
})

// svc Put a book --> modify full by id
// svc Patch a book --> modify partial id
// svc Delete a book --> by id


