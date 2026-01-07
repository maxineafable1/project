import { redirect } from 'next/navigation'

import Dashboard from '@/components/Dashboard'
import { getExercisePrs, getLatestBodyweight, getLatestWeeklyBodyweightStat, getLatestWorkout } from '@/lib/query/dashboard'
import { getSession } from '@/lib/session'

export default async function page() {
  const session = await getSession()

  if (!session)
    redirect('/sign-in')

  const sessJwt = session.jwt

  const [latestWorkout, latestBodyweight, latestWeeklyStatus, prs] =
    await Promise.allSettled([
      getLatestWorkout(sessJwt),
      getLatestBodyweight(sessJwt),
      getLatestWeeklyBodyweightStat(sessJwt),
      getExercisePrs(sessJwt),
    ])
    
  return (
    <Dashboard
      latestBodyweight={latestBodyweight.status === 'fulfilled' ? latestBodyweight.value : null}
      latestWeeklyStatus={latestWeeklyStatus.status === 'fulfilled' ? latestWeeklyStatus.value : null}
      latestWorkout={latestWorkout.status === 'fulfilled' ? latestWorkout.value : null}
      prs={prs.status === 'fulfilled' ? prs.value : []}
    />
  )
}
