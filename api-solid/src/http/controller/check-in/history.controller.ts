import { makeFetchUserCheckInsHistoryUseCase } from '@/use-cases/factories/make-fetch-user-check-ins-history-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const createCheckInQuerySchema = z.object({
  page: z.coerce.number().min(1).default(1),
})

export const history = async (request: FastifyRequest, reply: FastifyReply) => {
  const { page } = createCheckInQuerySchema.parse(request.query)

  const userId = request.user.sub

  const checkInUseCase = makeFetchUserCheckInsHistoryUseCase()
  const { checkIns } = await checkInUseCase.handle({ userId, page })

  return reply.status(200).send({ checkIns })
}
