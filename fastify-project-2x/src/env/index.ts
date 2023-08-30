import 'dotenv/config'

import { z } from 'zod'

export const envSchema = z.object({
  PORT: z.number().default(3333),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('production'),
  DATABASE_URL: z.string(),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  const errorMessage = 'Invalid environment variables.'
  console.error(_env.error.format())

  throw new Error(errorMessage)
}

export const env = _env.data
