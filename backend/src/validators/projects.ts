import { body, param } from 'express-validator'

export const validateBody = [
  body('name').notEmpty().withMessage('Project name is required'),
  body('client').notEmpty().withMessage('Project client is required'),
  body('description').notEmpty().withMessage('Project description is required')
]

export const validateParam = [
  param('projectId').isMongoId().withMessage('Invalid id')
]
