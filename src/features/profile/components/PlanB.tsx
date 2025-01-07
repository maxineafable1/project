import React from "react"

type Props = {
  planB: string
}

export default function PlanB({ planB }: Props) {
  return (
    <div className="py-8">
      <div className="space-y-4 bg-black/50 p-8 rounded-lg">
        <div className="text-center space-y-2">
          <p className="font-semibold text-2xl">
            What are your plans if your plans on pre-med course didn't work
            &#40;during or after you graduate?&#41;
          </p>
        </div>
        <p className="leading-loose text-lg">{planB}</p>
      </div>
    </div>
  )
}
