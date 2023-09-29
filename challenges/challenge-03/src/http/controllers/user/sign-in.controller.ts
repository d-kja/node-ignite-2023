import { InvalidCredentialsError } from '@/services/errors/invalid-credentials'
import { makeSignInUserUseCase } from '@/services/factories/make-sign-in-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const signInBodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

export const signIn = async (request: FastifyRequest, reply: FastifyReply) => {
  const { email, password } = signInBodySchema.parse(request.body)

  try {
    const signInUseCase = makeSignInUserUseCase()

    const { user } = await signInUseCase.handle({
      email,
      password,
    })

    const { id, role } = user

    const token = await reply.jwtSign(
      {
        role,
      },
      {
        sign: {
          sub: id,
        },
      },
    )

    const refreshToken = await reply.jwtSign(
      {
        role,
      },
      {
        sign: {
          sub: id,
          expiresIn: '7d',
        },
      },
    )

    return reply
      .status(200)
      .setCookie('refreshToken', refreshToken, {
        sameSite: true,
        httpOnly: true,
        secure: true,
        path: '/',
      })
      .send({ token })
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: error.message })
    }

    throw error
  }
}
