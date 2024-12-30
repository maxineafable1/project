import React from "react"
import { lessonLearnedList } from "../data/lessonslearned"

export default function LessonWeveLearned() {
  return (
    <div className="space-y-8">
      <h2 className="text-4xl text-shadow shadow-black/30 font-semibold text-center uppercase">
        Lesson we&apos;ve learned
      </h2>
      <ul className="space-y-8">
        {lessonLearnedList.map(({ name, text }) => (
          <li key={name} className="bg-black/30 p-8 rounded-lg">
            <div>{name}</div>
            <p
              className="
                text-xl leading-loose
              "
            >
              {text}
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}
