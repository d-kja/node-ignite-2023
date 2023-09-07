import { config } from 'dotenv'
import { z } from 'zod'

if (process.env.NODE_ENV === 'test') {
  config({
    path: '.env.test',
  })
} else config()

const envSchema = z.object({
  DATABASE_URL: z.string(),
  DATABASE_CLIENT: z.enum(['pg']).default('pg'),
  JWT_REFRESH_TOKEN_SECRET: z.string(),
  JWT_TOKEN_SECRET: z.string(),
  NODE_ENV: z.enum(['production', 'test', 'development']).default('production'),
  PORT: z.coerce.number().default(3333),
})

const _env = envSchema.safeParse(process.env)

if (!_env.success) {
  const errorMessage = JSON.stringify({
    error: 'Invalid environment variables',
    message: _env.error.format(),
    stack: _env.error.stack,
  })

  throw new Error(errorMessage)
}

export const env = _env.data
