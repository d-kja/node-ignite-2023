import { FastifyInstance } from 'fastify'
import { Meal } from '../@types/knex'
import {
  createUserRouteBodySchema,
  getUserRouteParamsSchema,
} from '../@types/schemas/user.schema'

import { cookieConfigBody, cookiesPrefix } from '../../cookies.config'
import { hashPassword } from '../utils/auth-utils'
import { generateTokens } from '../utils/token-utils'

import { randomUUID } from 'crypto'
import { db } from '../database'

import { ZodError } from 'zod'
import { fromZodError } from 'zod-validation-error'

export const userRoutes = async (app: FastifyInstance) => {
  app.get('/', async (request, reply) => {
    const sessionId = request.cookies[cookiesPrefix.session]

    if (!sessionId)
      reply.status(400).send({ message: 'User session not found.' })

    const rawUser = await db('user').where('session_id', sessionId).first()

    if (!rawUser) {
      return reply.status(400).send({ message: 'User not found.' })
    }

    const user = {
      id: rawUser.id,
      session_id: rawUser.session_id,
      name: rawUser.name,
      email: rawUser.email,
      bio: rawUser.bio,
      profile_picture_url: rawUser.profile_picture_url,
      created_at: rawUser.created_at,
    }

    return reply.send({
      data: user,
    })
  })

  app.post('/', async (request, reply) => {
    try {
      const {
        name,
        email,
        bio,
        password,
        profile_picture_url: profilePictureUrl,
      } = createUserRouteBodySchema.parse(request.body)

      const isEmailBeingUsed = await db('user').where('email', email).first()

      if (isEmailBeingUsed) {
        return reply
          .status(400)
          .send({ message: 'Email is unavailable, please choose a new one.' })
      }

      const hashedPassword = await hashPassword({ password })
      const userId = randomUUID()
      const sessionId = randomUUID()

      await db('session').insert({
        session_id: sessionId,
        user_id: userId,
        refresh_token: '',
      })

      const rawUser = await db('user')
        .insert({
          id: userId,
          session_id: sessionId,
          name,
          email,
          password: hashedPassword,
          profile_picture_url: profilePictureUrl,
          bio,
        })
        .returning('*')

      const user = rawUser[0]

      if (user) {
        const tokens = await generateTokens({
          session_id: sessionId,
          user_id: user?.id,
        })

        reply.cookie(cookiesPrefix.session, sessionId, cookieConfigBody)
        reply.cookie(
          cookiesPrefix.refreshToken,
          tokens.refreshToken,
          cookieConfigBody,
        )
        reply.cookie(cookiesPrefix.accessToken, tokens.token, cookieConfigBody)

        reply.header('Authorization', `Bearer ${tokens.token}`)
      }

      return reply.status(201).send()
    } catch (error) {
      const errorMessage =
        error instanceof ZodError
          ? fromZodError(error).message
          : 'An error ocurred'

      console.error(error)

      return reply.status(400).send(errorMessage)
    }
  })

  app.get('/:id', async (request, reply) => {
    const params = getUserRouteParamsSchema.parse(request.params)

    const user = await db('user')
      .select('id', 'name', 'bio', 'profile_picture_url', 'created_at')
      .where('id', params.id)
      .first()

    if (!user) reply.status(400).send({ message: 'User not found' })

    return reply.send({
      data: user,
    })
  })

  app.get('/meals', async (request, reply) => {
    const sessionId = request.cookies[cookiesPrefix.session]

    if (!sessionId)
      reply.status(400).send({ message: 'User session not found.' })

    const userMeals = await db('meal').where('session_id', sessionId)

    return reply.send({
      data: userMeals,
    })
  })

  app.get('/metrics', async (request, reply) => {
    const sessionId = request.cookies[cookiesPrefix.session]

    if (!sessionId)
      reply.status(400).send({ message: 'User session not found.' })

    const userMeals = await db('meal').where('session_id', sessionId)

    const withinDiet = userMeals.filter((meal) => !!meal.is_part_of_diet)
    const outsideDiet = userMeals.filter((meal) => !meal.is_part_of_diet)

    // create a new array for each date where user created a meal
    const withinDietByDate = withinDiet.reduce(
      (acc, meal) => {
        const date = new Date(meal.created_at)

        if (!acc[date.toISOString()]) {
          acc[date.toISOString()] = []
        }

        acc[date.toISOString()].push(meal)

        return acc
      },
      {} as Record<string, Meal[]>,
    )

    // finds the day that has the more meals within diet
    const bestSequenceWithinDiet = Object.entries(withinDietByDate).reduce(
      (acc, [date, value]) => {
        const total = value.length

        if (acc.total < total) {
          acc = {
            date,
            total,
          }
        }

        return acc
      },
      { total: 0, date: new Date().toISOString() } as {
        date: string
        total: number
      },
    )

    const userMetrics = {
      total: userMeals.length,
      withinDiet: withinDiet.length,
      outsideDiet: outsideDiet.length,
      bestSequenceWithinDiet,
    }

    return reply.send({
      data: userMetrics,
    })
  })
}
