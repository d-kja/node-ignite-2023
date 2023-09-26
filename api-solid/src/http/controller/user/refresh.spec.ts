import { server as http } from '@/server'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('@controller/user/refresh', async () => {
  beforeAll(async () => {
    await http.ready()
  })
  afterAll(async () => {
    await http.close()
  })

  it('should be able to refresh the token and refreshToken', async () => {
    const server = http.server

    const email = 'johndoe@example.com'
    const password = '123321'

    await request(server).post('/user').send({
      name: 'test',
      email,
      password,
    })
    const authResponse = await request(server).post('/session').send({
      email,
      password,
    })

    const cookies = authResponse.get('Set-Cookie')

    const refreshResponse = await request(server)
      .patch('/token/refresh')
      .set('Cookie', cookies)
      .send()

    expect(refreshResponse.statusCode).toEqual(200)
    expect(refreshResponse.body).toEqual(
      expect.objectContaining({
        token: expect.any(String),
      }),
    )
    expect(refreshResponse.get('Set-Cookie')).toEqual([
      expect.stringContaining('refreshToken='),
    ])
  })
})
