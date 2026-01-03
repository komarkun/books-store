import { OpenAPIHono } from '@hono/zod-openapi'
import { getAllBooks, getBookById, createBook, updateBook, updateBookPatched } from "../services/book.service"
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

// Route to POST a book
bookRouter.openapi(createBook, (c) => {
  const data = c.req.valid('json')
  const newBook = { id: fakeBooks.length + 1, ...data }
  fakeBooks.push(newBook)
  return c.json({ book: newBook }, 201)
})

// Route to PUT a book --> modify all books
bookRouter.openapi(updateBook, (c) => {
  const { id: idParam } = c.req.valid('param')
  const id = Number.parseInt(idParam)
  const data = c.req.valid('json')
  const index = fakeBooks.findIndex(e => e.id === id)
  if (index === -1) {
    return c.notFound()
  }
  fakeBooks[index] = { ...data, id }
  return c.json(fakeBooks[index], 200)
})

// Route to PATCH a book --> modify partially
bookRouter.openapi(updateBookPatched, (c) => {
  const { id: idParam } = c.req.valid('param')
  const id = Number.parseInt(idParam)
  const data = c.req.valid('json')
  const index = fakeBooks.findIndex(e => e.id === id)
  const book = fakeBooks[index]
  if (!book) {
    return c.notFound()
  }
  fakeBooks[index] = { ...book, ...data }
  return c.json(fakeBooks[index], 200)
})


export default bookRouter
