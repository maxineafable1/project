'use client'

import { useState } from 'react'

import { createBodyweight, deleteBodyweight, updateBodyweight } from '@/actions/bodyweight-actions'
import { BodyweightsType } from '@/db-schema'
import { bodyweightSchema, BodyweightSchemaType } from '@/utils/zod-schemas/bodyweight-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import { CircleX, LoaderCircle, Pencil, Plus, Trash } from 'lucide-react'
import { useForm } from 'react-hook-form'

dayjs.extend(localizedFormat);

type Props = {
  sessId: string
  date: string | {
    id: number;
    weight: number;
    bodyweightDate: string;
    isKilogram: boolean;
    createdAt: Date;
    updatedAt: Date;
    userId: string | null;
  }
}

export function instanceOfBodyweight(object: any): object is BodyweightsType {
  return typeof object === 'object' && object !== null;
}

export default function BodyweightRow({
  sessId,
  date,
}: Props) {
  const [isAddWeight, setIsAddWeight] = useState(false)
  const [isEditId, setIsEditId] = useState<number | null>(null)
  const [deleteIdLoading, setDeleteIdLoading] = useState<number | null>(null)

  const isObj = instanceOfBodyweight(date)

  const { register, handleSubmit, formState: { errors, isSubmitting }, setValue, getValues, setError, reset } = useForm({
    resolver: zodResolver(bodyweightSchema),
  })

  async function onSubmit(data: BodyweightSchemaType) {
    if (isSubmitting) return
    const newData = {
      ...data,
      bodyweightDate: isObj ? date.bodyweightDate : date
    }

    const res = isEditId
      ? await updateBodyweight(isEditId, newData, sessId)
      : await createBodyweight(newData, sessId)
    if (res?.error)
      console.log(res.error)
    else {
      isEditId ? setIsEditId(null) : setIsAddWeight(false)
    }
  }

  return (
    <div key={isObj ? date.bodyweightDate : date}>
      <div className="px-6 py-3 border-b border-neutral-200 dark:border-neutral-700 text-sm
        bg-neutral-100 dark:bg-neutral-900 group-first:rounded-l-lg group-last-of-type:rounded-r-lg
        ">
        {dayjs(isObj ? date.bodyweightDate : date).format('ll')}
      </div>
      <div
        title={!isObj ? 'Add' : undefined}
        className={`px-6 py-4 border-b border-r border-neutral-200 dark:border-neutral-700 group/inner
          ${!isObj && 'text-center'} max-h-14 h-full`}
        onClick={() => {
          if (isObj || isAddWeight) return
          console.log('adding', date)
          setIsAddWeight(true)
        }}
      >
        {isObj ? (
          isEditId ? (
            <div className='flex items-center justify-center gap-2'>
              <form onSubmit={handleSubmit(onSubmit)} className='flex items-center gap-2'>
                <input
                  defaultValue={date.weight}
                  {...register('weight', { valueAsNumber: true })}
                  className={`border-2 text-sm rounded-lg px-2 max-w-12
                  focus-within:outline
                border-neutral-300 dark:border-neutral-700
                  ${errors.weight
                      ? 'focus-within:outline-red-500 focus-within:border-red-500'
                      : 'focus-within:outline-blue-500 focus-within:border-blue-500 '}
                  `}
                  autoFocus
                />
                <div className="relative inline-flex gap-1">
                  <input
                    {...register('isKilogram')}
                    id="switch-component"
                    type="checkbox"
                    defaultChecked={date.isKilogram}
                    className="peer appearance-none w-8 h-4 focus-within:outline-blue-500 focus-within:outline-2
                    bg-neutral-200 dark:bg-neutral-700 rounded-full checked:bg-blue-500 cursor-pointer transition-colors duration-300" />
                  <label htmlFor="switch-component"
                    className="absolute top-0 left-0 w-4 aspect-square 
                    bg-white rounded-full border border-neutral-200 shadow-sm 
                    dark:bg-neutral-900 dark:border-neutral-700
                      transition-transform duration-300 peer-checked:translate-x-4 
                    peer-checked:border-blue-500 cursor-pointer">
                  </label>
                  <span className='text-xs'>Kg</span>
                </div>
              </form>
            </div>
          ) : (
            <div>{date.weight} {date.isKilogram ? 'kg' : 'lb'}</div>
          )
        ) : (
          isAddWeight ? (
            <div className='flex items-center justify-center gap-2'>
              <form onSubmit={handleSubmit(onSubmit)} className='flex items-center gap-2'>
                <input
                  {...register('weight', { valueAsNumber: true })}
                  className={`border-2 text-sm rounded-lg px-2 max-w-12
                      focus-within:outline
                      border-neutral-300 dark:border-neutral-700
                      ${errors.weight
                      ? 'focus-within:outline-red-500 focus-within:border-red-500'
                      : 'focus-within:outline-blue-500 focus-within:border-blue-500 '}
                    `}
                  autoFocus
                />
                <div className="relative inline-flex gap-1">
                  <input
                    {...register('isKilogram')}
                    id="switch-component"
                    type="checkbox"
                    className="peer appearance-none w-8 h-4 focus-within:outline-blue-500 focus-within:outline-2
                      bg-neutral-200 dark:bg-neutral-700 rounded-full checked:bg-blue-500 cursor-pointer transition-colors duration-300" />
                  <label htmlFor="switch-component"
                    className="absolute top-0 left-0 w-4 aspect-square 
                        bg-white rounded-full border border-neutral-200 shadow-sm 
                        dark:bg-neutral-900 dark:border-neutral-700
                        transition-transform duration-300 peer-checked:translate-x-4 
                        peer-checked:border-blue-500 cursor-pointer">
                  </label>
                  <span className='text-xs'>Kg</span>
                </div>
              </form>
            </div>
          ) : (
            <button className='p-1 rounded-sm group-hover/inner:bg-neutral-100 dark:group-hover/inner:bg-neutral-900
                focus-within:outline-blue-500 focus-within:outline-2
              '>
              <Plus className='size-4' />
            </button>
          )
        )}
      </div>
      {(isAddWeight && !isObj) && (
        <div className="py-2 text-center">
          <button
            onClick={e => {
              e.stopPropagation()
              setIsAddWeight(false)
              reset()
            }}
            title='Cancel'
            className='p-1 rounded-sm hover:bg-neutral-100 dark:hover:bg-neutral-900 
            transition-colors focus-visible:outline-blue-500 focus-visible:outline-2
            '>
            <CircleX className='size-4' />
          </button>
        </div>
      )}
      {isObj && (
        <div className="py-2 space-x-1 text-center">
          <button
            title={isEditId ? 'Cancel' : 'Edit'}
            onClick={() => setIsEditId(prev => {
              if (prev) {
                reset()
                return prev = null
              }
              prev = date.id
              return prev
            })}
            className='p-1 rounded-sm hover:bg-neutral-100 dark:hover:bg-neutral-900 
              transition-colors focus-visible:outline-blue-500 focus-visible:outline-2
              '
            disabled={isSubmitting && (isEditId === date.id)}
          >
            {isEditId
              ? <CircleX className='size-4' />
              : <Pencil className='size-4' />}
          </button>
          {!isEditId && (
            <button
              title='Delete'
              disabled={deleteIdLoading === date.id}
              onClick={async () => {
                setDeleteIdLoading(date.id)
                const res = await deleteBodyweight(date.id)
                if (res?.error)
                  console.log(res.error)
                else
                  setDeleteIdLoading(null)
              }}
              className='p-1 rounded-sm hover:bg-neutral-100 dark:hover:bg-neutral-900 
              transition-colors focus-visible:outline-blue-500 focus-visible:outline-2
              '>
              {deleteIdLoading === date.id ? (
                <LoaderCircle className='size-4 text-red-500 animate-spin' />
              ) : (
                <Trash className='size-4 text-red-500' />
              )}
            </button>
          )}
        </div>
      )}
    </div>
  )
}
