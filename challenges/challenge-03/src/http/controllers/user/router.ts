import { FastifyInstance } from 'fastify'

export const userRouter = async (app: FastifyInstance) => {
  app.post('/sign-up', async (request, reply) => {})
  app.post('/sign-in', async (request, reply) => {})
}
