'use client'

import { getStartEndDateFromWeek } from "@/utils/date";
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import relativeTime from 'dayjs/plugin/relativeTime'

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { bodyweightSchema } from "@/utils/zod-schemas/bodyweight-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Calendar, Dumbbell, LoaderCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import DashboardWeightForm from "./my-weight/DashboardWeightForm";
import NewExerciseForm from "./NewExerciseForm";

dayjs.extend(localizedFormat);
dayjs.extend(weekOfYear);
dayjs.extend(isoWeek);
dayjs.extend(relativeTime)

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
  } | null
  prs: {
    weight: number;
    name: string;
    isKilogram: boolean;
    exerciseDate: string;
  }[]
  jwt: string
}

export default function Dashboard({
  latestBodyweight,
  latestWeeklyStatus,
  latestWorkout,
  prs,
  jwt,
}: Props) {
  const [isNewExercise, setIsNewExercise] = useState(false)
  const [isNewBodyweight, setIsNewBodyweight] = useState(false)

  const { register, handleSubmit, formState, setValue, getValues, setError, reset } = useForm({
    resolver: zodResolver(bodyweightSchema),
    defaultValues: {
      isKilogram: true,
    },
  })

  const lifts = ['squat', 'bench', 'deadlift', 'ohp']

  const latestAvgBwDates = latestWeeklyStatus ? getStartEndDateFromWeek(latestWeeklyStatus.week) : null

  return (
    <div className="p-8 lg:p-12 lg:ml-[24rem] flex flex-col">
      <div className="text-3xl font-bold mb-8 lg:mb-12">
        Dashboard
      </div>
      <Card className="w-full mb-8">
        <CardHeader>
          <CardTitle>Lastest Workout</CardTitle>
          <CardDescription>
            Details of your most recent workout
          </CardDescription>
          {/* <CardAction>
              <Button variant="link">Sign Up</Button>
            </CardAction> */}
        </CardHeader>
        <CardContent className="">
          {latestWorkout && (
            <>
              <div className="flex gap-2 items-center px-6 mb-4">
                <Calendar className="size-4" /> <div className='font-bold'>{dayjs(latestWorkout.exerciseDate).format('ll')}</div>
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
            </>
          )}
          {isNewExercise && (
            <NewExerciseForm jwt={jwt} setNewExercise={setIsNewExercise} />
          )}
        </CardContent>
        {!latestWorkout && (
          <CardFooter className="mt-auto">
            <Button onClick={() => setIsNewExercise(prev => !prev)}>
              {isNewExercise ? 'Cancel' : 'Create your first workout'}
            </Button>
          </CardFooter>
        )}
      </Card>
      <div className="grid grid-cols-1 xl:grid-cols-4 2xl:grid-rows-2 gap-8">
        <Card className="w-full xl:col-span-2 2xl:col-span-1 xl:max-h-52 xl:overflow-y-auto">
          <CardHeader>
            <CardTitle>Recent Bodyweight</CardTitle>
            <CardDescription>
              Last recorded bodyweight measurement
            </CardDescription>
          </CardHeader>
          <CardContent className="">
            {latestBodyweight && (
              <>
                <div className="flex items-center gap-2">
                  <Calendar className="size-4" />
                  <div className="text-sm font-bold">
                    {dayjs(latestBodyweight.date).format('ll')}
                  </div>
                </div>
                <div className="text-3xl">
                  {latestBodyweight.isKilogram
                    ? `${latestBodyweight.weight} kg`
                    : `${+(latestBodyweight.weight * 2.205).toFixed(2)} lb`}
                </div>
              </>
            )}
            {isNewBodyweight && (
              <DashboardWeightForm
                jwt={jwt}
                setNewWeight={setIsNewBodyweight}
                register={register}
                handleSubmit={handleSubmit}
                errors={formState.errors}
                setValue={setValue}
                getValues={getValues}
                setError={setError}
              />
            )}
          </CardContent>
          {!latestBodyweight && (
            <CardFooter className="mt-auto space-x-2">
              <Button onClick={() => {
                setIsNewBodyweight(prev => {
                  if (prev) reset()
                  return !prev
                })
              }}>
                {isNewBodyweight ? 'Cancel' : 'Add your first bodyweight'}
              </Button>
              {isNewBodyweight && (
                <Button
                  disabled={formState.isSubmitting}
                  form="new-weight-form"
                >
                  {formState.isSubmitting ?
                    <>
                      <LoaderCircle className="size-4 animate-spin" />
                      Saving
                    </> :
                    'Save'
                  }
                </Button>
              )}
            </CardFooter>
          )}
        </Card>
        <Card className="w-full xl:col-span-2 2xl:col-span-1">
          <CardHeader>
            <CardTitle>Recent Average Weight</CardTitle>
            <CardDescription>
              Average bodyweight based on recent data
            </CardDescription>
          </CardHeader>
          <CardContent>
            {(latestAvgBwDates && latestWeeklyStatus) ? (
              <div className="">
                <div className="flex items-center gap-2">
                  <Calendar className="size-4" />
                  <div className="font-bold text-sm">
                    {latestAvgBwDates.startDate} - {latestAvgBwDates.endDate}
                  </div>
                </div>
                <div className="text-3xl">{latestWeeklyStatus.average.toFixed(2)} kg ({+(latestWeeklyStatus.average * 2.205).toFixed(2)} lb)</div>
              </div>
            ) : (
              <div className="">No record yet</div>
            )}
          </CardContent>
        </Card>
        <Card className="w-full xl:col-span-4 2xl:col-span-2 2xl:row-span-2">
          <CardHeader>
            <CardTitle>Personal Records (1RM)</CardTitle>
            <CardDescription>
              Best recorded one-rep maxes
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2 xl:grid-rows-[repeat(2,minmax(50px,1fr))]">
            {lifts.map(lift => {
              const curLift = prs.find(pr => pr.name.toLowerCase() === lift)
              return (
                <Card key={lift} className="group justify-between">
                  <CardHeader>
                    <CardTitle className="capitalize group-last-of-type:uppercase">
                      {lift}
                    </CardTitle>
                    {curLift && (
                      <div className="flex items-center gap-2">
                        <Calendar className="size-4" />
                        <div className="text-sm">{dayjs(curLift.exerciseDate).format('ll')}</div>
                      </div>
                    )}
                  </CardHeader>
                  <CardContent className="">
                    {curLift ?
                      <div className="flex items-center gap-1">
                        <Dumbbell className="size-4" />
                        {curLift.isKilogram
                          ? `${curLift.weight} kg`
                          : `${+(curLift.weight * 2.205).toFixed(2)} lb`}
                      </div>
                      : 'No record yet'}
                  </CardContent>
                </Card>
              )
            })}
          </CardContent>
        </Card>
        <Card className="w-full xl:col-span-2 2xl:col-span-1">
          <CardHeader>
            <CardTitle>Last Workout</CardTitle>
            <CardDescription>
              When you last trained
            </CardDescription>
          </CardHeader>
          <CardContent className="my-auto">
            {latestWorkout ? (
              <div className="text-3xl">
                {(() => {
                  const workoutDay = dayjs(latestWorkout.exerciseDate).startOf("day")
                  const today = dayjs().startOf("day")

                  return workoutDay.isSame(today, "day")
                    ? "Today"
                    : workoutDay.from(today)
                })()}
              </div>
            ) : (
              <div>No record yet.</div>
            )}
          </CardContent>
        </Card>
        <Card className="w-full xl:col-span-2 2xl:col-span-1">
          <CardHeader>
            <CardTitle>Bodyweight</CardTitle>
            <CardDescription>
              Your most recent entry
            </CardDescription>
          </CardHeader>
          <CardContent className="my-auto">
            {latestBodyweight ? (
              <div className="text-3xl">
                {(() => {
                  const workoutDay = dayjs(latestBodyweight.date).startOf("day")
                  const today = dayjs().startOf("day")

                  return workoutDay.isSame(today, "day")
                    ? "Today"
                    : workoutDay.from(today)
                })()}
              </div>
            ) : (
              <div>No record yet.</div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
