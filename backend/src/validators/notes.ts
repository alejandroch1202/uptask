import { body, param } from 'express-validator'

export const validateBody = [
  body('content').notEmpty().withMessage('Note content is required')
]

export const validateParam = [
  param('noteId').isMongoId().withMessage('Invalid id')
]
