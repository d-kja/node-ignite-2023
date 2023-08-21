export type RowType = {
  id: string
} & Record<string, any>
export type TableType = RowType[]
export type DatabaseType = Record<string, TableType>
