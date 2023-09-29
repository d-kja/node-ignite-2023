import '@fastify/jwt'

import type { UserRolesEnum } from './repository/entities'

declare module '@fastify/jwt' {
  interface FastifyJWT {
    user: {
      role: UserRolesEnum
      sub: string
    }
  }
}
