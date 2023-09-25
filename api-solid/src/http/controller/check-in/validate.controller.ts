import { makeValidateCheckInUseCase } from '@/use-cases/factories/make-validate-check-in-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const validateCheckInParamsSchema = z.object({ checkInId: z.string().uuid() })

export const validate = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const { checkInId } = validateCheckInParamsSchema.parse(request.params)

  const validateCheckInUseCase = makeValidateCheckInUseCase()
  await validateCheckInUseCase.handle({ checkInId })

  return reply.status(204).send()
}
