import { db } from '@/db'
import { bodyweights, exercises, workouts } from '@/db-schema'
import { auth } from '@/lib/auth'
import { and, eq, inArray, sql } from 'drizzle-orm'
import { cookies, headers } from 'next/headers'
import { redirect } from 'next/navigation'

import Dashboard from '@/components/Dashboard'
import { getSession } from '@/lib/session'

export default async function page() {
  const session = await getSession()

  if (!session)
    redirect('/sign-in')

  console.log(session)

  // const session = await auth.api.getSession({
  //   headers: await headers()
  // })

  // console.log(session)

  // if (!session)
  //   redirect('/sign-in')

  // const latestWorkout = await db.query.workouts.findFirst({
  //   orderBy: workout => sql`${workout.exerciseDate} desc`,
  //   with: {
  //     exercises: {
  //       orderBy: exercise => sql`${exercise.createdAt} desc`,
  //     },
  //   },
  //   where: eq(workouts.userId, session.user.id),
  // })

  // const bodyweightsData = await db.select()
  //   .from(bodyweights)
  //   .where(eq(bodyweights.userId, session.user.id))
  //   .orderBy(sql`${bodyweights.bodyweightDate} desc`)

  // const lifts = ['deadlift', 'squat', 'bench', 'ohp']

  // const prs = await db.select({
  //   weight: sql<number>`max(${exercises.weight})`.as('weight'),
  //   name: exercises.name,
  //   isKilogram: exercises.isKilogram,
  // })
  //   .from(exercises)
  //   .where(and(inArray(sql`lower(${exercises.name})`, lifts), eq(exercises.sets, 1), eq(exercises.reps, 1)))
  //   .groupBy(exercises.name)

  // console.log(prs)

  return (
    <div className="">test dashboard</div>
    // <Dashboard
    //   bodyweightsData={bodyweightsData}
    //   latestWorkout={latestWorkout}
    //   prs={prs}
    // />
  )
}
