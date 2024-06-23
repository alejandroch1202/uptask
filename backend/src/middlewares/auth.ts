import type { Request, Response, NextFunction } from 'express'
import { verifyJwt } from '../utils'
import User, { type IUser } from '../models/User'

declare module 'express-serve-static-core' {
  interface Request {
    user: IUser
  }
}

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeaders = req.get('authorization')

  if (authHeaders === undefined) {
    return res.status(401).json({ ok: false, message: 'Unauthenticated' })
  }

  try {
    const token = authHeaders.split(' ')[1]
    const decoded = verifyJwt(token)
    const user = await User.findById(decoded.sub).select('_id name email')

    if (user === null) {
      return res.status(404).json({ ok: false, message: 'Invalid token' })
    }

    req.user = user
    next()
  } catch (error) {
    return res.status(401).json({ ok: false, message: 'Invalid token' })
  }
}
