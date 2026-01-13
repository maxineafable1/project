import z from "zod";

export const bodyweightSchema = z.object({
  weight: z.number().min(1, { error: 'Weight must be at least 1kg/lb' }),
  date: z.iso.date().optional().or(z.literal('')),
  isKilogram: z.boolean({ error: 'Select a unit' }),
});

export type BodyweightSchemaType = z.infer<typeof bodyweightSchema>;