import { videoLinks } from "@/features/group/data/videoLinks"
import { IMAGE_URL } from "@/lib/urls"
import { Metadata } from "next"
import { notFound } from "next/navigation"

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params

  const video = videoLinks.find(({ href }) => href === slug)

  return {
    title: video ? `${video.text} | GOSH!P GIRLS` : "GOSH!P GIRLS",
  }
}

export default async function page({ params }: Props) {
  const { slug } = await params

  const video = videoLinks.find(({ href }) => href === slug)

  if (!video) notFound()

  return (
    <div className="pt-16">
      <video className="rounded-lg w-full aspect-video" controls autoPlay muted>
        <source src={`${IMAGE_URL}${video.src}`} type="video/mp4" />
      </video>
    </div>
  )
}
