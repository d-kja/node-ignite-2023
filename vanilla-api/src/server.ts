import { exec } from 'node:child_process'
import http from 'node:http'

const OS_ENV = process.platform === 'win32' ? 'start' : 'xdg-open'

const PORT = 4000
const API_URL = `http://localhost:${PORT}`

const server = http.createServer((request, response) => {
  const status = (code: number) => (request.statusCode = code)
  const method = request.method

  switch (method) {
    case 'GET':
      status(200)
      response.end('Hello world')

      break
    case 'POST':
      status(201)
      response.end('POST RESPONSE')

      break

    default:
      status(405)
      response.end()

      break
  }
})

if (false) exec(`${OS_ENV} ${API_URL}`) // lazy ass mf
server.listen(PORT, () => console.log(`[API] - running on ${API_URL}`))
