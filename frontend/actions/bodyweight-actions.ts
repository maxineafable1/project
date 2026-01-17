'use server'

import { revalidatePath } from "next/cache";

export async function createBodyweight(jwt: string, newBodyweight: any) {
  try {
    const res = await fetch(`${process.env.API_URL}/api/v1/bodyweights`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${jwt}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newBodyweight)
    })

    if (!res.ok && res.status === 400)
      throw new Error('Bodyweight already exists with date')

    const data = await res.json()
    console.log(data)

    revalidatePath('/my-weight')
  } catch (error) {
    if (error instanceof Error)
      throw error

    throw new Error('Server error. Please try again')
  }
}

export async function deleteBodyweight(jwt: string, bodyweightId: number) {
  try {
    const res = await fetch(`${process.env.API_URL}/api/v1/bodyweights/${bodyweightId}`, {
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
    const res = await fetch(`${process.env.API_URL}/api/v1/bodyweights/${bodyweightId}`, {
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