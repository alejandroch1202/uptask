import { Router } from 'express'
import {
  signup,
  confirmAccount,
  login,
  requestConfirmToken,
  forgotPassword,
  validateToken,
  updatePassword,
  getUserInfo
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
import { authenticate } from '../middlewares/auth'

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

router.get('/user', authenticate, getUserInfo)

export default router
