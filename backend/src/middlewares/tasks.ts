import type { Request, Response, NextFunction } from 'express'
import Task, { type ITask } from '../models/Task'
import { serverError } from './validation'

declare module 'express-serve-static-core' {
  interface Request {
    task: ITask
  }
}

export const validateTaskExists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { taskId } = req.params
    const task = await Task.findById(taskId)

    if (task === null) {
      return res.status(404).json({ ok: false, message: 'Tarea no encontrada' })
    }

    req.task = task
    next()
  } catch (error) {
    serverError(error, res)
  }
}

export const validateTaskBelongs = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.task.project.toString() !== req.project.id.toString()) {
      return res
        .status(400)
        .json({ ok: false, message: 'No se pudo procesar tu solicitud' })
    }
    next()
  } catch (error) {
    serverError(error, res)
  }
}

export const hasAuthorization = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { manager } = req.project
    const { id } = req.user
    if (manager !== undefined && id.toString() !== manager.toString()) {
      return res.status(400).json({ ok: false, message: 'Acción no válida' })
    }
    next()
  } catch (error) {
    serverError(error, res)
  }
}
