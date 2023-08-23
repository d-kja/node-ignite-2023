import { z } from 'zod'

export const tableSchema = z.array(
  z.object({
    id: z.string().uuid(),
  }),
)
export type Table<T> = z.infer<typeof tableSchema> | T
export type DatabaseType<T = Record<string, any>> = Record<string, Table<T>>
