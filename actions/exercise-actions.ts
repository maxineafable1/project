'use server'

// import { exercise } from "@/db-schema"
import { db } from "@/db"
import { exercises } from "@/db-schema"
// import { ExerciseType } from "@/auth-schema"
import { and, eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"

type CreateExercise = {
  exerciseDate: string;
  name: string;
  weight: number;
  sets: number;
  reps: number;
  isKilogram: boolean;
}

export async function createExercise(data: CreateExercise, userId: string) {
  try {
    await db.insert(exercises).values({
      ...data,
      userId,
    })
  } catch (error) {
    return { error }
  }

  revalidatePath('/dashboard')
}

export async function deleteExercise(id: number) {
  await db.delete(exercises).where(eq(exercises.id, id))
  revalidatePath('/dashboard')
}

export async function updateExercise(exerciseId: number, data: CreateExercise, userId: string) {
  try {
    await db.update(exercises)
      .set(data)
      .where(and(eq(exercises.id, exerciseId), eq(exercises.userId, userId)))
  } catch (error) {
    return { error }
  }

  revalidatePath('/dashboard')
}