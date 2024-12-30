import Link from "next/link"
import React from "react"
import { Button } from "../ui/button"

export default function Navbar() {
  return (
    <nav
      className="
        max-w-screen-xl mx-auto p-4
        flex justify-between items-center gap-4
      "
    >
      <Link href="/" className="font-bold">
        GOSH!P GIRLS
      </Link>
      <Button
        asChild
        className="rounded-full px-6 font-semibold bg-pink-500 hover:bg-pink-600 active:bg-pink-700"
      >
        <Link href="/login">Log in</Link>
      </Button>
    </nav>
  )
}
