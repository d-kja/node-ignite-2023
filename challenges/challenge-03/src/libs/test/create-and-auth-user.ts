import bcrypt from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import supertest from 'supertest'
import { prisma } from '../prisma'

export async function createAndAuthenticateUser(
  app: FastifyInstance,
  role: 'ORGANIZATION' | 'MEMBER',
) {
  const server = app.server

  const email = 'johndoe@example.com'
  const password = '123321'

  const password_hash = await bcrypt.hash(password, 8)

  const user = await prisma.user.create({
    data: {
      name: 'john doe',
      email,
      password_hash,
      cep: '00000000',
      address: 'example...',
      whatsapp: '9999999999',
      role,
    },
  })

  const loginResponse = await supertest(server).post('/user/sign-in').send({
    email,
    password,
  })

  const cookies = loginResponse.get('Set-Cookie')
  const token = loginResponse.body.token

  return {
    user,
    token,
    cookies,
  }
}
