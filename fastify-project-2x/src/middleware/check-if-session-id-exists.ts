import { FastifyReply, FastifyRequest } from 'fastify'

export async function checkIfSessionIdExists(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const sessionId = request.cookies['@ignite-fastify/session-id']

  if (!sessionId) {
    reply.status(401).send({
      error: 'Unauthorized access',
    })
  }
}
