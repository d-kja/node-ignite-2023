import { IncomingMessage } from 'http'
import { HandlerParams } from '../@types/server.js'

export const bodyParser = async <T extends IncomingMessage>({
  request,
  response,
}: HandlerParams<T>) => {
  const header = (header: string, value: string) =>
    response.setHeader(header, value)

  try {
    const buffers = []

    for await (const chunk of request) {
      buffers.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk)
    }

    const parsedBody = JSON.parse(Buffer.concat(buffers).toString())
    request.body = parsedBody
  } catch (error) {
    request.body = null
  }

  header('Content-Type', 'application/json')

  return request
}
