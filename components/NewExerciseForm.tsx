'use client'

import { createExercise } from "@/actions/exercise-actions";
import { createExerciseSchema, CreateExerciseSchemaType } from "@/utils/exercise-form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronDown, CircleAlert } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";

type Props = {
  sessId: string
  setNewExercise: Dispatch<SetStateAction<boolean>>
}

export default function NewExerciseForm({
  sessId,
  setNewExercise,
}: Props) {
  const [isDropdown, setIsDropdown] = useState(false)

  const { register, handleSubmit, formState: { errors }, setValue, getValues } = useForm({
    resolver: zodResolver(createExerciseSchema),
  })

  async function onSubmit(data: CreateExerciseSchemaType) {
    const newData = {
      ...data,
      exerciseDate: data.exerciseDate ? new Date(data.exerciseDate).toLocaleDateString() : new Date().toLocaleDateString()
    }

    const res = await createExercise(newData, sessId)
    if (res?.error)
      console.log(res.error)
    else
      setNewExercise(false)
    
  }

  const isKilogram = getValues('isKilogram') ?? null

  return (
    <div>
      <div className="mb-4 bg-slate-100 px-6 py-2 rounded-lg">
        <div className="flex flex-col items-start">
          <label htmlFor="exerciseDate" className="text-sm">
            <span className="font-bold">Exercise Date</span> (Optional)
          </label>
          <input
            id="exerciseDate"
            type="date"
            {...register('exerciseDate')}
          />
        </div>
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
      </div>
    </div>
  )
}
