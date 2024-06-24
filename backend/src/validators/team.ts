import { body, param } from 'express-validator'

export const validateFindByEmail = [
  body('email').isEmail().withMessage('Invalid email')
]

export const validateFindById = [
  body('id').isMongoId().withMessage('Invalid id')
]

export const validateDeleteById = [
  param('id').isMongoId().withMessage('Invalid id')
]
