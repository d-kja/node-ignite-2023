import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { PrismaUserRepository } from '@/repositories/prisma-user.repository'
import { RegisterUserUseCase } from '@/use-cases/user-register.service'

const userRegisterBodySchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
})

export const register = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const { name, email, password } = userRegisterBodySchema.parse(request.body)

  try {
    const usersRepository = new PrismaUserRepository()
    const registerUserUseCase = new RegisterUserUseCase(usersRepository)

    await registerUserUseCase.handle({
      name,
      email,
      password,
    })
  } catch (error) {
    return reply.status(409).send({ message: 'Email already in use' })
  }

  reply.status(201).send()
}
