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

  console.log(weights)
  const obj = weights.status === 'fulfilled'
    ? {
      weights: weights.value.content,
      first: weights.value.first,
      last: weights.value.last,
      number: weights.value.number,
      empty: weights.value.empty,
    }
    : null

  return (
    <WeightList
      jwt={session.jwt}
      obj={obj}
      weeklyStatus={weeklyStatus.status === 'fulfilled' ? weeklyStatus.value : []}
    />
  )
}
