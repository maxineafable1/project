'use client'

import dayjs from 'dayjs'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import isoWeek from 'dayjs/plugin/isoWeek'
import localizedFormat from 'dayjs/plugin/localizedFormat'

dayjs.extend(localizedFormat);
dayjs.extend(weekOfYear);
dayjs.extend(isoWeek);

type Exercise = {
  id: number;
  name: string;
  weight: number;
  sets: number;
  reps: number;
  exerciseDate: string;
  isKilogram: boolean;
  userId: string | null;
  createdAt: Date;
  updatedAt: Date;
}

type Props = {
  bodyweightsData: {
    id: number;
    weight: number;
    bodyweightDate: string;
    isKilogram: boolean;
    userId: string | null;
    createdAt: Date;
    updatedAt: Date;
  }[]
  exerciseData: Exercise[]
}

export default function Dashboard({
  bodyweightsData,
  exerciseData,
}: Props) {
  const latestWorkout = exerciseData.filter(e => {
    return dayjs(e.exerciseDate).date() === dayjs(exerciseData[0].exerciseDate).date()
  })

  // Record<string, Exercise | null>
  const prs: Record<string, Exercise | null> = {
    squat: null,
    bench: null,
    deadlift: null,
    ohp: null,
  }

  exerciseData.forEach(e => {
    const name = e.name.toLowerCase()
    if (!(name in prs) || e.sets !== 1 || e.reps !== 1) return

    const weight = e.isKilogram ? e.weight : +(e.weight / 2.205)

    if (!prs[name] || weight > prs[name].weight)
      prs[name] = { ...e, weight }
  })

  function getWeight() {
    if (bodyweightsData.length === 0) return null

    const groupBy = Object.groupBy(bodyweightsData, ({ bodyweightDate }) => dayjs(bodyweightDate).week())

    const bodyweightGroup = Object.entries(groupBy)

    // to get the average of most recent week
    const weekBodyweights = bodyweightGroup[bodyweightGroup.length - 1][1]!

    // latest bodyweight
    const currentBodyweight = weekBodyweights.at(0)!

    const total = weekBodyweights.reduce((acc, cur) => {
      return acc + (cur.isKilogram ? cur.weight : (cur.weight * 2.205))
    }, 0)

    const average = +(total / weekBodyweights.length).toFixed(2)
    const averageLb = +((total / weekBodyweights.length) * 2.205).toFixed(2)

    return {
      currentBodyweight,
      average,
      averageLb,
    }
  }

  const weight = getWeight()

  return (
    <div className="p-8 lg:p-12 lg:ml-[24rem] space-y-8 lg:space-y-12 flex flex-col">
      <div className="text-3xl font-bold">
        Dashboard
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-4 2xl:grid-rows-3 gap-8 ">
        <div className="dark:bg-neutral-900 bg-neutral-100 p-8 rounded-xl xl:col-span-4 2xl:col-span-2 2xl:row-span-3 ">
          <div className="font-bold text-lg mb-4">Lastest Workout</div>
          {latestWorkout.length > 0 ? (
            <div>
              <div className="flex justify-between items-center mb-4 bg-white dark:bg-neutral-800 px-6 py-2 rounded-lg">
                <h2 className='text-xl font-bold'>{dayjs(latestWorkout[0].exerciseDate).format('ll')}</h2>
              </div>
              <div className="w-full text-sm text-left rtl:text-right max-h-[400px] overflow-y-auto overflow-x-auto no-scrollbar p-1 focus-visible:outline-2 focus-visible:outline-blue-500">
                <div className="grid grid-cols-[repeat(5,minmax(200px,1fr))] font-bold text-xs uppercase">
                  <div className={`px-6 py-3 border-b border-neutral-200 dark:border-neutral-700`}>
                    Exercise
                  </div>
                  <div className={`px-6 py-3 border-b border-neutral-200 dark:border-neutral-700`}>
                    Weight
                  </div>
                  <div className={`px-6 py-3 border-b border-neutral-200 dark:border-neutral-700`}>
                    Unit
                  </div>
                  <div className={`px-6 py-3 border-b border-neutral-200 dark:border-neutral-700`}>
                    Sets
                  </div>
                  <div className={`px-6 py-3 border-b border-neutral-200 dark:border-neutral-700`}>
                    Reps
                  </div>
                </div>
                {latestWorkout.map(({ name, weight, isKilogram, sets, reps, id }) => (
                  <div
                    key={id}
                    className="grid grid-cols-[repeat(5,minmax(200px,1fr))]">
                    <div
                      className="px-6 py-4 border-b border-r border-neutral-200 dark:border-neutral-700 truncate overflow-x-auto focus-visible:outline-blue-500 focus-visible:outline-2">
                      {name}
                    </div>
                    <div className="px-6 py-4 border-b border-r border-neutral-200 dark:border-neutral-700">
                      {weight}
                    </div>
                    <div className="px-6 py-4 border-b border-r border-neutral-200 dark:border-neutral-700">
                      {isKilogram ? 'Kg' : 'Lbs'}
                    </div>
                    <div className="px-6 py-4 border-b border-r border-neutral-200 dark:border-neutral-700">
                      {sets}
                    </div>
                    <div className="px-6 py-4 border-b border-neutral-200 dark:border-neutral-700">
                      {reps}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="">No record yet</div>
          )}
        </div>
        <div className="dark:bg-neutral-900 bg-neutral-100 p-8 rounded-xl space-y-4 xl:col-span-2 2xl:col-span-1">
          <div className="font-bold text-lg">Recent Bodyweight</div>
          {weight ? (
            <div>
              <div className="text-sm">{dayjs(weight.currentBodyweight.bodyweightDate).format('ll')}</div>
              <div className="text-4xl">{weight.currentBodyweight.weight} {weight.currentBodyweight.isKilogram ? 'kg' : 'lb'}</div>
            </div>
          ) : (
            <div className="">No record yet</div>
          )}
        </div>
        <div className="dark:bg-neutral-900 bg-neutral-100 p-8 rounded-xl space-y-4 xl:col-span-2 2xl:col-span-1">
          <div className="font-bold text-lg">Recent Avg Weight</div>
          {weight ? (
            <div className="">
              <div className="text-sm">
                {dayjs(weight.currentBodyweight.bodyweightDate).startOf('week').format('ll')} - {dayjs(weight.currentBodyweight.bodyweightDate).endOf('week').format('ll')}
              </div>
              <div className="text-4xl">{weight.average}kg ({weight.averageLb}lb)</div>
            </div>
          ) : (
            <div className="">No record yet</div>
          )}
        </div>
        <div className="dark:bg-neutral-900 bg-neutral-100 p-8 rounded-xl xl:col-span-4 2xl:row-span-2 2xl:col-span-2
          space-y-4
        ">
          <div className="font-bold text-lg">Personal Records (1RM)</div>
          <div className="grid sm:grid-cols-2 gap-y-4 xl:grid-cols-4 p-4 sm:text-center rounded-lg bg-white dark:bg-neutral-800">
            <div className="col-span-1">
              <div className="text-sm font-bold pb-3 border-b border-neutral-200 dark:border-neutral-700">Squat</div>
              <div className="py-3 border-b sm:border-r border-neutral-200 dark:border-neutral-700 max-sm:text-center">
                {prs.squat ? `${prs.squat.isKilogram ? prs.squat.weight : +(prs.squat.weight * 2.205).toFixed(2)} ${prs.squat.isKilogram ? 'kg' : 'lb'}` : 'No record yet'}
              </div>
            </div>
            <div className="">
              <div className="text-sm font-bold pb-3 border-b border-neutral-200 dark:border-neutral-700">Bench</div>
              <div className="py-3 border-b xl:border-r border-neutral-200 dark:border-neutral-700 max-sm:text-center">
                {prs.bench ? `${prs.bench.isKilogram ? prs.bench.weight : +(prs.bench.weight * 2.205).toFixed(2)} ${prs.bench.isKilogram ? 'kg' : 'lb'}` : 'No record yet'}
              </div>
            </div>
            <div className="">
              <div className="text-sm font-bold pb-3 border-b border-neutral-200 dark:border-neutral-700">Deadlift</div>
              <div className="py-3 border-b sm:border-r border-neutral-200 dark:border-neutral-700 max-sm:text-center">
                {prs.deadlift ? `${prs.deadlift.isKilogram ? prs.deadlift.weight : +(prs.deadlift.weight * 2.205).toFixed(2)} ${prs.deadlift.isKilogram ? 'kg' : 'lb'}` : 'No record yet'}
              </div>
            </div>
            <div className="">
              <div className="text-sm font-bold pb-3 border-b border-neutral-200 dark:border-neutral-700">OHP</div>
              <div className="py-3 border-b border-neutral-200 dark:border-neutral-700 max-sm:text-center">
                {prs.ohp ? `${prs.ohp.isKilogram ? prs.ohp.weight : +(prs.ohp.weight * 2.205).toFixed(2)} ${prs.ohp.isKilogram ? 'kg' : 'lb'}` : 'No record yet'}
              </div>
            </div>
          </div>
        </div>
        {/* <div className="bg-neutral-400 h-96 xl:row-span-2 xl:col-span-2"></div> */}
      </div>
    </div>
  )
}
