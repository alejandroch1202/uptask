import { Router } from 'express'
import { create, list, find, update, remove } from './../controllers/projects'
import { handleValidation } from '../middlewares/validation'
import { validateBody, validateParam } from '../validators/projects'
import { validateProjectExists } from '../middlewares/projects'

const router = Router()

router.post('/', validateBody, handleValidation, create)

router.get('/', list)

router.param('projectId', validateProjectExists)

router.get('/:projectId', validateParam, handleValidation, find)

router.put('/:projectId', validateParam, validateBody, handleValidation, update)

router.delete('/:projectId', validateParam, handleValidation, remove)

export default router
