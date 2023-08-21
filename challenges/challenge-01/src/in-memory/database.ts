import { DatabaseType } from '@/@types/database.js'
import { randomUUID } from 'node:crypto'
import { readFile, writeFile } from 'node:fs/promises'

const DB_PATH = new URL('../../db.json', import.meta.url)

export class Database {
  #database: DatabaseType = {}

  constructor() {
    readFile(DB_PATH, 'utf8')
      .then((data) => {
        const content = JSON.parse(data.toString())
        this.#database = content
      })
      .catch((err) => {
        console.log('[ERROR/DATABASE] -', err)
        this.#persist()
      })
  }

  create(table: string, data: any) {
    const id = randomUUID()
    const databaseTable = this.#database[table]

    const item = { id, ...data }

    if (databaseTable) {
      databaseTable.push(item)
    } else {
      this.#database[table] = [item]
    }

    this.#persist()
  }
  read(table: string, id?: string, query?: { value: string; field: string }) {
    const databaseTable = this.#database[table]

    if (!databaseTable) return []

    if (id) return this.#database[table].find((row) => row.id === id)

    if (query?.value)
      return this.#database[table].filter((row) =>
        row[query.field]?.includes(query.value),
      )

    return databaseTable
  }
  update(table: string, id: string, data: any, replace: boolean = false) {
    const databaseTable = this.#database[table]
    const rowIndex = databaseTable.findIndex((item) => item.id === id)

    if (rowIndex) {
      const created_at = databaseTable[rowIndex].created_at

      const updatedData = replace
        ? { id, ...data, created_at }
        : { ...databaseTable[rowIndex], ...data }

      databaseTable[rowIndex] = updatedData
      this.#persist()
    }
  }
  delete(table: string, id: string) {
    const databaseTable = this.#database[table]
    const rowIndex = databaseTable.findIndex((item) => item.id === id)

    if (rowIndex) {
      databaseTable.splice(rowIndex, 1)

      this.#persist()
    }
  }

  #persist() {
    writeFile(DB_PATH, JSON.stringify(this.#database)).catch((err) =>
      console.log('[ERROR/DATABASE] -', err),
    )
  }
}
