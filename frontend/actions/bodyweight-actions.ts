'use server'

import { revalidatePath } from "next/cache";

export async function createBodyweight(jwt: string, newBodyweight: any) {
  try {
    const res = await fetch('http://localhost:8080/api/v1/bodyweights', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${jwt}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newBodyweight)
    })

    const data = await res.json()

    if (!res.ok) {
      if (data.message)
        throw new Error(data.message)

      throw new Error(`Request failed: ${res.status}`)
    }

    revalidatePath('/my-weight')
  } catch (error) {
    if (error instanceof Error)
      throw error

    throw new Error('Server error. Please try again')
  }
}

export async function deleteBodyweight(jwt: string, bodyweightId: number) {
  try {
    const res = await fetch(`http://localhost:8080/api/v1/bodyweights/${bodyweightId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${jwt}`,
        'Content-Type': 'application/json'
      },
    })

    if (!res.ok)
      throw new Error(`Request failed: ${res.status}`)

    revalidatePath('/my-weight')
  } catch (error) {
    if (error instanceof Error)
      throw error

    throw new Error('Server error. Please try again')
  }
}

export async function updateBodyweight(jwt: string, updatedBodyweight: any, bodyweightId: number) {
  try {
    const res = await fetch(`http://localhost:8080/api/v1/bodyweights/${bodyweightId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${jwt}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedBodyweight)
    })

    if (!res.ok)
      throw new Error(`Request failed: ${res.status}`)

    revalidatePath('/my-weight')
  } catch (error) {
    if (error instanceof Error)
      throw error

    throw new Error('Server error. Please try again')
  }
}