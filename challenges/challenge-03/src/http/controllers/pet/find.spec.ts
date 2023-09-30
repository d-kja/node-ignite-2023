import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'
import { prisma } from '@/libs/prisma'

import { createAndAuthenticateUser } from '@/libs/test/create-and-auth-user'
import supertest from 'supertest'

describe('@http/pets/find', async () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  const server = app.server

  it('should be able to find a pet', async () => {
    const { cookies, token, user } = await createAndAuthenticateUser(
      app,
      'MEMBER',
    )

    const pet = await prisma.pet.create({
      data: {
        name: `envy`,
        description: 'cute and introverted doggy',
        state: 'PR',
        city: 'REDACTED',
        user_id: user.id,
        energy: 3,
        independence: 2,
        isClaustrophobic: false,
      },
    })

    const response = await supertest(server)
      .get(`/pet/${pet.id}`)
      .set('Cookie', cookies)
      .set('Authorization', `Bearer ${token}`)

    expect(response.statusCode).toEqual(200)
    expect(response.body.pet).toEqual(
      expect.objectContaining({
        name: 'envy',
      }),
    )
  })
})
