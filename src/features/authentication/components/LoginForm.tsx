"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useActionState } from "react"

import { login } from "@/features/authentication/server/action"
import Image from "next/image"

export default function LoginForm() {
  const [state, action, pending] = useActionState(login, undefined)

  return (
    <Card className="max-w-sm w-full bg-neutral-100">
      <CardHeader className="flex flex-col items-center">
        <Image alt="" src="/logos/login-logo.png" width={200} height={200} />
        <CardTitle className="text-xl font-bold">Log in</CardTitle>
      </CardHeader>
      <CardContent>
        {state?.error && (
          <div className="bg-red-500 rounded p-2 mb-4 text-neutral-100 text-sm">
            {state.error}
          </div>
        )}
        <form action={action} id="login-form">
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                name="username"
                required
                className="bg-neutral-200"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                id="password"
                name="password"
                required
                className="bg-neutral-200"
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button
          disabled={pending}
          type="submit"
          form="login-form"
          className="bg-pink-500 hover:bg-pink-600 active:bg-pink-700"
        >
          {pending ? "Loading..." : "Log in"}
        </Button>
      </CardFooter>
    </Card>
  )
}
