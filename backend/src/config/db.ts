import mongoose from 'mongoose'

export const connect = async () => {
  try {
    const url = process.env.DATABASE_URL

    if (url === undefined) {
      throw new Error('[db] DATABASE_URL is not set')
    }

    const { connection } = await mongoose.connect(url)
    console.log(
      `[db] Sucessfully connected to: http://${connection.host}:${connection.port}`
    )
  } catch (error) {
    console.log('[db] There was an error trying to connect to MongoDB')
    process.exit(1)
  }
}
