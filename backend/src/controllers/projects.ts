import type { Request, Response } from 'express'
import Project from '../models/Project'
import { serverError } from '../middlewares/validation'

export const create = async (req: Request, res: Response) => {
  try {
    const project = new Project(req.body)
    project.manager = req.user.id
    await project.save()
    res.status(201).json({ ok: true, message: 'Proyecto creado correctamente' })
  } catch (error) {
    serverError(error, res)
  }
}

export const list = async (req: Request, res: Response) => {
  try {
    const { id } = req.user
    const projects = await Project.find({
      $or: [{ manager: { $in: id } }, { team: { $in: id } }]
    })
    res.status(200).json({ ok: true, projects })
  } catch (error) {
    serverError(error, res)
  }
}

export const find = async (req: Request, res: Response) => {
  try {
    const { id } = req.user
    const { manager, team } = req.project

    if (
      manager === undefined ||
      (manager.toString() !== id.toString() && !team.includes(id))
    ) {
      return res.status(403).json({ ok: false, message: 'Acción no válida' })
    }
    const projectPopulated = await req.project.populate('tasks')
    res.status(200).json({ ok: true, project: projectPopulated })
  } catch (error) {
    serverError(error, res)
  }
}

export const update = async (req: Request, res: Response) => {
  try {
    const changes = req.body
    req.project.name = changes.name
    req.project.client = changes.client
    req.project.description = changes.description
    req.project.save()

    res
      .status(200)
      .json({ ok: true, message: 'Proyecto actualizado correctamente' })
  } catch (error) {
    serverError(error, res)
  }
}

export const remove = async (req: Request, res: Response) => {
  try {
    await req.project.deleteOne()
    res
      .status(200)
      .json({ ok: true, message: 'Proyecto eliminado correctamente' })
  } catch (error) {
    serverError(error, res)
  }
}
