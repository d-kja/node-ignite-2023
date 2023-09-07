import { FastifyInstance } from 'fastify'

export const mealRoutes = async (app: FastifyInstance) => {
  app.get('/:id', async (request, reply) => {
    return reply.send('meal route')
  })

  app.post('/', async (request, reply) => {
    return reply.send('meal route')
  })

  app.put('/:id', async (request, reply) => {
    return reply.send('meal route')
  })

  app.delete('/:id', async (request, reply) => {
    return reply.send('meal route')
  })
}
