import React from "react"
import { ProfileType } from "../lib/types"
import { Calendar, Mail, MapPinHouse, Phone } from "lucide-react"
import Image from "next/image"

type Props = {
  profile: ProfileType
}

export default function Biography({ profile }: Props) {
  return (
    <div className="grid sm:grid-cols-2 gap-8 py-8">
      <Image 
        src={profile.src}
        alt={profile.name}
        className="rounded-lg w-full max-h-[700px] object-cover object-top"
        width={500}
        height={500}
      />
      <div className="bg-black/50 p-8 rounded-lg sm:space-y-6 space-y-4">
        <div className="md:text-4xl text-2xl font-bold">{profile.name}</div>
        <div className="md:text-2xl text-lg font-medium">{profile.data.age}</div>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <MapPinHouse />
            <div>{profile.data.address}</div>
          </div>
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
