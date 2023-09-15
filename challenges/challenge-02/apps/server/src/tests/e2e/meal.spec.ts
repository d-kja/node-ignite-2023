import { execSync } from 'child_process'
import { app } from '../../server'

import { z } from 'zod'
import { mealBodySchema } from '../../@types/schemas/meal.schema'
import { createUserRouteBodySchema } from '../../@types/schemas/user.schema'

import request from 'supertest'
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest'

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

describe('@http/meal-route', async () => {
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

  it('should be able to create a new meal', async () => {
    const createUserResponse = await api.post('/user').send(userExample)
    const cookies = createUserResponse.get('Set-Cookie')

    const createMealResponse = await api
      .post('/meal')
      .set('Cookie', cookies)
      .send(mealExample)

    expect(createMealResponse.status).toBe(201)
  })

  it('should be able to list the meals of a user', async () => {
    const createUserResponse = await api.post('/user').send(userExample)
    const cookies = createUserResponse.get('Set-Cookie')

    await api.post('/meal').set('Cookie', cookies).send(mealExample)

    const getUserMealsResponse = await api.get('/meal').set('Cookie', cookies)
    const userMeals = getUserMealsResponse.body?.data

    expect(userMeals.length).toBe(1)
  })

  it('should be able to get a meal data', async () => {
    const createUserResponse = await api.post('/user').send(userExample)
    const cookies = createUserResponse.get('Set-Cookie')

    await api.post('/meal').set('Cookie', cookies).send(mealExample)

    const getUserMealsResponse = await api.get('/meal').set('Cookie', cookies)
    const userMealId = getUserMealsResponse.body?.data[0]?.id

    const getMealResponse = await api
      .get(`/meal/${userMealId}`)
      .set('Cookie', cookies)

    expect(getMealResponse.status).toBe(200)
    expect(getMealResponse.body.data[0].name).toBe(mealExample.name)
  })

  it('should be able to edit an existing meal', async () => {
    const createUserResponse = await api.post('/user').send(userExample)
    const cookies = createUserResponse.get('Set-Cookie')

    await api.post('/meal').set('Cookie', cookies).send(mealExample)

    const getUserMealsResponse = await api.get('/meal').set('Cookie', cookies)
    const mealId = getUserMealsResponse.body?.data[0]?.id

    const changeMealResponse = await api
      .put(`/meal/${mealId}`)
      .set('Cookie', cookies)
      .send({
        ...mealExample,
        name: 'Sushi',
        description: 'is there anything better than sushi?',
      })

    expect(changeMealResponse.status).toBe(200)

    const getUpdatedUserMealsResponse = await api
      .get('/meal')
      .set('Cookie', cookies)
    const updatedMeal = getUpdatedUserMealsResponse.body?.data[0]

    expect(updatedMeal?.name).toBe('Sushi')
    expect(updatedMeal?.description).toBe(
      'is there anything better than sushi?',
    )
  })

  it('should be able to delete a meal', async () => {
    const createUserResponse = await api.post('/user').send(userExample)
    const cookies = createUserResponse.get('Set-Cookie')

    await api.post('/meal').set('Cookie', cookies).send(mealExample)

    const getUserMealsResponse = await api.get('/meal').set('Cookie', cookies)
    const userMeal = getUserMealsResponse.body?.data[0]

    const deleteMealResponse = await api
      .delete(`/meal/${userMeal?.id}`)
      .set('Cookie', cookies)

    expect(deleteMealResponse.status).toBe(200)

    const getUpdatedUserMealsResponse = await api
      .get('/meal')
      .set('Cookie', cookies)

    expect(getUpdatedUserMealsResponse.body?.data.length).toBe(0)
  })
})
