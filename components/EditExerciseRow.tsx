'use client'

import { deleteExercise, updateExercise } from "@/actions/exercise-actions"
import { createExerciseSchema, CreateExerciseSchemaType } from "@/utils/exercise-form-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { ChevronDown } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"

type Props = {
  data: {
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
  }
  sessId: string
}

export default function EditExerciseRow({
  data: { id, name, weight, sets, reps, exerciseDate, isKilogram },
  sessId,
}: Props) {
  const [isEdit, setIsEdit] = useState(false)
  const [isDropdown, setIsDropdown] = useState(false)

  const { register, handleSubmit, formState: { errors }, reset, setValue, getValues } = useForm({
    resolver: zodResolver(createExerciseSchema),
    defaultValues: {
      name,
      weight,
      sets,
      reps,
      exerciseDate,
      isKilogram,
    }
  })

  async function onSubmit(data: CreateExerciseSchemaType) {
    const res = await updateExercise(id, data, sessId)
    if (res?.error)
      console.log(res.error)
    else
      setIsEdit(false)
  }

  return (
    <>
      {isEdit ? (
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
            <div className="flex gap-2">
              <button
                type="submit"
                className="px-4 py-1.5 rounded-lg bg-yellow-500 text-white"
              >
                Save
              </button>
              <button
                onClick={() => setIsEdit(false)}
                type="button"
                className="px-4 py-1.5 rounded-lg bg-slate-500 text-white"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      ) : (
        <div
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
                onClick={() => setIsEdit(true)}
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
      )}
    </>
  )
}
