'use server'

import { revalidatePath } from "next/cache"

export async function createExercise(jwt: string, newExercise: any) {
  try {
    const res = await fetch(`${process.env.API_URL}/api/v1/exercises`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${jwt}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newExercise)
    })

    if (!res.ok)
      throw new Error(`Request failed: ${res.status}`)

    revalidatePath('/workouts')
  } catch (error) {
    if (error instanceof Error)
      throw error

    throw new Error('Server error. Please try again')
  }
}

export async function deleteExercise(jwt: string, exerciseId: number) {
  try {
    const res = await fetch(`${process.env.API_URL}/api/v1/exercises/${exerciseId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${jwt}`,
        'Content-Type': 'application/json'
      },
    })

    if (!res.ok)
      throw new Error(`Request failed: ${res.status}`)

    revalidatePath('/workouts')
  } catch (error) {
    if (error instanceof Error)
      throw error

    throw new Error('Server error. Please try again')
  }
}

export async function updateExercise(jwt: string, updatedExercise: any, exerciseId: number) {
  try {
    const res = await fetch(`${process.env.API_URL}/api/v1/exercises/${exerciseId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${jwt}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedExercise)
    })

    if (!res.ok)
      throw new Error(`Request failed: ${res.status}`)

    revalidatePath('/workouts')
  } catch (error) {
    if (error instanceof Error)
      throw error

    throw new Error('Server error. Please try again')
  }
}