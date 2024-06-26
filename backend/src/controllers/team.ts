import type { Request, Response } from 'express'
import User, { type IUser } from '../models/User'
import { serverError } from '../middlewares/validation'

export const addUserToProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.body
    const user = await User.findById(id).select('_id')

    if (user === null) {
      return res
        .status(404)
        .json({ ok: false, message: 'El usuario no existe' })
    }

    if (req.project.team.includes(user.id.toString())) {
      return res
        .status(409)
        .json({ ok: false, message: 'El usuario ya existe en el proyecto' })
    }

    req.project.team.push(user.id)

    await req.project.save()

    res
      .status(200)
      .json({ ok: true, message: 'Usuario agregado correctamente' })
  } catch (error) {
    serverError(error, res)
  }
}

export const listMembers = async (req: Request, res: Response) => {
  try {
    const { team } = await req.project.populate('team', 'id name email')
    res.status(200).json({ ok: true, team })
  } catch (error) {
    serverError(error, res)
  }
}

export const findByEmail = async (req: Request, res: Response) => {
  try {
    const { email } = req.body
    const user = await User.findOne({ email }).select('_id name email')

    if (user === null) {
      return res
        .status(404)
        .json({ ok: false, message: 'Usuario no econtrado' })
    }

    res.status(200).json({ ok: true, user })
  } catch (error) {
    serverError(error, res)
  }
}

export const removeUserFromProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    if (!req.project.team.includes(id as IUser['id'])) {
      return res
        .status(409)
        .json({ ok: false, message: 'El usuario no existe en el proyecto' })
    }

    req.project.team = req.project.team.filter(
      (member) => member?.toString() !== id
    )

    await req.project.save()

    res
      .status(200)
      .json({ ok: true, message: 'Usuario eliminado correctamente' })
  } catch (error) {
    serverError(error, res)
  }
}
