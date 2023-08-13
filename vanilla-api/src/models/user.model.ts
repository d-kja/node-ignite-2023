import { randomUUID } from 'crypto'
import { IncomingMessage, ServerResponse } from 'http'
import { UserError } from '../errors/user'
import { database } from '../in-memory/database'

export const userModule = <T extends IncomingMessage>(
  request: IncomingMessage,
  response: ServerResponse<T> & {
    req: IncomingMessage
  },
) => {
  const { method, url } = request

  const json = (data: {}) => JSON.stringify(data)
  const status = (code: number) => (response.statusCode = code)
  const header = (header: string, value: string) =>
    response.setHeader(header, value)

  const params =
    url?.split('/').filter((item) => item.length && item !== 'users') ?? []

  const userId = params[0]

  try {
    switch (method) {
      case 'GET':
        const data = database.get(userId) // users | user

        if (!data) {
          throw new UserError('User not found')
        }

        status(200)
        header('Content-Type', 'application/json')
        return response.end(json(data))

      case 'POST':
        status(201)
        database.post({
          id: randomUUID(),
          name: 'example',
          email: 'example@example.com',
        })

        return response.end()

      default:
        status(405)
        return response.end()
    }
  } catch (error) {
    if (error instanceof UserError) {
      status(400)
      return response.end(error.message)
    }

    status(500)
    return response.end('An error ocurred')
  }
}
