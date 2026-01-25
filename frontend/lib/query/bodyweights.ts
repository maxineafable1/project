export async function getBodyweights(jwt: string, page: number = 1) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/bodyweights?page=${page - 1}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${jwt}`,
      'Content-Type': 'application/json'
    },
    cache: 'no-store',
  })

  if (!res.ok)
    throw new Error(`Request failed: ${res.status}`)

  return res.json()
}

export async function getWeeklyBodyweightStat(jwt: string) {
  const res = await fetch(`${process.env.API_URL}/api/v1/bodyweights/weekly`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${jwt}`,
      'Content-Type': 'application/json'
    },
    cache: 'no-store',
  })

  if (!res.ok)
    throw new Error(`Request failed: ${res.status}`)

  return res.json()
}