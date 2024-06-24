import { Router } from 'express'
import { authenticate } from '../middlewares/auth'
import {
  validateDeleteById,
  validateFindByEmail,
  validateFindById
} from '../validators/team'
import { handleValidation } from '../middlewares/validation'
import {
  addUserToProject,
  findByEmail,
  listMembers,
  removeUserFromProject
} from '../controllers/team'
import { validateProjectExists } from '../middlewares/projects'

const router = Router()

router.use(authenticate)
router.param('projectId', validateProjectExists)

router.post(
  '/:projectId/team',
  validateFindById,
  handleValidation,
  addUserToProject
)

router.get('/:projectId/team', listMembers)

router.post(
  '/:projectId/team/find',
  validateFindByEmail,
  handleValidation,
  findByEmail
)

router.delete(
  '/:projectId/team/:id',
  validateDeleteById,
  handleValidation,
  removeUserFromProject
)

export default router
