'use client'

import { notFound, useSearchParams } from 'next/navigation'
import React from 'react'
import Biography from './Biography'
import { profileLinks } from '../data/profileLinks'
import { ProfileType } from '../lib/types'

type Props = {
  profile: ProfileType
}

export default function ProfilePage({
  profile,
}: Props) {
  const searchParams = useSearchParams()
  const tab = searchParams.get('tab')
  
  if (!tab) {
    return <Biography profile={profile} />
  }

  const link = profileLinks.find(({href}) => href === tab)

  if (!link)
    notFound()

  switch (tab) {
    case 'biography':
      return <Biography profile={profile} />
  }
}
