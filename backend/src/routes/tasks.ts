import { Router } from 'express'
import {
  create,
  list,
  find,
  update,
  remove,
  updateStatus
} from './../controllers/tasks'
import {
  validateBody,
  validateParam,
  validateStatus
} from '../validators/tasks'
import { validateProjectExists } from '../middlewares/projects'
import { validateTaskExists, validateTaskBelongs } from '../middlewares/tasks'
import { handleValidation } from '../middlewares/validation'

const router = Router()

router.param('projectId', validateProjectExists)
router.param('taskId', validateTaskExists)
router.param('taskId', validateTaskBelongs)

router.post('/:projectId/tasks', validateBody, handleValidation, create)

router.get('/:projectId/tasks', list)

router.get('/:projectId/tasks/:taskId', validateParam, handleValidation, find)

router.put(
  '/:projectId/tasks/:taskId',
  validateParam,
  validateBody,
  handleValidation,
  update
)

router.delete(
  '/:projectId/tasks/:taskId',
  validateParam,
  handleValidation,
  remove
)

router.post(
  '/:projectId/tasks/:taskId/status',
  validateParam,
  validateStatus,
  handleValidation,
  updateStatus
)

export default router
