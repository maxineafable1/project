import Importance from "@/features/nursing/components/Importance"
import LessonWeveLearned from "@/features/nursing/components/LessonWeveLearned"
import NursingHistory from "@/features/nursing/components/NursingHistory"
import OurMottoInLife from "@/features/nursing/components/OurMottoInLife"
import { nursingLinks } from "@/features/nursing/data/nursingLinks"
import { Metadata } from "next"
import { notFound } from "next/navigation"
import React from "react"

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params

  const nursing = nursingLinks.find(({href}) => href === slug)

  return {
    title: nursing ? `${nursing.text} | GOSH!P GIRLS` : 'GOSH!P GIRLS'
  }
}

export default async function page({
  params,
}: Props) {
  const { slug } = await params

  const nursing = nursingLinks.find(({href}) => href === slug)

  if (!nursing)
    notFound()

  return (
    <section className="max-w-screen-2xl mx-auto px-4 py-16">
      {nursing.href === 'history' && (
        <NursingHistory />
      )}
      {nursing.href === 'importance-of-nursing' && (
        <Importance />
      )}
      {nursing.href === 'lesson-weve-learned' && (
        <LessonWeveLearned />
      )}
      {nursing.href === 'our-motto-in-life' && (
        <OurMottoInLife />
      )}
    </section>
  )
}
