import { FastifyInstance } from 'fastify'

import { refresh } from './refresh.controller'

export const authRouter = async (app: FastifyInstance) => {
  app.post('/refresh', refresh)
}
