import { IncomingMessage, ServerResponse as NodeServerResponse } from 'http'

type Method = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE'

export type ServerRequest = IncomingMessage & {
  body?: Record<string, any> | null
  params?: Record<string, any>
  query?: Record<string, any>
}

export type ExtendedServerRequest = ServerRequest & {
  method: Method
}

export type ServerResponse = NodeServerResponse<IncomingMessage> & {
  req: IncomingMessage
}

export type MiddlewareHandler = {
  request: ExtendedServerRequest
  response: ServerResponse
}

export type Routes = Array<{
  path: RegExp
  handler: ({ request, response }: MiddlewareHandler) => ServerResponse
}>
