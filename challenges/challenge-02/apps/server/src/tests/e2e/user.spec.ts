import request from 'supertest'
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest'

import { execSync } from 'node:child_process'
import { app } from '../../server'

import { z } from 'zod'
import { mealBodySchema } from '../../@types/schemas/meal.schema'
import { createUserRouteBodySchema } from '../../@types/schemas/user.schema'

type MealBodyType = z.input<typeof mealBodySchema>
type UserBodyType = z.infer<typeof createUserRouteBodySchema>

const userExample: UserBodyType = {
  name: 'john',
  email: 'john@example.com',
  password: 'atHsr0Wx2tg0ZrPD',
}
const mealExample: MealBodyType = {
  name: 'Pizza',
  description: 'is there anything better than pizza?',
  is_part_of_diet: true,
  time_stamp: '2023-09-15T08:22:46.546Z',
}

const api = request(app.server)

describe('@http/user-route', async () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  beforeEach(async () => {
    execSync('pnpm knex -- migrate:rollback --all')
    execSync('pnpm knex -- migrate:latest')
  })

  it('should be able to create a user', async () => {
    const createNewUserResponse = await api.post('/user').send(userExample)
    expect(createNewUserResponse.status).toBe(201)
  })

  it('should be able to get the meals created by the user', async () => {
    const createNewUserResponse = await api.post('/user').send(userExample)
    const cookies = createNewUserResponse.get('Set-Cookie')

    await api.post('/meal').set('Cookie', cookies).send(mealExample)

    const getUserMealsResponse = await api
      .get('/user/meals')
      .set('Cookie', cookies)

    expect(getUserMealsResponse.body.data.length).toBe(1)
  })

  it.only('should be able to get the user metrics', async () => {
    const createNewUserResponse = await api.post('/user').send(userExample)
    const cookies = createNewUserResponse.get('Set-Cookie')

    await api.post('/meal').set('Cookie', cookies).send(mealExample)

    const getUserMetricsResponse = await api
      .get('/user/metrics')
      .set('Cookie', cookies)

    expect(getUserMetricsResponse.body.data).toEqual(
      expect.objectContaining({
        total: 1,
        withinDiet: 1,
      }),
    )
  })
})
