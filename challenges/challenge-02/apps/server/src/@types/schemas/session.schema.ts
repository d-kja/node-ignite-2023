import { z } from 'zod'

// Refresh route
export const refreshRouteBodySchema = z.object({
  refreshToken: z.string(),
})

// Auth route
export const authRouteBodySchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm),
})
