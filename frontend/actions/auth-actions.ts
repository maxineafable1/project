'use server'

import { createSession } from "@/lib/session"
import { redirect } from "next/navigation"

export async function login(email: string, password: string, rememberMeChecked?: boolean) {
  const res = await fetch(`${process.env.API_URL}/api/v1/auth/login?rememberMe=${rememberMeChecked}`, {
    method: 'POST',
    // credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })
  
  if (!res.ok && res.status === 404)
    return { error: 'Invalid username or password' }

  const data = await res.json()
  // console.log(data)

  if (data.message)
    return { message: 'Check your email to verify your account' }

  await createSession(data.authenticationResponse.token, rememberMeChecked)
  redirect('/dashboard')
}

export async function signup(email: string, password: string) {
  const res = await fetch(`${process.env.API_URL}/api/v1/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })

  if (!res.ok && res.status === 400)
    return { error: 'Account already exists' }

  // const data = await res.json()
  // console.log(data)

  return { message: 'Verification link has been sent' }
}

export async function verifyEmail(verificationToken: string) {
  const res = await fetch(`${process.env.API_URL}/api/v1/auth/verify?token=${verificationToken}`, {
    method: 'POST',
    cache: 'no-store',
  })

  if (!res.ok)
    return { error: 'Verification failed' }

  const data = await res.json()
  // console.log(data)

  await createSession(data.token)
  redirect('/dashboard')
}