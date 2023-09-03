import fastifyCookies from '@fastify/cookie'
import { fastify } from 'fastify'

import { mealRoutes } from './routes/meal.route'
import { userRoutes } from './routes/user.route'

export const app = fastify()

// Plugins
app.register(fastifyCookies)

// Routes
app.register(userRoutes)
app.register(mealRoutes)
