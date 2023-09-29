import { CreateUser, User } from '@/@types/repository/entities'
import { prisma } from '@/libs/prisma'
import { UserRepository } from '../user.repository'

export class PrismaUserRepository implements UserRepository {
  async create(data: CreateUser): Promise<User> {
    const user = await prisma.user.create({
      data,
    })

    return user
  }
  async update(data: Partial<User>): Promise<User> {
    const updatedUser = await prisma.user.update({
      where: {
        id: data.id,
      },
      data,
    })

    return updatedUser
  }
  async findById(data: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        id: data,
      },
    })

    return user
  }
  async findByEmail(data: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        email: data,
      },
    })

    return user
  }
}
