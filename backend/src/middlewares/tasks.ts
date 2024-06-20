import type { Request, Response, NextFunction } from 'express'
import Task, { type ITask } from '../models/Task'

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
    console.log(error)
    res
      .status(500)
      .json({ ok: false, message: 'Hubo un error al procesar tu solicitud' })
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
    console.log(error)
    res
      .status(500)
      .json({ ok: false, message: 'Hubo un error al procesar tu solicitud' })
  }
}
