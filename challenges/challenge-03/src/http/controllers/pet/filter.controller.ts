import { makeFilterPetsUseCase } from '@/services/factories/make-filter-pets-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const filterPetsBodySchema = z.object({
  city: z.string(),
  age: z.enum(['NEW', 'NEUTRAL', 'OLD']).optional(),
  size: z.enum(['SMOL', 'NORMAL', 'LARGE']).optional(),
  energy: z.number().min(1).max(5).optional(),
  independence: z.number().min(1).max(3).optional(),
  isClaustrophobic: z.boolean().optional(),
})

const filterPetsSearchParamsSchema = z.object({
  page: z.coerce.number().default(1),
})

export const filter = async (request: FastifyRequest, reply: FastifyReply) => {
  const { city, age, energy, independence, isClaustrophobic, size } =
    filterPetsBodySchema.parse(request.body)
  const { page } = filterPetsSearchParamsSchema.parse(request.query)

  const filterPetsUseCase = makeFilterPetsUseCase()

  const { pets } = await filterPetsUseCase.handle({
    city,
    age,
    energy,
    independence,
    isClaustrophobic,
    size,
    page,
  })

  return reply.status(200).send({ pets })
}
