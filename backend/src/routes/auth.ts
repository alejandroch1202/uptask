import { Router } from 'express'
import {
  signup,
  confirmAccount,
  login,
  requestConfirmToken
} from './../controllers/auth'
import {
  signupBody,
  confirmAccountBody,
  loginHeader,
  requestConfirmTokenBody
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

export default router
