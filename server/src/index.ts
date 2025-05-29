import 'module-alias/register'

import cookieParser from 'cookie-parser'
import cors from 'cors'
import express, { Express, json } from 'express'
import path from 'path'

import { config } from './config'
import { errorHandler, notFoundHandler } from './middlewares/errorHandler'
import { router } from './routes/index.routes'

const app: Express = express()
app.use(
  cors({
    credentials: true,
    origin: '*', // allowedOrigins
  }),
)
app.use(json())
app.use(cookieParser())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use('/api', router)

/* errors */
app.use(notFoundHandler)
app.use(errorHandler)

const PORT = config.port

const main = () => {
  try {
    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`)
    })
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

main()
