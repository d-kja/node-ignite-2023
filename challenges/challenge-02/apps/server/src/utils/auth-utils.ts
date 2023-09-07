import { compare, hash } from 'bcrypt'

import {
  ComparedHashedPasswordType,
  HashPasswordType,
} from '../@types/schemas/hashed-password.schema'

export const hashPassword = async ({ password }: HashPasswordType) => {
  const saltRounds = 10
  const hashedPassword = await hash(password, saltRounds)

  return hashedPassword
}

export const compareHashedPassword = async ({
  password,
  hashedPassword,
}: ComparedHashedPasswordType) => {
  const isPasswordValid = await compare(password, hashedPassword)

  return isPasswordValid
}
