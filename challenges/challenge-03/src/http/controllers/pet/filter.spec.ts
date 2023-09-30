import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'
import { prisma } from '@/libs/prisma'

import { createAndAuthenticateUser } from '@/libs/test/create-and-auth-user'
import supertest from 'supertest'

describe('@http/pets/filter', async () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('should be able to filter pets', async () => {
    const server = app.server

    const { cookies, token, user } = await createAndAuthenticateUser(
      app,
      'MEMBER',
    )

    await prisma.pet.createMany({
      data: [
        {
          name: 'envy 1',
          description: 'cute and introverted doggy',
          state: 'PR',
          city: 'REDACTED',
          user_id: user.id,
          energy: 3,
          independence: 2,
          isClaustrophobic: false,
        },
        {
          name: 'envy 2',
          description: 'cute and introverted doggy',
          state: 'PR',
          city: 'REDACTED',
          user_id: user.id,
          energy: 3,
          independence: 2,
          isClaustrophobic: false,
        },
      ],
    })

    const response = await supertest(server)
      .post('/pet/filter?page=1')
      .set('Cookie', cookies)
      .set('Authorization', `Bearer ${token}`)
      .send({
        city: 'REDACTED',
      })

    expect(response.statusCode).toEqual(200)
    expect(response.body.pets).toHaveLength(2)
    expect(response.body.pets).toEqual([
      expect.objectContaining({
        name: expect.any(String),
      }),
      expect.objectContaining({
        name: expect.any(String),
      }),
    ])
  })
})
