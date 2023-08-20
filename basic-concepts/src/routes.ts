import { IncomingMessage } from 'http'
import { HandlerParams } from './@types/server.js'
import { userModule } from './models/user.model.js'
import { buildRoutePath } from './utils/build-route-path.js'

export const routes = [
  {
    pathRegex: buildRoutePath('/users'),
    handler: async <T extends IncomingMessage>({
      request,
      response,
    }: HandlerParams<T>) => userModule({ request, response }),
  },
  {
    pathRegex: buildRoutePath('/users/:id'),
    handler: async <T extends IncomingMessage>({
      request,
      response,
    }: HandlerParams<T>) => userModule({ request, response }),
  },
]
