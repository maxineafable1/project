import React from "react"
import PicsCarousel from "./PicsCarousel"

type Props = {
  hobbies: string[]
  achievements: string[]
  pics: string[]
}

export default function HobbiesAndAchievements({
  hobbies,
  achievements,
  pics,
}: Props) {
  return (
    <div className="py-8 space-y-8">
      <PicsCarousel pics={pics} />
      <div className="md:grid grid-cols-2 gap-8 max-md:space-y-8">
        <div className="bg-black/50 space-y-4 p-8 rounded-lg">
          <h2 className="text-2xl font-bold">Hobbies</h2>
          <ul className="space-y-2 text-lg">
            {hobbies.map((hobby) => (
              <li key={hobby}>{hobby}</li>
            ))}
          </ul>
        </div>
        <div className="bg-black/50 space-y-4 p-8 rounded-lg">
          <h2 className="text-2xl font-bold">Achievements</h2>
          <ul className="space-y-2 text-lg">
            {achievements.map((achievement) => (
              <li key={achievement}>{achievement}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
