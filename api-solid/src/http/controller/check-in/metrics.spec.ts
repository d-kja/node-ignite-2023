import { db } from '@/lib/prisma'
import { createAndAuthenticateUser } from '@/lib/utils/test/create-and-authenticate-user'
import { server as http } from '@/server'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('@controller/check-in/metrics', async () => {
  beforeAll(async () => {
    await http.ready()
  })
  afterAll(async () => {
    await http.close()
  })

  it("should be able to retrieve user's check-in metrics", async () => {
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
      .get('/check-in/metrics')
      .set('authorization', `Bearer ${token}`)
      .send()

    expect(response.status).toBe(200)
    expect(response.body.totalCheckIns).toEqual(2)
  })
})
