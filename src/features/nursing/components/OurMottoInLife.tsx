import React from "react"
import { mottoLifeList } from "../data/motto"

export default function OurMottoInLife() {
  return (
    <div className="space-y-8">
      <h2 className="text-4xl text-shadow shadow-black/30 font-semibold text-center uppercase">
        Our motto in life
      </h2>
      <ul className="grid grid-cols-8 gap-x-16 gap-y-8">
        {mottoLifeList.map(({ name, src, text }) => (
          <li key={name} className="space-y-2 motto">
            <div className="bg-neutral-400 aspect-square rounded-lg"></div>
            <div className="space-x-2">
              <q>{text}</q>
              <span>&mdash;</span>
              <span>{name}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
