export async function getLatestWorkout(jwt: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/workouts/latest`, {
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

export async function getLatestBodyweight(jwt: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/bodyweights/latest`, {
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

export async function getLatestWeeklyBodyweightStat(jwt: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/bodyweights/weekly/latest`, {
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

export async function getExercisePrs(jwt: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/exercises/prs`, {
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