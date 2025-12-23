import { drizzle } from 'drizzle-orm/better-sqlite3';
import sqlite from 'better-sqlite3'
import * as schema from './db-schema';
// import Database from 'better-sqlite3';
const isProd = process.env.NODE_ENV === 'production'
// export const db = drizzle(process.env.DATABASE_URL!);
const url = isProd 
  ? `/data/${process.env.DATABASE_URL}`
  : process.env.DATABASE_URL

// const sqlite = new Database(process.env.DATABASE_URL)

const client = sqlite(url)
// client.pragma('journal_mode = WAL')

export const db = drizzle({
  client,
  // client,
  schema,
})

// const result = await db.execute('select 1');
