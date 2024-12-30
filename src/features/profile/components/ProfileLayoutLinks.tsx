"use client"

import { usePathname, useSearchParams } from "next/navigation"
import React, { useCallback } from "react"
import { profileLinks } from "../data/profileLinks"
import Link from "next/link"

export default function ProfileLayoutLinks() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)

      return params.toString()
    },
    [searchParams]
  )

  return (
    <ul className="flex items-center uppercase justify-between text-2xl font-semibold">
      {profileLinks.map(({ href, text }) => (
        <Link 
          key={href} 
          href={pathname + '?' + createQueryString('tab', href)}
          className="underline-link"
        >
          {text}
        </Link>
      ))}
    </ul>
  )
}
