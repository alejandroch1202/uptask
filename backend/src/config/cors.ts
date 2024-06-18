import type { CorsOptions } from 'cors'

export const corsOptions: CorsOptions = {
  origin: (origin, callaback) => {
    const whitelist = [process.env.FRONTEND_URL]

    if (whitelist.includes(origin)) {
      callaback(null, true)
    } else {
      callaback(new Error('CORS error'), false)
    }
  }
}
