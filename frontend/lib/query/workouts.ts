type Params = {
  name?: string
  sortBy: string
  direction: string
}

export async function getAllWorkouts(jwt: string, { name, sortBy, direction }: Params) {
  const res = await fetch(`${process.env.API_URL}/api/v1/workouts?${name ? `name=${name}` : undefined}&sortBy=${sortBy}&direction=${direction}`, {
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