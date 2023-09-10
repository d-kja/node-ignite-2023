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

export type Session = {
  session_id: string
  user_id: string
  refresh_token: string
  created_at: string
}

export type User = {
  id: string
  session_id: string
  name: string
  email: string
  password: string
  profile_picture_url?: string | null
  bio?: string | null
  created_at: string
}

declare module 'knex/types/tables' {
  interface Tables {
    meal: Meal
    user: User
    session: Session
  }
}
