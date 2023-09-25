import { makeFetchNearbyGymsUseCase } from '@/use-cases/factories/make-fetch-nearby-gyms-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const searchNearbyGymSchema = z.object({
  latitude: z.coerce.number().refine(
    (subject) => {
      // return subject >= -90 && subject <= 90
      return Math.abs(subject) <= 90
    },
    {
      message: 'Latitude must be between -90 and 90',
    },
  ),
  longitude: z.coerce.number().refine(
    (subject) => {
      return Math.abs(subject) <= 180
    },
    {
      message: 'Longitude must be between -180 and 180',
    },
  ),
})

export const searchNearby = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const { latitude, longitude } = searchNearbyGymSchema.parse(request.query)

  const fetchNearbyGymsUseCase = makeFetchNearbyGymsUseCase()
  const { gyms = [] } = await fetchNearbyGymsUseCase.handle({
    userLatitude: latitude,
    userLongitude: longitude,
  })

  return reply.status(200).send({
    gyms,
  })
}
