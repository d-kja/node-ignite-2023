import { IncomingMessage } from 'http'
import { HandlerParams } from '../@types/server.js'
import { UserError } from '../errors/user.js'
import { bodyParser } from '../middleware/body-parser.js'
import { database } from '../server.js'

export const userModule = async <T extends IncomingMessage>({
  request,
  response,
}: HandlerParams<T>) => {
  const { method, url } = request

  const json = (data: {}) => JSON.stringify(data)
  const status = (code: number) => (response.statusCode = code)

  const { body } = await bodyParser({ request, response })
  const params =
    url?.split('/').filter((item) => item.length && item !== 'users') ?? []

  const userId = params[0]

  try {
    switch (method) {
      case 'GET':
        const { search } = request.query ?? {}

        const data = database.select('users', userId, search) // users | user

        if (!data) {
          throw new UserError('User not found')
        }

        status(200)
        return response.end(json(data))

      case 'POST':
        status(201)
        database.insert('users', {
          name: body?.name,
          email: body?.email,
        })

        return response.end()

      case 'PUT':
        if (!request.params || !request.params?.id)
          throw new UserError('Invalid ID')

        status(204)
        database.update('users', request.params.id, {
          name: body?.name,
          email: body?.email,
        })

        return response.end()

      case 'DELETE':
        if (!request.params || !request.params?.id)
          throw new UserError('Invalid ID')

        status(204)
        database.delete('users', request.params.id)

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
