import z from "zod";

export const signupSchema = z.object({
  email: z.email({ error: 'Enter a valid email address' }),
  password: z.string().min(8, { error: 'Password must be at least 8 characters' }),
});

export const signinSchema = z.object({
  email: z.email({ error: 'Please enter your email' }),
  password: z.string().min(1, { error: 'Please enter your password' }),
});

export type SignupSchemaType = z.infer<typeof signupSchema>;
export type SigninSchemaType = z.infer<typeof signinSchema>;
