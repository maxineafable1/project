import { db } from '@/db'
import { bodyweights, exercises, workouts } from '@/db-schema'
import { auth } from '@/lib/auth'
import { and, eq, inArray, sql } from 'drizzle-orm'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

import Dashboard from '@/components/Dashboard'

export default async function page() {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (!session)
    redirect('/sign-in')

  const latestWorkout = await db.query.workouts.findFirst({
    orderBy: workout => sql`${workout.exerciseDate} desc`,
    with: {
      exercises: {
        orderBy: exercise => sql`${exercise.createdAt} desc`,
      },
    },
    where: eq(workouts.userId, session.user.id),
  })

  // get latest bodyweight and weekly average
  const latestBodyweight = await db.select()
    .from(bodyweights)
    .where(eq(bodyweights.userId, session.user.id))
    .orderBy(sql`${bodyweights.bodyweightDate} desc`)
    .limit(1)

  const latestWeeklyStatus = await db.select({
    week: sql<string>`strftime('%Y-%W',${bodyweights.bodyweightDate}, '+1 day')`.as('week'),
    average: sql<number>`avg(${bodyweights.weight})`.as('average'),
    minWeight: sql<number>`min(${bodyweights.weight})`.as('minWeight'),
    maxWeight: sql<number>`max(${bodyweights.weight})`.as('maxWeight'),
  })
    .from(bodyweights)
    .where(eq(bodyweights.userId, session.user.id))
    .groupBy(sql`strftime('%Y-%W',${bodyweights.bodyweightDate}, '+1 day')`)
    .orderBy(sql`${bodyweights.bodyweightDate} desc`)
    .limit(1)

  const lifts = ['deadlift', 'squat', 'bench', 'ohp']

  const prs = await db.select({
    weight: sql<number>`max(${exercises.weight})`.as('weight'),
    name: exercises.name,
    isKilogram: exercises.isKilogram,
  })
    .from(exercises)
    .where(and(
      inArray(sql`lower(${exercises.name})`, lifts),
      eq(exercises.sets, 1),
      eq(exercises.reps, 1),
      eq(exercises.userId, session.user.id),
    ))
    .groupBy(exercises.name)

  return (
    <Dashboard
      latestBodyweight={latestBodyweight}
      latestWeeklyStatus={latestWeeklyStatus}
      latestWorkout={latestWorkout}
      prs={prs}
    />
  )
}
