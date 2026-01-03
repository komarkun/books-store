import { z } from '@hono/zod-openapi'
import { BookSchema } from "../schemas/book.schema"

// In-memory data for now, as in the original code
type Book = z.infer<typeof BookSchema>

const fakeBooks: Book[] = [
  { id: 1, title: "Atomic Habits", price: 20000, summary: "Lorem ipsum dolor sit amet consectetur adipiscing elit quisque faucibus ex sapien vitae pellentesque sem placerat in id cursus mi pretium tellus duis convallis tempus leo eu aenean sed diam urna tempor pulvinar vivamus fringilla lacus nec metus bibendum egestas." },
  { id: 2, title: "The Go Concurrency", price: 35000, summary: "Lorem ipsum dolor sit amet consectetur adipiscing elit quisque faucibus ex sapien vitae pellentesque sem placerat in id cursus mi pretium tellus duis convallis tempus leo eu aenean sed diam urna tempor pulvinar vivamus fringilla lacus nec metus bibendum egestas." },
  { id: 3, title: "Postgres The Relational", price: 50000, summary: "Lorem ipsum dolor sit amet consectetur adipiscing elit quisque faucibus ex sapien vitae pellentesque sem placerat in id cursus mi pretium tellus duis convallis tempus leo eu aenean sed diam urna tempor pulvinar vivamus fringilla lacus nec metus bibendum egestas." },
]

export default fakeBooks
