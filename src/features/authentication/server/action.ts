'use server'

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

type LoginState = {
  error?: string
} | undefined

export async function login(prevState: LoginState, formData: FormData) {
  const username = formData.get('username')
  const password = formData.get('password')

  if (username !== '_Gosh!girl' && password !== 'Kuromchii7')
    return {
      error: 'Incorrect username or password'
    };

  (await cookies()).set('goship-girls-auth', 'true')
  redirect('/')
}

export async function logout() {
  const cookieStore = await cookies()
  const auth = cookieStore.has('goship-girls-auth')
  if (!auth) return
  cookieStore.delete('goship-girls-auth')
  redirect('/login')
}