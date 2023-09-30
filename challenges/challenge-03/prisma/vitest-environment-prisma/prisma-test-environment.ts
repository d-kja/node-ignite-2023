import { execSync } from 'node:child_process'
import { randomUUID } from 'node:crypto'

import { env } from '@/env'

const generateDatabaseURL = (schemaId: string) => {
  if (!env.DATABASE_URL) {
    throw new Error('Invalid database url')
  }

  const url = new URL(env.DATABASE_URL)
  url.searchParams.set('schema', schemaId)

  return url.toString()
}

export default {
  name: 'prisma',
  transformMode: 'web',
  setup: async () => {
    const schemaId = randomUUID()
    const databaseUrl = generateDatabaseURL(schemaId)

    process.env.DATABASE_URL = databaseUrl

    execSync('bunx prisma migrate deploy')
    const { PrismaClient } = require('@prisma/client')
    const prisma = new PrismaClient()

    return {
      teardown: async () => {
        await prisma.$executeRawUnsafe(
          `DROP SCHEMA IF EXISTS "${schemaId} CASCADE"`,
        )

        await prisma.$disconnect()
      },
    }
  },
}
