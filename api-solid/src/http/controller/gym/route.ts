import { verifyJWT } from '@/http/middleware/verify-jwt'
import { FastifyInstance } from 'fastify'

import { create } from './create.controller'
import { searchByQuery } from './search-by-query.controller'
import { searchNearby } from './search-nearby.controller'

export const gymRoutes = async (app: FastifyInstance) => {
  app.addHook('onRequest', verifyJWT)

  app.post('/gym', create)
  app.get('/gym/search', searchByQuery)
  app.get('/gym/nearby', searchNearby)
}
