import { videoLinks } from "@/features/group/data/videoLinks"
import { notFound } from "next/navigation"
import React from "react"

export default async function page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const video = videoLinks.find(({href}) => href === slug)

  if (!video)
    notFound()

  return (
    <div className="my-16">
      <div className="bg-neutral-500 rounded-lg w-full aspect-video"></div>
    </div>
  )
}
