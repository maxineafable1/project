'use client'

import { deleteExercise, updateExercise } from "@/actions/exercise-actions"
import { createExerciseSchema, CreateExerciseSchemaType } from "@/utils/exercise-form-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { LoaderCircle } from "lucide-react"
import { useRef, useState } from "react"
import { useForm } from "react-hook-form"
import ExerciseForm from "./ExerciseForm"

type Props = {
  data: {
    id: number;
    name: string;
    weight: number;
    sets: number;
    reps: number;
    // exerciseDate: string;
    isKilogram: boolean;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
  }
  sessId: string
  titleDate: string
}

export default function EditExerciseRow({
  data: { id, name, weight, sets, reps, isKilogram: isKilogramDefault, userId },
  sessId,
  titleDate,
}: Props) {
  const [isEdit, setIsEdit] = useState(false)

  const [isDeleteLoading, setDeleteLoading] = useState(false)

  const dialogRef = useRef<HTMLDialogElement | null>(null)

  async function handleExerciseDelete(exerciseId: number, date: string, userId: string) {
    setDeleteLoading(true)
    const res = await deleteExercise(exerciseId, date, userId)
    if (res?.error)
      console.log(res.error)
    else
      setDeleteLoading(false)
  }

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset, setValue, getValues } = useForm({
    resolver: zodResolver(createExerciseSchema),
    defaultValues: {
      name,
      weight: isKilogramDefault ? weight : +(weight * 2.205).toFixed(2),
      sets,
      reps,
      // exerciseDate,
      isKilogram: isKilogramDefault,
    }
  })

  async function onSubmit(data: CreateExerciseSchemaType) {
    const newData = {
      ...data,
      exerciseDate: titleDate,
    }

    const res = await updateExercise(id, newData, sessId)
    if (res?.error)
      console.log(res.error)
    else
      setIsEdit(false)
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
          weight={weight}
        />
      ) : (
        <div
          className="grid grid-cols-[repeat(6,minmax(200px,1fr))]">
          <div
            className="px-6 py-4 border-b border-r border-neutral-200 dark:border-neutral-700 truncate overflow-x-auto focus-visible:outline-blue-500 focus-visible:outline-2">
            {name}
          </div>
          <div className="px-6 py-4 border-b border-r border-neutral-200 dark:border-neutral-700">
            {isKilogram ? weight : +(weight * 2.205).toFixed(2)}
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
                // ref={deleteBtnRef}
                onClick={() => {
                  if (dialogRef.current) {
                    dialogRef.current.showModal()
                    // setIsDelete(true)
                  }
                }}
                // ref={ref}
                className="px-4 py-1.5 rounded-lg bg-red-500 hover:bg-red-600 
                focus-visible:outline-blue-500 focus-visible:outline-2
                transition-colors text-white"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      <dialog
        ref={dialogRef}
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
          backdrop:bg-black backdrop:opacity-80 dark:bg-neutral-800 dark:text-white
          rounded-lg shadow p-6 max-w-sm w-full
        ">
        <div className="text-lg font-bold mb-1">Are you sure?</div>
        <p className="text-sm">This will permanently delete this exercise.</p>
        <div className="flex items-center justify-end gap-2 mt-4 ">
          <button
            onClick={() => {
              if (dialogRef.current) {
                dialogRef.current.close()
              }
            }}
            className="px-4 py-1.5 rounded-lg border border-neutral-300 not-dark:hover:bg-neutral-100 
            focus-visible:outline-blue-500 focus-visible:outline focus-visible:border-blue-500
              dark:border-neutral-700 dark:hover:border-neutral-500 transition-colors "
          >
            Cancel
          </button>
          <form method="dialog">
            <button
              onClick={() => handleExerciseDelete(id, titleDate, userId)}
              disabled={isDeleteLoading}
              className="px-4 py-1.5 rounded-lg bg-red-500 hover:bg-red-600 
                focus-visible:outline-blue-500 focus-visible:outline-2
                transition-colors text-white inline-flex items-center gap-1">
              {isDeleteLoading ? <>
                <LoaderCircle className="size-4 animate-spin" />
                Deleting...
              </>
                : 'Delete'}
            </button>
          </form>
        </div>
      </dialog>
    </>
  )
}
