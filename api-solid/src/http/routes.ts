import { FastifyInstance } from 'fastify'

import { authenticate } from './controller/user/authenticate.controller'
import { getProfile } from './controller/user/get-profile.controller'
import { register } from './controller/user/register.controller'

export const Routes = async (app: FastifyInstance) => {
  app.post('/user', register)
  app.post('/user/:id', getProfile)
  app.post('/session', authenticate)
}
