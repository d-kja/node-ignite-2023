import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { server } from '@/server'

describe('@controller/user/register', async () => {
  beforeAll(async () => {
    await server.ready()
  })
  afterAll(async () => {
    await server.close()
  })

  it('should be able to register a new user', async () => {
    const response = await request(server.server).post('/user').send({
      name: 'John Doe 01',
      email: 'johndoe01@example.com',
      password: '123321',
    })

    expect(response.statusCode).toBe(201)
  })
})
