import { describe, expect, it } from 'vitest'

import axios from 'axios'
import { parse } from 'csv-parse'
import { createReadStream } from 'node:fs'

const CSV_PATH = new URL('./csv-example.csv', import.meta.url)

const api = axios.create({
  baseURL: 'http://localhost:4000',
})

const taskExample = {
  title: 'task',
  description: 'lorem ipsum',
}

type Task = {
  title: string
  description: string
}

describe('[API/Routes] Task route (GET)', async () => {
  it('should be able to create a task', async () => {
    const response = await api.post('/tasks', taskExample)

    expect(response.status).toBe(201)
  })

  it('should be able to create more than one task', async () => {
    const tasks = [
      {
        ...taskExample,
        title: 'task 01',
      },
      { ...taskExample, title: 'task 02' },
    ]

    Promise.all(
      tasks.map(
        (task) =>
          new Promise(async (resolve, reject) => {
            try {
              const response = await api.post('/tasks', task)

              expect(response.status).toBe(201)
              return resolve
            } catch (error) {
              return reject
            }
          }),
      ),
    )
  })

  it('should be able to create tasks from a csv data', async () => {
    const file = createReadStream(CSV_PATH).pipe(parse())
    const data = []

    for await (const chunk of file) {
      data.push(chunk.toString())
    }

    const filteredData: Task[] = data.slice(1).reduce((acc, item) => {
      const [title, description] = item.split(',')

      const newTask = {
        title,
        description,
      }

      acc.push(newTask)
      return acc
    }, [])

    Promise.all(
      filteredData.map(
        (task) =>
          new Promise(async (resolve, reject) => {
            try {
              const response = await api.post('/tasks', task)

              expect(response.status).toBe(201)
              return resolve
            } catch (error) {
              return reject
            }
          }),
      ),
    )

    expect(true).toBe(true)
  })
})
