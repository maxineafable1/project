'use client'

import { ExercisesType } from "@/db-schema"
import { Minus, Plus } from "lucide-react"
import { useState } from "react"
import ExerciseTable from "./ExerciseTable"
import NewExerciseForm from "./NewExerciseForm"
import Sidebar from "./Sidebar"

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

  const groupBy = Object.groupBy(exercises, ({ exerciseDate }) => exerciseDate)

  const exerciseGroup = Object.entries(groupBy)

  return (
    <>
      <Sidebar username={username} />
      <div className="p-8 lg:p-12 lg:ml-[24rem] space-y-8 lg:space-y-12 flex flex-col">
        <button
          onClick={() => setNewExercise(prev => !prev)}
          className="inline-flex items-center gap-2 text-sm text-white
          bg-slate-500 px-4 py-2 rounded font-bold self-end
          "
        >
          {newExercise ? <Minus className="size-4" /> : <Plus className="size-4" />}
          {newExercise ? 'Cancel' : 'New Exercise'}
        </button>
        {newExercise && (
          <NewExerciseForm sessId={sessId} setNewExercise={setNewExercise} />
        )}
        {(exerciseGroup.length === 0 && !newExercise) ?
          <div className="text-center space-y-2">
            <div className="text-3xl font-bold">No exercises added yet.</div>
            <div className="">Click <span className="font-bold">New Exercise</span> to start tracking your workouts.</div>
          </div>
          : exerciseGroup.map(([key, value]) => (
            <ExerciseTable key={key} sessId={sessId} titleDate={key} value={value} />
          ))}
      </div>
    </>
  )
}
