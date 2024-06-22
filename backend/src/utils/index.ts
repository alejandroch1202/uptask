import type { Types } from 'mongoose'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const hashPassword = (password: string) => {
  return bcryptjs.hashSync(password, 10)
}

export const comparePassword = (password: string, hash: string) => {
  return bcryptjs.compareSync(password, hash)
}

export const generateToken = () => {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

export const extractCredentials = (authorization: string) => {
  const credentials = authorization.split(' ')[1]
  const decode = Buffer.from(credentials, 'base64').toString()
  return decode.split(':')
}

interface JwtPayload {
  id: Types.ObjectId
  name: string
}

export const generateJwt = ({ id, name }: JwtPayload) => {
  const secret = process.env.JWT_SECRET!
  return jwt.sign(
    {
      sub: id,
      name
    },
    secret,
    {
      expiresIn: '2h'
    }
  )
}

export const verifyJwt = (token: string) => {
  const secret = process.env.JWT_SECRET!
  return jwt.verify(token, secret)
}
