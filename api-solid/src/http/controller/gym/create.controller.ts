import { makeRegisterGymUseCase } from '@/use-cases/factories/make-create-gym-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const gymRegisterBodySchema = z.object({
  title: z.string(),
  description: z.string().nullable(),
  phone: z.string().nullable(),
  latitude: z.number().refine(
    (subject) => {
      // return subject >= -90 && subject <= 90
      return Math.abs(subject) <= 90
    },
    {
      message: 'Latitude must be between -90 and 90',
    },
  ),
  longitude: z.number().refine(
    (subject) => {
      return Math.abs(subject) <= 180
    },
    {
      message: 'Longitude must be between -180 and 180',
    },
  ),
})

export const create = async (request: FastifyRequest, reply: FastifyReply) => {
  const { title, description, phone, latitude, longitude } =
    gymRegisterBodySchema.parse(request.body)

  const registerGymUseCase = makeRegisterGymUseCase()

  await registerGymUseCase.handle({
    title,
    description,
    phone,
    latitude,
    longitude,
  })

  return reply.status(201).send()
}
