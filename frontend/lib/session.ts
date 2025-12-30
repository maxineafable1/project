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
    return null
  }
}