import type { Request, Response } from 'express'
import Task, { type ITask } from '../models/Task'
import { serverError } from '../middlewares/validation'

export const create = async (req: Request, res: Response) => {
  try {
    const task = new Task(req.body)
    task.project = req.project.id
    req.project.tasks.push(task)
    await Promise.allSettled([task.save(), req.project.save()])
    res.status(201).json({ ok: true, message: 'Tarea creada correctamente' })
  } catch (error) {
    serverError(error, res)
  }
}

export const list = async (req: Request, res: Response) => {
  try {
    const tasks = await Task.find({ project: req.project.id }).populate(
      'project'
    )
    res.status(200).json({ ok: true, tasks })
  } catch (error) {
    serverError(error, res)
  }
}

export const find = async (req: Request, res: Response) => {
  try {
    const populated = await (
      await req.task.populate('updatedBy.user', 'id name email')
    ).populate({
      path: 'notes',
      populate: { path: 'createdBy', select: 'id name email' }
    })
    res.status(200).json({ ok: true, task: populated })
  } catch (error) {
    serverError(error, res)
  }
}

export const update = async (req: Request, res: Response) => {
  try {
    const changes = req.body
    req.task.name = changes.name
    req.task.description = changes.description
    await req.task.save()

    res
      .status(200)
      .json({ ok: true, message: 'Tarea actualizada correctamente' })
  } catch (error) {
    serverError(error, res)
  }
}

export const remove = async (req: Request, res: Response) => {
  try {
    req.project.tasks = req.project.tasks.filter(
      (item: ITask['id']) => item.toString() !== req.task.id.toString()
    )

    await Promise.allSettled([req.task.deleteOne(), req.project.save()])

    res.status(200).json({ ok: true, message: 'Tarea eliminada correctamente' })
  } catch (error) {
    serverError(error, res)
  }
}

export const updateStatus = async (req: Request, res: Response) => {
  try {
    req.task.status = req.body.status

    const data = {
      user: req.user.id,
      status: req.body.status
    }

    req.task.updatedBy.push(data)
    await req.task.save()

    res
      .status(200)
      .json({ ok: true, message: 'Tarea actualizada correctamente' })
  } catch (error) {
    serverError(error, res)
  }
}
