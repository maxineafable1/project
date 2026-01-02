'use client'

import { getStartEndDateFromWeek } from "@/utils/date";
import dayjs from 'dayjs'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import isoWeek from 'dayjs/plugin/isoWeek'
import localizedFormat from 'dayjs/plugin/localizedFormat'

dayjs.extend(localizedFormat);
dayjs.extend(weekOfYear);
dayjs.extend(isoWeek);

type Exercise = {
  name: string;
  id: number;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  weight: number;
  sets: number;
  reps: number;
  isKilogram: boolean;
  workoutId: number;
}

type Props = {
  latestBodyweight: {
    id: number;
    weight: number;
    date: string;
    isKilogram: boolean;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
  } | null
  latestWeeklyStatus: {
    week: string;
    average: number;
    minWeight: number;
    maxWeight: number;
  } | null
  latestWorkout: {
    id: number;
    userId: string;
    exerciseDate: string;
    exercises: Exercise[];
  } | undefined
  prs: {
    weight: number;
    name: string;
    isKilogram: boolean;
  }[]
}

export default function Dashboard({
  latestBodyweight,
  latestWeeklyStatus,
  latestWorkout,
  prs,
}: Props) {
  const lifts = ['squat', 'bench', 'deadlift', 'ohp']

  const latestAvgBwDates = latestWeeklyStatus ? getStartEndDateFromWeek(latestWeeklyStatus.week) : null

  return (
    <div className="p-8 lg:p-12 lg:ml-[24rem] space-y-8 lg:space-y-12 flex flex-col">
      <div className="text-3xl font-bold">
        Dashboard
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-4 2xl:grid-rows-3 gap-8 ">
        <div className="dark:bg-neutral-900 bg-neutral-100 p-8 rounded-xl xl:col-span-4 2xl:col-span-2 2xl:row-span-3 ">
          <div className="font-bold text-lg mb-4">Lastest Workout</div>
          {latestWorkout ? (
            <div>
              <div className="flex justify-between items-center mb-4 bg-white dark:bg-neutral-800 px-6 py-2 rounded-lg">
                <h2 className='text-xl font-bold'>{dayjs(latestWorkout.exerciseDate).format('ll')}</h2>
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
                {latestWorkout.exercises.map(({ name, weight, isKilogram, sets, reps, id }) => (
                  <div
                    key={id}
                    className="grid grid-cols-[repeat(5,minmax(200px,1fr))]">
                    <div
                      className="px-6 py-4 border-b border-r border-neutral-200 dark:border-neutral-700 truncate overflow-x-auto focus-visible:outline-blue-500 focus-visible:outline-2">
                      {name}
                    </div>
                    <div className="px-6 py-4 border-b border-r border-neutral-200 dark:border-neutral-700">
                      {isKilogram ? weight : +(weight * 2.205).toFixed(2)}
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
          {latestBodyweight ? (
            <div>
              <div className="text-sm">{dayjs(latestBodyweight.date).format('ll')}</div>
              <div className="text-3xl">
                {latestBodyweight.isKilogram
                  ? `${latestBodyweight.weight} kg`
                  : `${+(latestBodyweight.weight * 2.205).toFixed(2)} lb`}
              </div>
            </div>
          ) : (
            <div className="">No record yet</div>
          )}
        </div>
        <div className="dark:bg-neutral-900 bg-neutral-100 p-8 rounded-xl space-y-4 xl:col-span-2 2xl:col-span-1">
          <div className="font-bold text-lg">Recent Avg Weight</div>
          {(latestAvgBwDates && latestWeeklyStatus) ? (
            <div className="">
              <div className="text-sm">
                {latestAvgBwDates.startDate} - {latestAvgBwDates.endDate}
              </div>
              <div className="text-3xl">{latestWeeklyStatus.average} kg ({+(latestWeeklyStatus.average * 2.205).toFixed(2)} lb)</div>
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
            {lifts.map(lift => {
              const curLift = prs.find(pr => pr.name.toLowerCase() === lift)
              return (
                <div key={lift} className="col-span-1 group group">
                  <div className="group-last:uppercase text-sm font-bold pb-3 border-b border-neutral-200 dark:border-neutral-700 capitalize">
                    {lift}
                  </div>
                  <div className="py-3 border-b sm:group-odd:border-r xl:border-r xl:group-last:border-r-0 border-neutral-200 dark:border-neutral-700 max-sm:text-center">
                    {curLift ? curLift.isKilogram ? `${curLift.weight} kg` : `${+(curLift.weight * 2.205).toFixed(2)} lb` : 'No record yet'}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        {/* <div className="bg-neutral-400 h-96 xl:row-span-2 xl:col-span-2"></div> */}
      </div>
    </div>
  )
}
