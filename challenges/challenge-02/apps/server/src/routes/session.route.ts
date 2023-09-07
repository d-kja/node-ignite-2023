import { FastifyInstance } from 'fastify'
import { hashPassword } from '../utils/auth-utils'

import {
  authRouteBodySchema,
  refreshRouteBodySchema,
} from '../@types/schemas/session.schema'

export async function sessionRoutes(app: FastifyInstance) {
  app.post('/refresh', async (request, reply) => {
    const body = refreshRouteBodySchema.parse(request.body)

    return reply.send({
      message: 'Token refreshed',
      data: {
        token: body.refreshToken,
        refreshToken: body.refreshToken,
        auth: true,
      },
    })
  })

  app.post('/auth', async (request, reply) => {
    const body = authRouteBodySchema.parse(request.body)

    // check if user with the given e-mail exists

    // if that's not the case, hash password and create user
    const hashedPassword = await hashPassword({
      password: body.password,
    })

    // create session and tokens

    // return token and refresh token or set it in the cookies
    return reply.send({
      message: 'Authorized',
      data: {
        token: body.email,
        refreshToken: body.password,
        auth: true,
      },
    })
  })
}
