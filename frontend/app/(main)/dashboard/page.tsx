import { redirect } from 'next/navigation'

import Dashboard from '@/components/Dashboard'
import { getExercisePrs, getLatestBodyweight, getLatestWeeklyBodyweightStat, getLatestWorkout } from '@/lib/query/dashboard'
import { getSession } from '@/lib/session'

export default async function page() {
  const session = await getSession()

  if (!session)
    redirect('/sign-in')

  const sessJwt = session.jwt

  const latestWorkout = await getLatestWorkout(sessJwt)
  const latestBodyweight = await getLatestBodyweight(sessJwt)
  const latestWeeklyStatus = await getLatestWeeklyBodyweightStat(sessJwt)
  const prs = await getExercisePrs(sessJwt)

  return (
    <Dashboard
      latestBodyweight={latestBodyweight}
      latestWeeklyStatus={latestWeeklyStatus}
      latestWorkout={latestWorkout}
      prs={prs}
    />
  )
}
