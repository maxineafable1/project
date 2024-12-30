import { videoLinks } from "@/features/group/data/videoLinks"
import Link from "next/link"
import React from "react"

export default function page() {
  return (
    <section className="grid place-items-center min-h-dvh">
      <div className="space-y-16">
        <h2 className="text-7xl text-center font-bold text-shadow-lg uppercase shadow-black/20">
          Group Page
        </h2>
        <div className="grid grid-cols-3 gap-16 *:w-60 place-items-center">
          {videoLinks.map(({href, text}) => (
            <Link
              key={href}
              href={`/group/${href}`}
              className="bg-neutral-400 rounded-lg aspect-square card-up"
            ></Link>
          ))}
        </div>
      </div>
    </section>
  )
}
