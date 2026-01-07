type Params = {
  name: string
  sortBy: string
}

export async function getAllWorkouts(jwt: string, { name, sortBy }: Params) {
  const res = await fetch(`http://localhost:8080/api/v1/workouts?name=${name}&sort=${sortBy}`, {
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