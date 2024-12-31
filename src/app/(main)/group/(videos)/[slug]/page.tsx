import { videoLinks } from "@/features/group/data/videoLinks"
import { Metadata } from "next"
import { notFound } from "next/navigation"

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params

  const video = videoLinks.find(({href}) => href === slug)

  return {
    title: video ? `${video.text} | GOSH!P GIRLS` : 'GOSH!P GIRLS'
  }
}

export default async function page({
  params,
}: Props) {
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
