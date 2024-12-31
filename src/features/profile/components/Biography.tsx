import React from "react"
import { ProfileType } from "../lib/types"
import { Calendar, Mail, Phone } from "lucide-react"

type Props = {
  profile: ProfileType
}

export default function Biography({ profile }: Props) {
  return (
    <div className="grid grid-cols-2 gap-8 py-8">
      <div className="bg-neutral-400 aspect-square rounded-lg"></div>
      <div className="bg-black/30 p-8 rounded-lg space-y-6">
        <div className="text-4xl font-bold">{profile.name}</div>
        <div className="text-2xl font-medium">{profile.data.age}</div>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Calendar />
            <div>{profile.data.birthday}</div>
          </div>
          <div className="flex items-center gap-2">
            <Phone />
            <div>{profile.data.contactNum}</div>
          </div>
          <div className="flex items-center gap-2">
            <Mail />
            <div>{profile.data.gmail}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
