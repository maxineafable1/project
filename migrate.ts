import { migrate } from "drizzle-orm/better-sqlite3/migrator";
// import { db } from "./db";
import sqlite from 'better-sqlite3'
import { drizzle } from "drizzle-orm/better-sqlite3";
import 'dotenv/config';

const url = `/data/${process.env.DATABASE_URL}`

const client = sqlite(url)

const db = drizzle(client)

async function main() {
  console.log('Running migrations')

  await migrate(db, { migrationsFolder: "./drizzle" });

  console.log('Migrated successfully')

  process.exit(0)
}

main().catch((e) => {
  console.error('Migration failed')
  console.error(e)
  process.exit(1)
});