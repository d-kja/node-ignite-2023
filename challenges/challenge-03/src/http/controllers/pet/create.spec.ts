import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'
import { prisma } from '@/libs/prisma'

import bcrypt from 'bcryptjs'

describe('@http/pets/create', async () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  const server = app.server

  it('should be able to create a new pet', async () => {
    const email = 'johndoe@example.com'
    const password = '123321'

    const password_hash = await bcrypt.hash(password, 8)

    const user = await prisma.user.create({
      data: {
        name: 'john doe',
        email,
        password_hash,
        cep: '00000000',
        address: 'example...',
        whatsapp: '9999999999',
        role: 'ORGANIZATION',
      },
    })

    await request(server).post('/user/sign-up').send()

    const signInResponse = await request(server).post('/user/sign-in').send({
      email,
      password,
    })

    const { token } = signInResponse.body
    const cookiesWithRefreshToken = signInResponse.get('Set-Cookie')

    const response = await request(server)
      .post('/pet')
      .set('Cookie', cookiesWithRefreshToken)
      .set('authorization', `Bearer ${token}`)
      .send({
        name: 'envy',
        description: 'cute and introverted doggy',
        state: 'PR',
        city: 'REDACTED',
        user_id: user.id,
      })

    expect(response.statusCode).toEqual(201)
  })
})
