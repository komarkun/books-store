import { createRoute } from '@hono/zod-openapi'
import { z } from '@hono/zod-openapi'
import { BookSchema, ParamsSchema, CreateBookSchema, UpdateBookSchema, ErrorSchema } from "../../schemas/v1/book.schema"


// svc Get all books

export const getAllBooks = createRoute({
  tags: ['get'],
  method: 'get',
  path: '/',
  security: [
    {
      Bearer: [],
    },
  ],
  responses: {
    200: {
      content: {
        'application/json': {
          schema: z.object({
            books: z.array(BookSchema)
          }),
        },
      },
      description: 'Retrieve the list of books from the store',
    },
    500: {
      content: {
        'application/json': {
          schema: ErrorSchema,
        },
      },
      description: 'Internal Server Error',
    },
  },
})

// svc Get a book by id
export const getBookById = createRoute({
  tags: ['get'],
  method: 'get',
  path: '/{id}',
  request: {
    params: ParamsSchema,
  },
  security: [
    {
      Bearer: [],
    },
  ],
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
      content: {
        'application/json': {
          schema: ErrorSchema,
        },
      },
      description: 'Book not found',
    },
    500: {
      content: {
        'application/json': {
          schema: ErrorSchema,
        },
      },
      description: 'Internal Server Error',
    },
  },
})

// svc Post a book
export const createBook = createRoute({
  tags: ['create'],
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
  security: [
    {
      Bearer: [],
    },
  ],
  responses: {
    201: {
      content: {
        'application/json': {
          schema: z.object({
            book: BookSchema
          })
        },
      },
      description: 'The created book',
    },
    500: {
      content: {
        'application/json': {
          schema: ErrorSchema,
        },
      },
      description: 'Internal Server Error',
    },
  },
})

// svc Put a book --> modify full by id
export const updateBook = createRoute({
  tags: ['update'],
  method: 'put',
  path: '/{id}',
  request: {
    params: ParamsSchema,
    body: {
      content: {
        'application/json': {
          schema: CreateBookSchema,
        },
      },
    },
  },
  security: [
    {
      Bearer: [],
    },
  ],
  responses: {
    200: {
      content: {
        'application/json': {
          schema: BookSchema,
        },
      },
      description: 'The updated book',
    },
    404: {
      content: {
        'application/json': {
          schema: ErrorSchema,
        },
      },
      description: 'Book not found',
    },
    500: {
      content: {
        'application/json': {
          schema: ErrorSchema,
        },
      },
      description: 'Internal Server Error',
    },
  },
})

// svc Patch a book --> modify partial id
export const updateBookPatched = createRoute({
  tags: ['update'],
  method: 'patch',
  path: '/{id}',
  request: {
    params: ParamsSchema,
    body: {
      content: {
        'application/json': {
          schema: UpdateBookSchema,
        },
      },
    },
  },
  security: [
    {
      Bearer: [],
    },
  ],
  responses: {
    200: {
      content: {
        'application/json': {
          schema: BookSchema,
        },
      },
      description: 'The patched Book',
    },
    404: {
      content: {
        'application/json': {
          schema: ErrorSchema,
        },
      },
      description: 'Book not found',
    },
    500: {
      content: {
        'application/json': {
          schema: ErrorSchema,
        },
      },
      description: 'Internal Server Error',
    },
  },
})
// svc Delete a book --> by id
export const deleteBookById = createRoute({
  tags: ['delete'],
  method: 'delete',
  path: '/{id}',
  request: {
    params: ParamsSchema,
  },
  security: [
    {
      Bearer: [],
    },
  ],
  responses: {
    200: {
      content: {
        'application/json': {
          schema: BookSchema,
        },
      },
      description: 'The deleted book',
    },
    404: {
      content: {
        'application/json': {
          schema: ErrorSchema,
        },
      },
      description: 'Book not found',
    },
    500: {
      content: {
        'application/json': {
          schema: ErrorSchema,
        },
      },
      description: 'Internal Server Error',
    },
  },
})
