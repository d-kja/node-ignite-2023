import { createWriteStream } from 'node:fs'
import { createServer } from 'node:http'
import path from 'node:path'
import { performance } from 'node:perf_hooks'
import { Transform } from 'node:stream'

class FormatStream extends Transform {
  _transform(chunk, _, callback) {
    const value = chunk.toString()

    // Handle & format the value here...
    const formattedValue = value.concat(',')

    // Push the value
    callback(null, formattedValue)
  }
}

const server = createServer(async (request, response) => {
  const { method, url } = request

  if (url === '/file' && method === 'POST') {
    const ping = performance.now()
    console.info('[INFO] - Started reading stream')

    const streamChain = request.pipe(new FormatStream()).on('finish', () => {
      const pong = performance.now()
      console.info(
        '[INFO] - Finished reading stream',
        `~ took ${(pong - ping).toFixed(2)}ms`,
      )
    })

    const buffers = []

    for await (const chunk of streamChain) {
      const pong = performance.now()

      if (typeof chunk === 'string') {
        buffers.push(Buffer.from(chunk))
      } else buffers.push(chunk)

      console.log(`~ took ${(pong - ping).toFixed(2)}ms`)
    }

    const bodyRequest = Buffer.concat(buffers).toString()

    createWriteStream(path.resolve('./assets/example.txt'), {
      flags: 'a',
    }).write(bodyRequest.replace(',', ',\n'))

    return response.end(bodyRequest)
  }

  return response.end('Method not allowed')
})

server.listen(3333, () => console.info(`[API] - running on port 3333`))
