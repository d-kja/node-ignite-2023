import { FastifyInstance } from 'fastify'
import { cookieConfigBody, cookiesPrefix } from '../../cookies.config'
import { refreshAccessToken } from '../utils/token-utils'

export async function authRoutes(app: FastifyInstance) {
  app.post('/refresh', async (request, reply) => {
    const refreshToken = request.cookies[cookiesPrefix.refreshToken]

    if (!refreshToken) {
      return reply.status(401).send({
        message: 'Refresh token not found',
      })
    }

    try {
      const tokens = await refreshAccessToken({
        refreshToken,
      })

      reply.cookie(
        cookiesPrefix.refreshToken,
        tokens.refreshToken,
        cookieConfigBody,
      )
      reply.cookie(cookiesPrefix.accessToken, tokens.token, cookieConfigBody)

      reply.header('Authorization', `Bearer ${tokens.token}`)

      return {
        message: 'Tokens refreshed',
        data: tokens,
      }
    } catch (error) {
      return reply.status(401).send({
        message: 'Refresh token invalid',
        error,
      })
    }
  })
}
