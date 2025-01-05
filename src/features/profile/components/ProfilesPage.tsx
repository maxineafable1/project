"use client"

import Link from "next/link"
import { InView } from "react-intersection-observer"
import { profileList } from "../data/profiles"
import Image from "next/image"

export default function ProfilesPage() {
  return (
    <section className="max-w-screen-2xl mx-auto px-4 py-16">
      <div className="space-y-16">
        <h2 className="text-4xl text-shadow shadow-black/30 font-semibold text-center uppercase">
          Profiles
        </h2>
        <ul className="grid md:grid-cols-8 grid-cols-4 lg:gap-x-16 lg:gap-y-8 md:gap-x-12 md:gap-y-6 gap-8">
          {profileList.map(({ name, src, href }) => (
            <InView
              onChange={(isInView, entry) => {
                if (isInView) entry.target.classList.add("scroll-in")
              }}
              key={href}
            >
              {({ ref }) => (
                <Link
                  ref={ref}
                  href={`/profile/${href}`}
                  className="
                    space-y-2 profile
                    opacity-0 -translate-x-full 
                    transition-transform duration-500
                  "
                >
                  <Image
                    src={src}
                    alt={name}
                    width={300}
                    height={300}
                    className="rounded-full aspect-square object-cover object-top card-up"
                  />
                  <div className="text-center text-shadow shadow-black/20 font-medium">
                    {name}
                  </div>
                </Link>
              )}
            </InView>
          ))}
        </ul>
      </div>
    </section>
  )
}
