"use client"

import { usePathname } from "next/navigation"
import React from "react"
import { videoLinks } from "../data/videoLinks"
import Link from "next/link"

export default function GroupLayoutLinks() {
  const pathname = usePathname()

  const currPath = pathname.slice(pathname.lastIndexOf('/') + 1)

  return (
    <ul className="flex max-sm:flex-col gap-4 sm:items-center uppercase justify-between text-2xl font-semibold">
      {videoLinks.map(({href, text}) => (
        <Link
          key={href}
          href={`/group/${href}`}
          className={`
            ${currPath === href 
              ? 'bg-pink-500 px-4 py-2 rounded-md'
              : 'underline-link self-start'
            }
          `}
        >
          {text}
        </Link>
      ))}
    </ul>
  )
}
