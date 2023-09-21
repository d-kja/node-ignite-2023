import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'
import { makeAuthenticateUserUseCase } from '@/use-cases/factories/make-authenticate-user-use-case'

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
    const authenticateUseCase = makeAuthenticateUserUseCase()

    await authenticateUseCase.handle({
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
