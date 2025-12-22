'use server'

// import { exercise } from "@/db-schema"
import { db } from "@/db"
import { exercises, workouts } from "@/db-schema"
// import { ExerciseType } from "@/auth-schema"
import { and, eq, sql } from "drizzle-orm"
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
    const workoutExist = await db.query.workouts.findFirst({
      where: eq(workouts.exerciseDate, data.exerciseDate),
    })

    if (!workoutExist) {
      // return { error: `Workout with date: ${workoutExist.exerciseDate}`}
      const newWorkout = await db.insert(workouts).values({
        exerciseDate: data.exerciseDate,
        userId,
      }).returning()

      await db.insert(exercises).values({
        ...data,
        workoutId: newWorkout[0].id,
        // always store in kg for easy aggregate
        weight: data.isKilogram ? data.weight : +(data.weight / 2.205),
        userId,
      })
    } else {
      await db.insert(exercises).values({
        ...data,
        workoutId: workoutExist.id,
        // always store in kg for easy aggregate
        weight: data.isKilogram ? data.weight : +(data.weight / 2.205),
        userId,
      })
    }

  } catch (error) {
    return { error }
  }

  revalidatePath('/dashboard')
}

export async function deleteExercise(id: number, date: string, userId: string) {
  try {
    const workout = await db.query.workouts.findFirst({
      columns: { exerciseDate: true },
      where: and(eq(workouts.exerciseDate, date), eq(workouts.userId, userId)),
      // with: { exercises: true },
      extras: {
        // exercisesCount: db.$count(exercises, eq(exercises.workoutId, workouts.id))
        exercisesCount: sql`(select count(*) from "exercises" where "exercises"."workout_id" = "workouts"."id")`.as("exercise_count")
      }
    });

    if (workout && workout.exercisesCount === 1) {
      await db.delete(workouts).where(and(eq(workouts.exerciseDate, date), eq(workouts.userId, userId)))
      revalidatePath('/dashboard')
      return
    }

    await db.delete(exercises).where(eq(exercises.id, id))
    revalidatePath('/dashboard')
  } catch (error) {
    return { error }
  }
}

export async function updateExercise(exerciseId: number, data: CreateExercise, userId: string) {
  try {
    await db.update(exercises)
      .set({
        ...data,
        // always store in kg for easy aggregate
        weight: data.isKilogram ? data.weight : +(data.weight / 2.205),
      })
      .where(and(eq(exercises.id, exerciseId), eq(exercises.userId, userId)))
  } catch (error) {
    return { error }
  }

  revalidatePath('/dashboard')
}