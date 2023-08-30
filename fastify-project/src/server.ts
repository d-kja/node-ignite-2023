import cookies from '@fastify/cookie'
import fastify from 'fastify'

import { env } from './env.js'

import { transactionsRoute } from './routes/transactions.js'

const app = fastify()

// Plugins
app.register(cookies)

// Global hooks
app.addHook('preHandler', (request, reply) => {
  // Do something here to affect your application globally...
})

// End points
app.register(transactionsRoute, {
  prefix: 'transactions',
})

app
  .listen({
    port: env.PORT,
  })
  .then(() =>
    console.log(
      `[SERVER] - Running on port ${env.PORT}\n\n  - Development url: http://localhost:${env.PORT}/`,
    ),
  )
