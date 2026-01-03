import { SQL } from "bun";

let hasLoggedConnect = false;

export const sql = new SQL({
  url: process.env.DATABASE_URL,

  hostname: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  database: process.env.POSTGRES_DB,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,

  // Connection pool settings
  max: 20,
  idleTimeout: 30,
  maxLifetime: 0,
  connectionTimeout: 30,

  // SSL/TLS options
  tls: false,

  onconnect: () => {
    if (!hasLoggedConnect) {
      console.log("Connected to PostgreSQL");
      hasLoggedConnect = true;
    }
  },
});

export async function checkConnection() {
  try {
    await sql`SELECT 1`;
    console.log("✅ Database connected");
    return true;
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    return false;
  }
}

export async function runMigration() {
  try {
    const schemaSQL = await Bun.file("src/db/migrations/001_schema.sql").text();
    await sql.unsafe(schemaSQL);
    console.log("✅ Migration completed");
  } catch (error) {
    console.error("❌ Migration failed:", error);
    throw error;
  }
}
