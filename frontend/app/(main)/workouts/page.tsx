import Workouts from '@/components/Workouts'
import { getAllWorkouts } from '@/lib/query/workouts'
import { getSession } from '@/lib/session'
import { redirect } from 'next/navigation'

export default async function page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const session = await getSession()

  if (!session)
    redirect('/sign-in')

  const searchParam = await searchParams
  const searchVal = Array.isArray(searchParam.search) ? searchParam.search[0] : searchParam.search

  const safetySort = ['asc', 'desc']

  const sortBy = Array.isArray(searchParam.sortBy) ? searchParam.sortBy[0] : searchParam.sortBy
  const sortVal = sortBy ? safetySort.includes(sortBy.split('_')[1]) ? sortBy.split('_')[1] : 'desc' : 'desc'

  const workouts = await getAllWorkouts(session.jwt, {
    name: searchVal ?? '',
    sortBy: `exerciseDate,${sortVal}`,
  })

  return (
    <Workouts
      jwt={session.jwt}
      data={workouts}
    />
  )
}
