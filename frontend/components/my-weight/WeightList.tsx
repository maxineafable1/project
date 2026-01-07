'use client'

import { Minus, Plus } from 'lucide-react'
import { useState } from 'react'
import NewWeightForm from './NewWeightForm'

import dayjs from 'dayjs'
import isoWeek from 'dayjs/plugin/isoWeek'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import BodyweightRow from './BodyweightRow'
import { getStartEndDateFromWeek } from '@/utils/date'

dayjs.extend(weekOfYear);
dayjs.extend(isoWeek);
dayjs.extend(localizedFormat);

type Props = {
  jwt: string
  weights: {
    id: number;
    weight: number;
    date: string;
    isKilogram: boolean;
  }[]
  weeklyStatus: {
    week: string;
    average: number;
    minWeight: number;
    maxWeight: number;
  }[]
}

export default function WeightList({
  jwt,
  weights,
  weeklyStatus,
}: Props) {
  const [newWeight, setNewWeight] = useState(false)
  const [isEditId, setIsEditId] = useState<number | null>(null)

  return (
    <div className="p-8 lg:p-12 lg:ml-[24rem] space-y-8 lg:space-y-12 flex flex-col">
      {(weights.length > 0 || newWeight) && (
        <button
          onClick={() => setNewWeight(prev => !prev)}
          className="inline-flex items-center gap-2 text-sm text-white cursor-pointer focus-visible:outline-black dark:focus-visible:outline-white focus-visible:outline-2
          bg-blue-500 hover:bg-blue-600 transition-colors px-4 py-2 rounded font-bold self-end
          "
        >
          {newWeight ? <Minus className="size-4" /> : <Plus className="size-4" />}
          {newWeight ? 'Cancel' : 'Add weight'}
        </button>
      )}
      {newWeight && (
        // <NewWeightForm sessId={sessId} setNewWeight={setNewWeight} />
        <NewWeightForm jwt={jwt} setNewWeight={setNewWeight} />
      )}
      {(weights.length === 0 && !newWeight) && (
        <div className="max-w-md mx-auto text-center space-y-4">
          <div className="text-3xl font-bold">Start tracking your bodyweight progress from day one.</div>
          {/* <div className="text-sm mx-auto">Click <span className="font-bold">New Exercise</span> to start tracking your workouts.</div> */}
          <button
            onClick={() => setNewWeight(prev => !prev)}
            className="mt-2 inline-flex items-center gap-2 text-sm text-white cursor-pointer focus-visible:outline-white focus-visible:outline-2
          bg-blue-500 hover:bg-blue-600 transition-colors px-4 py-2 rounded font-bold self-end
          "
          >
            <Plus className="size-4" /> Add weight
          </button>
        </div>
      )}
      {weights.length > 0 && (
        <div className="space-y-20">
          <div className="w-full text-sm text-left rtl:text-right overflow-x-auto no-scrollbar p-1 focus-visible:outline-2 focus-visible:outline-blue-500">
            <div className="grid grid-cols-[repeat(4,minmax(200px,1fr))] font-bold text-xs uppercase">
              <div className={`px-6 py-3 border-b border-neutral-200 dark:border-neutral-700`}>
                Week
              </div>
              <div className={`px-6 py-3 border-b border-neutral-200 dark:border-neutral-700`}>
                Average
              </div>
              <div className={`px-6 py-3 border-b border-neutral-200 dark:border-neutral-700`}>
                Minimum
              </div>
              <div className={`px-6 py-3 border-b border-neutral-200 dark:border-neutral-700`}>
                Maximum
              </div>
            </div>
            {weeklyStatus.map(({ average, maxWeight, minWeight, week }) => {
              const { startDate, endDate } = getStartEndDateFromWeek(week)
              return (
                <div
                  key={week}
                  className="grid grid-cols-[repeat(4,minmax(200px,1fr))] font-bold text-sm">
                  <div
                    className="px-6 py-4 border-b border-r border-neutral-200 dark:border-neutral-700 truncate overflow-x-auto focus-visible:outline-blue-500 focus-visible:outline-2">
                    {startDate} - {endDate}
                  </div>
                  <div
                    className="px-6 py-4 border-b border-r border-neutral-200 dark:border-neutral-700 truncate overflow-x-auto focus-visible:outline-blue-500 focus-visible:outline-2">
                    {average.toFixed(2)} kg ({+(average * 2.205).toFixed(2)} lb)
                  </div>
                  <div
                    className="px-6 py-4 border-b border-r border-neutral-200 dark:border-neutral-700 truncate overflow-x-auto focus-visible:outline-blue-500 focus-visible:outline-2">
                    {minWeight.toFixed(2)} kg ({+(minWeight * 2.205).toFixed(2)} lb)
                  </div>
                  <div
                    className="px-6 py-4 border-b border-neutral-200 dark:border-neutral-700 truncate overflow-x-auto focus-visible:outline-blue-500 focus-visible:outline-2">
                    {maxWeight.toFixed(2)} kg ({+(maxWeight * 2.205).toFixed(2)} lb)
                  </div>
                </div>
              )
            })}
          </div>
          <div className="w-full text-sm text-left rtl:text-right overflow-x-auto no-scrollbar p-1 focus-visible:outline-2 focus-visible:outline-blue-500">
            <div className="grid grid-cols-[repeat(4,minmax(200px,1fr))] font-bold text-xs uppercase">
              <div className={`px-6 py-3 border-b border-neutral-200 dark:border-neutral-700`}>
                Date
              </div>
              <div className={`px-6 py-3 border-b border-neutral-200 dark:border-neutral-700`}>
                Weight
              </div>
              <div className={`px-6 py-3 border-b border-neutral-200 dark:border-neutral-700`}>
                Unit
              </div>
              <div className={`px-6 py-3 border-b border-neutral-200 dark:border-neutral-700`}>
                Actions
              </div>
            </div>
            {weights.map(weight => (
              <BodyweightRow
                key={weight.id}
                isEditId={isEditId}
                setIsEditId={setIsEditId}
                weight={weight}
                jwt={jwt}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
