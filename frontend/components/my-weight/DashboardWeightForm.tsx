'use client'

import { createBodyweight } from '@/actions/bodyweight-actions'
import { Label } from "@/components/ui/label"
import { BodyweightSchemaType } from '@/utils/zod-schemas/bodyweight-schema'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import { Dispatch, SetStateAction } from 'react'
import { FieldErrors, UseFormGetValues, UseFormHandleSubmit, UseFormRegister, UseFormSetError, UseFormSetValue } from 'react-hook-form'
import { Input } from '../ui/input'
import { Switch } from '../ui/switch'

dayjs.extend(localizedFormat);

type Props = {
  jwt: string
  setNewWeight: Dispatch<SetStateAction<boolean>>
  register: UseFormRegister<BodyweightSchemaType>
  handleSubmit: UseFormHandleSubmit<BodyweightSchemaType>
  errors: FieldErrors<BodyweightSchemaType>
  setValue: UseFormSetValue<BodyweightSchemaType>
  getValues: UseFormGetValues<BodyweightSchemaType>
  setError: UseFormSetError<BodyweightSchemaType>
}

export default function DashboardWeightForm({
  jwt,
  setNewWeight,
  register,
  handleSubmit,
  errors,
  getValues,
  setError,
  setValue,
}: Props) {
  async function onSubmit(newBodyweight: BodyweightSchemaType) {
    const newData = {
      ...newBodyweight,
      date: newBodyweight.date ? newBodyweight.date : dayjs().format().split('T')[0]
    }

    if (dayjs(newData.date).isAfter(dayjs())) {
      console.log('newData: ', newData.date, 'after: ', dayjs().date)
      setError('date', { message: 'Bodyweight already exists with date' }, { shouldFocus: true })
      return
    }

    try {
      await createBodyweight(jwt, newData)
      setNewWeight(false)
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.startsWith('Bodyweight'))
          setError('date', { message: 'Bodyweight already exists with this date' }, { shouldFocus: true })
        else
          // toast msg
          console.log(error)
      }
    }
  }

  const isKilogram = getValues('isKilogram') ?? null

  return (
    <>
      <div className="mb-4 bg-neutral-100 dark:bg-neutral-900 px-6 py-2 rounded-lg ">
        <div className="flex flex-col items-start">
          <label htmlFor="exerciseDate" className="text-sm">
            <span className="font-bold">Bodyweight Date</span> (Optional)
          </label>
          <input
            id="date"
            type="date"
            {...register('date')}
            className={`focus-within:outline-2 
            ${errors.date ? 'focus-within:outline-red-500' : 'focus-within:outline-blue-500'}  
          `}
            max={dayjs().format().split('T')[0]}
          />
        </div>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='space-y-2'
        id='new-weight-form'
      >
        <div className="space-y-2">
          <Label htmlFor="weight">Weight</Label>
          <Input
            id='weight'
            autoFocus
            {...register('weight', { valueAsNumber: true })}
            aria-invalid={!!errors.weight}
          />
        </div>
        <div className="flex items-center gap-2">
          <Switch
            id="unit"
            defaultChecked={isKilogram}
            onCheckedChange={e => {
              setValue('isKilogram', e, { shouldValidate: true })
            }}
          />
          <Label htmlFor="unit">Kilogram</Label>
        </div>
      </form>
    </>
  )
}
