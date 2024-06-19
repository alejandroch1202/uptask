import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import 'dotenv/config'
import { router } from './routes'
import { connect } from './config/db'
import { corsOptions } from './config/cors'

const PORT = process.env.PORT ?? 4000
const HOST = process.env.HOST ?? 'http://localhost'

connect()

const app = express()

app.use(cors(corsOptions))
app.use(morgan('dev'))
app.use(express.json())
router(app)

app.listen(PORT, () => {
  console.log(`[server] Running on ${HOST}:${PORT}`)
})
