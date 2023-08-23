import { randomUUID } from 'node:crypto'
import { readFile, writeFile } from 'node:fs/promises'
import { DatabaseType } from '../@types/in-memory/database.js'

const DB_PATH = new URL('../../db.json', import.meta.url)

export class Database {
  #database = {} as DatabaseType
  #persistData = true

  constructor(persist = true) {
    this.#persistData = persist

    readFile(DB_PATH, 'utf8')
      .then((data) => {
        const fileContent: DatabaseType = JSON.parse(data.toString())

        this.#database = fileContent
      })
      .catch(() => {
        this.#persist()
      })
  }

  #persist() {
    if (!this.#persistData) return

    writeFile(DB_PATH, JSON.stringify(this.#database)).catch((err) =>
      console.error(err),
    )
  }

  select(table: string, id?: string, query?: string) {
    const dbTable = this.#database[table] as Array<{ id: string; name: string }>

    if (!dbTable) return []

    if (query)
      return dbTable.filter(
        (row) =>
          row?.name && row.name.toLowerCase().includes(query.toLowerCase()),
      )

    if (id) return dbTable.filter((row) => row.id === id)[0]

    return this.#database[table]
  }

  insert(table: string, data: any) {
    const dbTable = this.#database[table]
    const id = randomUUID()

    if (dbTable) {
      dbTable.push({ id, ...data })
    } else {
      this.#database[table] = [{ id, ...data }]
    }

    this.#persist()
  }

  delete(table: string, id: string) {
    const rowIndex = this.#database[table].findIndex((row) => row.id === id)

    if (rowIndex > -1) {
      this.#database[table].splice(rowIndex, 1)
      this.#persist()
    }
  }

  update(table: string, id: string, data: any) {
    const rowIndex = this.#database[table].findIndex((row) => row.id === id)

    if (rowIndex > -1) {
      this.#database[table][rowIndex] = { id, ...data }
      this.#persist()
    }
  }
}
