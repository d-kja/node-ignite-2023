import { env } from './env'

import fastifyCookie from '@fastify/cookie'
import fastifyJwt from '@fastify/jwt'
import fastify from 'fastify'
import { ZodError } from 'zod'

import { checkInRoutes } from './http/controller/check-in/routes'
import { gymRoutes } from './http/controller/gym/route'
import { userRoutes } from './http/controller/user/routes'

export const server = fastify()

// Plugins
server.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn: '10m',
  },
})
server.register(fastifyCookie)

/**
 * If the refresh cookie isn't being set you need to do this
 *
 * # On the server
 * server.register(cors, {
 *   origin: true,
 *   credentials: true,
 * })
 *
 * # On the web
 * axios.create({
 *   baseURL: ...,
 *   withCredentials: true
 * })
 */

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
