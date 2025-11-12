import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema.js";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

/**
 * Database connection pool.
 * In production, DRIZZLE_DB_URL should point to your Postgres instance.
 */
const pool = new Pool({
  connectionString:
    process.env.DATABASE_URL ?? "postgres://user:password@localhost:5432/testdb",
});

/**
 * Drizzle ORM instance using the connection pool.
 * This instance is shared across all apps in the monorepo.
 */
export const db = drizzle(pool, { schema });

/**
 * Export everything needed for other packages or apps:
 * - `db`: ORM instance
 * - `schema`: table definitions
 * - `eq`, `and`, `sql`: helpers from Drizzle
 */
export * from "./schema.js";
export { eq, and, or, sql } from "drizzle-orm";

/**
 * Optional utility: disconnect gracefully when shutting down the app.
 */
export async function closeDb() {
  await pool.end();
}
