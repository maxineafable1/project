import Dashboard from '@/components/Dashboard'
import { db } from '@/db'
import { exercises } from '@/db-schema'
import { auth } from '@/lib/auth'
import { eq, sql } from 'drizzle-orm'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function page() {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (!session)
    redirect('/')

  const exercisesData = await db.select()
    .from(exercises)
    .where(eq(exercises.userId, session.user.id))
    .orderBy(sql`date(${exercises.exerciseDate}) desc`, sql`datetime(${exercises.createdAt}) desc`)

  return (
    <Dashboard sessId={session.user.id} exercises={exercisesData} />
  )
}
