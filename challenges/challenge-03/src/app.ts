import { fastify } from 'fastify'

import cookies from '@fastify/cookie'
import jwt from '@fastify/jwt'

import { ZodError } from 'zod'
import { env } from './env'

import { authRouter } from './http/controllers/auth/router'
import { organizationsRouter } from './http/controllers/user/router'
import { petsRouter } from './http/controllers/pet/router'

export const app = fastify()

// Plugins
app.register(cookies)
app.register(jwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn: '15min',
  },
})

// Routes
app.register(organizationsRouter, {
  prefix: '/org',
})
app.register(petsRouter, {
  prefix: '/pet',
})
app.register(authRouter, {
  prefix: '/auth',
})

// Error handler
app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    const errorMessage = error.format()

    return reply.status(400).send({
      message: 'Validation error',
      issues: errorMessage,
    })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // Create logs on tools like sentry
  }

  return reply.status(500).send({
    message: 'Internal server error.',
  })
})
