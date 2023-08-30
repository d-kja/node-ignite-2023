import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { server as app } from '../../server'

describe('@routes/transactions', async () => {
  beforeAll(async () => {
    await app.ready()
  })

  it('should be able to create a new transaction', async () => {
    const response = await request(app.server).post('/transactions').send({
      title: 'example',
      amount: 4000,
      type: 'credit',
    })

    expect(response.status).toBe(201)
  })

  it('should have a session id cookie', async () => {
    const response = await request(app.server).post('/transactions').send({
      title: 'example',
      amount: 4000,
      type: 'credit',
    })

    expect(
      response.headers['set-cookie'][0].includes('@ignite-fastify/session-id'),
    )
  })

  it('should be able to list transactions', async () => {
    const server = request(app.server)

    const postResponse = await server.post('/transactions').send({
      title: 'example',
      amount: 4000,
      type: 'credit',
    })

    // @ignite-fastify/session-id=48cf2b65-5058-4e91-ae26-f99edf57ddb3; Max-Age=604800; Path=/
    const cookieName = '@ignite-fastify/session-id'

    const cookie = postResponse.headers['set-cookie'][0]
      .slice(`${cookieName}=`.length, -1)
      .split(';')[0]

    const getResponse = await server
      .get('/transactions')
      .set('Cookie', `${cookieName}=${cookie};`)
      .send()

    const transactions = JSON.parse(getResponse.text)?.transactions

    expect(transactions?.length).toBe(1)
  })

  afterAll(async () => {
    await app.close()
  })
})
