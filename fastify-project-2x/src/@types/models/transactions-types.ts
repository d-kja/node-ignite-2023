import { z } from 'zod'

export const createTransactionSchema = z.object({
  title: z.string(),
  amount: z.coerce.number(),
  type: z.enum(['credit', 'debit']),
})

export const getTransactionSchema = z.object({
  id: z.string().uuid(),
})

export type Transaction = z.infer<typeof createTransactionSchema> & {
  id: string
  created_at: string
  session_id?: string
}
