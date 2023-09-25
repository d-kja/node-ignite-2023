import { FastifyInstance } from 'fastify'
import request from 'supertest'

interface CreateAndAuthenticateUserParams {
  app: FastifyInstance
}

export async function createAndAuthenticateUser({
  app,
}: CreateAndAuthenticateUserParams) {
  const server = app.server

  const user = await request(server).post('/user').send({
    name: 'john doe',
    email: 'johndoe@example.com',
    password: '123321',
  })

  const loginResponse = await request(server).post('/session').send({
    email: 'johndoe@example.com',
    password: '123321',
  })

  const token = loginResponse.body.token

  return {
    token,
    user: user.body,
  }
}
