import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { db } from '@/lib/prisma'
import { createAndAuthenticateUser } from '@/lib/utils/test/create-and-authenticate-user'
import { server as http } from '@/server'

describe('@controller/check-in/history', async () => {
  beforeAll(async () => {
    await http.ready()
  })
  afterAll(async () => {
    await http.close()
  })

  it("should be able to retrieve the user's check-in history", async () => {
    const { token } = await createAndAuthenticateUser({ app: http })

    const user = await db.user.findFirstOrThrow()

    const gym = await db.gym.create({
      data: {
        title: 'js gym',
        latitude: -27.0610928,
        longitude: -49.5529501,
      },
    })

    await db.checkIn.createMany({
      data: [
        {
          gym_id: gym.id,
          user_id: user.id,
        },
        {
          gym_id: gym.id,
          user_id: user.id,
        },
      ],
    })

    const response = await request(http.server)
      .get('/check-in/history')
      .set('Authorization', `Bearer ${token}`)

    expect(response.statusCode).toBe(200)
    expect(response.body.checkIns).toEqual([
      expect.objectContaining({
        gym_id: gym.id,
        user_id: user.id,
      }),
      expect.objectContaining({
        gym_id: gym.id,
        user_id: user.id,
      }),
    ])
  })
})
