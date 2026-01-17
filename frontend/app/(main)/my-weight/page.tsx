import WeightList from '@/components/my-weight/WeightList'
import { getBodyweights, getWeeklyBodyweightStat } from '@/lib/query/bodyweights'
import { getSession } from '@/lib/session'
import { redirect } from 'next/navigation'

export default async function page() {
  const session = await getSession()

  if (!session)
    redirect('/sign-in')

  const [weights, weeklyStatus] = await Promise.allSettled([
    getBodyweights(session.jwt),
    getWeeklyBodyweightStat(session.jwt),
  ])

  return (
    <WeightList
      jwt={session.jwt}
      weights={weights.status === 'fulfilled' ? weights.value : []}
      weeklyStatus={weeklyStatus.status === 'fulfilled' ? weeklyStatus.value : []}
    />
  )
}
