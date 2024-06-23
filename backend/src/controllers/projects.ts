import type { Request, Response } from 'express'
import Project from '../models/Project'
import Task from '../models/Task'

export const create = async (req: Request, res: Response) => {
  try {
    const project = new Project(req.body)
    project.manager = req.user.id
    await project.save()
    res.status(201).json({ ok: true, message: 'Proyecto creado correctamente' })
  } catch (error) {
    console.log(error)
    res
      .status(500)
      .json({ ok: false, message: 'Hubo un error al procesar tu solicitud' })
  }
}

export const list = async (req: Request, res: Response) => {
  try {
    const { id } = req.user
    const projects = await Project.find({ manager: id })
    res.status(200).json({ ok: true, projects })
  } catch (error) {
    console.log(error)
    res
      .status(500)
      .json({ ok: false, message: 'Hubo un error al procesar tu solicitud' })
  }
}

export const find = async (req: Request, res: Response) => {
  try {
    const { id } = req.user
    const { manager } = req.project

    // eslint-disable-next-line @typescript-eslint/no-base-to-string
    if (manager === undefined || manager.toString() !== id.toString()) {
      return res.status(403).json({ ok: false, message: 'Acción no válida' })
    }
    const projectPopulated = await req.project.populate('tasks')
    res.status(200).json({ ok: true, project: projectPopulated })
  } catch (error) {
    console.log(error)
    res
      .status(500)
      .json({ ok: false, message: 'Hubo un error al procesar tu solicitud' })
  }
}

export const update = async (req: Request, res: Response) => {
  try {
    const { id } = req.user
    const { manager } = req.project

    // eslint-disable-next-line @typescript-eslint/no-base-to-string
    if (manager === undefined || manager.toString() !== id.toString()) {
      return res.status(403).json({ ok: false, message: 'Acción no válida' })
    }

    const changes = req.body
    req.project.name = changes.name
    req.project.client = changes.client
    req.project.description = changes.description
    req.project.save()

    res
      .status(200)
      .json({ ok: true, message: 'Proyecto actualizado correctamente' })
  } catch (error) {
    console.log(error)
    res
      .status(500)
      .json({ ok: false, message: 'Hubo un error al procesar tu solicitud' })
  }
}

export const remove = async (req: Request, res: Response) => {
  try {
    const { id } = req.user
    const { manager } = req.project

    // eslint-disable-next-line @typescript-eslint/no-base-to-string
    if (manager === undefined || manager.toString() !== id.toString()) {
      return res.status(403).json({ ok: false, message: 'Acción no válida' })
    }

    await Promise.allSettled([
      Task.deleteMany({ project: req.project.id }),
      req.project.deleteOne()
    ])

    res
      .status(200)
      .json({ ok: true, message: 'Proyecto eliminado correctamente' })
  } catch (error) {
    console.log(error)
    res
      .status(500)
      .json({ ok: false, message: 'Hubo un error al procesar tu solicitud' })
  }
}
