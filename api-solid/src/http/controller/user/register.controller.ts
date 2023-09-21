import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists.error'
import { makeRegisterUserUseCase } from '@/use-cases/factories/make-register-user-use-case'

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
    const registerUserUseCase = makeRegisterUserUseCase()

    await registerUserUseCase.handle({
      name,
      email,
      password,
    })
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({
        message: error.message,
      })
    }

    throw error
  }

  reply.status(201).send()
}
