import { execSync } from 'node:child_process'
import request from 'supertest'
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest'
import { server as app } from '../../server'

describe('@routes/transactions', async () => {
  beforeAll(async () => {
    await app.ready()
  })

  beforeEach(async () => {
    execSync('pnpm knex migrate:rollback --all')
    execSync('pnpm knex migrate:latest')
  })

  afterAll(async () => {
    await app.close()
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

    const transactionsPostResponse = await server.post('/transactions').send({
      title: 'example',
      amount: 4000,
      type: 'credit',
    })

    // @ignite-fastify/session-id=48cf2b65-5058-4e91-ae26-f99edf57ddb3; Max-Age=604800; Path=/

    // const cookieName = '@ignite-fastify/session-id'
    // const cookie = transactionsPostResponse.headers['set-cookie'][0]
    //   .slice(`${cookieName}=`.length, -1)
    //   .split(';')[0]

    const cookies = transactionsPostResponse.get('Set-Cookie')

    const getTransactionsResponse = await server
      .get('/transactions')
      .set('Cookie', cookies)
      // .set('Cookie', `${cookieName}=${cookie};`)
      .send()

    const transactions = getTransactionsResponse.body?.transactions

    expect(getTransactionsResponse.status).toBe(200)
    expect(transactions?.length).toBe(1)

    expect(transactions).toEqual([
      {
        id: expect.any(String),
        created_at: expect.any(String),
        session_id: expect.any(String),
        title: 'example',
        amount: '4000.00',
      },
    ])

    expect(transactions).toEqual([
      expect.objectContaining({ title: 'example', amount: '4000.00' }),
    ])
  })

  it('should be able to list a specific transaction', async () => {
    const server = request(app.server)

    const transactionsPostResponse = await server.post('/transactions').send({
      title: 'example',
      amount: 4000,
      type: 'credit',
    })

    const cookies = transactionsPostResponse.get('Set-Cookie')

    const getTransactionsResponse = await server
      .get('/transactions')
      .set('Cookie', cookies)
      // .set('Cookie', `${cookieName}=${cookie};`)
      .send()

    const transactionId = getTransactionsResponse.body?.transactions[0].id

    const getSpecificTransactionResponse = await server
      .get(`/transactions/${transactionId}`)
      .set('Cookie', cookies)
      .send()

    const transaction = getSpecificTransactionResponse.body.transaction

    expect(transaction).toEqual(
      expect.objectContaining({
        title: 'example',
        amount: '4000.00',
      }),
    )
  })

  it('should be able get summary', async () => {
    const server = request(app.server)

    const transactionsPostResponse = await server.post('/transactions').send({
      title: 'credit Transaction',
      amount: 5000,
      type: 'credit',
    })

    const cookies = transactionsPostResponse.get('Set-Cookie')

    await server.post('/transactions').set('Cookie', cookies).send({
      title: 'debit Transaction',
      amount: 2000,
      type: 'debit',
    })

    const getSummaryResponse = await server
      .get(`/transactions/summary`)
      .set('Cookie', cookies)
      .send()

    const transactionSummary = getSummaryResponse.body.summary

    expect(transactionSummary).toEqual(
      expect.objectContaining({
        amount: '3000.00',
      }),
    )
  })
})
