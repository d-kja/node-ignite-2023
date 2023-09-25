import { server as http } from '@/server'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('@controller/user/get-profile', async () => {
  beforeAll(async () => {
    await http.ready()
  })
  afterAll(async () => {
    await http.close()
  })

  it('should be able to retrieve the user profile', async () => {
    const server = http.server

    const user = {
      email: 'johndoe3@example.com',
      password: '123321',
    }

    await request(server)
      .post('/user')
      .send({
        name: 'john doe',
        ...user,
      })

    const loginResponse = await request(server).post('/session').send(user)
    const token = loginResponse.body.token

    const response = await request(server)
      .get('/me')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        email: user.email,
      }),
    )
  })
})
