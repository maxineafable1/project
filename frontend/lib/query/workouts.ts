export async function getWorkouts(jwt: string) {
  try {
    const res = await fetch('http://localhost:8080/api/v1/workouts', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${jwt}`,
        'Content-Type': 'application/json'
      },
    })

    if (!res.ok)
      throw new Error(`Request failed: ${res.status}`)

    const data = await res.json()
    return data

  } catch (error) {
    console.log(error)
  }
}