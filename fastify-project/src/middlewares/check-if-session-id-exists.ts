import { FastifyReply, FastifyRequest } from 'fastify'

export async function checkIfSessionIdExist(
  request: FastifyRequest,
  response: FastifyReply,
) {
  const sessionId = request.cookies['@ignite-fastify/session-id']

  if (!sessionId) {
    return response.status(401).send({
      error: 'Unauthorized access',
    })
  }
}
