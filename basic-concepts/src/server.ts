import { exec } from 'node:child_process'
import http from 'node:http'
import { RequestType } from './@types/server.js'
import { Database } from './in-memory/database.js'
import { routes } from './routes.js'
import { extractQueryParams } from './utils/extract-query-params.js'

const OS_ENV = process.platform === 'win32' ? 'start' : 'xdg-open'

const PORT = 4000
const API_URL = `http://localhost:${PORT}`

export const database = new Database()

const server = http.createServer(async (request: RequestType, response) => {
  const { method, url = '/' } = request
  const status = (code: number) => (request.statusCode = code)

  console.log(`[${method}] - ${url}`)

  const route = routes.find((route) => route.pathRegex.test(url))

  if (route) {
    const routeParams = url.match(route.pathRegex)

    const { query, ...params } = routeParams?.groups ?? {}
    request.params = params
    request.query = query ? extractQueryParams(query) : {}
    console.log(request.params, request.query)

    await route.handler({ request, response })
  } else {
    status(405)
    return response.end('Not allowed')
  }
})

if (false) exec(`${OS_ENV} ${API_URL}`) // lazy ass mf
server.listen(PORT, () => console.log(`[API] - running on ${API_URL}`))
