import { db } from "@/db"; // your drizzle instance
import { accounts, exercises, sessions, users, verifications } from "@/db-schema";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: "sqlite", // or "mysql", "sqlite"
		schema: {
			users,
			sessions,
			accounts,
			verifications,
			exercises,
		},
		usePlural: true,
	}),
	emailAndPassword: {
		enabled: true,
	},
	// database: new Database("./sqlite.db"),
});