import { Prisma } from '@prisma/client'

export abstract class UserRepository {
  async create(data: Prisma.UserCreateInput): Promise<any> {}

  async findUserWithEmail(email: string): Promise<any> {}
}
