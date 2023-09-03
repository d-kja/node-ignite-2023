import { env } from '../env'
import { app } from './server'

app.listen(
  {
    port: env.PORT,
  },
  () => console.log(`[API] - running on port ${env.PORT}`),
)
