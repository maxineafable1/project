import Link from "next/link"
import React from "react"
import { Button } from "../ui/button"
import { cookies } from "next/headers"
import { logout } from "@/features/authentication/server/action"

export default async function Navbar() {
  const cookieStore = await cookies()
  const auth = cookieStore.get("goship-girls-auth")

  return (
    <nav className="navbar">
      <div
        className="max-w-screen-2xl mx-auto p-4
        flex justify-between items-center gap-4"
      >
        <Link href="/" className="font-bold">
          GOSH!P GIRLS
        </Link>
        {auth ? (
          <form action={logout}>
            <Button className="bg-pink-500 hover:bg-pink-600 active:bg-pink-700">
              Logout
            </Button>
          </form>
        ) : (
          <Button
            asChild
            className="rounded-full px-6 font-semibold bg-pink-500 hover:bg-pink-600 active:bg-pink-700"
          >
            <Link href="/login">Log in</Link>
          </Button>
        )}
      </div>
    </nav>
  )
}
