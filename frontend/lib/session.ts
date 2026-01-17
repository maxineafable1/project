'use server'

import { cookies } from "next/headers"
import { jwtVerify } from 'jose'

const jwtKey = process.env.JWT_SECRET!
const encodedKey = new TextEncoder().encode(jwtKey)

const isProd = process.env.NODE_ENV === 'production'
const cookieName = 'liftts-session'

export async function getSession() {
  const cookieStore = await cookies()
  const session = cookieStore.get(cookieName)

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
  cookieStore.delete(cookieName)
}

export async function createSession(jwt: string, rememberMeChecked?: boolean) {
  const cookieStore = await cookies()

  cookieStore.set(cookieName, jwt, {
    httpOnly: true,
    secure: isProd, // change to false when test/dev
    path: '/',
    maxAge: rememberMeChecked ? getCookieMaxAge(30) : getCookieMaxAge(1),
    ...(isProd && {
      domain: '.liftts.app',
    }),
    sameSite: 'lax',
  })
}

function getCookieMaxAge(days: number) {
  return days * 60 * 60 * 24;
}