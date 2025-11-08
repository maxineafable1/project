'use client'

import { createExercise, deleteExercise } from "@/actions/exercise-actions"
import { createExerciseSchema, CreateExerciseSchemaType } from "@/utils/exercise-form-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { ChevronDown, CircleAlert, Minus, Plus } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"

type Props = {
  sessId: string
  titleDate: string
  value: {
    id: number;
    name: string;
    weight: number;
    sets: number;
    reps: number;
    exerciseDate: string;
    isKilogram: boolean;
    createdAt: string;
    updatedAt: string;
    userId: string | null;
  }[] | undefined
}

export default function ExerciseTable({
  sessId,
  titleDate,
  value,
}: Props) {
  const [isCreate, setIsCreate] = useState(false)
  const [isDropdown, setIsDropdown] = useState(false)

  const { register, handleSubmit, formState: { errors }, reset, setValue, getValues } = useForm({
    resolver: zodResolver(createExerciseSchema),
  })

  async function onSubmit(data: CreateExerciseSchemaType) {
    const newData = {
      ...data,
      exerciseDate: titleDate,
    }
    const res = await createExercise(newData, sessId)
    if (res?.error)
      console.log(res.error)
    else
      setIsCreate(false)

  };

  const isKilogram = getValues('isKilogram') ?? null

  return (
    <div>
      <div className="flex justify-between items-center mb-4 bg-slate-100 px-6 py-2 rounded-lg">
        <h2 className='text-xl font-bold'>{titleDate}</h2>
        <button
          onClick={() => setIsCreate(prev => {
            if (prev)
              reset()
            return !prev
          })}
        >
          {isCreate ? <Minus /> : <Plus />}
          <span className="sr-only">{isCreate ? 'Cancel add new exercise' : 'Add new exercise'}</span>
        </button>
      </div>

      <div className="w-full text-sm text-left rtl:text-right">
        <div className="grid grid-cols-6 font-bold border-b border-slate-200 text-xs uppercase">
          <div className={`px-6 py-3 ${errors.name && 'text-red-500 flex gap-1'}`}>
            Exercise {errors.name && <CircleAlert className="size-4" />}
          </div>
          <div className={`px-6 py-3 ${errors.weight && 'text-red-500 flex gap-1'}`}>
            Weight {errors.weight && <CircleAlert className="size-4" />}
          </div>
          <div className={`px-6 py-3 ${errors.isKilogram && 'text-red-500 flex gap-1'}`}>
            Unit {errors.isKilogram && <CircleAlert className="size-4" />}
          </div>
          <div className={`px-6 py-3 ${errors.sets && 'text-red-500 flex gap-1'}`}>
            Sets {errors.sets && <CircleAlert className="size-4" />}
          </div>
          <div className={`px-6 py-3 ${errors.reps && 'text-red-500 flex gap-1'}`}>
            Reps {errors.reps && <CircleAlert className="size-4" />}
          </div>
          <div className={`px-6 py-3`}>
            Actions
          </div>
        </div>
        {/* form here when adding */}
        {isCreate && (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="border-b border-slate-200 grid grid-cols-6"
          >
            <div
              className={`focus-within:outline border-r border-slate-200
                  ${errors.name
                  ? 'focus-within:outline-red-500'
                  : 'focus-within:outline-sky-500'}`}>
              <input
                type="text"
                className='px-6 py-4 w-full focus:border-0 focus:outline-0'
                autoFocus
                {...register('name')}
              />
            </div>
            <div
              className={`focus-within:outline border-r border-slate-200
                  ${errors.weight
                  ? 'focus-within:outline-red-500'
                  : 'focus-within:outline-sky-500'}`}>
              <input
                type="text"
                className="px-6 py-4 w-full focus:border-0 focus:outline-0"
                {...register('weight', { valueAsNumber: true })}
              />
            </div>
            <div
              className={`focus-within:outline border-r border-slate-200
                  ${errors.isKilogram
                  ? 'focus-within:outline-red-500'
                  : 'focus-within:outline-sky-500'}
                    relative
                  `}>
              <button
                type="button"
                onClick={() => setIsDropdown(prev => !prev)}
                className={`inline-flex items-center gap-2 w-full px-6 py-4`}>
                {isKilogram ? 'Kilograms' : isKilogram === null ? 'Select a unit' : 'Pounds'}
                <ChevronDown className="size-4" />
              </button>
              <div className={`z-10 absolute w-full
                    ${!isDropdown && 'hidden'} bg-slate-100 rounded-lg shadow-sm
                    `}>
                <ul className="text-sm">
                  <li
                    onClick={() => {
                      setValue('isKilogram', true, { shouldValidate: true })
                      setIsDropdown(false)
                    }}
                    className="px-4 py-2 hover:bg-slate-200 cursor-pointer">
                    Kilograms
                  </li>
                  <li
                    onClick={() => {
                      setValue('isKilogram', false, { shouldValidate: true })
                      setIsDropdown(false)
                    }}
                    className="px-4 py-2 hover:bg-slate-200 cursor-pointer">
                    Pounds
                  </li>
                </ul>
              </div>
            </div>
            <div
              className={`focus-within:outline border-r border-slate-200
                  ${errors.sets
                  ? 'focus-within:outline-red-500'
                  : 'focus-within:outline-sky-500'}`}>
              <input
                type="text"
                className="px-6 py-4 w-full focus:border-0 focus:outline-0"
                {...register('sets', { valueAsNumber: true })}
              />
            </div>
            <div
              className={`focus-within:outline border-r border-slate-200
                  ${errors.reps
                  ? 'focus-within:outline-red-500'
                  : 'focus-within:outline-sky-500'}`}>
              <input
                type="text"
                className="px-6 py-4 w-full focus:border-0 focus:outline-0"
                {...register('reps', { valueAsNumber: true })}
              />
            </div>
            <div className="px-6 h-full flex flex-col items-start justify-center">
              <button
                type="submit"
                className="px-4 py-1.5 rounded-lg bg-yellow-500 text-white"
              >
                Save
              </button>
            </div>
          </form>
        )}
        {value?.map(({ id, name, weight, isKilogram, sets, reps }) => (
          <div
            key={id}
            className="border-b border-slate-200 grid grid-cols-6">
            <div
              className="border-r border-slate-200 px-6 py-4">
              {name}
            </div>
            <div className="px-6 py-4 border-r border-slate-200">
              {weight}
            </div>
            <div className="px-6 py-4 border-r border-slate-200">
              {isKilogram ? 'Kg' : 'Lbs'}
            </div>
            <div className="px-6 py-4 border-r border-slate-200">
              {sets}
            </div>
            <div className="px-6 py-4 border-r border-slate-200">
              {reps}
            </div>
            <div className="px-6 h-full flex flex-col items-start justify-center">
              <div className="flex gap-2">
                <button
                  className="px-4 py-1.5 rounded-lg bg-sky-500 text-white"
                >
                  Edit
                </button>
                <button
                  onClick={async () => await deleteExercise(id)}
                  className="px-4 py-1.5 rounded-lg bg-red-500 text-white"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
