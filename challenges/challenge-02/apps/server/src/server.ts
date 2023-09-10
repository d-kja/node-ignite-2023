import fastifyCookies from '@fastify/cookie'
import { fastify } from 'fastify'

import { authRoutes } from './routes/auth.route'
import { mealRoutes } from './routes/meal.route'
import { userRoutes } from './routes/user.route'

export const app = fastify()

// Plugins
app.register(fastifyCookies)

// Routes
app.register(userRoutes, {
  prefix: '/user',
})
app.register(mealRoutes, {
  prefix: '/meal',
})
app.register(authRoutes, {
  prefix: '/auth',
})
