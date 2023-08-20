import { IncomingMessage, ServerResponse } from 'http'
import { userModule } from './models/user.model.js'
import { buildRoutePath } from './utils/build-route-path.js'

type handlerParams<T extends IncomingMessage> = {
  request: IncomingMessage
  response: ServerResponse<T> & {
    req: IncomingMessage
  }
}

export const routes = [
  {
    pathRegex: buildRoutePath('/users'),
    handler: async <T extends IncomingMessage>({
      request,
      response,
    }: handlerParams<T>) => userModule(request, response),
  },
  {
    pathRegex: buildRoutePath('/users/:id'),
    handler: async <T extends IncomingMessage>({
      request,
      response,
    }: handlerParams<T>) => userModule(request, response),
  },
]
