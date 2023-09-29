import { FastifyInstance } from 'fastify'

export const authRouter = async (app: FastifyInstance) => {
  app.post('/refresh', async (request, reply) => {})
}
