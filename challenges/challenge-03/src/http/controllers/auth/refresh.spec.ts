import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'

describe('@http/auth/refresh', async () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('should be able to refresh token', async () => {
    const server = app.server

    const email = 'johndoe@example.com'
    const password = '123321'

    await request(server).post('/user/sign-up').send({
      name: 'john doe',
      email,
      password,
      cep: '00000000',
      address: 'example...',
      whatsapp: '9999999999',
      role: 'MEMBER',
    })

    const signInResponse = await request(server).post('/user/sign-in').send({
      email,
      password,
    })

    const cookiesWithRefreshToken = signInResponse.get('Set-Cookie')

    const response = await request(server)
      .post('/auth/refresh')
      .set('Cookie', cookiesWithRefreshToken)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
  })
})
