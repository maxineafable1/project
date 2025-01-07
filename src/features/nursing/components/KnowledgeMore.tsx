'use client'

import React from 'react'
import { knowledgeList } from '../data/knowledge'
import { InView } from 'react-intersection-observer'

export default function KnowledgeMore() {
  return (
    <div className="space-y-16">
      <h2 className="text-4xl text-shadow shadow-black/30 font-semibold text-center uppercase">
        Lesson we&apos;ve learned
      </h2>
      <ul className="grid grid-cols-6 gap-8">
        {knowledgeList.map(({ name, text }) => (
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
                bg-black/50 p-8 rounded-lg lesson
                  opacity-0 -translate-x-full 
                  transition-transform duration-500
                  space-y-4
              "
              >
                <div className="font-semibold">{name}</div>
                <p className="text-xl leading-loose">{text}</p>
              </li>
            )}
          </InView>
        ))}
      </ul>
    </div>
  )
}
