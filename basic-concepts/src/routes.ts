import { IncomingMessage, ServerResponse } from 'http'
import { userModule } from './models/user.model.js'

export const routes = [
  {
    pathRegex: /^\/users(\/\S+)?$/gi,
    handler: async <T extends IncomingMessage>(
      request: IncomingMessage,
      response: ServerResponse<T> & {
        req: IncomingMessage
      },
    ) => userModule(request, response),
  },
]
