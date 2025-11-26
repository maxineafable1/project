import WeightList from '@/components/my-weight/WeightList'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function page() {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (!session)
    redirect('/sign-in')

  return (
    <WeightList sessId={session.user.id} />
  )
}
