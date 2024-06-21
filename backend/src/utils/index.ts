import bcryptjs from 'bcryptjs'

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
