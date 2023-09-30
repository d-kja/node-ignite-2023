import { makeFindPetUseCase } from '@/services/factories/make-find-pet-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const findPetRouteParams = z.object({
  id: z.string().uuid(),
})

export const find = async (request: FastifyRequest, reply: FastifyReply) => {
  const { id } = findPetRouteParams.parse(request.params)

  const findPetUseCase = makeFindPetUseCase()

  const { pet } = await findPetUseCase.handle({
    petId: id,
  })

  return reply.status(200).send({
    pet,
  })
}
