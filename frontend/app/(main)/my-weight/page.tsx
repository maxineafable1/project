import WeightList from '@/components/my-weight/WeightList'
import { db } from '@/db'
import { bodyweights } from '@/db-schema'
import { auth } from '@/lib/auth'
import { eq, sql } from 'drizzle-orm'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function page() {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (!session)
    redirect('/sign-in')

  const weights = await db.select({
    id: bodyweights.id,
    weight: bodyweights.weight,
    date: bodyweights.bodyweightDate,
    isKilogram: bodyweights.isKilogram,
  })
    .from(bodyweights)
    .where(eq(bodyweights.userId, session.user.id))
    .orderBy(sql`${bodyweights.bodyweightDate} desc`)

  const weeklyStatus = await db.select({
    week: sql<string>`strftime('%Y-%W',${bodyweights.bodyweightDate}, '+1 day')`.as('week'),
    average: sql<number>`avg(${bodyweights.weight})`.as('average'),
    minWeight: sql<number>`min(${bodyweights.weight})`.as('minWeight'),
    maxWeight: sql<number>`max(${bodyweights.weight})`.as('maxWeight'),
  })
    .from(bodyweights)
    .where(eq(bodyweights.userId, session.user.id))
    .groupBy(sql`strftime('%Y-%W',${bodyweights.bodyweightDate}, '+1 day')`)
    .orderBy(sql`${bodyweights.bodyweightDate} desc`)

  return (
    <WeightList
      sessId={session.user.id}
      weights={weights}
      weeklyStatus={weeklyStatus}
    />
  )
}
