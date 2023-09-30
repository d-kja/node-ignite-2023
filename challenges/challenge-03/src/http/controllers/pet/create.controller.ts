import {
  PetEnergyEnum,
  PetIndependenceEnum,
} from '@/@types/repository/entities'
import { ResourceNotFoundError } from '@/services/errors/resource-not-found'
import { makeCreatePetUseCase } from '@/services/factories/make-create-pet-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const createPetBodySchema = z.object({
  name: z.string(),
  description: z.string(),
  images: z.array(z.string()).optional(),
  age: z.enum(['NEW', 'NEUTRAL', 'OLD']).optional().default('NEUTRAL'),
  size: z.enum(['SMOL', 'NORMAL', 'LARGE']).optional().default('NORMAL'),
  energy: z.number().min(1).max(5).optional().default(3),
  independence: z.number().min(1).max(3).optional().default(2),
  isClaustrophobic: z.boolean().optional().default(false),
  otherRequirements: z.array(z.string()).optional(),
  state: z.string(),
  city: z.string(),
  user_id: z.string(),
})

export const create = async (request: FastifyRequest, reply: FastifyReply) => {
  const {
    name,
    description,
    images,
    user_id,
    city,
    state,
    age,
    size,
    energy,
    independence,
    isClaustrophobic,
    otherRequirements,
  } = createPetBodySchema.parse(request.body)

  try {
    const createPetUseCase = makeCreatePetUseCase()

    await createPetUseCase.handle({
      name,
      description,
      images,
      user_id,
      city,
      state,
      age,
      size,
      energy: energy as PetEnergyEnum,
      independence: independence as PetIndependenceEnum,
      isClaustrophobic,
      otherRequirements,
    })

    return reply.status(201).send()
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(400).send({
        message: "User id doesn't exist",
      })
    }

    // send the error to the layer above (error handler)
    throw error
  }

  return reply.status(200).send({})
}
