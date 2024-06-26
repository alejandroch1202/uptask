import { Router } from 'express'
import { create, list, remove } from './../controllers/notes'
import { validateProjectExists } from '../middlewares/projects'
import { validateTaskExists } from '../middlewares/tasks'
import { validateBody, validateParam } from '../validators/notes'
import { handleValidation } from '../middlewares/validation'

const router = Router()

router.param('projectId', validateProjectExists)
router.param('taskId', validateTaskExists)

router.post(
  '/:projectId/tasks/:taskId/notes',
  validateBody,
  handleValidation,
  create
)

router.get('/:projectId/tasks/:taskId/notes', list)

router.delete(
  '/:projectId/tasks/:taskId/notes/:noteId',
  validateParam,
  handleValidation,
  remove
)

export default router
