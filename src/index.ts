import app from "./app"
import { checkConnection, runMigration } from "./config/db"

async function bootstrapDatabase() {
  const hasConfig = process.env.DATABASE_URL || process.env.POSTGRES_HOST
  if (!hasConfig) {
    console.warn("Skipping migrations: database configuration is missing. API v2 endpoints will fail until configured.")
    return
  }

  const connected = await checkConnection()
  if (!connected) {
    console.warn("Skipping migrations: database connection is not available. API v2 endpoints will fail until configured.")
    return
  }

  try {
    await runMigration()
  } catch (error) {
    console.error("Failed to run migrations:", error)
  }
}

const serveConfig = {
  fetch: app.fetch,
  hostname: process.env.HOSTNAME,
  port: process.env.PORT
}

console.log(`Server is running on http://${serveConfig.hostname}:${serveConfig.port}`);

await bootstrapDatabase()
Bun.serve(serveConfig)
