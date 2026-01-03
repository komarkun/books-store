import { OpenAPIHono } from '@hono/zod-openapi'
import { getAllBooks, getBookById } from "../services/book.service"
import fakeBooks from "../config/db.fake"

const bookRouter = new OpenAPIHono()

// Route to GET all books
bookRouter.openapi(getAllBooks, (c) => {
  return c.json({ books: fakeBooks }, 200)
})

// Route to GET a book by id
bookRouter.openapi(getBookById, (c) => {
  const { id: idParam } = c.req.valid('param')
  const id = Number.parseInt(idParam)
  const book = fakeBooks.find(e => e.id === id)
  if (!book) {
    return c.notFound()
  }
  return c.json({ book }, 200)
})

export default bookRouter
