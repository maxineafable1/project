"use client"

import { InView } from "react-intersection-observer"
import { importanceTextList } from "../data/importance"

export default function Importance() {
  return (
    <div className="space-y-16">
      <h2 className="text-4xl text-shadow shadow-black/30 font-semibold text-center uppercase">
        Importance of nursing
      </h2>
      <div className="grid gap-8 grid-cols-4">
        {importanceTextList.map((text) => (
          <InView
            onChange={(isInView, entry) => {
              if (isInView) entry.target.classList.add("scroll-in")
            }}
            key={text}
          >
            {({ ref }) => (
              <p
                ref={ref}
                className="
                importance
                text-xl leading-loose bg-black/50 p-8 rounded-lg
                opacity-0 -translate-x-full 
                transition-transform duration-500
              "
              >
                {text}
              </p>
            )}
          </InView>
        ))}
      </div>
    </div>
  )
}
