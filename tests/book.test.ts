import { describe, it, expect } from 'bun:test'
import app from '../src/app'

const BASE_URL = 'http://localhost'
const TOKEN = process.env.API_BEARER_TOKEN

if (!TOKEN) {
  console.warn('Warning: API_BEARER_TOKEN is not set in environment variables.')
}

type Book = {
  id: number
  title: string
  price: number
  sumary: string
}

describe('Books API', () => {
  let createdBookId: number | undefined

  describe('Authorization', () => {
    it('should return 401 when no token is provided', async () => {
      const res = await app.fetch(new Request(`${BASE_URL}/api/books`))
      expect(res.status).toBe(401)
    })

    it('should return 401 with invalid token', async () => {
      const res = await app.fetch(
        new Request(`${BASE_URL}/api/books`, {
          headers: { Authorization: 'Bearer invalid_token' },
        })
      )
      expect(res.status).toBe(401)
    })
  })

  describe('CRUD Operations', () => {
    describe('POST /api/books', () => {
      it('should return 400 for invalid data (short title)', async () => {
        const res = await app.fetch(
          new Request(`${BASE_URL}/api/books`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${TOKEN}`,
            },
            body: JSON.stringify({
              title: 'Ab', // Min 3
              price: 1000,
              sumary: 'Valid summary for testing purposes',
            }),
          })
        )
        expect(res.status).toBe(400)
      })

      it('should return 400 for negative price', async () => {
        const res = await app.fetch(
          new Request(`${BASE_URL}/api/books`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${TOKEN}`,
            },
            body: JSON.stringify({
              title: 'Valid Title',
              price: -100,
              sumary: 'Valid summary for testing purposes',
            }),
          })
        )
        expect(res.status).toBe(400)
      })

      it('should create a new book successfully (201)', async () => {
        const payload = {
          title: 'The Great Adventure',
          price: 45000,
          sumary: 'A thrilling journey through the unknown lands of testing.',
        }

        const res = await app.fetch(
          new Request(`${BASE_URL}/api/books`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${TOKEN}`,
            },
            body: JSON.stringify(payload),
          })
        )

        expect(res.status).toBe(201)
        const body = await res.json() as { book: Book }
        expect(body.book).toHaveProperty('id')
        expect(body.book.title).toBe(payload.title)
        expect(body.book.price).toBe(payload.price)
        expect(body.book.sumary).toBe(payload.sumary)

        createdBookId = body.book.id
      })
    })

    describe('GET /api/books', () => {
      it('should return a list of books', async () => {
        const res = await app.fetch(
          new Request(`${BASE_URL}/api/books`, {
            headers: { Authorization: `Bearer ${TOKEN}` },
          })
        )
        expect(res.status).toBe(200)
        const body = await res.json() as { books: Book[] }
        expect(Array.isArray(body.books)).toBe(true)
        expect(body.books.length).toBeGreaterThan(0)
      })
    })

    describe('GET /api/books/:id', () => {
      it('should return 404 for non-existent book', async () => {
        const res = await app.fetch(
          new Request(`${BASE_URL}/api/books/999999`, {
            headers: { Authorization: `Bearer ${TOKEN}` },
          })
        )
        expect(res.status).toBe(404)
      })

      it('should return the created book by ID', async () => {
        expect(createdBookId).toBeDefined()
        const res = await app.fetch(
          new Request(`${BASE_URL}/api/books/${createdBookId}`, {
            headers: { Authorization: `Bearer ${TOKEN}` },
          })
        )
        expect(res.status).toBe(200)
        const body = await res.json() as { book: Book }
        expect(body.book.id).toBe(createdBookId!)
      })
    })

    describe('PUT /api/books/:id', () => {
      it('should update the entire book record', async () => {
        expect(createdBookId).toBeDefined()
        const updatedPayload = {
          title: 'The Great Adventure (Updated)',
          price: 50000,
          sumary: 'An even more thrilling journey through the unknown lands.',
        }

        const res = await app.fetch(
          new Request(`${BASE_URL}/api/books/${createdBookId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${TOKEN}`,
            },
            body: JSON.stringify(updatedPayload),
          })
        )

        expect(res.status).toBe(200)
        const body = await res.json() as Book
        expect(body.title).toBe(updatedPayload.title)
        expect(body.price).toBe(updatedPayload.price)
      })
    })

    describe('PATCH /api/books/:id', () => {
      it('should partially update the book record', async () => {
        expect(createdBookId).toBeDefined()
        const patchPayload = { price: 55000 }

        const res = await app.fetch(
          new Request(`${BASE_URL}/api/books/${createdBookId}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${TOKEN}`,
            },
            body: JSON.stringify(patchPayload),
          })
        )

        expect(res.status).toBe(200)
        const body = await res.json() as Book
        expect(body.price).toBe(patchPayload.price)
      })
    })

    describe('DELETE /api/books/:id', () => {
      it('should delete the created book', async () => {
        expect(createdBookId).toBeDefined()
        const res = await app.fetch(
          new Request(`${BASE_URL}/api/books/${createdBookId}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${TOKEN}` },
          })
        )
        expect(res.status).toBe(200)
      })

      it('should return 404 when trying to GET the deleted book', async () => {
        const res = await app.fetch(
          new Request(`${BASE_URL}/api/books/${createdBookId}`, {
            headers: { Authorization: `Bearer ${TOKEN}` },
          })
        )
        expect(res.status).toBe(404)
      })

      it('should return 404 when trying to DELETE a non-existent book', async () => {
        const res = await app.fetch(
          new Request(`${BASE_URL}/api/books/${createdBookId}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${TOKEN}` },
          })
        )
        expect(res.status).toBe(404)
      })
    })
  })
})

