import type { MiddlewareHandler } from 'hono'

const API_TOKEN = process.env.API_BEARER_TOKEN!

export const bearerAuthMiddleware: MiddlewareHandler = async (c, next) => {
  const auth = c.req.header('authorization')

  if (!auth || !auth.startsWith('Bearer ')) {
    return c.json({ message: 'Unauthorized' }, 401)
  }

  const token = auth.slice(7)

  // contoh validasi token
  if (token !== API_TOKEN) {
    return c.json({ message: 'Invalid token' }, 401)
  }

  await next()
}

