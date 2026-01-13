'use server'

import { cookies } from "next/headers"
import { jwtVerify } from 'jose'

const jwtKey = process.env.JWT_SECRET!
const encodedKey = new TextEncoder().encode(jwtKey)

export async function getSession() {
  const cookieStore = await cookies()
  const session = cookieStore.get('liftts-session')

  if (!session) return null

  try {
    const { payload } = await jwtVerify(session.value, encodedKey)
    return { payload, jwt: session.value }
  } catch (error) {
    console.log(error) // todo fix
    return null
  }
}

export async function logout() {
  const cookieStore = await cookies()
  cookieStore.delete('liftts-session')
}

export async function createSession(jwt: string) {
  const cookieStore = await cookies()

  cookieStore.set('liftts-session', jwt, {
    httpOnly: true,
    secure: false,
    path: '/',
    maxAge: 604800, // 7 days in seconds
    sameSite: 'lax',
  })
}