import type { Request, Response } from 'express'
import Project from '../models/Project'
import Task from '../models/Task'

export const create = async (req: Request, res: Response) => {
  try {
    const project = new Project(req.body)
    await project.save()
    res.status(201).json({ ok: true, message: 'Project created' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ ok: false, message: 'Server error' })
  }
}

export const list = async (req: Request, res: Response) => {
  try {
    const projects = await Project.find({})
    res.status(200).json({ ok: true, projects })
  } catch (error) {
    console.log(error)
    res.status(500).json({ ok: false, message: 'Server error' })
  }
}

export const find = async (req: Request, res: Response) => {
  const projectPopulated = await req.project.populate('tasks')
  try {
    res.status(200).json({ ok: true, project: projectPopulated })
  } catch (error) {
    console.log(error)
    res.status(500).json({ ok: false, message: 'Server error' })
  }
}

export const update = async (req: Request, res: Response) => {
  try {
    const changes = req.body
    req.project.name = changes.name
    req.project.client = changes.client
    req.project.description = changes.description
    req.project.save()

    res.status(200).json({ ok: true, message: 'Project updated' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ ok: false, message: 'Server error' })
  }
}

export const remove = async (req: Request, res: Response) => {
  try {
    await Promise.allSettled([
      Task.deleteMany({ project: req.project.id }),
      req.project.deleteOne()
    ])

    res.status(200).json({ ok: true, message: 'Project deleted' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ ok: false, message: 'Server error' })
  }
}
