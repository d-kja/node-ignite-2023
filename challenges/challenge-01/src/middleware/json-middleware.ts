import { MiddlewareHandler } from '@/@types/index.js'
import { bodyParser } from '@/utils/body-parser.js'

export async function json({ request, response }: MiddlewareHandler) {
  response.setHeader('Content-Type', 'application/json')

  try {
    const body = await bodyParser(request)
    request.body = JSON.parse(body.toString())
  } catch (error) {
    request.body = null
  }
}
