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

dayjs.extend(localizedFormat);

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

  const { register, handleSubmit, formState: { errors }, reset, setValue, getValues } = useForm({
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

      <div className="w-full text-sm text-left rtl:text-right">
        <div className="grid grid-cols-6 font-bold border-b border-neutral-200 dark:border-neutral-700 text-xs uppercase">
          <div className={`px-6 py-3 ${errors.name && 'text-red-500 flex gap-1'}`}>
            Exercise {errors.name && <CircleAlert className="size-4" />}
          </div>
          <div className={`px-6 py-3 ${errors.weight && 'text-red-500 flex gap-1'}`}>
            Weight {errors.weight && <CircleAlert className="size-4" />}
          </div>
          <div className={`px-6 py-3 ${errors.isKilogram && 'text-red-500 flex gap-1'}`}>
            Unit {errors.isKilogram && <CircleAlert className="size-4" />}
          </div>
          <div className={`px-6 py-3 ${errors.sets && 'text-red-500 flex gap-1'}`}>
            Sets {errors.sets && <CircleAlert className="size-4" />}
          </div>
          <div className={`px-6 py-3 ${errors.reps && 'text-red-500 flex gap-1'}`}>
            Reps {errors.reps && <CircleAlert className="size-4" />}
          </div>
          <div className={`px-6 py-3`}>
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
          />
        )}
        {value?.map(data => (
          <EditExerciseRow key={data.id} data={data} sessId={sessId} />
        ))}
      </div>
    </div>
  )
}
