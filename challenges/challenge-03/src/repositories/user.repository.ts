import { CreateUser, User } from '@/@types/repository/entities'

export interface UserRepository {
  create(data: CreateUser): Promise<User>
  update(data: Partial<User>): Promise<User>
  findById(data: string): Promise<User | null>
  findByEmail(data: string): Promise<User | null>
}
