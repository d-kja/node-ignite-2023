import { randomUUID } from 'node:crypto'
import { readFile, writeFile } from 'node:fs/promises'
import { DatabaseType } from '../@types/in-memory/database.js'

const DB_PATH = new URL('../../db.json', import.meta.url)

export class Database {
  #database = {} as DatabaseType
  #persistData = true

  constructor(persist: boolean = true) {
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

  select(table: string, id?: string) {
    const dbTable = this.#database[table]

    if (!dbTable) return []

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
}
