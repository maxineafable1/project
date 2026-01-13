'use client'

import { Dispatch, SetStateAction, useState } from 'react'

import { deleteBodyweight, updateBodyweight } from '@/actions/bodyweight-actions'
import { bodyweightSchema, BodyweightSchemaType } from '@/utils/zod-schemas/bodyweight-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import { LoaderCircle } from 'lucide-react'
import { useForm } from 'react-hook-form'
import weekOfYear from 'dayjs/plugin/weekOfYear' // ES 2015

dayjs.extend(weekOfYear);

dayjs.extend(localizedFormat);

type Props = {
  jwt: string
  weight: {
    id: number;
    weight: number;
    date: string;
    isKilogram: boolean;
  }
  isEditId: number | null
  setIsEditId: Dispatch<SetStateAction<number | null>>
}

export default function BodyweightRow({
  jwt,
  weight: { date, id, isKilogram, weight },
  isEditId,
  setIsEditId,
}: Props) {
  const [isDelete, setIsDelete] = useState(false)

  const { register, handleSubmit, formState: { errors, isSubmitting }, setValue } = useForm({
    resolver: zodResolver(bodyweightSchema),
    defaultValues: {
      weight: isKilogram ? weight : +(weight * 2.205).toFixed(2),
      isKilogram,
    }
  })

  async function onSubmit(data: BodyweightSchemaType) {
    const newData = {
      ...data,
      bodyweightDate: date,
    }

    try {
      await updateBodyweight(jwt, newData, id)
    } catch (error) {
      // toast msg
      console.log(error)
    } finally {
      setIsEditId(null)
    }
  }

  return (
    <div className="grid grid-cols-[repeat(4,minmax(200px,1fr))] font-bold text-sm">
      <div
        className="px-6 py-4 border-b border-r border-neutral-200 dark:border-neutral-700 truncate overflow-x-auto focus-visible:outline-blue-500 focus-visible:outline-2">
        {dayjs(date).format('ll')}
      </div>
      {isEditId === id ? (
        <>
          <form id='edit-form' onSubmit={handleSubmit(onSubmit)} hidden></form>
          <div
            className={`focus-within:outline-2 border-b border-r border-neutral-200 dark:border-neutral-700
                  ${errors.weight
                ? 'focus-within:outline-red-500'
                : 'focus-within:outline-blue-500'}`}>
            <input
              form='edit-form'
              type="text"
              className='px-6 py-4 w-full border-0 outline-0'
              autoFocus
              {...register('weight', { valueAsNumber: true })}
            />
          </div>
          <div className={`
              border-b border-r border-neutral-200 dark:border-neutral-700
              flex items-center gap-2 justify-center
            `}>
            <div className="flex items-center gap-2 font-bold">
              <label htmlFor="kg">Kilogram</label>
              <input
                form='edit-form'
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
                form='edit-form'
                type="radio"
                id='lb'
                value={'false'}
                className="px-6 py-4 border-0 outline-0 w-4 h-4 accent-blue-600 focus-visible:outline-2 focus-visible:outline-blue-500"
                name='unit'
                defaultChecked={isKilogram === false}
                onClick={() => setValue('isKilogram', false, { shouldValidate: true })}
              />
            </div>
          </div>
        </>
      ) : (
        <>
          <div
            className="px-6 py-4 border-b border-r border-neutral-200 dark:border-neutral-700 truncate overflow-x-auto focus-visible:outline-blue-500 focus-visible:outline-2">
            {isKilogram ? weight : +(weight * 2.205).toFixed(2)}
          </div>
          <div
            className="px-6 py-4 border-b border-r border-neutral-200 dark:border-neutral-700 truncate overflow-x-auto focus-visible:outline-blue-500 focus-visible:outline-2">
            {isKilogram ? 'Kg' : 'Lb'}
          </div>
        </>
      )}
      <div className="px-6 h-full border-b border-neutral-200 dark:border-neutral-700 flex flex-col items-start justify-center">
        <div className="flex gap-2">
          <button
            onClick={() => setIsEditId(prev => {
              if (prev === id) return null
              prev = id
              return prev
            })}
            className="px-4 py-1.5 rounded-lg border border-neutral-300 not-dark:hover:bg-neutral-100 
                focus-visible:outline-blue-500 focus-visible:outline focus-visible:border-blue-500
                 dark:border-neutral-700 dark:hover:border-neutral-500 transition-colors "
          >
            {isEditId === id ? 'Cancel' : 'Edit'}
          </button>
          {isEditId === id ? (
            <button
              type="submit"
              form='edit-form'
              className="px-4 py-1.5 rounded-lg bg-blue-500 hover:bg-blue-600 transition-colors text-white
                dark:focus-visible:outline-white focus-visible:outline-black focus-visible:outline-2
                "
              disabled={isSubmitting}
            >
              {isSubmitting ?
                <LoaderCircle className="size-4 animate-spin" />
                : 'Save'}
            </button>
          ) : (
            <button
              title='Delete'
              disabled={isDelete}
              onClick={async () => {
                setIsDelete(true)
                try {
                  await deleteBodyweight(jwt, id)
                } catch (error) {
                  // toast msg
                  console.log(error)
                } finally {
                  setIsDelete(false)
                }
              }}
              className="px-4 py-1.5 rounded-lg bg-red-500 hover:bg-red-600 
                focus-visible:outline-blue-500 focus-visible:outline-2
                transition-colors text-white w-full"
            >
              {isDelete ? <>
                <LoaderCircle className='size-4 animate-spin' />
              </>
                : 'Delete'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
