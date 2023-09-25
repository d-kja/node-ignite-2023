import { PrismaClient } from '@prisma/client'
import { config } from 'dotenv'

import { execSync } from 'node:child_process'
import { randomUUID } from 'node:crypto'

if (process.env.NODE_ENV === 'test') {
  config({
    path: '.env.test',
  })
} else if (process.env.NODE_ENV === 'development') {
  config({
    path: '.env.development',
  })
} else {
  config()
}

const prisma = new PrismaClient()

const generateDatabaseURL = (schema) => {
  const databaseURL = process.env.DATABASE_URL

  if (!databaseURL) {
    throw new Error('DATABASE_URL is not set')
  }

  const url = new URL(databaseURL)

  url.searchParams.set('schema', schema)
  return url.toString()
}

export default {
  name: 'prisma',
  transformMode: 'web',
  async setup() {
    const schema = randomUUID()
    const url = generateDatabaseURL(schema)

    process.env.DATABASE_URL = url

    execSync('bunx prisma migrate deploy')

    return {
      async teardown() {
        await prisma.$executeRawUnsafe(
          `DROP SCHEMA IF EXISTS "${schema}" CASCADE`,
        )
        await prisma.$disconnect()
      },
    }
  },
}
