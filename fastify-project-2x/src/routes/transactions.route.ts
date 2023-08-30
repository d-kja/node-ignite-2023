import { FastifyInstance } from 'fastify'

import { db } from '../database'
import { checkIfSessionIdExists } from '../middleware/check-if-session-id-exists'

import { randomUUID } from 'crypto'
import {
  createTransactionSchema,
  getTransactionSchema,
} from '../@types/models/transactions-types'

export async function transactionsRoute(app: FastifyInstance) {
  app.get(
    '/',
    {
      preHandler: [checkIfSessionIdExists],
    },
    async (request) => {
      const sessionId = request.cookies['@ignite-fastify/session-id']

      const transactions = await db('transactions')
        .where('session_id', sessionId)
        .select()

      return {
        total: transactions.length,
        transactions,
      }
    },
  )

  app.get(
    '/:id',
    {
      preHandler: [checkIfSessionIdExists],
    },
    async (request, reply) => {
      const { id } = getTransactionSchema.parse(request.params)
      const sessionId = request.cookies['@ignite-fastify/session-id']!

      const transaction = await db('transactions')
        .where({ id, session_id: sessionId })
        .first()

      return {
        transaction,
      }
    },
  )

  app.get(
    '/summary',
    {
      preHandler: [checkIfSessionIdExists],
    },
    async (request, reply) => {
      const sessionId = request.cookies['@ignite-fastify/session-id']

      const summary = await db('transactions')
        .where('session_id', sessionId)
        .sum('amount', {
          as: 'amount',
        })
        .first()

      return {
        summary,
      }
    },
  )

  app.post('/', async (request, reply) => {
    const { title, amount, type } = createTransactionSchema.parse(request.body)
    const transformedAmount = type === 'credit' ? amount : amount * -1

    let sessionId = request.cookies['@ignite-fastify/session-id']

    if (!sessionId) {
      sessionId = randomUUID()

      reply.cookie('@ignite-fastify/session-id', sessionId, {
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/',
      })
    }

    await db('transactions').insert({
      id: randomUUID(),
      title,
      amount: transformedAmount,
      session_id: sessionId,
    })

    return reply.status(201).send()
  })
}
