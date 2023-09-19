import { db } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { UserRepository } from './user.repository'

export class PrismaUserRepository extends UserRepository {
  async create(data: Prisma.UserCreateInput) {
    const userWithSameEmail = await this.findUserWithEmail(data.email)

    if (userWithSameEmail) {
      throw new Error('E-mail already in use.')
    }

    const user = await db.user.create({
      data,
    })

    return user
  }

  async findUserWithEmail(email: string) {
    const user = await db.user.findUnique({
      where: { email },
    })

    return user
  }
}
