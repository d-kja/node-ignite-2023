import { Readable } from 'stream'

export async function bodyParser(request: Readable) {
  const buffers = []

  for await (const chunk of request) {
    const chunkBuffer = typeof chunk === 'string' ? Buffer.from(chunk) : chunk
    buffers.push(chunkBuffer)
  }

  return Buffer.concat(buffers)
}
