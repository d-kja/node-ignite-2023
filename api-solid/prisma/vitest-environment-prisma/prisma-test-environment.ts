import { env } from '@/env'
import { Environment } from 'vitest'

import { PrismaClient } from '@prisma/client'
import { execSync } from 'node:child_process'
import { randomUUID } from 'node:crypto'

const db = new PrismaClient()

const generateDatabaseURL = (schema: string) => {
  const url = new URL(env.DATABASE_URL)

  url.searchParams.set('schema', schema)
  return url.toString()
}

export default <Environment>{
  name: 'prisma',
  transformMode: 'web',
  async setup() {
    const schema = randomUUID()
    const url = generateDatabaseURL(schema)

    process.env.DATABASE_URL = url

    execSync('bunx prisma migrate deploy')

    return {
      async teardown() {
        await db.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schema}" CASCADE`)
        await db.$disconnect()
      },
    }
  },
}
