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

  const bodyweightsData = await db.select()
    .from(bodyweights)
    .where(eq(bodyweights.userId, session.user.id))
    .orderBy(sql`${bodyweights.bodyweightDate} desc`)

  console.log(bodyweightsData)

  return (
    <WeightList
      sessId={session.user.id}
      bodyweights={bodyweightsData}
    />
  )
}
