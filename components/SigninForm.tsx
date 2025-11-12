'use client'

import { authClient } from "@/lib/auth-client"
import { signinSchema, SigninSchemaType } from "@/utils/auth-form-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { LoaderCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form"

export default function SigninForm() {
  const { register, handleSubmit, formState: { errors }, setError } = useForm({
    resolver: zodResolver(signinSchema),
  })

  const router = useRouter()

  const [loading, setLoading] = useState(false)

  async function onSubmit(data1: SigninSchemaType) {
    const { email, password } = data1

    const { data, error } = await authClient.signIn.email({
      email, // user email address
      password, // user password -> min 8 characters by default
    }, {
      onRequest: (ctx) => {
        //show loading
        setLoading(prev => !prev)
      },
      onSuccess: (ctx) => {
        //redirect to the dashboard or sign in page
        router.push('/dashboard')
      },
      onError: (ctx) => {
        // display the error message
        setError("root", { message: ctx.error.message })
        setLoading(prev => !prev)
      },
    });

  }

  return (
    <>
      {errors.root && (
        <p className="bg-red-400 px-4 rounded py-1.5 text-sm">
          {errors.root.message}
        </p>
      )}
      <form onSubmit={handleSubmit(onSubmit)} className='grid gap-4'>
        <div className="grid gap-1">
          <label htmlFor="email" className='text-sm'>
            Email Address
          </label>
          <input
            type="email"
            id="email"
            placeholder='Enter your email'
            className='border rounded-full px-4 py-1.5 text-sm
            focus-within:border-blue-500 focus-within:outline-blue-500 focus-within:outline
            border-neutral-300 dark:border-neutral-700'
            {...register('email')}
          />
          {errors.email && (
            <p className="text-sm text-red-400">
              {errors.email.message}
            </p>
          )}
        </div>
        <div className="grid gap-1">
          <label htmlFor="password" className='text-sm'>
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder='Enter your password'
            className='border rounded-full px-4 py-1.5 text-sm not-placeholder-shown:font-mono
            focus-within:border-blue-500 focus-within:outline-blue-500 focus-within:outline
            border-neutral-300 dark:border-neutral-700'
            {...register('password')}
          />
          {errors.password && (
            <p className="text-sm text-red-400">
              {errors.password.message}
            </p>
          )}
        </div>
        <button
          type='submit'
          className='bg-blue-500 text-neutral-100 rounded-full 
          py-1.5 mt-4 text-sm cursor-pointer hover:bg-blue-600 transition-colors
          inline-flex justify-center items-center gap-2
          focus-visible:outline-2 focus-visible:outline-black dark:focus-visible:outline-white
          '
          disabled={loading}
        >
          {loading ? (
            <>
              <LoaderCircle className="size-4 animate-spin" />
              Signing in
            </>
          ) : 'Sign in'}
        </button>
      </form>
    </>
  )
}
