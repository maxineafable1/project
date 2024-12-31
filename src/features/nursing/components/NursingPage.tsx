"use client"

import Link from "next/link"
import { InView } from "react-intersection-observer"
import { nursingLinks } from "../data/nursingLinks"

export default function NursingPage() {
  return (
    <section className="max-w-screen-xl mx-auto px-4 py-16">
      <ul className="grid grid-cols-6 gap-16">
        {nursingLinks.map(({ href, text }) => (
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
                <div className="bg-neutral-400 aspect-square rounded-lg card-up"></div>
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
