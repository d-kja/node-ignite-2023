import { makeCheckInUseCase } from '@/use-cases/factories/make-check-in-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const createCheckInBodySchema = z.object({
  latitude: z.number().refine((subject) => {
    return Math.abs(subject) <= 90
  }),
  longitude: z.number().refine((subject) => {
    return Math.abs(subject) <= 180
  }),
})

const createCheckInParamsSchema = z.object({ gymId: z.string().uuid() })

export const create = async (request: FastifyRequest, reply: FastifyReply) => {
  const { gymId } = createCheckInParamsSchema.parse(request.params)
  const { latitude, longitude } = createCheckInBodySchema.parse(request.body)

  const userId = request.user.sub

  const checkInUseCase = makeCheckInUseCase()
  await checkInUseCase.handle({
    gymId,
    userId,
    userLatitude: latitude,
    userLongitude: longitude,
  })

  return reply.status(201).send()
}
