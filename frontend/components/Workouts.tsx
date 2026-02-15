'use client'

import { Calendar, Minus, Plus, Search } from "lucide-react"
import { useCallback, useEffect, useRef, useState } from "react"
import ExerciseTable from "./ExerciseTable"
import NewExerciseForm from "./NewExerciseForm"

import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import { usePathname, useRouter, useSearchParams } from "next/navigation"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

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

  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const inputRef = useRef<HTMLInputElement>(null)

  const sortByParam = searchParams.get('sortBy')

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)

      return params.toString()
    },
    [searchParams]
  )
  
  const removeQueryParam = useCallback(
    (name: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.delete(name)

      return params.toString()
    },
    [searchParams]
  )

  const revalidateWorkouts = useCallback((curPage?: number) => {
    // console.log('revalidateWorkouts')
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
      // console.log('data', data)
      setNumOfElements(data.numberOfElements)
    } catch (error) {
      console.log(error)
    }
  }, [searchVal, direction, sortBy])


  useEffect(() => {
    // if (searchVal) {
    // console.log('useffect 2', searchVal)
    revalidateWorkouts()
    // }
  }, [searchVal, revalidateWorkouts])

  return (
    <div className="p-8 lg:p-12 lg:ml-[24rem] space-y-8 lg:space-y-12 flex flex-col h-full min-h-dvh">
      {(workouts.length > 0 || newExercise) && (
        <div className="space-y-4">
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

          <div className="flex items-center gap-4">
            <form
              onSubmit={e => {
                e.preventDefault()
                if (inputRef.current && inputRef.current.value)
                  router.push(pathname + '?' + createQueryString('search', inputRef.current.value))
                else
                  router.push(pathname)
              }}
              className="
              focus-within:border-blue-500 focus-within:outline-blue-500 focus-within:outline
              border border-neutral-300 dark:border-neutral-700
              rounded-md px-4 py-2 inline-flex items-center gap-2 w-full
              max-w-sm
            ">
              <Search className='size-5' />
              <input
                ref={inputRef}
                type="search"
                placeholder='Search'
                className='text-sm w-full focus:border-0 focus:outline-0'
              />
            </form>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">Sort By</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuGroup>
                  <DropdownMenuLabel className="flex items-center gap-1">
                    <Calendar className='size-4' />
                    Date
                  </DropdownMenuLabel>
                  <DropdownMenuItem
                    onClick={() => {
                      if (sortByParam === 'date_desc') return
                      router.push(pathname + '?' + createQueryString('sortBy', 'date_desc'))
                    }}
                    className="data-[disabled]:opacity-50 data-[disabled]:pointer-events-none"
                    disabled={sortByParam === 'date_desc'}
                  >
                    Newest First
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      if (sortByParam === 'date_asc') return
                      router.push(pathname + '?' + createQueryString('sortBy', 'date_asc'))
                    }}
                    disabled={sortByParam === 'date_asc'}
                  >
                    Oldest First
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => {
                      router.replace(pathname + '?' + removeQueryParam('sortBy'));
                    }}
                    variant="destructive"
                  >
                    Clear
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
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
