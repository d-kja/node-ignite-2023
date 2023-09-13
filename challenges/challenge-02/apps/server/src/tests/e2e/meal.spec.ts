import { execSync } from 'child_process'
import { afterAll, beforeAll, beforeEach, describe, it } from 'vitest'

import request from 'supertest'
import { app } from '../../server'

const server = request(app.server)

describe('@http/meal-route', async () => {
  // Initialize hooks and plugins
  beforeAll(async () => {
    await app.ready()
  })

  // Close http server
  afterAll(async () => {
    await app.close()
  })

  // reset test environment
  beforeEach(async () => {
    execSync('pnpm knex -- migrate:rollback --all')
    execSync('pnpm knex -- migrate:latest')
  })

  it('GET /meals', async () => {
    const response = await server.get('/meals')
  })
})
