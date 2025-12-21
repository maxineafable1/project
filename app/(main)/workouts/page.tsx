import Workouts from '@/components/Workouts'
import { db } from '@/db'
import { workouts } from '@/db-schema'
import { auth } from '@/lib/auth'
import { eq, sql } from 'drizzle-orm'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (!session)
    redirect('/sign-in')

  const safetySort = ['asc', 'desc']

  const searchParam = (await searchParams)
  const searchVal = Array.isArray(searchParam.search) ? searchParam.search[0] : searchParam.search

  const sortBy = Array.isArray(searchParam.sortBy) ? searchParam.sortBy[0] : searchParam.sortBy
  const sortVal = sortBy ? safetySort.includes(sortBy.split('_')[1]) ? sortBy.split('_')[1] : 'desc' : 'desc'

  const workoutData = await db.query.workouts.findMany({
    orderBy: workout => sql`${workout.exerciseDate} ${sql.raw(sortVal)}`,
    with: {
      exercises: {
        ...(searchVal && {
          where: (exercise, { like }) => like(exercise.name, `%${searchVal}%`),
        }),
        orderBy: exercise => sql`${exercise.createdAt} desc`,
      },
    },
    where: eq(workouts.userId, session.user.id),
  })

  return (
    <Workouts
      sessId={session.user.id}
      data={searchVal ? workoutData.filter(a => a.exercises.length > 0) : workoutData}
    />
  )
}
