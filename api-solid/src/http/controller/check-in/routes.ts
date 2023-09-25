import { verifyJWT } from '@/http/middleware/verify-jwt'
import { FastifyInstance } from 'fastify'

import { create } from './create.controller'
import { history } from './history.controller'
import { metrics } from './metrics.controller'
import { validate } from './validate.controller'

export const checkInRoutes = async (app: FastifyInstance) => {
  app.addHook('onRequest', verifyJWT)

  app.post('/gym/:gymId/check-in', create)
  app.patch('/check-in/:checkInId/validate', validate)
  app.get('/check-in/history', history)
  app.get('/check-in/metrics', metrics)
}
