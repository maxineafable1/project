'use client'

import { Minus, Plus } from "lucide-react"
import { useState } from "react"
import ExerciseTable from "./ExerciseTable"
import NewExerciseForm from "./NewExerciseForm"

import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'

dayjs.extend(localizedFormat);

type Props = {
  // sessId: string
  jwt: string
  data: {
    id: number;
    userId: string;
    exerciseDate: string;
    exercises: {
      name: string;
      id: number;
      createdAt: Date;
      updatedAt: Date;
      userId: string;
      weight: number;
      sets: number;
      reps: number;
      isKilogram: boolean;
      workoutId: number | null;
    }[];
  }[]
}

export default function Workouts({
  // sessId,
  jwt,
  data,
}: Props) {
  const [newExercise, setNewExercise] = useState(false)

  return (
    <div className="p-8 lg:p-12 lg:ml-[24rem] space-y-8 lg:space-y-12 flex flex-col">
      {(data.length > 0 || newExercise) && (
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold">Workouts</h2>
          <button
            onClick={() => setNewExercise(prev => !prev)}
            className="inline-flex items-center gap-2 text-sm text-white cursor-pointer focus-visible:outline-black dark:focus-visible:outline-white focus-visible:outline-2
          bg-blue-500 hover:bg-blue-600 transition-colors px-4 py-2 rounded font-bold self-end
          "
          >
            {newExercise ? <Minus className="size-4" /> : <Plus className="size-4" />}
            <span>{newExercise ? 'Cancel' : 'New Exercise'}</span>
          </button>
        </div>
      )}
      {newExercise && (
        // <NewExerciseForm sessId={sessId} setNewExercise={setNewExercise} />
        <NewExerciseForm jwt={jwt} setNewExercise={setNewExercise} />
      )}
      {(data.length === 0 && !newExercise) ?
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
        : data.map(({ id, exerciseDate, exercises }) => (
          // <ExerciseTable key={id} sessId={sessId} titleDate={exerciseDate} value={exercises} />
          <ExerciseTable
            key={id}
            jwt={jwt}
            titleDate={exerciseDate}
            value={exercises} />
        ))}
    </div>
  )
}
