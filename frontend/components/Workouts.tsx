'use client'

import { Minus, Plus } from "lucide-react"
import { useCallback, useEffect, useState } from "react"
import ExerciseTable from "./ExerciseTable"
import NewExerciseForm from "./NewExerciseForm"

import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import { Button } from "./ui/button"

dayjs.extend(localizedFormat);

type ExerciseType = {
  name: string;
  id: number;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  weight: number;
  sets: number;
  reps: number;
  isKilogram: boolean;
  workoutId: number;
}

type WorkoutType = {
  id: number;
  userId: string;
  exerciseDate: string;
  exercises: ExerciseType[];
}

type Props = {
  jwt: string
  obj: {
    workouts: WorkoutType[];
    first: boolean;
    last: boolean;
    empty: boolean
    number: number;
  } | null
  searchVal: string | undefined
  sortBy: string
  direction: string
}

export default function Workouts({
  jwt,
  obj,
  searchVal,
  direction,
  sortBy,
}: Props) {
  const [newExercise, setNewExercise] = useState(false)
  const [workouts, setWorkouts] = useState(obj ? obj.workouts : [])
  const [firstPage, setFirstPage] = useState(obj?.first)
  const [lastPage, setlastPage] = useState(obj?.last)
  const [currPage, setCurrPage] = useState(obj?.number || 0)

  const [numOfElements, setNumOfElements] = useState<number | null>(null)

  const revalidateWorkouts = useCallback((curPage?: number) => {
    console.log('revalidateWorkouts')
    setWorkouts(obj ? obj.workouts : [])
    setFirstPage(obj?.first)
    setlastPage(obj?.last)
    setCurrPage(prev => {
      if (!obj) return 0
      const num = obj.number
      console.log('setCurrPage prev', prev)
      console.log('setCurrPage num', num)
      return curPage ? prev - 1 : num
    })
  }, [obj])


  const fetchWorkoutsClient = useCallback(async (currPage: number) => {
    try {
      const urlParams = new URLSearchParams(`page=${currPage}`);

      if (searchVal) urlParams.append('name', searchVal)

      urlParams.append('direction', direction)
      urlParams.append('sortBy', sortBy)

      const res = await fetch(`/api/workouts?${urlParams.toString()}`)
      const data = await res.json()
      setWorkouts(data.content)
      setFirstPage(data.first)
      setlastPage(data.last)
      setCurrPage(data.number)
      console.log('data', data)
      setNumOfElements(data.numberOfElements)
    } catch (error) {
      console.log(error)
    }
  }, [searchVal, direction, sortBy])


  useEffect(() => {
    // if (searchVal) {
    console.log('useffect 2', searchVal)
    revalidateWorkouts()
    // }
  }, [searchVal, revalidateWorkouts])

  return (
    <div className="p-8 lg:p-12 lg:ml-[24rem] space-y-8 lg:space-y-12 flex flex-col h-full min-h-dvh">
      {(workouts.length > 0 || newExercise) && (
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
        <NewExerciseForm
          jwt={jwt}
          setNewExercise={setNewExercise}
          revalidateWorkouts={fetchWorkoutsClient}
          currPage={currPage}
        />
      )}
      {(obj && obj.workouts.length === 0 && !newExercise) && (
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
      )}
      {(obj && obj.workouts.length > 0) && (
        <>
          {workouts.map(({ id, exerciseDate, exercises }) => (
            <ExerciseTable
              key={id}
              jwt={jwt}
              titleDate={exerciseDate}
              value={exercises}
              revalidateWorkouts={fetchWorkoutsClient}
              currPage={currPage}
              numOfElements={numOfElements}
              workoutsLength={workouts.length === 1 ? workouts[0].exercises.length : workouts.length}
            />
          ))}
          <div className="flex items-center justify-between mt-auto">
            {!firstPage && (
              <Button
                onClick={() => setCurrPage(prev => {
                  const num = prev - 1
                  fetchWorkoutsClient(num)
                  return num
                })}
              >
                Previous
              </Button>
            )}
            {!lastPage && (
              <Button
                onClick={() => setCurrPage(prev => {
                  const num = prev + 1
                  console.log('Next', num)
                  fetchWorkoutsClient(num)
                  return num
                })}
                className='ml-auto'
              >
                Next
              </Button>
            )}
          </div>
        </>
      )}
    </div>
  )
}
