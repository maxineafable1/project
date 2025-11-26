'use server'

import { db } from "@/db";
import { bodyweights } from "@/db-schema";
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