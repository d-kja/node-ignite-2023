import { makeGetUserProfileUseCase } from '@/use-cases/factories/make-get-user-profile-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const getUserProfileParamsSchema = z.object({ id: z.string().uuid() })

export const getProfile = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const { id } = getUserProfileParamsSchema.parse(request.params)

  const getUserProfileUseCase = makeGetUserProfileUseCase()
  const user = await getUserProfileUseCase.handle({ id })

  reply.send({
    user,
  })
}
