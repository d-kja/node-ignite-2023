import { FastifyInstance } from 'fastify'

export const mealRoutes = async (app: FastifyInstance) => {
  app.get('/', async (request, reply) => {
    return reply.send()
  })
}
