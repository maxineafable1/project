import SigninForm from '@/components/SigninForm'
import Link from 'next/link'
import React from 'react'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import Image from 'next/image'

export default async function page() {
  const session = await auth.api.getSession({
    headers: await headers() // you need to pass the headers object.
  })

  if (session)
    redirect('/')

  return (
    <div className='flex items-center justify-center min-h-dvh px-6'>
      <div className="flex flex-col gap-8 max-w-sm w-full">
        <Link href={'/'}>
          <Image src={'/icon.png'} className='mx-auto' alt='Liftts logo icon' width={50} height={50} />
        </Link>
        <h2 className='text-center text-3xl font-bold'>Sign in to your account</h2>
        <SigninForm />
        <Link
          href='/sign-up'
          className='text-blue-500 hover:text-blue-600 transition-colors
          focus-visible:outline-blue-500 focus-visible:outline-2
          text-sm self-center'>
          Don&apos;t have an account?
        </Link>
      </div>
    </div>
  )
}
