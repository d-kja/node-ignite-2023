import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  DATABASE_URL: z.string(),
  PORT: z.number().default(4000),
  NODE_ENV: z.enum(['development', 'test', 'production']).default('production'),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  const errorMessage = 'Invalid enviroment variables.'
  console.error(errorMessage, _env.error.format())
  throw new Error(errorMessage)
}

export const env = _env.data
