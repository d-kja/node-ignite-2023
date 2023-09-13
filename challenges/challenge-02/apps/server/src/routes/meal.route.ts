import { FastifyInstance } from 'fastify'

import { cookiesPrefix } from '../../cookies.config'
import {
  mealBodySchema,
  mealByIdParamsSchema,
} from '../@types/schemas/meal.schema'

import { db } from '../database'
import { authMiddleware } from '../middlewares/auth-middleware'

export const mealRoutes = async (app: FastifyInstance) => {
  app.addHook('preHandler', authMiddleware)

  app.get('/:id', async (request, reply) => {
    const { id } = mealByIdParamsSchema.parse(request.params)
    const sessionId = request.cookies[cookiesPrefix.session]

    if (!sessionId)
      return reply.code(401).send({ error: 'Unauthorized, missing session' })

    const userMeals = await db('meal')
      .where({
        id,
        session_id: sessionId,
      })
      .select()

    return reply.send({
      data: userMeals,
    })
  })

  app.post('/', async (request, reply) => {
    const { name, description, isPartOfDiet, timeStamp } = mealBodySchema.parse(
      request.body,
    )

    const sessionId = request.cookies[cookiesPrefix.session]

    if (!sessionId) {
      return reply.code(401).send({ error: 'Unauthorized, missing session' })
    }

    await db('meal').insert({
      name,
      description,
      session_id: sessionId,
      is_part_of_diet: isPartOfDiet,
      time_stamp: timeStamp,
    })

    return reply.status(201).send()
  })

  app.put('/:id', async (request, reply) => {
    const { id } = mealByIdParamsSchema.parse(request.params)
    const { name, description, isPartOfDiet, timeStamp } = mealBodySchema.parse(
      request.body,
    )
    const sessionId = request.cookies[cookiesPrefix.session]

    if (!sessionId)
      return reply.code(401).send({ error: 'Unauthorized, missing session' })

    await db('meal')
      .where({
        id,
        session_id: sessionId,
      })
      .update({
        name,
        description,
        session_id: sessionId,
        is_part_of_diet: isPartOfDiet,
        time_stamp: timeStamp,
      })

    return reply.send()
  })

  app.delete('/:id', async (request, reply) => {
    const { id } = mealByIdParamsSchema.parse(request.params)
    const sessionId = request.cookies[cookiesPrefix.session]

    if (!sessionId)
      return reply.code(401).send({ error: 'Unauthorized, missing session' })

    await db('meal')
      .where({
        id,
        session_id: sessionId,
      })
      .delete()

    return reply.send()
  })
}
