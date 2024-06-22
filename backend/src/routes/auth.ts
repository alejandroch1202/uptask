import { Router } from 'express'
import {
  signup,
  confirmAccount,
  login,
  requestConfirmToken,
  forgotPassword,
  validateToken,
  updatePassword
} from './../controllers/auth'
import {
  signupBody,
  confirmAccountBody,
  loginHeader,
  requestConfirmTokenBody,
  updatePasswordBody,
  updatePasswordParam
} from '../validators/auth'
import { handleValidation } from '../middlewares/validation'

const router = Router()

router.post('/signup', signupBody, handleValidation, signup)

router.post(
  '/confirm-account',
  confirmAccountBody,
  handleValidation,
  confirmAccount
)

router.post('/login', loginHeader, handleValidation, login)

router.post(
  '/request-token',
  requestConfirmTokenBody,
  handleValidation,
  requestConfirmToken
)

router.post(
  '/forgot-password',
  requestConfirmTokenBody,
  handleValidation,
  forgotPassword
)

router.post(
  '/validate-token',
  confirmAccountBody,
  handleValidation,
  validateToken
)

router.post(
  '/update-password/:token',
  updatePasswordParam,
  updatePasswordBody,
  handleValidation,
  updatePassword
)

export default router
