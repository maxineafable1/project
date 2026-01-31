'use client'

import { createExerciseSchema, CreateExerciseSchemaType } from "@/utils/exercise-form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleAlert } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import ExerciseForm from "./ExerciseForm";

import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import { createExercise } from "@/actions/exercise-actions";

dayjs.extend(localizedFormat);

type Props = {
  jwt: string
  setNewExercise: Dispatch<SetStateAction<boolean>>
  revalidateWorkouts?: (currPage: number) => Promise<void>
  currPage?: number
}

export default function NewExerciseForm({
  jwt,
  setNewExercise,
  revalidateWorkouts,
  currPage,
}: Props) {
  const { register, handleSubmit, formState: { errors, isSubmitting }, setValue, getValues, setError } = useForm({
    resolver: zodResolver(createExerciseSchema),
  })

  async function onSubmit(data: CreateExerciseSchemaType) {
    const newData = {
      ...data,
      exerciseDate: data.exerciseDate ? data.exerciseDate : dayjs().format().split('T')[0]
    }

    if (dayjs(newData.exerciseDate).isAfter(dayjs())) {
      // console.log('date is after', newData.exerciseDate)
      setError('exerciseDate', { message: 'Date must be today or earlier' }, { shouldFocus: true })
      return
    }

    try {
      await createExercise(jwt, newData)
      if (revalidateWorkouts && currPage)
        revalidateWorkouts(currPage)
    } catch (error) {
      // toast msg
      console.log(error)
    } finally {
      setNewExercise(false)
    }
  }

  const isKilogram = getValues('isKilogram') ?? null

  return (
    <div className="">
      <div className="mb-4 bg-neutral-100 dark:bg-neutral-900 px-6 py-2 rounded-lg ">
        <div className="flex flex-col items-start">
          <label htmlFor="exerciseDate" className="text-sm">
            <span className="font-bold">Exercise Date</span> (Optional)
          </label>
          <input
            id="exerciseDate"
            type="date"
            {...register('exerciseDate')}
            className={`focus-within:outline-2 
              ${errors.exerciseDate ? 'focus-within:outline-red-500' : 'focus-within:outline-blue-500'}  
            `}
            max={dayjs().format().split('T')[0]}
          />
        </div>
      </div>
      <div className="text-sm text-left rtl:text-right overflow-x-auto no-scrollbar p-1 focus-visible:outline-2 focus-visible:outline-blue-500">
        <div className="grid grid-cols-[repeat(6,minmax(200px,1fr))] w-full font-bold text-xs uppercase">
          <div className={`px-6 py-3 border-b border-neutral-200 dark:border-neutral-700  ${errors.name && 'text-red-500 flex gap-1'}`}>
            Exercise {errors.name && <CircleAlert className="size-4" />}
          </div>
          <div className={`px-6 py-3 border-b border-neutral-200 dark:border-neutral-700  ${errors.weight && 'text-red-500 flex gap-1'}`}>
            Weight {errors.weight && <CircleAlert className="size-4" />}
          </div>
          <div className={`px-6 py-3 border-b border-neutral-200 dark:border-neutral-700  ${errors.isKilogram && 'text-red-500 flex gap-1'}`}>
            Unit {errors.isKilogram && <CircleAlert className="size-4" />}
          </div>
          <div className={`px-6 py-3 border-b border-neutral-200 dark:border-neutral-700  ${errors.sets && 'text-red-500 flex gap-1'}`}>
            Sets {errors.sets && <CircleAlert className="size-4" />}
          </div>
          <div className={`px-6 py-3 border-b border-neutral-200 dark:border-neutral-700  ${errors.reps && 'text-red-500 flex gap-1'}`}>
            Reps {errors.reps && <CircleAlert className="size-4" />}
          </div>
          <div className={`px-6 py-3 border-b border-neutral-200 dark:border-neutral-700 `}>
            Actions
          </div>
        </div>
        <ExerciseForm
          errors={errors}
          isKilogram={isKilogram}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          register={register}
          setValue={setValue}
          isSubmitting={isSubmitting}
        />
      </div>
    </div>
  )
}
