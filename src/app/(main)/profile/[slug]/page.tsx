import ProfilePage from '@/features/profile/components/ProfilePage'
import { profileList } from '@/features/profile/data/profiles'
import { notFound } from 'next/navigation'
import React from 'react'

export default async function page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const profile = profileList.find(({href}) => href === slug)

  if (!profile)
    notFound()

  return (
    <ProfilePage profile={profile} />
  )
}
