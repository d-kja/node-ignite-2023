import { exec } from 'node:child_process'
import http from 'node:http'
import { Database } from './in-memory/database.js'
import { routes } from './routes.js'

const OS_ENV = process.platform === 'win32' ? 'start' : 'xdg-open'

const PORT = 4000
const API_URL = `http://localhost:${PORT}`

export const database = new Database()

const server = http.createServer(async (request, response) => {
  const { method, url } = request
  const status = (code: number) => (request.statusCode = code)

  console.log(`[${method}] - ${url}`)

  const route = routes.find((route) => url?.match(route.pathRegex))

  if (route) {
    await route.handler(request, response)
  }

  status(405)
  response.end('Not allowed')
})

if (false) exec(`${OS_ENV} ${API_URL}`) // lazy ass mf
server.listen(PORT, () => console.log(`[API] - running on ${API_URL}`))
