'use client'


import { CreateExerciseSchemaType } from '@/utils/exercise-form-schema'
import React, { Dispatch, SetStateAction } from 'react'
import { FieldErrors, UseFormHandleSubmit, UseFormRegister, UseFormReset, UseFormSetValue } from 'react-hook-form'

type Props = {
  errors: FieldErrors<CreateExerciseSchemaType>
  register: UseFormRegister<CreateExerciseSchemaType>
  isKilogram: boolean
  setValue: UseFormSetValue<CreateExerciseSchemaType>
  handleSubmit: UseFormHandleSubmit<CreateExerciseSchemaType>
  onSubmit(data: CreateExerciseSchemaType): Promise<void>
  isEdit?: boolean
  setIsEdit?: Dispatch<SetStateAction<boolean>>
  reset?: UseFormReset<CreateExerciseSchemaType>
}

export default function ExerciseForm({
  errors,
  register,
  isKilogram,
  setValue,
  handleSubmit,
  onSubmit,
  setIsEdit,
  reset,
  isEdit = false,
}: Props) {
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-[repeat(6,minmax(200px,1fr))]"
    >
      <div
        className={`focus-within:outline-2 border-b border-r border-neutral-200 dark:border-neutral-700
                  ${errors.name
            ? 'focus-within:outline-red-500'
            : 'focus-within:outline-blue-500'}`}>
        <input
          type="text"
          className='px-6 py-4 w-full border-0 outline-0'
          autoFocus
          {...register('name')}
        />
      </div>
      <div
        className={`focus-within:outline-2 border-b border-r border-neutral-200 dark:border-neutral-700
                  ${errors.weight
            ? 'focus-within:outline-red-500'
            : 'focus-within:outline-blue-500'}`}>
        <input
          type="text"
          className="px-6 py-4 w-full border-0 outline-0"
          {...register('weight', { valueAsNumber: true })}
        />
      </div>
      <div className={`
        border-b border-r border-neutral-200 dark:border-neutral-700
        flex items-center gap-4 justify-center
      `}>
        <div className="flex items-center gap-2 font-bold">
          <label htmlFor="kg">Kilogram</label>
          <input
            type="radio"
            id='kg'
            value={'true'}
            className="px-6 py-4 border-0 outline-0 w-4 h-4 accent-blue-600 focus-visible:outline-2 focus-visible:outline-blue-500"
            name='unit'
            defaultChecked={isKilogram}
            onClick={() => setValue('isKilogram', true, { shouldValidate: true })}
          />
        </div>
        <div className="flex items-center gap-2 font-bold">
          <label htmlFor="lbs">Pounds</label>
          <input
            type="radio"
            id='lbs'
            value={'false'}
            className="px-6 py-4 border-0 outline-0 w-4 h-4 accent-blue-600 focus-visible:outline-2 focus-visible:outline-blue-500"
            name='unit'
            defaultChecked={isKilogram === false}
            onClick={() => setValue('isKilogram', false, { shouldValidate: true })}
          />
        </div>
      </div>
      <div
        className={`focus-within:outline-2 border-b border-r border-neutral-200 dark:border-neutral-700
                  ${errors.sets
            ? 'focus-within:outline-red-500'
            : 'focus-within:outline-blue-500'}`}>
        <input
          type="text"
          className="px-6 py-4 w-full border-0 outline-0"
          {...register('sets', { valueAsNumber: true })}
        />
      </div>
      <div
        className={`focus-within:outline-2 border-b border-r border-neutral-200 dark:border-neutral-700
                  ${errors.sets
            ? 'focus-within:outline-red-500'
            : 'focus-within:outline-blue-500'}`}>
        <input
          type="text"
          className="px-6 py-4 w-full focus:border-0 focus:outline-0"
          {...register('reps', { valueAsNumber: true })}
        />
      </div>
      <div className="px-6 border-b border-neutral-200 dark:border-neutral-700 h-full flex flex-col items-start justify-center">
        <div className="flex gap-2">
          <button
            type="submit"
            className="px-4 py-1.5 rounded-lg bg-blue-500 hover:bg-blue-600 transition-colors text-white
                  dark:focus-visible:outline-white focus-visible:outline-black focus-visible:outline-2
                  "
          >
            Save
          </button>
          {isEdit && (
            <button
              onClick={() => {
                setIsEdit?.(false)
                reset?.()
              }}
              type="button"
              className="px-4 py-1.5 rounded-lg border border-neutral-300 not-dark:hover:bg-neutral-100 
                focus-visible:outline-blue-500 focus-visible:outline focus-visible:lue-500
                dark:border-neutral-700 dark:hover:border-neutral-500 transition-colors"
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </form>
  )
}
