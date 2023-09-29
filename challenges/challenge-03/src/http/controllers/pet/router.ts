import { FastifyInstance } from 'fastify'

import { validateAuthMiddleware } from '@/http/middlewares/validate-auth.middleware'
import { validateRoleMiddleware } from '@/http/middlewares/validate-role.middleware'

import { create } from './create.controller'
import { filter } from './filter.controller'
import { find } from './find.controller'
import { list } from './list.controller'

export const petsRouter = async (app: FastifyInstance) => {
  // Query params: ?city=name
  app.get(
    '/',
    {
      onRequest: validateAuthMiddleware,
    },
    list,
  )
  app.get(
    '/:id',
    {
      onRequest: validateAuthMiddleware,
    },
    find,
  )

  app.post(
    '/filter',
    {
      onRequest: validateAuthMiddleware,
    },
    filter,
  )

  app.post(
    '/',
    {
      onRequest: validateRoleMiddleware('ORGANIZATION'),
    },
    create,
  )
}
