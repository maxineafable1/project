'use client'

import { signinSchema, SigninSchemaType } from "@/utils/auth-form-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { LoaderCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { useRef, useState } from "react"
import { useForm } from "react-hook-form"

export default function SigninForm() {
  const { register, handleSubmit, formState: { errors }, setError } = useForm({
    resolver: zodResolver(signinSchema),
  })

  const [loading, setLoading] = useState(false)
  const [verifyMessage, setVerifyMessage] = useState<string | null>(null)

  const router = useRouter()

  const inputRef = useRef<HTMLInputElement | null>(null)

  async function onSubmit(authInput: SigninSchemaType) {
    setLoading(true)
    const { email, password } = authInput

    try {
      const res = await fetch('http://localhost:8080/api/v1/auth/login', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })

      if (!res.ok) {
        setError('root', { message: 'error test' })
      }

      const data = await res.json()
      console.log(data)
      
      if (data.message)
        setVerifyMessage('Check your email to verify your account')
      else
        router.push('/dashboard')
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {verifyMessage && (
        <p className="bg-blue-500 px-4 rounded py-1.5 text-sm text-white">
          {verifyMessage}
        </p>
      )}
      {errors.root && (
        <p className="bg-red-400 px-4 rounded py-1.5 text-sm text-white">
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
        <div className="text-sm space-x-2">
          <input
            ref={inputRef}
            type="checkbox"
            id="rememberMe"
            className="accent-blue-600 focus-visible:outline-2 focus-visible:outline-blue-500"
          />
          <label htmlFor="rememberMe">Remember Me</label>
        </div>
        <button
          type='submit'
          className='bg-blue-500 text-neutral-100 rounded-full 
          py-1.5 mt-4 text-sm hover:bg-blue-600 transition-colors
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
