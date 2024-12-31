import ProfilePage from '@/features/profile/components/ProfilePage'
import { profileList } from '@/features/profile/data/profiles'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import React from 'react'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params

  const profile = profileList.find(({href}) => href === slug)

  return {
    title: profile ? `${profile.name} | GOSH!P GIRLS` : 'GOSH!P GIRLS'
  }
}

export default async function page({
  params,
}: Props) {
  const { slug } = await params

  const profile = profileList.find(({href}) => href === slug)

  if (!profile)
    notFound()

  return (
    <ProfilePage profile={profile} />
  )
}
