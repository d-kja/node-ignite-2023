import { FastifyReply, FastifyRequest } from 'fastify'

export const validateAuthMiddleware = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    // Validating JWT
    request.jwtVerify()
  } catch {
    return reply.status(401).send({
      message: 'Unauthorized.',
    })
  }
}
