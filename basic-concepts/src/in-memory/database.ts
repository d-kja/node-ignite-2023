import { readFile } from 'node:fs'
import { resolve } from 'node:path'
import { User } from '../@types/in-memory/database.js'

const EXAMPLE_PATH = resolve('./src/in-memory/users-example.json')
export const users: User[] = []

export const database = {
  async load() {
    readFile(EXAMPLE_PATH, (err, data) => {
      if (err) console.log(err)

      const exampleUsers: User[] = JSON.parse(data.toString())

      Promise.all(
        exampleUsers.map(
          (user) =>
            new Promise((resolve) => {
              this.post(user)
              return resolve
            }),
        ),
      )
    })
  },
  get(id?: string | undefined) {
    if (id) return users.filter((user) => user.id === id)[0]

    return users
  },
  post(user: User) {
    users.push(user)
  },
}
