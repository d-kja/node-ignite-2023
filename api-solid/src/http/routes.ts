import { FastifyInstance } from 'fastify'
import { register } from './controller/user-register.controller'

export const Routes = async (app: FastifyInstance) => {
  app.post('/user', register)
}
