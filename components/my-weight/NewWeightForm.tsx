'use client'

import { bodyweightSchema, BodyweightSchemaType } from '@/utils/zod-schemas/bodyweight-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { CircleAlert, LoaderCircle } from 'lucide-react'
import React, { Dispatch, SetStateAction } from 'react'
import { useForm } from 'react-hook-form'

import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import { createBodyweight } from '@/actions/bodyweight-actions'

dayjs.extend(localizedFormat);

type Props = {
  sessId: string
  setNewWeight: Dispatch<SetStateAction<boolean>>
}

export default function NewWeightForm({
  sessId,
  setNewWeight,
}: Props) {
  const { register, handleSubmit, formState: { errors, isSubmitting }, setValue, getValues, setError } = useForm({
    resolver: zodResolver(bodyweightSchema),
  })

  async function onSubmit(data: BodyweightSchemaType) {
    const newData = {
      ...data,
      bodyweightDate: data.bodyweightDate ? data.bodyweightDate : dayjs().format().split('T')[0]
    }

    console.log(newData)

    if (dayjs(newData.bodyweightDate).isAfter(dayjs())) {
      // console.log('date is after', newData.exerciseDate)
      setError('bodyweightDate', { message: 'error' }, { shouldFocus: true })
    }
    else {
      const res = await createBodyweight(newData, sessId)
      if (res?.error)
        setError('bodyweightDate', { message: 'error' }, { shouldFocus: true })
        // console.log(res.error)
      else
        setNewWeight(false)
    }
  }

  const isKilogram = getValues('isKilogram') ?? null

  return (
    <div className="">
      <div className="mb-4 bg-neutral-100 dark:bg-neutral-900 px-6 py-2 rounded-lg ">
        <div className="flex flex-col items-start">
          <label htmlFor="exerciseDate" className="text-sm">
            <span className="font-bold">Bodyweight Date</span> (Optional)
          </label>
          <input
            id="bodyweightDate"
            type="date"
            {...register('bodyweightDate')}
            className={`focus-within:outline-2 
            ${errors.bodyweightDate ? 'focus-within:outline-red-500' : 'focus-within:outline-blue-500'}  
          `}
            max={dayjs().format().split('T')[0]}
          />
        </div>
      </div>
      <div className="text-sm text-left rtl:text-right overflow-x-auto no-scrollbar p-1 focus-visible:outline-2 focus-visible:outline-blue-500">
        <div className="grid grid-cols-[repeat(3,minmax(200px,1fr))] w-full font-bold text-xs uppercase">
          <div className={`px-6 py-3 border-b border-neutral-200 dark:border-neutral-700  ${errors.weight && 'text-red-500 flex gap-1'}`}>
            Weight {errors.weight && <CircleAlert className="size-4" />}
          </div>
          <div className={`px-6 py-3 border-b border-neutral-200 dark:border-neutral-700  ${errors.isKilogram && 'text-red-500 flex gap-1'}`}>
            Unit {errors.isKilogram && <CircleAlert className="size-4" />}
          </div>
          <div className={`px-6 py-3 border-b border-neutral-200 dark:border-neutral-700 `}>
            Actions
          </div>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-[repeat(3,minmax(200px,1fr))]"
        >
          <div
            className={`focus-within:outline-2 border-b border-r border-neutral-200 dark:border-neutral-700
                    ${errors.weight
                ? 'focus-within:outline-red-500'
                : 'focus-within:outline-blue-500'}`}>
            <input
              type="text"
              className='px-6 py-4 w-full border-0 outline-0'
              autoFocus
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
          <div className="px-6 border-b border-neutral-200 dark:border-neutral-700 h-full flex flex-col items-start justify-center">
            <div className="flex gap-2">
              <button
                type="submit"
                className="px-4 py-1.5 rounded-lg bg-blue-500 hover:bg-blue-600 transition-colors text-white
                  dark:focus-visible:outline-white focus-visible:outline-black focus-visible:outline-2
                  "
                disabled={isSubmitting}
              >
                {isSubmitting ?
                  <LoaderCircle className="size-4 animate-spin" />
                  : 'Save'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
