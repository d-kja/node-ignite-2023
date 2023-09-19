import { env } from './env'
import { server } from './server'

server
  .listen({
    host: env.SERVER_HOST,
    port: env.PORT,
  })
  .then(() => console.log(`[API] - spinning on port ${env.PORT}`))
