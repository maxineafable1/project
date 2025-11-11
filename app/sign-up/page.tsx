import SignupForm from '@/components/SignupForm'
import Link from 'next/link'
import React from 'react'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function page() {
  const session = await auth.api.getSession({
    headers: await headers() // you need to pass the headers object.
  })

  if (session)
    redirect('/')

  return (
    <div className='flex items-center justify-center min-h-dvh'>
      <div className="flex flex-col gap-8 max-w-sm w-full">
        <h2 className='text-center text-3xl font-bold'>Create your account</h2>
        <SignupForm />
        <Link
          href='/sign-in'
          className='text-blue-500 hover:text-blue-600 transition-colors
          focus-visible:outline-blue-500 focus-visible:outline-2
          text-sm self-center'>
          Already have an account?
        </Link>
      </div>
    </div>
  )
}
