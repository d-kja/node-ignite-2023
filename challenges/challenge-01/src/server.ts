import { createServer } from 'node:http'
import { ExtendedServerRequest, ServerRequest } from './@types/index.js'

import { Database } from './in-memory/database.js'
import { routes } from './routes.js'

import { json } from './middleware/json-middleware.js'
import { extractQueryParams } from './utils/extract-query-params.js'

export const database = new Database()

const server = createServer(async (request: ServerRequest, response) => {
  const { url = '/' } = request

  await json({ request: request as ExtendedServerRequest, response })
  const route = routes.find((item) => item.path?.test(url))

  if (route) {
    const routeRegex = url.match(route.path)
    const { query, ...params } = routeRegex?.groups ?? {}

    request.params = params
    request.query = query ? extractQueryParams(query) : {}

    const extendedRequest = request as ExtendedServerRequest
    return route.handler({ request: extendedRequest, response })
  } else {
    return response.writeHead(405).end('Not allowed')
  }
})

server.listen(4000, () =>
  console.log(`[APP] open on port 4000, http://localhost:4000`),
)
