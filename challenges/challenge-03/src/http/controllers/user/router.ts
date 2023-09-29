import { FastifyInstance } from 'fastify'

import { signIn } from './sign-in.controller'
import { signUp } from './sign-up.controller'

export const userRouter = async (app: FastifyInstance) => {
  app.post('/sign-up', signUp)
  app.post('/sign-in', signIn)
}
