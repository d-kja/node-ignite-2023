import { FastifyReply, FastifyRequest } from 'fastify'
import jwt from 'jsonwebtoken'
import { cookiesPrefix } from '../../cookies.config'
import { env } from '../../env'

export const authMiddleware = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const token =
    request.cookies[cookiesPrefix.accessToken] || request.headers.authorization

  if (!token) {
    return reply.code(401).send({ error: 'Unauthorized, missing access token' })
  }

  try {
    jwt.verify(token, env.JWT_TOKEN_SECRET)
  } catch {
    return reply.code(401).send({ error: 'Unauthorized, token invalid' })
  }
}
