import { FastifyInstance } from 'fastify'

export const petsRouter = async (app: FastifyInstance) => {
  // Query params: ?city=name
  app.get('/', async (request, reply) => {})
  app.get('/:id', async (request, reply) => {})

  app.post('/filter', async (request, reply) => {})

  // needs to be an organization
  app.post('/', async (request, reply) => {})
}
