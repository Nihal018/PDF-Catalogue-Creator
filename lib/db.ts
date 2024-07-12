import sqlite3 from "sqlite3";
import { Database, open } from "sqlite";

let db: Database | undefined;

export { openDb };
// src/lib/db.ts

async function openDb(): Promise<Database> {
  if (!db) {
    db = await open({
      filename: "./catalogue.sqlite",
      driver: sqlite3.Database,
    });
    await db.exec(`
      CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        description TEXT,
        price REAL,
        image BLOB
      )
    `);
  }
  return db;
}
