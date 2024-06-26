import type { Request, Response } from 'express'
import Note, { type INote } from '../models/Note'
import { serverError } from '../middlewares/validation'

export const create = async (req: Request, res: Response) => {
  try {
    const note = new Note(req.body)
    note.createdBy = req.user.id
    note.task = req.task.id
    req.task.notes.push(note.id)

    await Promise.allSettled([req.task.save(), note.save()])
    res.status(201).json({ ok: true, message: 'Nota creada correctamente' })
  } catch (error) {
    serverError(error, res)
  }
}

export const list = async (req: Request, res: Response) => {
  try {
    const notes = await Note.find({ task: req.task.id })
    res.status(200).json({ ok: true, notes })
  } catch (error) {
    serverError(error, res)
  }
}

export const remove = async (req: Request, res: Response) => {
  const { noteId } = req.params
  const note = await Note.findById(noteId)

  if (note === null) {
    return res.status(404).json({ ok: false, message: 'Nota no encontrada' })
  }

  if (note.createdBy.toString() !== req.user.id.toString()) {
    return res.status(401).json({ ok: false, message: 'Acción inválida' })
  }

  try {
    req.task.notes = req.task.notes.filter(
      (item: INote['id']) => item.toString() !== note.id.toString()
    )

    await Promise.allSettled([req.task.save(), note.deleteOne()])
    res.status(200).json({ ok: true, message: 'Nota eliminada correctamente' })
  } catch (error) {
    serverError(error, res)
  }
}
