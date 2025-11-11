'use client'


import { CreateExerciseSchemaType } from '@/utils/exercise-form-schema'
import { ChevronDown } from 'lucide-react'
import React, { Dispatch, SetStateAction, useState } from 'react'
import { FieldErrors, SubmitHandler, UseFormHandleSubmit, UseFormRegister, UseFormReset, UseFormSetValue } from 'react-hook-form'

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
  const [isDropdown, setIsDropdown] = useState(false)

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="border-b border-neutral-200 dark:border-neutral-700 grid grid-cols-6"
    >
      <div
        className={`focus-within:outline-2 border-r border-neutral-200 dark:border-neutral-700
                  ${errors.name
            ? 'focus-within:outline-red-500'
            : 'focus-within:outline-blue-500'}`}>
        <input
          type="text"
          className='px-6 py-4 w-full focus:border-0 focus:outline-0'
          autoFocus
          {...register('name')}
        />
      </div>
      <div
        className={`focus-within:outline-2 border-r border-neutral-200 dark:border-neutral-700
                  ${errors.weight
            ? 'focus-within:outline-red-500'
            : 'focus-within:outline-blue-500'}`}>
        <input
          type="text"
          className="px-6 py-4 w-full focus:border-0 focus:outline-0"
          {...register('weight', { valueAsNumber: true })}
        />
      </div>
      <div
        className={`focus-within:outline-2 border-r border-neutral-200 dark:border-neutral-700
                  ${errors.isKilogram
            ? 'focus-within:outline-red-500'
            : 'focus-within:outline-blue-500'}
                  `}>
        <button
          type="button"
          onClick={() => setIsDropdown(prev => !prev)}
          className={`inline-flex items-center gap-2 w-full px-6 py-4 outline-0 border-0`}>
          {isKilogram ? 'Kilograms' : isKilogram === null ? 'Select a unit' : 'Pounds'}
          <ChevronDown className="size-4" />
        </button>
        <div className={`z-10 absolute w-32 overflow-hidden
                    ${!isDropdown && 'hidden'} bg-neutral-100 dark:bg-neutral-700 rounded-lg shadow-sm
                    `}>
          <ul className="text-sm">
            <li
              onClick={() => {
                setValue('isKilogram', true, { shouldValidate: true })
                setIsDropdown(false)
              }}
              className="px-4 py-2 hover:bg-neutral-200 dark:hover:bg-neutral-600 cursor-pointer">
              Kilograms
            </li>
            <li
              onClick={() => {
                setValue('isKilogram', false, { shouldValidate: true })
                setIsDropdown(false)
              }}
              className="px-4 py-2 hover:bg-neutral-200 dark:hover:bg-neutral-600 cursor-pointer">
              Pounds
            </li>
          </ul>
        </div>
      </div>
      <div
        className={`focus-within:outline-2 border-r border-neutral-200 dark:border-neutral-700
                  ${errors.sets
            ? 'focus-within:outline-red-500'
            : 'focus-within:outline-blue-500'}`}>
        <input
          type="text"
          className="px-6 py-4 w-full focus:border-0 focus:outline-0"
          {...register('sets', { valueAsNumber: true })}
        />
      </div>
      <div
        className={`focus-within:outline-2 border-r border-neutral-200 dark:border-neutral-700
                  ${errors.reps
            ? 'focus-within:outline-red-500'
            : 'focus-within:outline-blue-500'}`}>
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
                focus-within:outline-blue-500 focus-within:outline focus-within:border-blue-500
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
