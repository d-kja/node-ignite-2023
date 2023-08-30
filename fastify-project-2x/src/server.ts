import fastifyCookies from '@fastify/cookie'
import { fastify } from 'fastify'
import { transactionsRoute } from './routes/transactions.route'

export const server = fastify()

// Hooks
/**
 * @description
 *
 * Global hooks have a small detail to note, they have 2 syntaxes
 *
 * - Async
 *
 *    ...addHook('hook-name', async (request, reply) => { do something here... })
 *
 * - Non async
 *
 *    ...addHook('hook-name', (request, reply, next) => {
 *       do something here...
 *       next() // if you don't call this, your API is going to be looping for a year
 *    })
 */
server.addHook('preHandler', async (req) => {
  console.log(`[${req.method} - ${req.url}]`)
})

// Plugins
server.register(fastifyCookies)

// Routes
server.register(transactionsRoute, {
  prefix: 'transactions',
})
