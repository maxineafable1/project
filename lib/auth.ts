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
	trustedOrigins: [
		'http://128.199.117.20/',
		'http://localhost:3000',
		'http://localhost:3001',
	]
	// database: new Database("./sqlite.db"),
});