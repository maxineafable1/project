'use client'

import { ArrowDown, ArrowUp, Minus, Plus } from 'lucide-react'
import { useEffect, useState } from 'react'
import NewWeightForm from './NewWeightForm'

import { getStartEndDateFromWeek } from '@/utils/date'
import dayjs from 'dayjs'
import isoWeek from 'dayjs/plugin/isoWeek'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import { Button } from '../ui/button'
import BodyweightRow from './BodyweightRow'
import { formatWeight } from '@/utils/number'
import { Switch } from "@/components/ui/switch"

dayjs.extend(weekOfYear);
dayjs.extend(isoWeek);
dayjs.extend(localizedFormat);

export type WeightList = {
  id: number;
  weight: number;
  date: string;
  isKilogram: boolean;
}

type Props = {
  jwt: string
  obj: {
    weights: WeightList[];
    first: boolean;
    last: boolean;
    empty: boolean
    number: number;
  } | null
  weeklyStatus: {
    week: string;
    average: number;
    minWeight: number;
    maxWeight: number;
  }[]
}

export default function WeightList({
  jwt,
  obj,
  weeklyStatus,
}: Props) {
  const [weights, setWeights] = useState(obj ? obj.weights : [])
  const [firstPage, setFirstPage] = useState(obj?.first)
  const [lastPage, setlastPage] = useState(obj?.last)
  const [currPage, setCurrPage] = useState(1)
  const [isCheckedWeightLoss, setIsCheckedWeightLoss] = useState(true)

  const [newWeight, setNewWeight] = useState(false)
  const [isEditId, setIsEditId] = useState<number | null>(null)

  async function revalidateWeights(currentNumPage: number) {
    try {
      const res = await fetch(`/api/bodyweights?page=${currentNumPage}`)
      const data = await res.json()
      setWeights(data.content)
      setFirstPage(data.first)
      setlastPage(data.last)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    revalidateWeights(currPage)
  }, [currPage])

  return (
    <div className="p-8 lg:p-12 lg:ml-[24rem] space-y-8 lg:space-y-12 flex flex-col">
      {(weights.length > 0 || newWeight) && (
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold">My Weight</h2>
          <button
            onClick={() => setNewWeight(prev => !prev)}
            className="inline-flex items-center gap-2 text-sm text-white cursor-pointer focus-visible:outline-black dark:focus-visible:outline-white focus-visible:outline-2
          bg-blue-500 hover:bg-blue-600 transition-colors px-4 py-2 rounded font-bold self-end
          "
          >
            {newWeight ? <Minus className="size-4" /> : <Plus className="size-4" />}
            <span>{newWeight ? 'Cancel' : 'Add weight'}</span>
          </button>
        </div>
      )}
      {newWeight && (
        // <NewWeightForm sessId={sessId} setNewWeight={setNewWeight} />
        <NewWeightForm
          jwt={jwt}
          setNewWeight={setNewWeight}
          revalidateWeights={revalidateWeights}
          currPage={currPage}
        />
      )}
      {(obj && obj.weights.length === 0 && !newWeight) && (
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
      <div className="space-y-20">
        {weeklyStatus.length > 0 && (
          <div className="w-full text-sm text-left rtl:text-right overflow-x-auto no-scrollbar p-1 focus-visible:outline-2 focus-visible:outline-blue-500">
            <div className="flex items-center gap-4 mb-2">
              <h3 className='font-bold text-xl'>Weekly Status</h3>
              <div className="flex items-center gap-1">
                <Switch
                  id='weight-loss'
                  checked={isCheckedWeightLoss}
                  onCheckedChange={val => {
                    setIsCheckedWeightLoss(val)
                  }}
                />
                <label htmlFor="weight-loss">Weight Loss</label>
              </div>
            </div>
            <div className="grid grid-cols-[repeat(5,minmax(200px,1fr))] font-bold text-xs uppercase">
              <div className={`px-6 py-3 border-b border-neutral-200 dark:border-neutral-700`}>
                Week
              </div>
              <div className={`px-6 py-3 border-b border-neutral-200 dark:border-neutral-700`}>
                Average
              </div>
              <div className={`px-6 py-3 border-b border-neutral-200 dark:border-neutral-700`}>
                Difference
              </div>
              <div className={`px-6 py-3 border-b border-neutral-200 dark:border-neutral-700`}>
                Minimum
              </div>
              <div className={`px-6 py-3 border-b border-neutral-200 dark:border-neutral-700`}>
                Maximum
              </div>
            </div>
            {weeklyStatus.map(({ average, maxWeight, minWeight, week }, i) => {
              const { startDate, endDate } = getStartEndDateFromWeek(week)
              const maxLength = weeklyStatus.length

              const next = i < maxLength - 1 ? weeklyStatus[i + 1].average : null
              const diff = next ? average - next : null

              return (
                <div
                  key={week}
                  className="grid grid-cols-[repeat(5,minmax(200px,1fr))] text-sm">
                  <div
                    className="px-6 py-4 border-b border-r border-neutral-200 dark:border-neutral-700 truncate overflow-x-auto focus-visible:outline-blue-500 focus-visible:outline-2">
                    {startDate} - {endDate}
                  </div>
                  <div
                    className="px-6 py-4 border-b border-r border-neutral-200 dark:border-neutral-700 truncate overflow-x-auto focus-visible:outline-blue-500 focus-visible:outline-2">
                    {formatWeight(average)}
                  </div>
                  <div
                    className="px-6 py-4 border-b border-r border-neutral-200 dark:border-neutral-700 truncate overflow-x-auto focus-visible:outline-blue-500 focus-visible:outline-2">
                    {diff !== null && diff !== 0 && (() => {
                      const weightDisplay = formatWeight(diff)
                      const isGain = diff > 0

                      return (
                        <span
                          aria-label="Weight difference"
                          className="flex items-center gap-2"
                        >
                          {isGain ? (
                            <ArrowUp className={`size-4 ${isCheckedWeightLoss ? 'text-red-500' : 'text-green-500'}`} />
                          ) : (
                            <ArrowDown className={`size-4 ${isCheckedWeightLoss ? 'text-green-500' : 'text-red-500'}`} />
                          )}
                          {weightDisplay}
                        </span>
                      )
                    })()}
                  </div>
                  <div
                    className="px-6 py-4 border-b border-r border-neutral-200 dark:border-neutral-700 truncate overflow-x-auto focus-visible:outline-blue-500 focus-visible:outline-2">
                    {formatWeight(minWeight)}
                  </div>
                  <div
                    className="px-6 py-4 border-b border-neutral-200 dark:border-neutral-700 truncate overflow-x-auto focus-visible:outline-blue-500 focus-visible:outline-2">
                    {formatWeight(maxWeight)}
                  </div>
                </div>
              )
            })}
          </div>
        )}
        {obj && obj.weights.length > 0 && (
          <div className="w-full text-sm text-left rtl:text-right overflow-x-auto no-scrollbar p-1 focus-visible:outline-2 focus-visible:outline-blue-500">
            <h3 className='font-bold text-xl mb-2'>Track Your Bodyweight</h3>
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
                revalidateWeights={revalidateWeights}
                currPage={currPage}
              />
            ))}
            <div className="flex items-center justify-between mt-4">
              {!firstPage && (
                <Button
                  onClick={() => setCurrPage(prev => prev - 1)}
                >
                  Previous
                </Button>
              )}
              {!lastPage && (
                <Button
                  onClick={() => setCurrPage(prev => prev + 1)}
                  className='ml-auto'
                >
                  Next
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
