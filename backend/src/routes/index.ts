import { Router } from 'express'
import type { Express } from 'express'
import auth from './auth'
import projects from './projects'
import tasks from './tasks'

export const router = (app: Express) => {
  const router = Router()

  app.use('/api/v1', router)

  router.use('/auth', auth)

  router.use('/projects', projects)

  router.use('/projects', tasks)
}
