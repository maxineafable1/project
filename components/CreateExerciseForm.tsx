'use client'

import { Dispatch, SetStateAction } from "react";

type Props = {
  setIsCreate: Dispatch<SetStateAction<boolean>>;
}

export default function CreateExerciseForm({
  setIsCreate,
}: Props) {

  return (
    <div className="border rounded-lg border-neutral-200 hover:border-neutral-50 
      transition-colors p-4 lg:max-w-screen-sm
    ">
      <form action="" className="flex flex-col gap-4 h-full">
        <div className="grid gap-1">
          <label htmlFor="name" className='text-sm font-bold  '>
            Name of exercise
          </label>
          <input
            type="text"
            placeholder='e.g. deadlift'
            className='border rounded-md px-4 py-2 text-sm'
          // {...register('email')}
          />
          {/* {errors.email && (
            <p className="text-sm text-red-400">
              {errors.email.message}
            </p>
          )} */}
        </div>
        <div className="flex items-center gap-4">
          <div className="grid gap-1">
            <label htmlFor="weight" className='text-sm font-bold  '>
              Weight
            </label>
            <input
              type="text"
              placeholder='Enter the number'
              className='border rounded-md px-4 py-2 text-sm w-full'
            // {...register('email')}
            />
            {/* {errors.email && (
            <p className="text-sm text-red-400">
              {errors.email.message}
            </p>
          )} */}
          </div>
          <label className="inline-flex self-end mb-2 items-center cursor-pointer w-fit">
            <input type="checkbox" value="" className="sr-only peer" />
            <div className="
                  relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-neutral-100 dark:peer-focus:ring-neutral-100 rounded-full peer dark:bg-gray-700 
                  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] 
                  after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all dark:border-gray-600 
                  peer-checked:bg-sky-500 dark:peer-checked:bg-sky-500"></div>
            <span className="ms-3 text-sm font-bold text-gray-900 dark:text-gray-300">
              Kilogram
            </span>
          </label>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-1">
            <label htmlFor="sets" className='text-sm font-bold  '>
              Sets
            </label>
            <input
              type="text"
              placeholder='Enter the set count'
              className='border rounded-md px-4 py-2 text-sm w-full'
            // {...register('email')}
            />
            {/* {errors.email && (
            <p className="text-sm text-red-400">
              {errors.email.message}
            </p>
          )} */}
          </div>
          <div className="grid gap-1">
            <label htmlFor="reps" className='text-sm font-bold  '>
              Reps
            </label>
            <input
              type="text"
              placeholder='Enter the rep count'
              className='border rounded-md px-4 py-2 text-sm w-full'
            // {...register('email')}
            />
            {/* {errors.email && (
            <p className="text-sm text-red-400">
              {errors.email.message}
            </p>
          )} */}
          </div>
        </div>
        <div className="grid gap-1">
          <label htmlFor="date" className='text-sm font-bold  '>
            Date (Optional)
          </label>
          <input
            type="date"
            className='border rounded-md px-4 py-2 text-sm w-full'
          // {...register('email')}
          />
          {/* {errors.email && (
            <p className="text-sm text-red-400">
              {errors.email.message}
            </p>
          )} */}
        </div>
        <button
          type="button"
          onClick={() => setIsCreate(prev => !prev)}
          className='rounded-lg dark:bg-neutral-100 dark:text-neutral-900
              dark:hover:bg-neutral-200 text-sm py-2 
              cursor-pointer transition-colors mt-auto
              '>

          Cancel
        </button>
      </form>
    </div>
  )
}
