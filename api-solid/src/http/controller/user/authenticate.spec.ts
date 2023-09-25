import { server as http } from '@/server'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('@controller/user/authenticate', async () => {
  beforeAll(async () => {
    await http.ready()
  })
  afterAll(async () => {
    await http.close()
  })

  it('should be able to authenticate the user', async () => {
    const server = http.server

    const email = 'johndoe2@example.com'
    const password = '123321'

    await request(server).post('/user').send({
      name: 'john doe',
      email,
      password,
    })

    const response = await request(server).post('/session').send({
      email,
      password,
    })

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual(
      expect.objectContaining({
        token: expect.any(String),
      }),
    )
  })
})
