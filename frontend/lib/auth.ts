import { sendEmail } from "@/actions/email-actions";
import { db } from "@/db"; // your drizzle instance
import { accounts, exercises, sessions, users, verifications } from "@/db-schema";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

const isProd = process.env.NODE_ENV === 'production'

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
		requireEmailVerification: true,
	},
	trustedOrigins: [
		'https://liftts.app/',
		'https://www.liftts.app/',
		'http://localhost:3000',
		'http://localhost:3001',
	],
	...(isProd && {
		advanced: {
			crossSubDomainCookies: {
				enabled: true,
				domain: 'liftts.app',
			},
		},
	}),
	emailVerification: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
		sendVerificationEmail: async ({ user, url, token }, request) => {
			await sendEmail(
				user.email,
				url,
			);
		},
		sendOnSignIn: true,
		sendOnSignUp: true,
		autoSignInAfterVerification: true,
	},
	// database: new Database("./sqlite.db"),
});