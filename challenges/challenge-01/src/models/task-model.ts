import { MiddlewareHandler } from '@/@types/index.js'
import { database } from '@/server.js'
import { json, status } from '@/utils/request-utils.js'

export function taskModel({ request, response }: MiddlewareHandler) {
  const { method, query, params, body } = request

  const DATABASE_TABLE = 'tasks'

  try {
    switch (method) {
      case 'GET': {
        status({ code: 200, response })

        let searchQuery = undefined
        if (query)
          searchQuery = {
            field: ['title', 'description'],
            value: query.search,
          }

        const data = database.read(DATABASE_TABLE, params?.id, searchQuery)
        if (!data) throw new Error('Table not found')

        return response.end(json(data))
      }

      case 'POST': {
        status({ code: 201, response })

        const data = { ...body, created_at: new Date() }

        if (body) database.create(DATABASE_TABLE, data)
        return response.end()
      }
      case 'PUT': {
        status({ code: 204, response })

        const data = { ...body, updated_at: new Date() }

        if (body) database.update(DATABASE_TABLE, params?.id, data, true)
        return response.end()
      }
      case 'PATCH': {
        status({ code: 204, response })

        const row = database.read(DATABASE_TABLE, params?.id)
        const data = { ...body }

        if (row) {
          database.update(DATABASE_TABLE, params?.id, data, true)
        }

        data['completed_at'] = new Date()

        if (body) database.update(DATABASE_TABLE, params?.id, data)
        return response.end()
      }

      case 'DELETE': {
        status({ code: 204, response })

        database.delete(DATABASE_TABLE, params?.id)
        return response.end()
      }

      default:
        return response.writeHead(405).end()
    }
  } catch (error) {
    console.log('[ERROR/user-model] -', error)
    return response.writeHead(405).end()
  }
}
