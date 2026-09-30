import { DbClient } from "./db-client";

export async function setupDb(db: DbClient) {
  await db.query(`
    CREATE TABLE IF NOT EXISTS orders (
      id TEXT PRIMARY KEY,
      customerName TEXT NOT NULL,
      pizzaType TEXT NOT NULL,
      status TEXT NOT NULL,
      eta INTEGER
    )
  `);
}
