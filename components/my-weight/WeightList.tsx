'use client'

import { BodyweightsType } from '@/db-schema'
import { Minus, Plus } from 'lucide-react'
import { useState } from 'react'
import NewWeightForm from './NewWeightForm'

import dayjs from 'dayjs'
import dayOfYear from 'dayjs/plugin/dayOfYear'
import isoWeek from 'dayjs/plugin/isoWeek'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import BodyweightRow, { instanceOfBodyweight } from './BodyweightRow'

dayjs.extend(localizedFormat);
dayjs.extend(weekOfYear);
dayjs.extend(isoWeek);
dayjs.extend(dayOfYear);

type Props = {
  sessId: string
  bodyweights: BodyweightsType[]
}

export default function WeightList({
  sessId,
  bodyweights,
}: Props) {
  const [newWeight, setNewWeight] = useState(false)

  const groupBy = Object.groupBy(bodyweights, ({ bodyweightDate }) => dayjs(bodyweightDate).week())

  const bodyweightGroup = Object.entries(groupBy).reverse()

  console.log(bodyweightGroup)

  return (
    <div className="p-8 lg:p-12 lg:ml-[24rem] space-y-8 lg:space-y-12 flex flex-col">
      {(bodyweights.length > 0 || newWeight) && (
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
        <NewWeightForm sessId={sessId} setNewWeight={setNewWeight} />
      )}
      {(bodyweights.length === 0 && !newWeight) ? (
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
      ) : (
        bodyweightGroup.map(([key, value]) => {
          if (!value) return
          const currFirstAtWeek = dayjs(value[0].bodyweightDate)
          const currLastAtWeek = dayjs(value[value.length - 1].bodyweightDate)

          const startWeek = currFirstAtWeek.startOf('week')
          const endWeek = currLastAtWeek.endOf('week')

          const arr = []

          for (let i = startWeek.date(); i <= endWeek.date(); i++) {
            const week = startWeek.format().split('T')[0].split('-')
            const currWeek = week.with(2, i.toString()).join('-')

            const hasDate = value.find(v => v.bodyweightDate === currWeek)
            if (hasDate)
              arr.push(hasDate)
            else
              arr.push(currWeek)

          }

          return (
            <div key={key} className="">
              <div
                className="w-full text-sm overflow-x-auto no-scrollbar p-1 focus-visible:outline-2 focus-visible:outline-blue-500"
              >
                <div className="grid grid-cols-[repeat(7,minmax(200px,1fr))] font-bold text-sm">
                  {arr.map((date, dateIndex) => {
                    const isObj = instanceOfBodyweight(date)
                    return (
                      <BodyweightRow
                        key={isObj ? date.bodyweightDate : date}
                        date={date}
                        sessId={sessId}
                      />
                    )
                  })}
                </div>
              </div>
            </div>
          )
        })
      )}
    </div>
  )
}
