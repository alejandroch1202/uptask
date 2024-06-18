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
    const { id } = req.params
    const task = await Task.findById(id)

    if (task === null) {
      return res.status(404).json({ ok: false, message: 'Task not found' })
    }

    req.task = task
    next()
  } catch (error) {
    console.log(error)
    res.status(500).json({ ok: false, message: 'Server error' })
  }
}

export const validateTaskBelongs = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.task.project.toString() !== req.project.id.toString()) {
      return res.status(400).json({ ok: false, message: 'Invalid action' })
    }
    next()
  } catch (error) {
    console.log(error)
    res.status(500).json({ ok: false, message: 'Server error' })
  }
}
