import type { Request, Response } from 'express'
import Task, { type ITask } from '../models/Task'

export const create = async (req: Request, res: Response) => {
  try {
    const task = new Task(req.body)
    task.project = req.project.id
    req.project.tasks.push(task)
    await Promise.allSettled([task.save(), req.project.save()])
    res.status(201).json({ ok: true, message: 'Tarea creada correctamente' })
  } catch (error) {
    console.log(error)
    res
      .status(500)
      .json({ ok: false, message: 'Hubo un error al procesar tu solicitud' })
  }
}

export const list = async (req: Request, res: Response) => {
  try {
    const tasks = await Task.find({ project: req.project.id }).populate(
      'project'
    )
    res.status(200).json({ ok: true, tasks })
  } catch (error) {
    console.log(error)
    res
      .status(500)
      .json({ ok: false, message: 'Hubo un error al procesar tu solicitud' })
  }
}

export const find = async (req: Request, res: Response) => {
  try {
    res.status(200).json({ ok: true, task: req.task })
  } catch (error) {
    console.log(error)
    res
      .status(500)
      .json({ ok: false, message: 'Hubo un error al procesar tu solicitud' })
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
    console.log(error)
    res
      .status(500)
      .json({ ok: false, message: 'Hubo un error al procesar tu solicitud' })
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
    console.log(error)
    res
      .status(500)
      .json({ ok: false, message: 'Hubo un error al procesar tu solicitud' })
  }
}

export const updateStatus = async (req: Request, res: Response) => {
  try {
    req.task.status = req.body.status
    await req.task.save()

    res
      .status(200)
      .json({ ok: true, message: 'Tarea actualizada correctamente' })
  } catch (error) {
    console.log(error)
    res
      .status(500)
      .json({ ok: false, message: 'Hubo un error al procesar tu solicitud' })
  }
}
