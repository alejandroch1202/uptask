import { Router } from 'express'
import { create, list, find, update, remove } from './../controllers/projects'
import { handleValidation } from '../middlewares/validation'
import { validateBody, validateParam } from '../validators/projects'
import { validateProjectExists } from '../middlewares/projects'
import { authenticate } from '../middlewares/auth'

const router = Router()

router.use(authenticate)

router.post('/', validateBody, handleValidation, create)

router.get('/', list)

router.param('projectId', validateProjectExists)

router.get('/:projectId', validateParam, handleValidation, find)

router.put('/:projectId', validateParam, validateBody, handleValidation, update)

router.delete('/:projectId', validateParam, handleValidation, remove)

export default router
