import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'
import { prisma } from '@/libs/prisma'

import { createAndAuthenticateUser } from '@/libs/test/create-and-auth-user'
import supertest from 'supertest'

describe('@http/pets/list', async () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  const server = app.server

  it('should be able to list da pets', async () => {
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
      .get('/pet?page=1&city=REDACTED')
      .set('Cookie', cookies)
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.pets).toHaveLength(2)
  })
})
