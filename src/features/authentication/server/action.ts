'use server'

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
    }

  redirect('/')
}