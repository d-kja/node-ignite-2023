import { FastifyInstance } from 'fastify'
import { authenticate } from './controller/user/authenticate.controller'
import { register } from './controller/user/register.controller'

export const Routes = async (app: FastifyInstance) => {
  app.post('/user', register)
  app.post('/session', authenticate)
}
