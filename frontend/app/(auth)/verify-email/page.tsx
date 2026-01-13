import VerifyEmail from '@/components/VerifyEmail';
import { redirect } from 'next/navigation';

export default async function page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const searchParam = await searchParams

  if (!searchParam.token)
    redirect('/')

  const tokenVal = Array.isArray(searchParam.token) ? searchParam.token[0] : searchParam.token

  return (
    <VerifyEmail tokenVal={tokenVal} />
  )
}
