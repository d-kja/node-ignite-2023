import { server as http } from '@/server'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { createAndAuthenticateUser } from '@/lib/utils/test/create-and-authenticate-user'

describe('@controller/gym/create', async () => {
  beforeAll(async () => {
    await http.ready()
  })
  afterAll(async () => {
    await http.close()
  })

  it('should be able to create a gym', async () => {
    const { token } = await createAndAuthenticateUser({
      app: http,
    })

    const response = await request(http.server)
      .post('/gym')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'js gym',
        description: '...',
        phone: '...',
        latitude: -27.0610928,
        longitude: -49.5529501,
      })

    expect(response.statusCode).toEqual(201)
  })
})
