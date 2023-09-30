import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'

describe('@http/user/sign-up', async () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('should be able to sign up', async () => {
    const server = app.server

    const user = {
      name: 'john doe',
      email: 'johndoe@example.com',
      password: '123321',
      cep: '00000000',
      address: 'example...',
      whatsapp: '9999999999',
      role: 'MEMBER',
    }

    const response = await request(server).post('/user/sign-up').send(user)

    expect(response.statusCode).toEqual(201)
  })
})
