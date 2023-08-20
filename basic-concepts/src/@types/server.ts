import { IncomingMessage, ServerResponse } from 'http'

export type RequestType = IncomingMessage & {
  params?: Record<string, string>
  body?: Record<string, string> | null
}

export type HandlerParams<T extends IncomingMessage> = {
  request: RequestType
  response: ServerResponse<T> & {
    req: IncomingMessage
  }
}
