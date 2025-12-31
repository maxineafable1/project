export async function getBodyweights(jwt: string) {
  try {
    const res = await fetch('http://localhost:8080/api/v1/bodyweights', {
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

export async function getWeeklyBodyweightStat(jwt: string) {
  try {
    const res = await fetch('http://localhost:8080/api/v1/bodyweights/weekly', {
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