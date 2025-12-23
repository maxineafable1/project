'use server'

import VerifyEmail from "@/emails/VerifyEmail";
import { Resend } from "resend";

export async function sendEmail(to: string, url: string) {
  const resend = new Resend(process.env.RESEND_API_KEY);

  const { data } = await resend.emails.send({
    from: 'Liftts <verify@liftts.app>',
    to,
    subject: 'Email Verification',
    // html: `<strong>It works! Click the link to verify your email: ${url}</strong>`
    react: VerifyEmail({ url })
  });

  console.log(data);
}