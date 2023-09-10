import { z } from 'zod'

export const createUserRouteBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z
    .string()
    .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm),
  profile_picture_url: z.string().optional(),
  bio: z.string().optional(),
})

export const getUserRouteParamsSchema = z.object({ id: z.string().uuid() })
