import type { FastifyInstance } from 'fastify'

import { db } from '@/database/index.js'

export async function transactionsRoute(app: FastifyInstance) {
  app.get('/', async (_, res) => {
    const transactions = await db('transactions')
      .select('*')
      .where('amount', 2000)

    return res.send(transactions)
  })
}
