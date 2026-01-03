import { OpenAPIHono } from '@hono/zod-openapi'
import { logger } from 'hono/logger'
import { swaggerUI } from '@hono/swagger-ui'
import bookRoute from "./routes/book.route"

const app = new OpenAPIHono()

app.use('*', logger())

app.route("/api/books", bookRoute)

// The OpenAPI documentation will be available at /doc
app.doc('/doc', {
  openapi: '3.0.0',
  info: {
    version: '1.0.0',
    title: 'Books Store API',
  },
})

// Swagger UI
app.get('/api/docs', swaggerUI({ url: '/doc' }))

export default app
