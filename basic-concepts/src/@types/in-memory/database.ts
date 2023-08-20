import { z } from 'zod'

export const tableSchema = z.array(
  z.object({
    id: z.string().uuid(),
  }),
)
export type Table<T> = z.infer<typeof tableSchema>
export type DatabaseType<T = Record<string, any>> = Record<string, Table<T>>
