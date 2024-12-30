"use client"

import Link from "next/link"
import { InView } from "react-intersection-observer"
import { profileList } from "../data/profiles"

export default function ProfilesPage() {
  return (
    <section className="max-w-screen-xl mx-auto px-4 py-16">
      <div className="space-y-16">
        <h2 className="text-4xl text-shadow shadow-black/30 font-semibold text-center uppercase">
          Profile Page
        </h2>
        <ul className="grid grid-cols-8 gap-x-16 gap-y-8">
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
                  // key={name}
                  className="
                    space-y-2 profile
                    opacity-0 -translate-x-full 
                    transition-transform duration-500
                  "
                >
                  <div className="bg-neutral-400 aspect-square rounded-full card-up"></div>
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
