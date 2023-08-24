import fastify from 'fastify'

import { db } from './database'

const app = fastify()

app.get('/', async (req, res) => {
  // Creating data row
  // const transaction = await db('transactions')
  //   .insert({
  //     id: randomUUID(),
  //     title: 'Transaction test',
  //     amount: 2000,
  //   })
  //   .returning('*')

  // Listing data
  const transactions = await db('transactions')
    .select('*')
    .where('amount', 2000)

  return res.send(transactions)
})

app
  .listen({
    port: 4000,
  })
  .then(() =>
    console.log(
      `[SERVER] - Running on port 4000\n\n  - Development url: http://localhost:4000/`,
    ),
  )
