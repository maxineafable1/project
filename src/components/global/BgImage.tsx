"use client"

import { usePathname } from "next/navigation"
import React from "react"

export default function BgImage({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const pathname = usePathname()

  let bgName = "home-bg.png"

  switch (pathname) {
    case "/nursing": {
      bgName = "nursing-bg.png"
      break
    }
    case "/nursing/history": {
      bgName = "history-bg.png"
      break
    }
    case "/nursing/importance-of-nursing":
    case "/nursing/lesson-weve-learned": {
      bgName = "importance-bg.png"
      break
    }
  }

  if (pathname !== '/profile' && pathname.startsWith("/profile"))
    bgName = "profile-bg.png"

  return (
    <div
      className={`
        bg-[image:var(--bg-img)]
        bg-center bg-cover bg-no-repeat min-h-dvh
        
      `}
      style={
        {
          "--bg-img": `url('/bg/${bgName}')`,
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  )
}
