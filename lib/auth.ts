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
		'https://liftts.app/',
		'https://*.liftts.app/',
		'http://localhost:3000',
		'http://localhost:3001',
	]
	// database: new Database("./sqlite.db"),
});