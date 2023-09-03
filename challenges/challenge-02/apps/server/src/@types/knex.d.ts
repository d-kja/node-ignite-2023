// eslint-disable-next-line
import { Knex } from 'knex'

export type Meal = {
  id: string
  session_id: string
  name: string
  description?: string
  is_part_of_diet?: boolean
  time_stamp: string
  created_at: string
}

declare module 'knex/types/tables' {
  interface Tables {
    meals: Meal
  }
}
