'use client'

import { createExercise } from "@/actions/exercise-actions"
import { createExerciseSchema, CreateExerciseSchemaType } from "@/utils/exercise-form-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { CircleAlert, Minus, Plus } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import EditExerciseRow from "./EditExerciseRow"
import ExerciseForm from "./ExerciseForm"

import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import isoWeek from 'dayjs/plugin/isoWeek'

dayjs.extend(localizedFormat);
dayjs.extend(weekOfYear);
dayjs.extend(isoWeek);

type Props = {
  sessId: string
  titleDate: string
  value: {
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
  }[] | undefined
}

export default function ExerciseTable({
  sessId,
  titleDate,
  value,
}: Props) {
  const [isCreate, setIsCreate] = useState(false)

  console.log(dayjs('2025-11-19').startOf('week').format().split('T')[0])

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset, setValue, getValues } = useForm({
    resolver: zodResolver(createExerciseSchema),
  })

  async function onSubmit(data: CreateExerciseSchemaType) {
    const newData = {
      ...data,
      exerciseDate: dayjs(titleDate).format('YYYY-MM-DD'),
    }

    const res = await createExercise(newData, sessId)
    if (res?.error)
      console.log(res.error)
    else {
      setIsCreate(false)
      reset()
    }
  }

  const isKilogram = getValues('isKilogram') ?? null

  return (
    <div>
      <div className="flex justify-between items-center mb-4 bg-neutral-100 dark:bg-neutral-900 px-6 py-2 rounded-lg">
        <h2 className='text-xl font-bold'>{titleDate}</h2>
        <button
          onClick={() => setIsCreate(prev => {
            if (prev)
              reset()
            return !prev
          })}
          className="hover:bg-white dark:hover:bg-neutral-700 p-1 transition-colors rounded focus-visible:outline-blue-500 focus-visible:outline-2"
        >
          {isCreate ? <Minus className="size-4" /> : <Plus className="size-4" />}
          <span className="sr-only">{isCreate ? 'Cancel add new exercise' : 'Add new exercise'}</span>
        </button>
      </div>

      <div className="w-full text-sm text-left rtl:text-right overflow-x-auto no-scrollbar p-1 focus-visible:outline-2 focus-visible:outline-blue-500">
        <div className="grid grid-cols-[repeat(6,minmax(200px,1fr))] font-bold text-xs uppercase">
          <div className={`px-6 py-3 border-b border-neutral-200 dark:border-neutral-700 ${errors.name && 'text-red-500 flex gap-1'}`}>
            Exercise {errors.name && <CircleAlert className="size-4" />}
          </div>
          <div className={`px-6 py-3 border-b border-neutral-200 dark:border-neutral-700 ${errors.weight && 'text-red-500 flex gap-1'}`}>
            Weight {errors.weight && <CircleAlert className="size-4" />}
          </div>
          <div className={`px-6 py-3 border-b border-neutral-200 dark:border-neutral-700 ${errors.isKilogram && 'text-red-500 flex gap-1'}`}>
            Unit {errors.isKilogram && <CircleAlert className="size-4" />}
          </div>
          <div className={`px-6 py-3 border-b border-neutral-200 dark:border-neutral-700 ${errors.sets && 'text-red-500 flex gap-1'}`}>
            Sets {errors.sets && <CircleAlert className="size-4" />}
          </div>
          <div className={`px-6 py-3 border-b border-neutral-200 dark:border-neutral-700 ${errors.reps && 'text-red-500 flex gap-1'}`}>
            Reps {errors.reps && <CircleAlert className="size-4" />}
          </div>
          <div className={`px-6 py-3 border-b border-neutral-200 dark:border-neutral-700`}>
            Actions
          </div>
        </div>
        {/* form here when adding */}
        {isCreate && (
          <ExerciseForm
            errors={errors}
            isKilogram={isKilogram}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            register={register}
            setValue={setValue}
            isSubmitting={isSubmitting}
          />
        )}
        {value?.map(data => (
          <EditExerciseRow key={data.id} data={data} sessId={sessId} />
        ))}
      </div>
    </div>
  )
}
