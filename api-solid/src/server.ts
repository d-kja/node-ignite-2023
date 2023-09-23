import fastify from 'fastify'
import { ZodError } from 'zod'
import { env } from './env'
import { Routes } from './http/routes'

export const server = fastify()

server.register(Routes)
server.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error.', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // TODO: log this error using an external service such as sentry, datadog, newrelic
  }

  return reply
    .status(500)
    .send({ message: error.message ?? 'Internal server error.' })
})
