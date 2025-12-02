import { db } from '@/db'
import { bodyweights, exercises } from '@/db-schema'
import { auth } from '@/lib/auth'
import { eq, sql } from 'drizzle-orm'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

import Dashboard from '@/components/Dashboard'

export default async function page() {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (!session)
    redirect('/sign-in')

  const exerciseData = await db.select()
    .from(exercises)
    .where(eq(exercises.userId, session.user.id))
    .orderBy(sql`date(${exercises.exerciseDate}) desc`, sql`${exercises.createdAt} desc`)

  const bodyweightsData = await db.select()
    .from(bodyweights)
    .where(eq(bodyweights.userId, session.user.id))
    .orderBy(sql`${bodyweights.bodyweightDate} desc`)

  return (
    <Dashboard
      bodyweightsData={bodyweightsData}
      exerciseData={exerciseData}
    />
  )
}
