import { body, param } from 'express-validator'

export const validateBody = [
  body('name').notEmpty().withMessage('Task name is required'),
  body('description').notEmpty().withMessage('Task description is required')
]

export const validateParam = [
  param('taskId').isMongoId().withMessage('Invalid id')
]

export const validateStatus = [
  body('status')
    .notEmpty()
    .withMessage('Task status is required')
    .isIn(['pending', 'onHold', 'inProgress', 'underReview', 'completed'])
    .withMessage('Invalid status')
]
