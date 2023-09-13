/* eslint-disable camelcase */
import { z } from 'zod'

export const mealByIdParamsSchema = z.object({ id: z.string().uuid() })

export const mealBodySchema = z
  .object({
    name: z.string().min(3),
    description: z.string().optional(),
    is_part_of_diet: z.boolean().optional().default(false),
    time_stamp: z.string().datetime(),
  })
  .transform(({ name, description, time_stamp, is_part_of_diet }) => ({
    name,
    description,
    timeStamp: time_stamp,
    isPartOfDiet: is_part_of_diet,
  }))
