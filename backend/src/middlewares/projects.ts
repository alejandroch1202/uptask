import type { Request, Response, NextFunction } from 'express'
import Project from '../models/Project'

declare module 'express-serve-static-core' {
  interface Request {
    project: any
  }
}

export const validateProjectExists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { projectId } = req.params
    const project = await Project.findById(projectId)

    if (project === null) {
      return res
        .status(404)
        .json({ ok: false, message: 'Proyecto no encontrado' })
    }

    req.project = project
    next()
  } catch (error) {
    console.log(error)
    res
      .status(500)
      .json({ ok: false, message: 'Hubo un error al procesar tu solicitud' })
  }
}
