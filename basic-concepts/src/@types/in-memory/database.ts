import { z } from 'zod'

export const tableSchema = z.array(
  z.object({
    id: z.string().uuid(),
  }),
)
export type Table = Record<string, any> & z.infer<typeof tableSchema>
export type DatabaseType = Record<string, Table>
