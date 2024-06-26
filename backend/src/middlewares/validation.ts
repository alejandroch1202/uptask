import type { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'

export const handleValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ ok: false, errors: errors.array() })
  }
  next()
}

export const serverError = (error: unknown, res: Response) => {
  console.log(error)
  res
    .status(500)
    .json({ ok: false, message: 'Hubo un error al procesar tu solicitud' })
}
