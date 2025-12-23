import z from "zod";

export const createExerciseSchema = z.object({
  name: z.string().min(1, { error: 'Exercise name is required' }),
  weight: z.number().min(1, { error: 'Weight must be at least 1kg/lb' }),
  sets: z.number().min(1, { error: 'Sets must be at least 1' }),
  reps: z.number().min(1, { error: 'Reps must be at least 1' }),
  // exerciseDate: z.iso.date().optional(),
  exerciseDate: z.iso.date().optional().or(z.literal('')),
  // exerciseDate: z.iso.date(),
  isKilogram: z.boolean({ error: 'Select a unit' }),
});

export type CreateExerciseSchemaType = z.infer<typeof createExerciseSchema>;