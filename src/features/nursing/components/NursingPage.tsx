"use client"

import Link from "next/link"
import { InView } from "react-intersection-observer"
import { nursingLinks } from "../data/nursingLinks"
import Image from "next/image"

export default function NursingPage() {
  return (
    <section className="max-w-screen-xl mx-auto px-4 py-16">
      <ul className="grid md:grid-cols-6 sm:grid-cols-4 lg:gap-16 md:gap-8 gap-6">
        {nursingLinks.map(({ href, text, src }) => (
          <InView
            onChange={(isInView, entry) => {
              if (isInView) entry.target.classList.add("scroll-in")
            }}
            key={href}
          >
            {({ ref }) => (
              <Link
                ref={ref}
                href={`/nursing/${href}`}
                className="
                  item space-y-2 opacity-0 -translate-x-full 
                  transition-transform duration-500"
              >
                <Image
                  src={src}
                  alt={text}
                  width={500}
                  height={500}
                  className="rounded-full shadow-sm shadow-black/40 aspect-square object-cover card-up"
                />
                <div className="text-center text-xl font-semibold uppercase text-shadow shadow-black/30">
                  {text}
                </div>
              </Link>
            )}
          </InView>
        ))}
      </ul>
    </section>
  )
}
