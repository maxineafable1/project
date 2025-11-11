import Dashboard from '@/components/Dashboard'
import { db } from '@/db'
import { exercises } from '@/db-schema'
import { auth } from '@/lib/auth'
import { and, eq, sql } from 'drizzle-orm'
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

  const exercisesData = !searchVal
    ? await db.select()
      .from(exercises)
      .where(eq(exercises.userId, session.user.id))
      // .orderBy(sql`date(${exercises.exerciseDate}) ${sql.raw(sortVal)}`, sql`datetime(${exercises.createdAt}) desc`)
      .orderBy(sql`date(${exercises.exerciseDate}) ${sql.raw(sortVal)}`, sql`${exercises.createdAt} desc`)
    :
    await db.select()
      .from(exercises)
      .where(
        and(eq(exercises.userId, session.user.id), sql`lower(${exercises.name}) like lower(${`%${searchVal}%`})`)
      )
      // .orderBy(sql`date(${exercises.exerciseDate}) ${sql.raw(sortVal)}`, sql`datetime(${exercises.createdAt}) desc`)
      .orderBy(sql`date(${exercises.exerciseDate}) ${sql.raw(sortVal)}`, sql`${exercises.createdAt} desc`)

  return (
    <Dashboard sessId={session.user.id} username={session.user.name} exercises={exercisesData} />
  )
}
