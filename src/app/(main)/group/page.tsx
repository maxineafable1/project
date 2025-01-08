import { videoLinks } from "@/features/group/data/videoLinks"
import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import React from "react"

export const metadata: Metadata = {
  title: "Our Group | GOSH!P GIRLS",
}

export default function page() {
  return (
    <section className="md:py-48 py-16 px-8 grid place-items-center">
      <div className="space-y-16">
        <h2 className="text-7xl text-center font-bold text-shadow-lg uppercase shadow-black/20">
          Our Group
        </h2>
        <div className="grid md:grid-cols-3 gap-16 place-items-center">
          {videoLinks.map(({ href, text, imgSrc }, index) => (
            <Link key={href} href={`/group/${href}`} className="space-y-2">
              <Image
                src={imgSrc}
                alt={text}
                width={300}
                height={300}
                className={`card-up rounded-lg aspect-square object-cover ${
                  index !== 2 && "object-top"
                }`}
              />
              <div className="text-center text-xl font-semibold uppercase text-shadow shadow-black/30">
                {text}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
