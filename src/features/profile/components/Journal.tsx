import React from "react"

type Props = {
  journal: string
}

export default function Journal({ journal }: Props) {
  return (
    <div className="py-8">
      <div className="space-y-4 bg-black/50 p-8 rounded-lg">
        <div className="text-center space-y-2">
          <p className="font-semibold text-2xl">
            What are the things you learn in GE elective 1 &#40;Principle,
            moral, coding, etc.&#41;?
          </p>
        </div>
        <p className="leading-loose text-lg">{journal}</p>
      </div>
    </div>
  )
}
