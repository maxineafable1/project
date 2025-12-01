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
  const latestWorkout = exerciseData.filter((e, i) => {
    return dayjs(e.exerciseDate).date() === dayjs(exerciseData[0].exerciseDate).date()
  })

  const squatPr = exerciseData
    .filter(e => e.name.toLowerCase() === 'squat' && e.sets === 1 && e.reps === 1)
    .map(e => e.isKilogram ? e : { ...e, weight: +(e.weight / 2.205) }).reduce((prev, curr) => {
      return (prev && prev.weight > curr.weight) ? prev : curr
    }, {} as Exercise)

  const benchPr = exerciseData
    .filter(e => e.name.toLowerCase() === 'bench' && e.sets === 1 && e.reps === 1)
    .map(e => e.isKilogram ? e : { ...e, weight: +(e.weight / 2.205) }).reduce((prev, curr) => {
      return (prev && prev.weight > curr.weight) ? prev : curr
    }, {} as Exercise)

  const deadliftPr = exerciseData
    .filter(e => e.name.toLowerCase() === 'deadlift' && e.sets === 1 && e.reps === 1)
    .map(e => e.isKilogram ? e : { ...e, weight: +(e.weight / 2.205) }).reduce((prev, curr) => {
      return (prev && prev.weight > curr.weight) ? prev : curr
    }, {} as Exercise)

  const ohpPr = exerciseData
    .filter(e => e.name.toLowerCase() === 'ohp' && e.sets === 1 && e.reps === 1)
    .map(e => e.isKilogram ? e : { ...e, weight: +(e.weight / 2.205) }).reduce((prev, curr) => {
      return (prev && prev.weight > curr.weight) ? prev : curr
    }, {} as Exercise)

  console.log(benchPr)

  const groupBy = Object.groupBy(bodyweightsData, ({ bodyweightDate }) => dayjs(bodyweightDate).week())

  const bodyweightGroup = Object.entries(groupBy)

  const weekBodyweights = bodyweightGroup[bodyweightGroup.length - 1][1]!

  const currentBodyweight = weekBodyweights.at(0)

  const total = weekBodyweights.reduce((acc, cur) => {
    return acc + (cur.isKilogram ? cur.weight : (cur.weight * 2.205))
  }, 0)

  const average = +(total / weekBodyweights?.length).toFixed(2)
  const averageLb = +((total / weekBodyweights?.length) * 2.205).toFixed(2)

  return (
    <div className="p-8 lg:p-12 lg:ml-[24rem] space-y-8 lg:space-y-12 flex flex-col">
      <div className="text-3xl font-bold">
        Dashboard
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-4 xl:grid-rows-3 gap-8 ">
        <div className="dark:bg-neutral-900 bg-neutral-100 p-8 rounded-xl xl:col-span-2 xl:row-span-3 max-h-fit overflow-y-scroll">
          <div className="font-bold text-lg mb-4">Lastest Workout</div>
          {latestWorkout.length > 0 ? (
            <div>
              <div className="flex justify-between items-center mb-4 bg-white dark:bg-neutral-800 px-6 py-2 rounded-lg">
                <h2 className='text-xl font-bold'>{dayjs(latestWorkout[0].exerciseDate).format('ll')}</h2>
              </div>
              <div className="w-full text-sm text-left rtl:text-right overflow-x-auto no-scrollbar p-1 focus-visible:outline-2 focus-visible:outline-blue-500">
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
            <div className="">no workouts yet</div>
          )}
        </div>
        <div className="dark:bg-neutral-900 bg-neutral-100 p-8 rounded-xl xl:col-span-1
          space-y-4
        ">
          <div className="font-bold text-lg">Recent Bodyweight</div>
          {currentBodyweight ? (
            <div>
              <div className="text-sm">{dayjs(currentBodyweight.bodyweightDate).format('ll')}</div>
              <div className="text-4xl">{currentBodyweight.weight} {currentBodyweight.isKilogram ? 'kg' : 'lb'}</div>
            </div>
          ) : (
            <div className="">no bodyweight yet</div>
          )}
        </div>
        <div className="dark:bg-neutral-900 bg-neutral-100 p-8 rounded-xl xl:col-span-1
          space-y-4
        ">
          <div className="font-bold text-lg">Recent Avg Weight</div>
          <div className="">
            {currentBodyweight && (
              <div className="text-sm">
                {dayjs(currentBodyweight.bodyweightDate).startOf('week').format('ll')} - {dayjs(currentBodyweight.bodyweightDate).endOf('week').format('ll')}
              </div>
            )}
            <div className="text-4xl">{average}kg ({averageLb}lb)</div>
          </div>
        </div>
        <div className="dark:bg-neutral-900 bg-neutral-100 p-8 rounded-xl xl:row-span-2 xl:col-span-2
          xl:gap-8 gap-4 flex flex-col justify-center
        ">
          <div className="font-bold text-lg xl:text-3xl">Personal Records (1RM)</div>
          <div className="grid grid-cols-4 p-4 text-center rounded-lg bg-neutral-800">
            <div className="">
              <div className="text-sm font-bold pb-3 border-b border-neutral-200 dark:border-neutral-700">Squat</div>
              <div className="py-3 border-b border-r border-neutral-200 dark:border-neutral-700">
                {'weight' in squatPr ? `${squatPr.isKilogram ? squatPr.weight : +(squatPr.weight * 2.205).toFixed(2)} ${squatPr.isKilogram ? 'kg' : 'lb'}` : 'No record yet.'}
              </div>
            </div>
            <div className="">
              <div className="text-sm font-bold pb-3 border-b border-neutral-200 dark:border-neutral-700">Bench</div>
              <div className="py-3 border-b border-r border-neutral-200 dark:border-neutral-700">
                {'weight' in benchPr ? `${benchPr.isKilogram ? benchPr.weight : +(benchPr.weight * 2.205).toFixed(2)} ${benchPr.isKilogram ? 'kg' : 'lb'}` : 'No record yet.'}
              </div>
            </div>
            <div className="">
              <div className="text-sm font-bold pb-3 border-b border-neutral-200 dark:border-neutral-700">Deadlift</div>
              <div className="py-3 border-b border-r border-neutral-200 dark:border-neutral-700">
                {'weight' in deadliftPr ? `${deadliftPr.isKilogram ? deadliftPr.weight : +(deadliftPr.weight * 2.205).toFixed(2)} ${deadliftPr.isKilogram ? 'kg' : 'lb'}` : 'No record yet.'}
              </div>
            </div>
            <div className="">
              <div className="text-sm font-bold pb-3 border-b border-neutral-200 dark:border-neutral-700">OHP</div>
              <div className="py-3 border-b border-neutral-200 dark:border-neutral-700">
                {'weight' in ohpPr ? `${ohpPr.isKilogram ? ohpPr.weight : +(ohpPr.weight * 2.205).toFixed(2)} ${ohpPr.isKilogram ? 'kg' : 'lb'}` : 'No record yet.'}
              </div>
            </div>
          </div>
        </div>
        {/* <div className="bg-neutral-400 h-96 xl:row-span-2 xl:col-span-2"></div> */}
      </div>
    </div>
  )
}
