import { makeListPetsUseCase } from '@/services/factories/make-list-pets-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const listPetsRouteQuery = z.object({
  city: z.string(),
  page: z.coerce.number().default(1),
})

export const list = async (request: FastifyRequest, reply: FastifyReply) => {
  const { page, city } = listPetsRouteQuery.parse(request.query)

  const listPetsUseCase = makeListPetsUseCase()
  const { pets } = await listPetsUseCase.handle({ city, page })

  return reply.status(200).send({ pets })
}
