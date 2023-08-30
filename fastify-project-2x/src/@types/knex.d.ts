declare module 'knex/types/tables' {
  export interface Tables {
    transactions: {
      id: string
      created_at: string
      title: string
      amount: number
      session_id?: string
    }
  }
}
