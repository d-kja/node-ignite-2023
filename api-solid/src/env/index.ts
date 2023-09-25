import { z } from 'zod'

// fix conflict between test runner and development environment variables
import { config } from 'dotenv'

if (process.env.NODE_ENV === 'test') {
  config({
    path: '.env.test',
  })
} else if (process.env.NODE_ENV === 'development') {
  config({
    path: '.env.development',
  })
} else {
  config()
}

const envSchema = z.object({
  NODE_ENV: z.enum(['production', 'development', 'test']).default('production'),
  PORT: z.coerce.number().default(4000),
  SERVER_HOST: z.string().default('0.0.0.0'),

  // AUTHORIZATION
  JWT_SECRET: z.string(),

  // DATABASE CONNECTION
  DATABASE_URL: z.string(),
})

const _env = envSchema.safeParse(process.env)

if (!_env.success) {
  const errorMessage = 'Unable to read ENV file properly, missing variables.'

  console.error(_env.error.format())
  throw new Error(errorMessage)
}

export const env = _env.data
