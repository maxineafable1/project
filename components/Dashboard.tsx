'use client'

import { ExercisesType } from "@/db-schema"
import { Minus, Plus } from "lucide-react"
import { useState } from "react"
import ExerciseTable from "./ExerciseTable"
import NewExerciseForm from "./NewExerciseForm"
import Sidebar from "./Sidebar"

import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'

dayjs.extend(localizedFormat);

type Props = {
  sessId: string
  exercises: ExercisesType[]
  username: string
}

export default function Dashboard({
  sessId,
  exercises,
  username,
}: Props) {
  const [newExercise, setNewExercise] = useState(false)

  const groupBy = Object.groupBy(exercises, ({ exerciseDate }) => dayjs(exerciseDate).format('ll'))

  const exerciseGroup = Object.entries(groupBy)

  return (
    <>
      {/* <Sidebar username={username} /> */}
      <div className="p-8 lg:p-12 lg:ml-[24rem] space-y-8 lg:space-y-12 flex flex-col">
        {(exerciseGroup.length > 0 || newExercise) && (
          <button
            onClick={() => setNewExercise(prev => !prev)}
            className="inline-flex items-center gap-2 text-sm text-white cursor-pointer focus-visible:outline-black dark:focus-visible:outline-white focus-visible:outline-2
          bg-blue-500 hover:bg-blue-600 transition-colors px-4 py-2 rounded font-bold self-end
          "
          >
            {newExercise ? <Minus className="size-4" /> : <Plus className="size-4" />}
            {newExercise ? 'Cancel' : 'New Exercise'}
          </button>
        )}
        {newExercise && (
          <NewExerciseForm sessId={sessId} setNewExercise={setNewExercise} />
        )}
        {(exerciseGroup.length === 0 && !newExercise) ?
          <div className="max-w-md mx-auto text-center space-y-4">
            <div className="text-3xl font-bold">Track your first workout and see your progress grow!</div>
            {/* <div className="text-sm mx-auto">Click <span className="font-bold">New Exercise</span> to start tracking your workouts.</div> */}
            <button
              onClick={() => setNewExercise(prev => !prev)}
              className="mt-2 inline-flex items-center gap-2 text-sm text-white cursor-pointer focus-visible:outline-white focus-visible:outline-2
          bg-blue-500 hover:bg-blue-600 transition-colors px-4 py-2 rounded font-bold self-end
          "
            >
              {newExercise ? <Minus className="size-4" /> : <Plus className="size-4" />}
              {newExercise ? 'Cancel' : 'New Exercise'}
            </button>
          </div>
          : exerciseGroup.map(([key, value]) => (
            <ExerciseTable key={key} sessId={sessId} titleDate={key} value={value} />
          ))}
      </div>
    </>
  )
}
