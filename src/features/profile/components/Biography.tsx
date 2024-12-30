import React from 'react'
import { ProfileType } from '../lib/types'

type Props = {
  profile: ProfileType
}

export default function Biography({
  profile,
}: Props) {
  return (
    <div className='grid grid-cols-2 gap-8 py-8'>
      <div className='bg-neutral-400'>
      </div>
      <div>
        <div>{profile.name}</div>
      </div>
    </div>
  )
}
