import { makeSearchGymsByQueryUseCase } from '@/use-cases/factories/make-search-gyms-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const searchGymByQuerySchema = z.object({
  q: z.string(),
  page: z.coerce.number().min(1).default(1),
})

export const searchByQuery = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const { q, page } = searchGymByQuerySchema.parse(request.query)

  const searchGymsUseCase = makeSearchGymsByQueryUseCase()
  const { gyms = [] } = await searchGymsUseCase.handle(q, page)

  return reply.status(200).send({
    gyms,
  })
}
