import { FastifyReply, FastifyRequest } from 'fastify'

export const validateRoleMiddleware = (
  roleToValidate: 'MEMBER' | 'ORGANIZATION',
) => {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    await request.jwtVerify()

    const { role } = request.user

    if (role !== roleToValidate) {
      return reply.status(401).send({ message: 'Unauthorized.' })
    }
  }
}
