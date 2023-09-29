import { UserAlreadyExistsError } from '@/services/errors/user-already-exists'
import { makeSignUpUserUseCase } from '@/services/factories/make-sign-up-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const signUpBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  cep: z.string(),
  address: z.string(),
  whatsapp: z.string(),
  role: z.enum(['MEMBER', 'ORGANIZATION']).optional().default('MEMBER'),
})

export const signUp = async (request: FastifyRequest, reply: FastifyReply) => {
  const data = signUpBodySchema.parse(request.body)

  try {
    const userSignUpUseCase = makeSignUpUserUseCase()
    await userSignUpUseCase.handle(data)

    return reply.status(201).send()
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({
        message: error.message,
      })
    }

    throw error
  }
}
