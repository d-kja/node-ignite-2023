import { FastifyInstance } from 'fastify'

import { verifyJWT } from '@/http/middleware/verify-jwt'
import { authenticate } from './authenticate.controller'
import { getProfile } from './get-profile.controller'
import { getUser } from './get-user.controller'
import { register } from './register.controller'

export const userRoutes = async (app: FastifyInstance) => {
  app.post('/user', register)
  app.post('/user/:id', getUser)
  app.post('/session', authenticate)

  /* Authenticated */
  app.get('/me', { onRequest: [verifyJWT] }, getProfile)
}
