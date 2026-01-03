import { OpenAPIHono } from '@hono/zod-openapi'
import { z } from '@hono/zod-openapi'
import { bearerAuthMiddleware } from "../../middlewares/bearer.middlewares.ts"
import { getAllBooks, getBookById, createBook, updateBook, updateBookPatched, deleteBookById } from "../../services/v2/book.service"
import { sql } from "../../config/db"
import { BookSchema } from "../../schemas/v2/book.schema"

type Book = z.infer<typeof BookSchema>
type BookRow = Omit<Book, 'created_at' | 'updated_at'> & {
  created_at: string | Date
  updated_at: string | Date
}

const serializeBook = (book: BookRow): Book => ({
  ...book,
  created_at: new Date(book.created_at).toISOString(),
  updated_at: new Date(book.updated_at).toISOString(),
})

const bookRouterV2 = new OpenAPIHono()

bookRouterV2.openAPIRegistry.registerComponent(
  'securitySchemes',
  'Bearer',
  {
    type: 'http',
    scheme: 'bearer',
    bearerFormat: 'JWT',
  }
)

bookRouterV2.use('/*', bearerAuthMiddleware)

bookRouterV2.openapi(getAllBooks, async (c) => {
  try {
    const books = await sql<BookRow[]>`SELECT id, title, price, summary, created_at, updated_at FROM books ORDER BY id`
    return c.json({ books: books.map(serializeBook) }, 200)
  } catch (error) {
    console.error('Error fetching books (v2):', error)
    return c.json({ message: 'Internal Server Error' }, 500)
  }
})

bookRouterV2.openapi(getBookById, async (c) => {
  const { id: idParam } = c.req.valid('param')
  const id = Number.parseInt(idParam)

  try {
    const [book] = await sql<BookRow[]>`SELECT id, title, price, summary, created_at, updated_at FROM books WHERE id = ${id} LIMIT 1`
    if (!book) {
      return c.json({ message: 'Book not found' }, 404)
    }
    return c.json({ book: serializeBook(book) }, 200)
  } catch (error) {
    console.error('Error fetching book by id (v2):', error)
    return c.json({ message: 'Internal Server Error' }, 500)
  }
})

bookRouterV2.openapi(createBook, async (c) => {
  const data = c.req.valid('json')

  try {
    const [book] = await sql<BookRow[]>`
      INSERT INTO books (title, price, summary)
      VALUES (${data.title}, ${data.price}, ${data.summary})
      RETURNING id, title, price, summary, created_at, updated_at
    `
    if (!book) {
      return c.json({ message: 'Internal Server Error' }, 500)
    }
    return c.json({ book: serializeBook(book) }, 201)
  } catch (error) {
    console.error('Error creating book (v2):', error)
    return c.json({ message: 'Internal Server Error' }, 500)
  }
})

bookRouterV2.openapi(updateBook, async (c) => {
  const { id: idParam } = c.req.valid('param')
  const id = Number.parseInt(idParam)
  const data = c.req.valid('json')

  try {
    const [updated] = await sql<BookRow[]>`
      UPDATE books
      SET title = ${data.title}, price = ${data.price}, summary = ${data.summary}, updated_at = NOW()
      WHERE id = ${id}
      RETURNING id, title, price, summary, created_at, updated_at
    `

    if (!updated) {
      return c.json({ message: 'Book not found' }, 404)
    }

    return c.json(serializeBook(updated), 200)
  } catch (error) {
    console.error('Error updating book (v2):', error)
    return c.json({ message: 'Internal Server Error' }, 500)
  }
})

bookRouterV2.openapi(updateBookPatched, async (c) => {
  const { id: idParam } = c.req.valid('param')
  const id = Number.parseInt(idParam)
  const data = c.req.valid('json')

  try {
    const [existing] = await sql<BookRow[]>`SELECT id, title, price, summary, created_at, updated_at FROM books WHERE id = ${id} LIMIT 1`
    if (!existing) {
      return c.json({ message: 'Book not found' }, 404)
    }

    const nextValues = {
      title: data.title ?? existing.title,
      price: data.price ?? existing.price,
      summary: data.summary ?? existing.summary,
    }

    const [updated] = await sql<BookRow[]>`
      UPDATE books
      SET title = ${nextValues.title},
          price = ${nextValues.price},
          summary = ${nextValues.summary},
          updated_at = NOW()
      WHERE id = ${id}
      RETURNING id, title, price, summary, created_at, updated_at
    `

    if (!updated) {
      return c.json({ message: 'Internal Server Error' }, 500)
    }

    return c.json(serializeBook(updated), 200)
  } catch (error) {
    console.error('Error patching book (v2):', error)
    return c.json({ message: 'Internal Server Error' }, 500)
  }
})

bookRouterV2.openapi(deleteBookById, async (c) => {
  const { id: idParam } = c.req.valid('param')
  const id = Number.parseInt(idParam)

  try {
    const [deleted] = await sql<BookRow[]>`
      DELETE FROM books
      WHERE id = ${id}
      RETURNING id, title, price, summary, created_at, updated_at
    `

    if (!deleted) {
      return c.json({ message: 'Book not found' }, 404)
    }
    return c.json(serializeBook(deleted), 200)
  } catch (error) {
    console.error('Error deleting book (v2):', error)
    return c.json({ message: 'Internal Server Error' }, 500)
  }
})

export default bookRouterV2
