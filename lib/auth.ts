import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db"; // your drizzle instance
import Database from "better-sqlite3";
import { account, session, user, verification } from "@/auth-schema";

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "sqlite", // or "mysql", "sqlite"
        schema: {
            user,
            session,
            account,
            verification,
        }
    }),
    emailAndPassword: {
        enabled: true,
    },
    // database: new Database("./sqlite.db"),
});