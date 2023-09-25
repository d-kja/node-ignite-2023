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

  it('should be able to search nearby gyms', async () => {
    const { token } = await createAndAuthenticateUser({
      app: http,
    })

    await request(http.server)
      .post('/gym')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'far gym',
        description: '...',
        phone: '...',
        latitude: -27.0610928,
        longitude: -49.5529501,
      })

    await request(http.server)
      .post('/gym')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'nearby gym',
        description: '...',
        phone: '...',
        latitude: -27.2092052,
        longitude: -49.6401091,
      })

    const response = await request(http.server)
      .get('/gym/nearby')
      .query({
        latitude: -27.2092052,
        longitude: -49.6401091,
      })
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: 'nearby gym',
      }),
    ])
  })
})
