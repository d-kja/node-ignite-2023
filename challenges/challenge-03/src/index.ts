import { app } from './app'
import { env } from './env'

app
  .listen({
    port: env.PORT,
    host: env.SERVER_HOST,
  })
  .then(() => console.info(`Server running on port ${env.PORT}`))
