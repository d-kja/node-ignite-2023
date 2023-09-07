import { FastifyInstance } from 'fastify'

export const userRoutes = async (app: FastifyInstance) => {
  app.get('/', async (request, reply) => {
    return reply.send('user route')
  })

  app.post('/', async (request, reply) => {
    return reply.send('user route')
  })

  app.get('/:id', async (request, reply) => {
    return reply.send('user route')
  })

  app.get('/:id/meals', async (request, reply) => {
    return reply.send('user route')
  })

  app.get('/:id/metrics', async (request, reply) => {
    return reply.send('user route')
  })
}
