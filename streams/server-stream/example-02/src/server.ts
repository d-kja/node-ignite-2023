import { createWriteStream } from 'node:fs'
import { createServer } from 'node:http'
import { resolve } from 'node:path'
import { performance } from 'node:perf_hooks'
import { Readable, Transform } from 'node:stream'
import { TransformCallback } from 'stream'

class FormatStream extends Transform {
  _transform(
    chunk: Readable,
    _: BufferEncoding,
    callback: TransformCallback,
  ): void {
    const value = chunk.toString()

    // Handle & format the value here...
    const formattedValue = value.toUpperCase()

    // Push the value
    callback(null, formattedValue)
  }
}

const server = createServer(async (request, response) => {
  const { method, url } = request

  if (url === '/file' && method === 'POST') {
    const ping = performance.now()

    console.info('[INFO] - Started reading stream')
    const writer = createWriteStream(resolve('./src/files/example.txt'), {
      flags: 'w',
    })
    const streamChain = request.pipe(new FormatStream())

    for await (const chunk of streamChain) {
      const pong = performance.now()
      const value = chunk.toString()

      console.log(
        value.split('-')[0].trim(),
        `~ took ${(pong - ping).toFixed(2)}ms`,
      )
      writer.write(value)
    }

    streamChain.pipe(response).on('finish', () => {
      const pong = performance.now()
      console.info(
        '[INFO] - Finished reading stream',
        `~ took ${(pong - ping).toFixed(2)}ms`,
      )

      writer.end()
    })
  }

  return response.end('Method not allowed')
})

server.listen(3333, () => console.info(`[API] - running on port 3333`))
