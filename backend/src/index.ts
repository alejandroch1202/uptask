import express from 'express'
import 'dotenv/config'
import { router } from './routes'
import { connect } from './config/db'

const PORT = process.env.PORT ?? 4000
const HOST = process.env.HOST ?? 'http://localhost'

connect()

const app = express()

app.use(express.json())
router(app)

app.listen(PORT, () => {
  console.log(`[server] Running on ${HOST}:${PORT}`)
})
