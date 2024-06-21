import { Router } from 'express'
import { signup, confirmAccount, login } from './../controllers/auth'
import { signupBody, confirmAccountBody, loginHeader } from '../validators/auth'
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

export default router
