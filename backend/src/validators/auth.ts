import { body, header, param } from 'express-validator'

export const signupBody = [
  body('name').notEmpty().withMessage('User name is required'),
  body('email').isEmail().withMessage('Invalid email'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be minimum 8 characters'),
  body('confirmPassword').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Password confirmation does not match password')
    }
    return true
  })
]

export const confirmAccountBody = [
  body('token').isLength({ min: 6, max: 6 }).withMessage('Invalid token')
]

export const loginHeader = [
  header('authorization').exists().withMessage('Invalid credentials')
]

export const requestConfirmTokenBody = [
  body('email').isEmail().withMessage('Invalid email')
]

export const updatePasswordBody = [
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be minimum 8 characters'),
  body('confirmPassword').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Password confirmation does not match password')
    }
    return true
  })
]

export const updatePasswordParam = [
  param('token').isLength({ min: 6, max: 6 }).withMessage('Invalid token')
]

export const profileBody = [
  body('name').notEmpty().withMessage('User name is required'),
  body('email').isEmail().withMessage('Invalid email')
]

export const changePasswordBody = [
  body('oldPassword')
    .isLength({ min: 8 })
    .withMessage('Password must be minimum 8 characters'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be minimum 8 characters'),
  body('confirmPassword').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Password confirmation does not match password')
    }
    return true
  })
]

export const checkPasswordBody = [
  body('password').notEmpty().withMessage('User password is required')
]
