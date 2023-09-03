import { FastifyInstance } from 'fastify'

export const userRoutes = async (app: FastifyInstance) => {
  app.get('/', async (request, reply) => {
    return reply.send()
  })
}
