'use client'

import { login } from "@/actions/auth-actions"
import { signinSchema, SigninSchemaType } from "@/utils/auth-form-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { LoaderCircle } from "lucide-react"
import { useRef, useState } from "react"
import { useForm } from "react-hook-form"

export default function SigninForm() {
  const { register, handleSubmit, formState: { errors }, setError } = useForm({
    resolver: zodResolver(signinSchema),
  })

  const [loading, setLoading] = useState(false)
  const [verifyMessage, setVerifyMessage] = useState<string | null>(null)

  const inputRef = useRef<HTMLInputElement | null>(null)

  async function onSubmit(authInput: SigninSchemaType) {
    setLoading(true)
    const { email, password } = authInput

    try {
      const res = await login(email, password, inputRef.current?.checked)
      console.log(res)

      if (res.error)
        setError('root', { message: res.error })
      else if (res.message)
        setVerifyMessage(res.message)
    } catch (error) {
      console.log(error)
      // setError('root', {
      //   message: error instanceof Error
      //     ? error.message
      //     : 'Server error. Please try again'
      // })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {(verifyMessage && !errors.root) && (
        <p className="bg-blue-500 px-4 rounded py-1.5 text-sm text-white">
          {verifyMessage}
        </p>
      )}
      {(errors.root && !verifyMessage) && (
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
