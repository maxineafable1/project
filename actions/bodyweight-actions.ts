'use server'

import { db } from "@/db";
import { bodyweights } from "@/db-schema";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

type Create = {
  weight: number;
  bodyweightDate: string;
  isKilogram: boolean;
}

export async function createBodyweight(data: Create, userId: string) {
  try {
    await db.insert(bodyweights).values({
      ...data,
      userId,
    })
  } catch (error) {
    return { error }
  }

  revalidatePath('/my-weight')
}

export async function deleteBodyweight(id: number) {
  try {
    await db.delete(bodyweights).where(eq(bodyweights.id, id))
    revalidatePath('/my-weight')
  } catch (error) {
    return { error }
  }
}

export async function updateBodyweight(id: number, data: Create, userId: string) {
  try {
    await db.update(bodyweights)
      .set(data)
      .where(and(eq(bodyweights.id, id), eq(bodyweights.userId, userId)))
  } catch (error) {
    return { error }
  }

  revalidatePath('/my-weight')
}