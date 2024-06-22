import type { Request, Response } from 'express'
import User from '../models/User'
import {
  comparePassword,
  extractCredentials,
  generateToken,
  hashPassword
} from '../utils'
import Token from '../models/Token'
import { sendConfirmationEmail, forgotPasswordEmail } from '../emails/auth'

export const signup = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body
    const isRegistered = await User.findOne({ email })

    if (isRegistered !== null) {
      return res
        .status(409)
        .json({ ok: false, message: 'El email ya esta registrado' })
    }

    const user = new User(req.body)
    user.password = hashPassword(password)

    const token = new Token()
    token.token = generateToken()
    token.user = user.id

    await sendConfirmationEmail({
      email: user.email,
      name: user.name,
      token: token.token
    })

    await Promise.allSettled([user.save(), token.save()])

    res.status(200).json({
      ok: true,
      message: 'Cuenta creada, revisa tu email para confirmarla'
    })
  } catch (error) {
    console.log(error)
    res
      .status(500)
      .json({ ok: false, message: 'Hubo un error al procesar tu solicitud' })
  }
}

export const confirmAccount = async (req: Request, res: Response) => {
  try {
    const { token } = req.body
    const tokenExists = await Token.findOne({ token })

    if (tokenExists === null) {
      return res.status(401).json({ ok: false, message: 'Código no valido' })
    }

    const user = await User.findById(tokenExists.user)

    if (user === null) {
      return res
        .status(404)
        .json({ ok: false, message: 'Usuario no encontrado' })
    }

    user.confirmed = true

    await Promise.allSettled([tokenExists.deleteOne(), user.save()])

    res
      .status(200)
      .json({ ok: true, message: 'Cuenta confirmada correctamente' })
  } catch (error) {
    console.log(error)
    res
      .status(500)
      .json({ ok: false, message: 'Hubo un error al procesar tu solicitud' })
  }
}

export const login = async (req: Request, res: Response) => {
  try {
    const auth = req.headers.authorization!
    const [email, password] = extractCredentials(auth)

    const user = await User.findOne({ email })

    if (user === null) {
      return res
        .status(404)
        .json({ ok: false, message: 'Usuario no encontrado' })
    }

    if (!user.confirmed) {
      const token = new Token()
      token.token = generateToken()
      token.user = user.id
      await token.save()

      await sendConfirmationEmail({
        email: user.email,
        name: user.name,
        token: token.token
      })

      return res.status(401).json({
        ok: false,
        message:
          'La cuenta no ha sido confirmada. Le hemos enviado un nuevo correo de verificación.'
      })
    }

    const isPasswordMatch = comparePassword(password, user.password)

    if (!isPasswordMatch) {
      return res
        .status(401)
        .json({ ok: false, message: 'Credenciales inválidas' })
    }

    res.status(200).json({ ok: true, message: 'Sesión iniciada correctamente' })
  } catch (error) {
    console.log(error)
    res
      .status(500)
      .json({ ok: false, message: 'Hubo un error al procesar tu solicitud' })
  }
}

export const requestConfirmToken = async (req: Request, res: Response) => {
  try {
    const { email } = req.body
    const user = await User.findOne({ email })

    if (user === null) {
      return res
        .status(404)
        .json({ ok: false, message: 'El email no esta registrado' })
    }

    if (user.confirmed) {
      return res
        .status(403)
        .json({ ok: false, message: 'La cuenta ya ha sido confirmada' })
    }

    const token = new Token()
    token.token = generateToken()
    token.user = user.id

    await sendConfirmationEmail({
      email: user.email,
      name: user.name,
      token: token.token
    })

    await Promise.allSettled([user.save(), token.save()])

    res.status(200).json({
      ok: true,
      message: 'Sigue las instrucciones enviadas a tu correo'
    })
  } catch (error) {
    console.log(error)
    res
      .status(500)
      .json({ ok: false, message: 'Hubo un error al procesar tu solicitud' })
  }
}

export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body
    const user = await User.findOne({ email })

    if (user === null) {
      return res
        .status(404)
        .json({ ok: false, message: 'El email no esta registrado' })
    }

    const token = new Token()
    token.token = generateToken()
    token.user = user.id
    await token.save()

    await forgotPasswordEmail({
      email: user.email,
      name: user.name,
      token: token.token
    })

    res.status(200).json({
      ok: true,
      message: 'Sigue las instrucciones enviadas a tu correo'
    })
  } catch (error) {
    console.log(error)
    res
      .status(500)
      .json({ ok: false, message: 'Hubo un error al procesar tu solicitud' })
  }
}

export const validateToken = async (req: Request, res: Response) => {
  try {
    const { token } = req.body
    const tokenExists = await Token.findOne({ token })

    if (tokenExists === null) {
      return res.status(401).json({ ok: false, message: 'Código no valido' })
    }

    const user = await User.findById(tokenExists.user)

    if (user === null) {
      return res
        .status(404)
        .json({ ok: false, message: 'Usuario no encontrado' })
    }

    res.status(200).json({
      ok: true,
      message: 'Código validado. Ahora define tu nueva contraseña'
    })
  } catch (error) {
    console.log(error)
    res
      .status(500)
      .json({ ok: false, message: 'Hubo un error al procesar tu solicitud' })
  }
}

export const updatePassword = async (req: Request, res: Response) => {
  try {
    const { token } = req.params
    const tokenExists = await Token.findOne({ token })
    if (tokenExists === null) {
      return res.status(401).json({ ok: false, message: 'Código no valido' })
    }

    const user = await User.findById(tokenExists.user)
    if (user === null) {
      return res
        .status(404)
        .json({ ok: false, message: 'Usuario no encontrado' })
    }

    const { password } = req.body
    user.password = hashPassword(password)
    await Promise.allSettled([user.save(), tokenExists.deleteOne()])

    res.status(200).json({
      ok: true,
      message: 'Contraseña restablecida con éxito'
    })
  } catch (error) {
    console.log(error)
    res
      .status(500)
      .json({ ok: false, message: 'Hubo un error al procesar tu solicitud' })
  }
}
