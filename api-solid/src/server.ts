import fastifyJwt from '@fastify/jwt'
import fastify from 'fastify'
import { ZodError } from 'zod'
import { env } from './env'
import { checkInRoutes } from './http/controller/check-in/routes'
import { gymRoutes } from './http/controller/gym/route'
import { userRoutes } from './http/controller/user/routes'

export const server = fastify()

// Plugins
server.register(fastifyJwt, {
  secret: env.JWT_SECRET,
})

// Routes
server.register(userRoutes)
server.register(gymRoutes)
server.register(checkInRoutes)

// Global error handler
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
