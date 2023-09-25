import { makeGetUserCheckInMetricsUseCase } from '@/use-cases/factories/make-get-user-check-in-metrics-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export const metrics = async (request: FastifyRequest, reply: FastifyReply) => {
  const userId = request.user.sub

  const checkInUseCase = makeGetUserCheckInMetricsUseCase()
  const { totalCheckIns } = await checkInUseCase.handle({ userId })

  return reply.status(200).send({ totalCheckIns })
}
