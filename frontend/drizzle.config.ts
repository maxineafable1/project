// import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

import dotenv from "dotenv";

dotenv.config({
  path: ".env.development",
});

export default defineConfig({
  out: './drizzle',
  schema: './db-schema.ts',
  dialect: 'sqlite',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
