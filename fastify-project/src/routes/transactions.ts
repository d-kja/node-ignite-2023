import type { FastifyInstance } from 'fastify'
import { randomUUID } from 'node:crypto'

import {
  createTransactionSchema,
  getTransactionSchema,
} from '@/@types/models/transactions-type'

import { db } from '@/database'
import { checkIfSessionIdExist } from '@/middlewares/check-if-session-id-exists'

const table = 'transactions'
const sessionCookieName = '@ignite-fastify/session-id'

export async function transactionsRoute(app: FastifyInstance) {
  /**
   * Hooks can be created either globally or within a plugin
   *
   * When used within a plugin/function it's only going to be
   * executed in that specific context, can be used for anything
   * be it validation or console log...
   */
  app.addHook('preHandler', (req) => {
    console.log(`[${req.method} - ${req.url}]`)
  })

  app.get(
    '/',
    {
      preHandler: [checkIfSessionIdExist],
    },
    async (req) => {
      const sessionId = req.cookies[sessionCookieName]

      const transactions = await db(table)
        .where('session_id', sessionId)
        .select() // select all (*)

      return {
        total: transactions.length,
        transactions,
      }
    },
  )

  app.get(
    '/:id',
    {
      preHandler: [checkIfSessionIdExist],
    },
    async (req) => {
      const { id } = getTransactionSchema.parse(req.params)
      const sessionId = req.cookies[sessionCookieName]

      const transaction = await db(table)
        .where({
          id,
          session_id: sessionId,
        })
        .first()

      return {
        transaction,
      }
    },
  )

  app.get(
    '/summary',
    {
      preHandler: [checkIfSessionIdExist],
    },
    async (req) => {
      const sessionId = req.cookies[sessionCookieName]

      const summary = await db(table)
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

  app.post('/', async (req, res) => {
    const { title, amount, type } = createTransactionSchema.parse(req.body)

    const transformedAmount = type === 'credit' ? amount : amount * -1

    let sessionId = req.cookies[sessionCookieName]

    if (!sessionId) {
      sessionId = randomUUID()

      res.cookie(sessionCookieName, sessionId, {
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 7 days
      })
    }

    // Create a new transaction
    await db(table).insert({
      id: randomUUID(),
      title,
      amount: transformedAmount,
      session_id: sessionId,
    })

    return res.status(201).send()
  })
}
