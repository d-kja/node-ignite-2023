import { z } from 'zod'

export const hashPasswordSchema = z.object({
  password: z.string(),
})
export type HashPasswordType = z.infer<typeof hashPasswordSchema>

export const comparedHashedPasswordSchema = z.object({
  password: z.string(),
  hashedPassword: z.string(),
})
export type ComparedHashedPasswordType = z.infer<
  typeof comparedHashedPasswordSchema
>
