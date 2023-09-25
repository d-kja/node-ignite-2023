import { makeGetUserProfileUseCase } from '@/use-cases/factories/make-get-user-profile-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export const getProfile = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const userId = request.user.sub

  const getUserProfile = makeGetUserProfileUseCase()

  const { user } = await getUserProfile.handle({
    id: userId,
  })

  return reply.status(200).send({ ...user, password_hash: undefined })
}
