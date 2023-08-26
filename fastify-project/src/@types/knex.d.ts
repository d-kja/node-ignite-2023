// eslint-disable-next-line
import { Transaction } from './models/transactions-type'

declare module 'knex/types/tables' {
  export interface Tables {
    transactions: Required<Omit<Transaction, 'type'>>
    //             ^?
  }
}
