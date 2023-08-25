import fastify from 'fastify'
import { env } from './env.js'

import { transactionsRoute } from './routes/transactions.js'

const app = fastify()

app.register(transactionsRoute)

app
  .listen({
    port: env.PORT,
  })
  .then(() =>
    console.log(
      `[SERVER] - Running on port 4000\n\n  - Development url: http://localhost:4000/`,
    ),
  )
