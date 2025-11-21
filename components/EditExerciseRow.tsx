'use client'

import { deleteExercise, updateExercise } from "@/actions/exercise-actions"
import { createExerciseSchema, CreateExerciseSchemaType } from "@/utils/exercise-form-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import ExerciseForm from "./ExerciseForm"
import { LoaderCircle } from "lucide-react"

type Props = {
  data: {
    id: number;
    name: string;
    weight: number;
    sets: number;
    reps: number;
    exerciseDate: string;
    isKilogram: boolean;
    createdAt: Date;
    updatedAt: Date;
    userId: string | null;
  }
  sessId: string
}

export default function EditExerciseRow({
  data: { id, name, weight, sets, reps, exerciseDate, isKilogram: isKilogramDefault },
  sessId,
}: Props) {
  const [isEdit, setIsEdit] = useState(false)
  const [isDeleteLoading, setDeleteLoading] = useState(false)

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset, setValue, getValues } = useForm({
    resolver: zodResolver(createExerciseSchema),
    defaultValues: {
      name,
      weight,
      sets,
      reps,
      exerciseDate,
      isKilogram: isKilogramDefault,
    }
  })

  async function onSubmit(data: CreateExerciseSchemaType) {
    const newData = {
      ...data,
      exerciseDate,
    }

    const res = await updateExercise(id, newData, sessId)
    if (res?.error)
      console.log(res.error)
    else
      setIsEdit(false)
  }

  async function handleExerciseDelete(exerciseId: number) {
    setDeleteLoading(true)
    const res = await deleteExercise(exerciseId)
    if (res?.error)
      console.log(res.error)
    else
      setDeleteLoading(false)
  }

  const isKilogram = getValues('isKilogram') ?? null

  return (
    <>
      {isEdit ? (
        <ExerciseForm
          errors={errors}
          isKilogram={isKilogram}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          register={register}
          setValue={setValue}
          isEdit
          reset={reset}
          setIsEdit={setIsEdit}
          isSubmitting={isSubmitting}
        />
      ) : (
        <div
          className="grid grid-cols-[repeat(6,minmax(200px,1fr))]">
          <div
            className="px-6 py-4 border-b border-r border-neutral-200 dark:border-neutral-700 truncate overflow-x-auto focus-visible:outline-blue-500 focus-visible:outline-2">
            {name}
          </div>
          <div className="px-6 py-4 border-b border-r border-neutral-200 dark:border-neutral-700">
            {weight}
          </div>
          <div className="px-6 py-4 border-b border-r border-neutral-200 dark:border-neutral-700">
            {isKilogram ? 'Kg' : 'Lbs'}
          </div>
          <div className="px-6 py-4 border-b border-r border-neutral-200 dark:border-neutral-700">
            {sets}
          </div>
          <div className="px-6 py-4 border-b border-r border-neutral-200 dark:border-neutral-700">
            {reps}
          </div>
          <div className="px-6 h-full border-b border-neutral-200 dark:border-neutral-700 flex flex-col items-start justify-center">
            <div className="flex gap-2">
              <button
                onClick={() => setIsEdit(true)}
                className="px-4 py-1.5 rounded-lg border border-neutral-300 not-dark:hover:bg-neutral-100 
                focus-visible:outline-blue-500 focus-visible:outline focus-visible:border-blue-500
                 dark:border-neutral-700 dark:hover:border-neutral-500 transition-colors "
              >
                Edit
              </button>
              <button
                onClick={() => handleExerciseDelete(id)}
                className="px-4 py-1.5 rounded-lg bg-red-500 hover:bg-red-600 
                focus-visible:outline-blue-500 focus-visible:outline-2
                transition-colors text-white"
                disabled={isDeleteLoading}
              >
                {isDeleteLoading ?
                  <LoaderCircle className="size-4 animate-spin" />
                  : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
