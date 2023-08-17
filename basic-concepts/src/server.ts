import { exec } from 'node:child_process'
import http from 'node:http'
import { database } from './in-memory/database.js'
import { userModule } from './models/user.model.js'

const OS_ENV = process.platform === 'win32' ? 'start' : 'xdg-open'

const PORT = 4000
const API_URL = `http://localhost:${PORT}`

database.load()

const server = http.createServer((request, response) => {
  const { method, url } = request
  const status = (code: number) => (request.statusCode = code)

  console.log(`[${method}] - ${url}`)

  // User handler
  if (url?.match(/^\/users(\/\S+)?$/gi)) {
    return userModule(request, response)
  }

  status(405)
  response.end('Not allowed')
})

if (false) exec(`${OS_ENV} ${API_URL}`) // lazy ass mf
server.listen(PORT, () => console.log(`[API] - running on ${API_URL}`))
