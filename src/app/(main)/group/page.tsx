import { videoLinks } from "@/features/group/data/videoLinks"
import { Metadata } from "next"
import Link from "next/link"
import React from "react"

export const metadata: Metadata = {
  title: 'Our Group | GOSH!P GIRLS'
}

export default function page() {
  return (
    <section className="md:py-60 py-16 px-8 grid place-items-center">
      <div className="space-y-16">
        <h2 className="text-7xl text-center font-bold text-shadow-lg uppercase shadow-black/20">
          Our Group
        </h2>
        <div className="grid md:grid-cols-3 gap-16 *:w-60 place-items-center">
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
