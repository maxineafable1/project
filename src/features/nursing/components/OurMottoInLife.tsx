"use client"

import { InView } from "react-intersection-observer"
import { mottoLifeList } from "../data/motto"
import Image from "next/image"

export default function OurMottoInLife() {
  return (
    <div className="space-y-16">
      <h2 className="text-4xl text-shadow shadow-black/30 font-semibold text-center uppercase">
        Our motto in life
      </h2>
      <ul className="grid md:grid-cols-8 grid-cols-4 lg:gap-x-16 lg:gap-y-8 md:gap-x-12 md:gap-y-6 gap-8">
        {mottoLifeList.map(({ name, src, text }) => (
          <InView
            onChange={(isInView, entry) => {
              if (isInView) entry.target.classList.add("scroll-in")
            }}
            key={name}
          >
            {({ ref }) => (
              <li
                ref={ref}
                className="
                  space-y-2 motto opacity-0 -translate-x-full 
                  transition-transform duration-500
                "
              >
                <Image
                  src={src}
                  alt={name}
                  width={300}
                  height={300}
                  className="rounded-lg aspect-square object-cover object-top card-up"
                />
                <div className="space-x-2 text-shadow-sm shadow-black/20">
                  <q>{text}</q>
                  <span>&mdash;</span>
                  <span>{name}</span>
                </div>
              </li>
            )}
          </InView>
        ))}
      </ul>
    </div>
  )
}
