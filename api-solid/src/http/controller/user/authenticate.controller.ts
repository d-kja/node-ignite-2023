import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { PrismaUserRepository } from '@/repositories/prisma/prisma-user.repository'
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'
import { AuthenticateUserUseCase } from '@/use-cases/user/authenticate.service'

const userAuthenticateBodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

export const authenticate = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const { email, password } = userAuthenticateBodySchema.parse(request.body)

  try {
    const userRepository = new PrismaUserRepository()
    const authenticateUseCase = new AuthenticateUserUseCase(userRepository)

    await authenticateUseCase.execute({
      email,
      password,
    })

    return reply.status(200).send()
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(400).send({ error: error.message })
    }

    throw error
  }
}
