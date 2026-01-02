export async function getLatestWorkout(jwt: string) {
  try {
    const res = await fetch(`http://localhost:8080/api/v1/workouts/latest`, {
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

export async function getLatestBodyweight(jwt: string) {
  try {
    const res = await fetch(`http://localhost:8080/api/v1/bodyweights/latest`, {
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

export async function getLatestWeeklyBodyweightStat(jwt: string) {
  try {
    const res = await fetch(`http://localhost:8080/api/v1/bodyweights/weekly/latest`, {
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

export async function getExercisePrs(jwt: string) {
  try {
    const res = await fetch(`http://localhost:8080/api/v1/exercises/prs`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${jwt}`,
        'Content-Type': 'application/json'
      },
    })

    const data = await res.json()
    console.log(data)

    if (!res.ok)
      throw new Error(`Request failed: ${res.status}`)

    return data

  } catch (error) {
    console.log(error)
  }
}