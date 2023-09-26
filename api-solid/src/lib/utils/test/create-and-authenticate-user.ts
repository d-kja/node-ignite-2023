import { db } from '@/lib/prisma'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

import bcrypt from 'bcryptjs'

interface CreateAndAuthenticateUserParams {
  app: FastifyInstance
  opt?: {
    isAdmin?: boolean
  }
}

export async function createAndAuthenticateUser({
  app,
  opt = {
    isAdmin: false,
  },
}: CreateAndAuthenticateUserParams) {
  const server = app.server

  const email = 'johndoe@example.com'
  const password = '123321'

  await db.user.create({
    data: {
      name: 'JOHN DOE',
      email,
      password_hash: await bcrypt.hash(password, 6),
      role: opt.isAdmin ? 'ADMIN' : 'MEMBER',
    },
  })

  const loginResponse = await request(server).post('/session').send({
    email,
    password,
  })

  const token = loginResponse.body.token

  return {
    token,
  }
}
