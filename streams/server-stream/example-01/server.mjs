import { createReadStream } from 'node:fs'
import { createServer } from 'node:http'

const server = createServer((req, res) => {
  const { url } = req

  if (url === '/read-file') {
    const file = createReadStream('./example.txt')
    file.pipe(res)
  }
})

server.listen(4000)
