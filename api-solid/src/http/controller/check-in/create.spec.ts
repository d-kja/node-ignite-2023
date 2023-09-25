import { server as http } from '@/server'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { db } from '@/lib/prisma'
import { createAndAuthenticateUser } from '@/lib/utils/test/create-and-authenticate-user'

describe('@controller/check-in/create', async () => {
  beforeAll(async () => {
    await http.ready()
  })
  afterAll(async () => {
    await http.close()
  })

  it('should be able to check in', async () => {
    const { token } = await createAndAuthenticateUser({ app: http })

    const gym = await db.gym.create({
      data: {
        title: 'js gym',
        latitude: -27.0610928,
        longitude: -49.5529501,
      },
    })

    const response = await request(http.server)
      .post(`/gym/${gym.id}/check-in`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        latitude: -27.0610928,
        longitude: -49.5529501,
      })

    expect(response.status).toBe(201)
  })
})
