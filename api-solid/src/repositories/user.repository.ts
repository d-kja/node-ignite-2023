import { Prisma, User } from '@prisma/client'

export interface UserRepository {
  create: (data: Prisma.UserCreateInput) => Promise<{ user: User }>
  findByEmail: (email: string) => Promise<User | null>
}
